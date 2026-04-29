/**
 * ThaliFit API Server (Express + PostgreSQL)
 * schema.json의 endpoints를 1:1 구현
 * landing.html의 app.js → 이 서버로 직접 호출
 *
 * 환경변수: DATABASE_URL, JWT_SECRET, WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, RAZORPAY_KEY
 * 실행: node api-server.js (포트 4000)
 */

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const Ajv = require("ajv");
const fs = require("fs");

const { generateMealPlan, validateTargetWeight } = require("./meal-plan-engine");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const ajv = new Ajv({ allErrors: true });
const schema = JSON.parse(fs.readFileSync("./schema.json", "utf-8"));

function validate(defName, payload) {
  const v = ajv.compile(schema.definitions[defName]);
  const ok = v(payload);
  return ok ? null : v.errors;
}

// ───────── Auth middleware ─────────
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "no_token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "bad_token" });
  }
}

// ───────── 1. POST /leads (랜딩 폼) ─────────
app.post("/api/leads", async (req, res) => {
  const { phone_e164, source, utm_source, utm_campaign, consent_whatsapp } = req.body;
  const errors = validate("Lead", req.body);
  if (errors) return res.status(400).json({ errors });

  const { rows } = await pool.query(
    `INSERT INTO leads (phone_e164, source, utm_source, utm_campaign, consent_whatsapp)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [phone_e164, source, utm_source, utm_campaign, consent_whatsapp]
  );

  // WhatsApp 템플릿 1 발송 트리거 (whatsapp-templates.md)
  await sendWhatsAppTemplate(phone_e164, "welcome_plan_link", [
    "there",
    `https://thalifit.app/onboard?lead=${rows[0].id}`,
  ]);

  res.status(201).json(rows[0]);
});

// ───────── 2. OTP 발송/검증 (onboarding-flow.md Screen 2) ─────────
app.post("/api/auth/otp/send", async (req, res) => {
  const { phone_e164 } = req.body;
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  // Redis에 5분 TTL로 저장 (간소화: in-memory)
  otpStore.set(phone_e164, { otp, exp: Date.now() + 300000 });
  await sendWhatsAppOTP(phone_e164, otp);
  res.json({ sent: true });
});

const otpStore = new Map();

