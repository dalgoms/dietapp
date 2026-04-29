# ThaliFit 앱 온보딩 플로우 (8 screens)

## 목표
- WhatsApp 링크 클릭 후 2분 내 첫 식단 받기
- `health_profiles` 모든 필수 필드 채우기 (schema.json)
- 이탈 지점마다 WhatsApp nudge 트리거

## 디자인 원칙
- 1 화면 = 1 질문 (인지 부하 최소화)
- 진행 바 항상 표시 (1/8 ~ 8/8)
- 뒤로가기 가능, 데이터 자동 저장
- 영어/힌디 토글 항상 우상단

---

## Screen 1 — Language pick
**Question:** Choose your language
**UI:** 큰 버튼 2개
**Options:** `English` / `हिन्दी`
**API:** none (localStorage)
**Field saved:** `users.language`

---

## Screen 2 — Phone OTP
**Question:** Enter your WhatsApp number
**UI:** +91 prefix 고정 + 10자리 입력 + "Send OTP" 버튼 → OTP 6자리 입력
**Validation:** `/^[6-9]\d{9}$/`
**API:** `POST /auth/otp/send` → `POST /auth/otp/verify`
**Output:** JWT 발급, `users` row 생성
**Drop-off mitigation:** OTP 미입력 5분 → WhatsApp 템플릿 2 발송

---

## Screen 3 — Name + city
**Question:** What should we call you?
**UI:** 이름 input + 도시 dropdown (Mumbai, Delhi, Bangalore, Pune, Hyderabad, Other)
**API:** `PATCH /users/me` (name, city)
**Field saved:** `users.name`, `users.city`

---

## Screen 4 — Goal
**Question:** What brings you here?
**UI:** 카드 5개 (1개 선택)
- 🎯 Lose weight
- ⚖️ Maintain weight
- 🌸 Manage PCOS
- 🩺 Manage diabetes
- 💍 Pre-wedding glow-up

**Field saved:** `health_profiles.goal`
**Logic:** PCOS/diabetes 선택 시 Screen 7 conditions에 자동 체크

---

## Screen 5 — Body stats
**Question:** Let's set the baseline
**UI:** 4 input
- Gender: female / male / other
- Age: number
- Height: cm slider (140–200)
- Current weight: kg slider (35–150)
- Target weight: kg slider (자동 추천: 현재 체중 - 5kg)
- Waist (optional): cm

**Validation:** 모두 schema.json HealthProfile 범위 내
**Field saved:** `health_profiles.gender, age, height_cm, weight_kg, waist_cm, target_weight_kg`

**Inline result:** "Your Asian BMI: 26.4 (Overweight). 8kg loss in 12 weeks is realistic."
(meal-plan-engine.js의 BMI + 안전 감량률 계산 사용)

---

## Screen 6 — Diet preferences
**Question:** What's on your plate?
**UI:** 2-step
- Step 1: Diet type (1개 선택) — Vegetarian / Non-vegetarian / Eggetarian / Jain / Vegan
- Step 2: Region (1개 선택) — North / South / East / West / Central
- Step 3 (조건부): Non-veg 선택 시 → Halal / No beef / No pork / No restriction

**Field saved:** `health_profiles.diet_type, religion_filter, region`

---

## Screen 7 — Health conditions
**Question:** Anything we should know about?
**UI:** 체크박스 multi-select
- ☐ PCOS / PCOD
- ☐ Type 2 diabetes
- ☐ Pre-diabetes
- ☐ Hypothyroid
- ☐ Hypertension
- ☐ None of these

**Inline disclaimer:** "ThaliFit isn't medical advice. Talk to your doctor."

**Field saved:** `health_profiles.conditions[]`

---

## Screen 8 — Plan generated
**State 1 (loading 3초):** "Building your thali plan..."
**State 2 (완료):**
- "Here's your week, {{name}} 🎉"
- Day 1 미리보기 카드 (Breakfast / Lunch / Dinner with kcal)
- "Full 7-day plan" 버튼 → 메인 앱 진입
- "Get on WhatsApp" 토글 ON (default) → daily reminder 활성

**API:**
1. `POST /users/me/health-profile` (body: Screen 4–7 합산)
2. `POST /users/me/meal-plans/generate` → MealPlan 반환 (meal-plan-engine.js 호출)
3. WhatsApp 템플릿 1 발송

**Field saved:** `meal_plans` row + `meal_plan_days` 7개 + `meal_plan_items` 약 35개

---

## 이탈 분석 (analytics 이벤트)
| 이벤트 | 트리거 | KPI |
|---|---|---|
| `onboarding_started` | Screen 1 진입 | 100% |
| `phone_verified` | Screen 2 완료 | ≥80% |
| `goal_picked` | Screen 4 완료 | ≥75% |
| `body_filled` | Screen 5 완료 | ≥70% |
| `plan_generated` | Screen 8 도달 | ≥60% |

각 이벤트는 `bmi_checks` 테이블 패턴으로 별도 `events` 테이블에 적재 (db-design.md 확장).

## Drop-off WhatsApp nudge
- Screen 2 미완료 5분 → 템플릿 2
- Screen 5 미완료 1시간 → 템플릿 2 (variant)
- Screen 8 미도달 24시간 → 템플릿 6 (re-engagement)
