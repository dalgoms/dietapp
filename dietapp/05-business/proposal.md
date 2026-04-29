# ThaliFit
## Diets built for India's thali, not America's plate.

**Confidential Proposal | 2026 Q2 | Pre-Seed Round**
**Prepared for:** [상대방 이름 / 기관명]
**Prepared by:** [본인 이름], Founder & CEO
**Meeting date:** [YYYY-MM-DD]

---

## 페이지 1 — Cover

> "인도인 1억 명이 당뇨이고, 여성 5명 중 1명이 PCOS다.
> 그런데 그들은 아직도 'cup of rice'로 음식을 측정하는 미국 앱을 쓴다."

ThaliFit은 인도식 식단 단위(roti, katori)와 인도 대사질환 컨텍스트(PCOS, T2D, 갑상선)에 맞춰 설계된 인도 최초의 condition-aware diet app입니다.

---

## 페이지 2 — Executive Summary

| 항목 | 내용 |
|---|---|
| **What** | 인도 도시 여성·당뇨인 대상 식단·대사관리 모바일 앱 |
| **Why now** | PCOS·T2D 시장 폭증 + WhatsApp B2C 인프라 성숙 + UPI 정착 |
| **Wedge** | thali 단위 입력 + 지역·종교·질환별 식단 + WhatsApp 코칭 |
| **Market** | TAM ₹4,800Cr / SAM ₹680Cr / SOM ₹35Cr (3년) |
| **Model** | Freemium · ₹299/월 · ₹1,999/년 (annual 기준 ARPU ₹1,400) |
| **Traction goal** | 12주 후 가입 500, 유료 30, D30 retention 25% |
| **Team** | 비전공자 창업자(본인) + Full-stack 1 + Designer 1 + RD 자문 1 |
| **Ask** | ₹1.5 Cr (약 24억 원) Pre-seed, 18개월 runway |
| **Use of funds** | 엔지니어링 45%, 마케팅 30%, 컨텐츠/RD 15%, 운영 10% |

---

## 페이지 3 — The Insight (왜 지금, 왜 인도)

### 인사이트 1: 인도인은 "thin-fat"이다
- 인도 도시 인구는 BMI가 정상이어도 내장지방·인슐린 저항이 높음
- WHO Asian cutoff: 비만 기준 BMI 27.5 (서구 30 아님)
- 결과: **서구 BMI로 측정하면 30%가 정상, Asian BMI로는 60%가 과체중·비만**

### 인사이트 2: 식단은 못 끊는다
- 로띠·라이스는 인도 가정의 정체성
- "Cut carbs" 다이어트의 인도 retention은 6주 미만 (자체 인터뷰 N=42)
- 진짜 문제는 칼로리가 아니라 **GI(혈당지수)와 macro 균형**

### 인사이트 3: WhatsApp이 채널이다
- 인도 스마트폰 사용자 95%가 WhatsApp 일일 사용
- 푸시 알림 응답률 8% vs WhatsApp 응답률 40%+ (벤치마크)
- 인도에서 healthtech 코칭 채널의 디폴트는 앱이 아닌 **WhatsApp**

**결론:** 미국 앱을 인도화하는 게 아니라, **처음부터 인도용으로 다시 짜야 한다.**

---

## 페이지 4 — The Problem (페인 데이터)

### 4.1 사용자 페인
- "MyFitnessPal에서 'roti' 검색하면 미국식 wrap이 나온다"
- "100g of dal? 우리 집에 저울 없는데?"
- "PCOS 진단받고 의사가 '쌀 줄여' 한 마디 하고 끝"
- "Noom은 ₹3,000/월인데 영어만 됨, 인도 음식 추적 안됨"

### 4.2 시장 페인 (정량)
| 지표 | 수치 | 출처 |
|---|---|---|
| 인도 T2D 환자 | 1.01억 명 | ICMR-INDIAB 2023 |
| PCOS 유병률 (도시 여성) | 22.5% | Indian J Med Res 2024 |
| 헬스앱 사용자 | 1.7억 (2026) | Statista |
| 평균 다이어트 앱 D30 retention (인도) | 4~7% | Sensor Tower |
| 영양사 1인당 인도 인구 | 1:9,000 | IDA 2025 |

### 4.3 경쟁자의 실패 지점
- **MyFitnessPal**: 인도 음식 DB 빈약, 결제 카드 only
- **HealthifyMe**: 인도 1위지만 **다이어트 일반론**, condition-aware 없음
- **Noom**: 영어 only, ₹3,000+/월로 가격 부담

ThaliFit은 HealthifyMe가 **조건별 식단**을 못한다는 점, MyFitnessPal이 **단위·문화**를 못한다는 점을 동시에 공략합니다.

---

## 페이지 5 — The Solution

### 5.1 핵심 기능 (MVP, 12주 빌드)

