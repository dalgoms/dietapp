/**
 * ThaliFit 식단 생성 엔진
 * 입력: HealthProfile (schema.json), foodItems (food-seed.json)
 * 출력: MealPlan (schema.json)
 *
 * 호출처: api-server.js의 POST /users/:id/meal-plans/generate
 * 전략: 룰 기반 (LLM 의존 없음, 결정론적, 영양사 검수 가능)
 */

const { v4: uuid } = require("uuid");

// ───────── 1. BMR / TDEE / 목표 칼로리 ─────────
function calcBMR({ gender, age, height_cm, weight_kg }) {
  // Mifflin-St Jeor
  const base = 10 * weight_kg + 6.25 * height_cm - 5 * age;
  return gender === "female" ? base - 161 : base + 5;
}

function calcTargetKcal(profile) {
  const bmr = calcBMR(profile);
  const tdee = bmr * 1.4; // 도시 좌식 가정 (운동 트래킹 v2)
  switch (profile.goal) {
    case "weight_loss":
    case "pre_wedding":
      return Math.round(tdee - 500); // 0.5kg/주 감량
    case "manage_pcos":
      return Math.round(tdee - 350); // 인슐린 저항 고려, 완만한 deficit
    case "manage_diabetes":
      return Math.round(tdee - 300); // 혈당 변동 줄이기 우선
    case "weight_maintain":
    default:
      return Math.round(tdee);
  }
}

// ───────── 2. 매크로 비율 (조건별) ─────────
function getMacroSplit(profile) {
  const conditions = profile.conditions || [];
  if (conditions.includes("pcos")) return { carb_pct: 40, protein_pct: 30, fat_pct: 30 };
  if (conditions.includes("type2_diabetes") || conditions.includes("prediabetes"))
    return { carb_pct: 45, protein_pct: 25, fat_pct: 30 };
  if (conditions.includes("hypothyroid")) return { carb_pct: 50, protein_pct: 25, fat_pct: 25 };
  return { carb_pct: 55, protein_pct: 20, fat_pct: 25 }; // 기본 weight_loss
}

// ───────── 3. 음식 필터 ─────────
function filterFoods(foodItems, profile) {
  const conditions = profile.conditions || [];
  const dietTagMap = {
    vegetarian: ["veg", "jain_safe"],
    vegan: ["vegan"],
    jain: ["jain_safe"],
    eggetarian: ["veg", "jain_safe", "egg"],
    non_vegetarian: ["veg", "non_veg", "egg"],
  };
  const allowed = dietTagMap[profile.diet_type] || ["veg"];

  return foodItems.filter((f) => {
    // 종교 필터
    if (profile.religion_filter === "no_beef" && f.name_en.toLowerCase().includes("beef")) return false;
    if (profile.religion_filter === "no_pork" && f.name_en.toLowerCase().includes("pork")) return false;
    // 식단 타입
    const tagMatch = f.diet_tags.some((t) => allowed.includes(t));
    if (!tagMatch) return false;
    // 조건별 GI 컷오프
    if (conditions.includes("type2_diabetes") && f.gi != null && f.gi > 60) return false;
    if (conditions.includes("pcos") && !f.pcos_friendly) return false;
    return true;
  });
}

// ───────── 4. 슬롯별 칼로리 분배 ─────────
const SLOT_DISTRIBUTION = {
  breakfast: 0.25,
  mid_morning: 0.05,
  lunch: 0.30,
  evening_snack: 0.10,
  dinner: 0.30,
};

// ───────── 5. 슬롯별 음식 카테고리 규칙 ─────────
const SLOT_RULES = {
  breakfast: ["grain", "dal", "dairy", "snack"],
  mid_morning: ["beverage", "snack"],
  lunch: ["grain", "dal", "sabzi", "dairy"],
  evening_snack: ["snack", "beverage"],
  dinner: ["grain", "sabzi", "dal"],
};

// ───────── 6. 슬롯 빌더 ─────────
function buildSlot(slot, slotKcal, foods, region, dayIndex) {
  const rules = SLOT_RULES[slot];
  const candidates = foods.filter((f) => rules.includes(f.category));
  // 지역 가중치: 같은 region 우선
  const ranked = candidates.sort((a, b) => {
    const aScore = a.region === region ? 1 : a.region === "pan_indian" ? 0.5 : 0;
    const bScore = b.region === region ? 1 : b.region === "pan_indian" ? 0.5 : 0;
    // dayIndex로 라운드 로빈하여 다양성 확보
    return bScore + ((b.id?.charCodeAt(0) || 0) % (dayIndex + 1)) - aScore;
  });

  const items = [];
  let kcalLeft = slotKcal;
  const usedCats = new Set();

  for (const f of ranked) {
    if (kcalLeft <= 30) break;
    if (usedCats.has(f.category)) continue;
    const needed = Math.max(1, Math.round(kcalLeft / f.kcal_per_unit));
    const qty = Math.min(needed, slot === "breakfast" || slot === "lunch" || slot === "dinner" ? 3 : 1);
    items.push({
      food_id: f.id,
      name_en: f.name_en,
      name_hi: f.name_hi,
      qty,
      unit: f.default_unit,
      kcal: Math.round(f.kcal_per_unit * qty),
    });
    kcalLeft -= f.kcal_per_unit * qty;
    usedCats.add(f.category);
    if (items.length >= 3) break;
  }
  return items;
}

// ───────── 7. 메인 ─────────
function generateMealPlan({ userId, profile, foodItems, startDate }) {
  const target_kcal = calcTargetKcal(profile);
  const macro = getMacroSplit(profile);
  const eligibleFoods = filterFoods(foodItems, profile);

  if (eligibleFoods.length < 10) {
    throw new Error("Not enough foods match this profile. Relax filters or expand DB.");
  }

  const days = [];
  for (let d = 1; d <= 7; d++) {
    const meals = Object.keys(SLOT_DISTRIBUTION).map((slot) => {
      const slotKcal = Math.round(target_kcal * SLOT_DISTRIBUTION[slot]);
      return {
        slot,
        items: buildSlot(slot, slotKcal, eligibleFoods, profile.region, d),
      };
    });
    days.push({ day_index: d, meals });
  }

  return {
    id: uuid(),
    user_id: userId,
    start_date: startDate,
    duration_days: 7,
    target_kcal,
    macro_split: macro,
    days,
  };
}

// ───────── 8. 안전 감량률 가드 ─────────
function validateTargetWeight(profile) {
  const weeks = 12;
  const safeMaxLossKg = profile.weight_kg * 0.01 * weeks; // 주당 1%
  const proposed = profile.weight_kg - (profile.target_weight_kg || profile.weight_kg);
  if (proposed > safeMaxLossKg) {
    return {
      ok: false,
      message: `Aim for ${safeMaxLossKg.toFixed(1)}kg in 12 weeks max. Faster = unsafe.`,
      adjustedTarget: profile.weight_kg - safeMaxLossKg,
    };
  }
  return { ok: true };
}

module.exports = { generateMealPlan, calcTargetKcal, getMacroSplit, validateTargetWeight, filterFoods };
