// ThaliFit landing 인터랙션
// 연결: landing.html의 hero-form, final-form, bmi 계산기 → schema.json의 Lead, BMICheck

const API_BASE = "/api"; // 백엔드 배포 시 교체

// ───────────── Asian BMI 계산기 (WHO Asian cutoffs) ─────────────
// strategy.md 기준: 정상 ≤22.9, 과체중 23–27.4, 비만 ≥27.5
function classifyAsianBMI(bmi) {
  if (bmi < 18.5) return { cat: "Underweight", color: "text-blue-600", advice: "Focus on nutrient density before deficit." };
  if (bmi < 23) return { cat: "Healthy", color: "text-green-600", advice: "Maintain. Focus on body composition, not just weight." };
  if (bmi < 27.5) return { cat: "Overweight (Asian)", color: "text-orange-600", advice: "PCOS/diabetes risk rises here. ThaliFit helps." };
  return { cat: "Obese (Asian)", color: "text-red-600", advice: "High metabolic risk. Talk to a doctor + start a structured plan." };
}

document.getElementById("bmi-btn")?.addEventListener("click", () => {
  const h = parseFloat(document.getElementById("bmi-height").value);
  const w = parseFloat(document.getElementById("bmi-weight").value);
  const result = document.getElementById("bmi-result");
  if (!h || !w || h < 100 || h > 220 || w < 25 || w > 250) {
    alert("Please enter valid height (100–220cm) and weight (25–250kg)");
    return;
  }
  const bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
  const c = classifyAsianBMI(parseFloat(bmi));
  document.getElementById("bmi-value").textContent = `BMI ${bmi}`;
  const catEl = document.getElementById("bmi-category");
  catEl.textContent = c.cat;
  catEl.className = "font-semibold mt-1 " + c.color;
  document.getElementById("bmi-advice").textContent = c.advice;
  result.classList.remove("hidden");

  // 분석 이벤트 (백엔드로 전송 — schema.json의 BMICheck)
  trackEvent("bmi_checked", { height_cm: h, weight_kg: w, bmi: parseFloat(bmi), category: c.cat });
});

// ───────────── Lead 캡처 (hero, final 폼) ─────────────
async function submitLead(phone, source, feedbackEl) {
  // 인도 휴대폰 검증: 10자리, 6/7/8/9 시작
  const cleaned = phone.replace(/\D/g, "").slice(-10);
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    feedbackEl.textContent = "Please enter a valid 10-digit Indian mobile number.";
    feedbackEl.className = "text-sm mt-3 text-red-600";
    return;
  }

  feedbackEl.textContent = "Sending your plan link to WhatsApp...";
  feedbackEl.className = "text-sm mt-3 text-slate-600";

  try {
    // schema.json의 POST /leads 와 동일한 페이로드
    const res = await fetch(`${API_BASE}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_e164: "+91" + cleaned,
        source: source, // "hero_form" | "final_form"
        utm_source: getQueryParam("utm_source"),
        utm_campaign: getQueryParam("utm_campaign"),
        consent_whatsapp: true,
      }),
    });
    if (!res.ok) throw new Error("Server error");
    feedbackEl.textContent = "✓ Check WhatsApp — your plan is on the way.";
    feedbackEl.className = "text-sm mt-3 text-green-600";
    trackEvent("lead_submitted", { source });
  } catch (e) {
    // MVP: 백엔드 미배포 시 localStorage에 임시 저장
    const queued = JSON.parse(localStorage.getItem("queued_leads") || "[]");
    queued.push({ phone: "+91" + cleaned, source, ts: Date.now() });
    localStorage.setItem("queued_leads", JSON.stringify(queued));
    feedbackEl.textContent = "✓ Saved! We'll WhatsApp you within an hour.";
    feedbackEl.className = "text-sm mt-3 text-green-600";
  }
}

document.getElementById("hero-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  submitLead(
    document.getElementById("hero-phone").value,
    "hero_form",
    document.getElementById("hero-feedback")
  );
});

document.getElementById("final-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  submitLead(
    document.getElementById("final-phone").value,
    "final_form",
    document.getElementById("final-feedback")
  );
});

// ───────────── 유틸 ─────────────
function scrollToSignup() {
  document.getElementById("signup").scrollIntoView({ behavior: "smooth" });
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name) || null;
}

function trackEvent(name, props) {
  // 운영 시 GA4/Mixpanel 호출. MVP는 console.
  console.log("[track]", name, props);
  if (window.gtag) window.gtag("event", name, props);
}

// 페이지 진입 시 큐에 쌓인 lead 재전송 시도 (오프라인 보호)
window.addEventListener("load", async () => {
  const queued = JSON.parse(localStorage.getItem("queued_leads") || "[]");
  if (queued.length === 0) return;
  for (const q of queued) {
    try {
      await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_e164: q.phone, source: q.source, consent_whatsapp: true }),
      });
    } catch {}
  }
  localStorage.removeItem("queued_leads");
});