1. **Onboarding 8 화면** — 키, 몸무게, 종교 식단, 질환을 2분에 수집 (`onboarding-flow.md`)
2. **Asian BMI 분류** — 서구 기준 아님, WHO Asian cutoff 사용
3. **개인화 7일 식단** — 지역(N/S/E/W) × 식단타입(Veg/NV/Jain) × 질환(PCOS/T2D) 매트릭스
4. **Thali 단위 로그** — "2 roti + 1 katori dal" 한 번 탭 (gram 입력 X)
5. **WhatsApp 코칭** — 매일 식사 리마인더 + 응답 기반 자동 로깅 (`whatsapp-templates.md`)
6. **주간 리포트** — adherence + 체중 변화 + RD 코멘트

### 5.2 핵심 알고리즘 (왜 우리만 가능한가)
- Mifflin-St Jeor 기반 BMR + 인도 좌식 계수 1.4
- 질환별 macro: PCOS는 carb 40%·protein 30%, T2D는 GI 60 이하만
- 음식 필터링: diet_type × region × condition → 개인 풀 자동 생성
- (`meal-plan-engine.js`에 모두 구현 완료)

### 5.3 차별화 표
| 항목 | MyFitnessPal | HealthifyMe | Noom | **ThaliFit** |
|---|---|---|---|---|
| Thali 단위 | ❌ | △ | ❌ | ✅ |
| 지역별 식단 | ❌ | △ | ❌ | ✅ (5 region) |
| 질환별 mode | ❌ | ❌ | △ | ✅ (PCOS/T2D/Thyroid) |
| WhatsApp 코칭 | ❌ | ✅ | ❌ | ✅ |
| 힌디 지원 | ❌ | ✅ | ❌ | ✅ |
| UPI 결제 | △ | ✅ | △ | ✅ |
| 가격 (월) | ₹399 | ₹600 | ₹3,000 | **₹299** |

---

## 페이지 6 — Market Sizing

### TAM (Total Addressable Market) — ₹4,800 Cr
- 인도 도시 22~50세 인구 약 16Cr 명
- 그 중 BMI ≥23 또는 PCOS/T2D 진단자 약 4Cr 명
- 연 ARPU ₹1,200 (premium 가정)
- 4Cr × ₹1,200 = ₹4,800 Cr

### SAM (Serviceable Available Market) — ₹680 Cr
- Tier-1·2 도시 + 영어/힌디 가능 + 스마트폰 + 결제 의향
- 약 5,700만 명 → ARPU ₹1,200 = ₹680 Cr

### SOM (3-year) — ₹35 Cr
- 3년 내 30만 가입 × 17% 유료전환 × ARPU ₹1,400 ≈ ₹35 Cr ARR
- SAM의 5%에 해당, 1위 HealthifyMe(약 ₹400 Cr ARR)의 약 9%

**숫자 sanity check:** HealthifyMe가 일반 다이어트로 ₹400 Cr ARR을 만들었다면, **PCOS·T2D만 깊게 파는 우리는 5%면 충분**합니다.

---

## 페이지 7 — Business Model

### 가격 구조
| Tier | 가격 | 포함 |
|---|---|---|
| Free | ₹0 | 7일 샘플 플랜, 기본 로깅 |
| Premium | ₹299/월 or ₹1,999/년 | 무제한 플랜, PCOS/T2D 모드, WhatsApp 코칭, 주간 리포트 |
| Premium+ (v2) | ₹999/월 | RD 채팅, 라이브 Q&A |

연간결제 비중 60% 가정 시 blended ARPU ₹1,400/년.

### Unit Economics (목표)
| 지표 | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| CAC | ₹450 | ₹350 | ₹280 |
| ARPU (annualized) | ₹1,400 | ₹1,500 | ₹1,650 |
| Gross margin | 72% | 78% | 82% |
| Payback period | 6.4개월 | 4.2개월 | 3.0개월 |
| LTV (24개월 retention) | ₹2,016 | ₹2,520 | ₹3,135 |
| **LTV/CAC** | **4.5x** | **7.2x** | **11.2x** |

LTV/CAC > 3 이면 SaaS 펀더블, 우리는 Year 1부터 4.5x입니다.

---

## 페이지 8~15 (요약)

(Phase별 GTM, Roadmap, Team, Financials, Risks, Ask, Why Now, Appendix는 풀버전을 별도 파일로 보관 — 미팅 leave-behind용)

### 페이지 13 — The Ask

- **유형:** Pre-seed (CCD 또는 SAFE)
- **금액:** ₹1.5 Cr
- **밸류에이션:** ₹12 Cr post-money (12.5% dilution)
- **Runway:** 18개월
- **Lead 희망:** ₹75L+ 1명 + 동반 ₹15~25L 3~5명

### 페이지 15 — Appendix

미팅 후 요청 시 별도 송부:
- A1. 사용자 인터뷰 raw transcripts (N=42)
- A2. 경쟁사 funnel 분석
- A3. 음식 DB 시드 50건 (`food-seed.json`)
- A4. 제품 와이어프레임 8 화면 (`onboarding-flow.md`)
- A5. 식단 엔진 알고리즘 (`meal-plan-engine.js`)
- A6. WhatsApp 템플릿 8종 (`whatsapp-templates.md`)
- A7. DB 스키마 (`db-design.md`)
- A8. 12주 운영 로드맵 (`roadmap.md`)
- A9. 3개년 재무 모델 (`financial-model.md`)
- A10. 운영 거버넌스 + RACI (`operations-plan.md`)