app.post("/api/auth/otp/verify", async (req, res) => {
  const { phone_e164, otp } = req.body;
  const record = otpStore.get(phone_e164);
  if (!record || record.otp !== otp || record.exp < Date.now())
    return res.status(401).json({ error: "invalid_otp" });
  otpStore.delete(phone_e164);

  // 기존 user 또는 신규 생성
  let { rows } = await pool.query(`SELECT * FROM users WHERE phone_e164=$1`, [phone_e164]);
  if (rows.length === 0) {
    rows = (
      await pool.query(
        `INSERT INTO users (phone_e164) VALUES ($1) RETURNING *`,
        [phone_e164]
      )
    ).rows;
  }
  const token = jwt.sign({ id: rows[0].id, phone: phone_e164 }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.json({ token, user: rows[0] });
});

// ───────── 3. PATCH /users/me (Screen 1, 3) ─────────
app.patch("/api/users/me", requireAuth, async (req, res) => {
  const { name, city, language } = req.body;
  const { rows } = await pool.query(
    `UPDATE users SET name=COALESCE($1,name), city=COALESCE($2,city), language=COALESCE($3,language), updated_at=NOW()
     WHERE id=$4 RETURNING *`,
    [name, city, language, req.user.id]
  );
  res.json(rows[0]);
});

// ───────── 4. POST /users/me/health-profile (Screen 4–7 합산) ─────────
app.post("/api/users/me/health-profile", requireAuth, async (req, res) => {
  const body = { ...req.body, user_id: req.user.id };
  const errors = validate("HealthProfile", body);
  if (errors) return res.status(400).json({ errors });

  const guard = validateTargetWeight(body);
  if (!guard.ok) return res.status(422).json({ error: guard.message, adjusted: guard.adjustedTarget });

  const { rows } = await pool.query(
    `INSERT INTO health_profiles (user_id, gender, age, height_cm, weight_kg, waist_cm, diet_type, religion_filter, region, conditions, goal, target_weight_kg)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     ON CONFLICT (user_id) DO UPDATE SET
       gender=EXCLUDED.gender, age=EXCLUDED.age, height_cm=EXCLUDED.height_cm, weight_kg=EXCLUDED.weight_kg,
       waist_cm=EXCLUDED.waist_cm, diet_type=EXCLUDED.diet_type, religion_filter=EXCLUDED.religion_filter,
       region=EXCLUDED.region, conditions=EXCLUDED.conditions, goal=EXCLUDED.goal, target_weight_kg=EXCLUDED.target_weight_kg,
       updated_at=NOW()
     RETURNING *`,
    [
      req.user.id, body.gender, body.age, body.height_cm, body.weight_kg, body.waist_cm,
      body.diet_type, body.religion_filter, body.region, body.conditions, body.goal, body.target_weight_kg,
    ]
  );
  res.status(201).json(rows[0]);
});

// ───────── 5. POST /users/me/meal-plans/generate (Screen 8) ─────────
app.post("/api/users/me/meal-plans/generate", requireAuth, async (req, res) => {
  const profileQ = await pool.query(`SELECT * FROM health_profiles WHERE user_id=$1`, [req.user.id]);
  if (profileQ.rows.length === 0) return res.status(400).json({ error: "no_profile" });
  const profile = profileQ.rows[0];

  const foodsQ = await pool.query(`SELECT * FROM food_items`);
  const startDate = new Date().toISOString().slice(0, 10);

  const plan = generateMealPlan({
    userId: req.user.id,
    profile,
    foodItems: foodsQ.rows,
    startDate,
  });

  // DB 저장
  await pool.query(
    `INSERT INTO meal_plans (id, user_id, start_date, duration_days, target_kcal, carb_pct, protein_pct, fat_pct)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [plan.id, plan.user_id, plan.start_date, plan.duration_days, plan.target_kcal,
     plan.macro_split.carb_pct, plan.macro_split.protein_pct, plan.macro_split.fat_pct]
  );
  for (const day of plan.days) {
    const dayId = uuid();
    await pool.query(
      `INSERT INTO meal_plan_days (id, plan_id, day_index) VALUES ($1,$2,$3)`,
      [dayId, plan.id, day.day_index]
    );
    for (const meal of day.meals) {
      for (let i = 0; i < meal.items.length; i++) {
        const it = meal.items[i];
        await pool.query(
          `INSERT INTO meal_plan_items (day_id, slot, food_id, qty, unit, display_order)
           VALUES ($1,$2,$3,$4,$5,$6)`,
          [dayId, meal.slot, it.food_id, it.qty, it.unit, i]
        );
      }
    }
  }
  res.status(201).json(plan);
});

// ───────── 6. POST /users/me/thali-logs (일일 기록) ─────────
app.post("/api/users/me/thali-logs", requireAuth, async (req, res) => {
  const { log_date, slot, items, adherence } = req.body;
  const logId = uuid();
  await pool.query(
    `INSERT INTO thali_logs (id, user_id, log_date, slot, adherence) VALUES ($1,$2,$3,$4,$5)`,
    [logId, req.user.id, log_date, slot, adherence || "matched_plan"]
  );
  for (const it of items) {
    await pool.query(
      `INSERT INTO thali_log_items (log_id, food_id, qty, unit) VALUES ($1,$2,$3,$4)`,
      [logId, it.food_id, it.qty, it.unit]
    );
  }
  res.status(201).json({ id: logId });
});

// ───────── 7. GET /food-items (검색) ─────────
app.get("/api/food-items", async (req, res) => {
  const { search, diet_tag, region } = req.query;
  let q = `SELECT * FROM food_items WHERE 1=1`;
  const params = [];
  if (search) {
    params.push(`%${search}%`);
    q += ` AND (name_en ILIKE $${params.length} OR name_hi ILIKE $${params.length})`;
  }
  if (diet_tag) {
    params.push(diet_tag);
    q += ` AND $${params.length} = ANY(diet_tags)`;
  }
  if (region) {
    params.push(region);
    q += ` AND (region = $${params.length} OR region = 'pan_indian')`;
  }
  q += ` LIMIT 50`;
  const { rows } = await pool.query(q, params);
  res.json(rows);
});

// ───────── 8. WhatsApp webhook (응답 수신) ─────────
app.post("/api/whatsapp/webhook", async (req, res) => {
  const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!msg) return res.sendStatus(200);
  const from = msg.from;
  const text = msg.text?.body?.trim();

  // 템플릿 3 응답 처리 (whatsapp-templates.md)
  if (text === "1" || text === "3") {
    const { rows } = await pool.query(`SELECT id FROM users WHERE phone_e164=$1`, ["+" + from]);
    if (rows.length) {
      await pool.query(
        `INSERT INTO thali_logs (id, user_id, log_date, slot, adherence)
         VALUES (gen_random_uuid(), $1, CURRENT_DATE, 'lunch', $2)`,
        [rows[0].id, text === "1" ? "matched_plan" : "skipped"]
      );
    }
  }
  res.sendStatus(200);
});

// ───────── WhatsApp 헬퍼 ─────────
async function sendWhatsAppTemplate(phone, templateName, vars) {
  const fetch = (await import("node-fetch")).default;
  return fetch(
    `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone.replace("+", ""),
        type: "template",
        template: {
          name: templateName,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: vars.map((v) => ({ type: "text", text: v })),
            },
          ],
        },
      }),
    }
  );
}
async function sendWhatsAppOTP(phone, otp) {
  return sendWhatsAppTemplate(phone, "otp_verification", [otp]);
}

app.listen(4000, () => console.log("ThaliFit API on :4000"));
