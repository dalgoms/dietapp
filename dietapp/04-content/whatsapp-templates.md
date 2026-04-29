# ThaliFit WhatsApp Business API 템플릿

## 운영 원칙
- **Utility 템플릿** (트랜잭션·리마인더): 사용자 행동 후 24시간 내 발송, 비용 저렴
- **Marketing 템플릿** (프로모션·재참여): 사전 동의 필수, 비용 높음, 발송량 제한
- 모든 템플릿은 Meta Business Manager에서 사전 승인 필요 (보통 24~48시간)
- 변수는 `{{1}}, {{2}}` 식으로 정의, 영양사 검수 후 발송

## 1. WELCOME (Utility) — lead 생성 직후
**Template name:** `welcome_plan_link`
**Category:** Utility
**Body:**
```
Hi {{1}}! 👋 Welcome to ThaliFit.
Your free 7-day plan is ready: {{2}}
Tap the link, finish a 2-min onboarding, and your first thali shows up tonight.
Reply HELP anytime.
```
**Variables:** `{{1}}` = first name, `{{2}}` = onboarding URL
**Trigger:** `POST /leads` 성공 → `leads.created_at + 60초`

## 2. ONBOARDING NUDGE (Utility) — 1시간 미완료 시
**Template name:** `onboarding_nudge_1h`
**Category:** Utility
**Body:**
```
{{1}}, your plan is half-baked 🍳
Just 4 questions left — your goal, height, weight, food prefs.
Finish here: {{2}}
```
**Trigger:** lead 생성 후 1시간 경과 + `health_profiles` row 없음

## 3. DAILY MEAL REMINDER (Utility) — 매일 식사 시간
**Template name:** `daily_meal_reminder`
**Category:** Utility
**Body:**
```
🍽️ {{1}} time, {{2}}!
Today's plan: {{3}}
Reply with the number when eaten:
1️⃣ Followed plan
2️⃣ Swapped something
3️⃣ Skipped
```
**Variables:** `{{1}}` = "Breakfast"/"Lunch"/"Dinner", `{{2}}` = name, `{{3}}` = "2 besan chilla + 1 katori curd"
**Trigger:** Premium 사용자, 사용자 시간대 기준 07:30 / 13:00 / 19:30

## 4. PROGRESS CHECK (Utility) — 매주 일요일
**Template name:** `weekly_progress`
**Category:** Utility
**Body:**
```
📊 Your week, {{1}}:
• Meals logged: {{2}}/21
• Plan adherence: {{3}}%
• Weight change: {{4}} kg

{{5}}

Full report: {{6}}
```
**Variables:** `{{5}}` = 영양사 1줄 코멘트 ("Solid week. Add 1 katori dal at lunch next week."), `{{6}}` = report URL

## 5. SWAP SUGGESTION (Utility) — 사용자가 "2"(swap) 응답 시
**Template name:** `swap_suggestion`
**Category:** Utility
**Body:**
```
Got it 👍 What did you eat instead?
Reply with the food (e.g. "2 paratha + curd") and I'll log it for you.
```
**Trigger:** 템플릿 3 응답이 "2"

## 6. RE-ENGAGEMENT (Marketing) — 3일 미접속
**Template name:** `reengagement_3day`
**Category:** Marketing
**Body:**
```
Hi {{1}}, your thali misses you 🥘
Last log: {{2}} days ago.
Your plan is still waiting — pick up where you left off: {{3}}
```
**Compliance:** opt-in한 사용자만, 월 1회 한도

## 7. PAYMENT REMINDER (Utility) — 갱신 3일 전
**Template name:** `payment_reminder`
**Category:** Utility
**Body:**
```
{{1}}, your ThaliFit Premium renews on {{2}} for ₹{{3}}.
Pay via UPI: {{4}}
Need to cancel? Reply STOP.
```

## 8. FESTIVAL CHECK-IN (Marketing) — 디왈리/홀리 등
**Template name:** `festival_diwali_2026`
**Category:** Marketing
**Body:**
```
Happy Diwali, {{1}}! 🪔
Festival foods are part of life — we don't say "don't eat".
Today's swap: 1 gulab jamun = skip evening chai sugar. Balance, not ban.
See full festival guide: {{2}}
```

---

## 발송 빈도 가드레일
| 사용자 상태 | 일 최대 메시지 | 주 최대 |
|---|---|---|
| Free (active) | 1 | 4 |
| Premium (active) | 3 | 14 |
| Premium (inactive 7d+) | 0 | 1 (re-engagement) |
| 결제 미갱신 | 1 (payment) | 2 |

## 응답 처리 매핑 (api-server.js의 webhook)
- `1` → `thali_logs.adherence = matched_plan`
- `2` → 템플릿 5 발송, 자유 응답 대기
- `3` → `thali_logs.adherence = skipped`
- `STOP` → `users.subscription_tier = free`, marketing opt-out
- `HELP` → 영업시간 응답 약속 메시지

## 비용 추정 (Meta 인도 가격 2026 기준)
- Utility: ₹0.115/건
- Marketing: ₹0.78/건
- Premium 사용자 1명 월 평균 90 utility + 4 marketing = ₹13.5/월
- LTV 대비 1% 미만 → safe
