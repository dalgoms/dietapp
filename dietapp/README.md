# ThaliFit

> Diets built for India's thali, not America's plate.

인도 도시 여성·당뇨인 대상 condition-aware 식단·대사관리 모바일 앱.
Roti·katori 단위 입력, PCOS/T2D/갑상선별 맞춤 plan, WhatsApp 코칭.

---

## 📂 폴더 구조

```
thalifit/
├── 01-strategy/       전략·메시징·로드맵
├── 02-product/        온보딩·식단 엔진·식품 DB
├── 03-engineering/    랜딩·API·DB 설계·스키마
├── 04-content/        WhatsApp 템플릿
├── 05-business/       제안서·재무·운영·파트너십
├── 06-meeting/        미팅용 자료
└── docs/              README 외 보조 문서
```

---

## 🗺️ 파일 인덱스 (24개)

### 01-strategy/
- `strategy.md` — 시장·ICP·차별화·MVP 범위·수익화·GTM·KPI
- `messaging.md` — 브랜드 보이스, ICP별 메시지, 랜딩 카피
- `roadmap.md` — 12주 실행 로드맵 + 예산 + 고용 리스트

### 02-product/
- `onboarding-flow.md` — 가입 8단계 화면 설계
- `meal-plan-engine.js` — 식단 생성 알고리즘 (룰 기반)
- `food-seed.json` — 음식 DB 시드 50건 (NIN 기반)

### 03-engineering/
- `landing.html` — 랜딩 페이지
- `app.js` — 랜딩 인터랙션 + Asian BMI 계산기
- `api-server.js` — Express 백엔드 스켈레톤
- `schema.json` — API 입출력 JSON 스키마
- `db-design.md` — PostgreSQL 테이블 설계

### 04-content/
- `whatsapp-templates.md` — WhatsApp 템플릿 8종 + 비용 추정

### 05-business/
- `proposal.md` — 투자자용 제안서 (15장 구성, 백업)
- `one-pager.md` — 한 장 요약
- `faq.md` — 예상 질문 + 반박 답변
- `operations-plan.md` — 운영방안·RACI·KPI·컴플라이언스
- `financial-model.md` — 3개년 재무 모델

### 06-meeting/ (미팅 메인 자료)
- `engagement-proposal.md` — 협업 제안 (본인 역할)
- `end-to-end-walkthrough.md` — Day 0 → Month 18 운영 시나리오
- `operating-model.md` — 공동 운영 거버넌스
- `partnership-terms.md` — 3가지 협업 옵션 (지분·자본 구조)
- `risk-register.md` — 15개 리스크 + 담당자
- `meeting-flow.md` — 60분 대화형 미팅 흐름
- `meeting-script.md` — 30분 발표형 스크립트 (백업)

---

## 🎯 미팅 사용 가이드

**미팅 메인 자료:** `06-meeting/` 6개 파일

**미팅 후 leave-behind:** 나머지 18개 파일 (요청 시 송부)

**상황별 시작점:**
- 미팅 준비 → `06-meeting/meeting-flow.md`
- 협업 제안 → `06-meeting/engagement-proposal.md`
- 운영 시나리오 → `06-meeting/end-to-end-walkthrough.md`
- 시장·전략 질문 → `01-strategy/strategy.md`
- 기술 깊이 질문 → `03-engineering/db-design.md` + `02-product/meal-plan-engine.js`
- 자금·재무 질문 → `05-business/financial-model.md`

---

## 🛠️ 빠른 실행 (개발 시작 시)

### 1. 백엔드 구동
```bash
cd 03-engineering
npm install express cors pg jsonwebtoken uuid ajv node-fetch
# .env 파일에 DATABASE_URL, JWT_SECRET 등 설정
node api-server.js
```

### 2. DB 마이그레이션
`03-engineering/db-design.md`의 SQL을 PostgreSQL에 순서대로 실행:
1. users → 2. health_profiles → 3. food_items → 4. meal_plans 계열 → 5. thali_logs → 6. leads → 7. subscriptions → 8. bmi_checks

### 3. 식품 DB 시드
```bash
# food-seed.json을 food_items 테이블에 INSERT
node scripts/seed-foods.js  # 별도 작성 필요
```

### 4. 랜딩 배포
`03-engineering/landing.html` + `app.js` → Vercel 또는 Netlify

---

## 📜 라이센스

Private · 본 저장소는 사업 검토 목적의 비공개 자료입니다.

## ✍️ Author

[본인 이름] · [이메일]
