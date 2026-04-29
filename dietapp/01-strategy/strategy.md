# ThaliFit — 인도 타겟 다이어트앱 전략 (v0.1)

## 1. 한 줄 정의
"인도식 식단을 끊지 않고도 체중·혈당을 관리하는 모바일 앱"
Indian-first diet & metabolic health app for urban India.

## 2. 시장 진입 가설
- 인도 도시 인구는 BMI가 낮아도 내장지방·인슐린 저항이 높은 "thin-fat" 표현형이 흔함
- MyFitnessPal/Noom 같은 서구 앱은 로띠/달/사브지 단위 추정과 베지/자인/할랄 구분이 약함
- PCOS 유병률(여성 약 20%), Type 2 당뇨 인구 1억+ → "다이어트"가 아닌 "대사질환 식단"이 더 큰 시장

## 3. ICP (Ideal Customer Profile)
**Beachhead (1차):** 22~35세 도시 직장 여성, PCOS / 생리불순 / 5~15kg 감량 목표, 영어+힌디 가능, Tier-1/2 도시 (Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad)
**Secondary (2차):** 30~45세 사전당뇨/당뇨 진단받은 남녀, 의사 권고로 식단 관리 시작
**Tertiary (3차):** 결혼 전 6개월 감량 목표 여성 (시즌성 강함, 마케팅 펀더로 활용)

## 4. 차별화 (Why ThaliFit, not MyFitnessPal)
| 항목 | 서구 앱 | ThaliFit |
|---|---|---|
| 음식 단위 | grams, oz | roti(매), katori(공기), thali |
| 지역 식단 | 일반 | North/South/Bengali/Gujarati 분리 |
| 종교/문화 | 없음 | Veg/Non-veg/Jain/Eggetarian/Halal 필터 |
| 코칭 채널 | 앱 푸시 | WhatsApp 메시지 + 앱 |
| 결제 | 카드 위주 | UPI(PhonePe/GPay) 우선 |
| 언어 | English | English + Hindi (이후 Tamil, Telugu, Bengali) |
| 임상 컨텍스트 | 칼로리 | PCOS/T2D/임신/갑상선 모드 |

## 5. MVP 범위 (12주 빌드)
**Must-have:**
1. 온보딩 — 신체정보(키/몸무게/허리둘레), 목표, 종교/식단 제약, 건강상태(PCOS/당뇨/없음)
2. Asian BMI 기반 분류 (정상 ≤22.9, 과체중 23–27.4, 비만 ≥27.5)
3. 7일 개인화 식단 플랜 (region × diet-type × condition 매트릭스)
4. Thali 단위 일일 기록 — "아침: 2 roti + 1 katori dal + 1 katori sabzi"
5. 주간 진행 리포트 (체중, 허리둘레, plan adherence)
6. WhatsApp Business API로 매일 식사 리마인더

**Won't-have (v1):** 음식 사진 인식, 운동 트래킹, 영양사 1:1 채팅, 웨어러블 연동

## 6. 수익화
- **Free**: 7일 샘플 플랜 1회, 기본 트래킹
- **Premium**: ₹299/월, ₹1,999/년 (annual 44% 할인) — 무제한 플랜 갱신, PCOS/당뇨 전용 플랜, WhatsApp 코칭, 주간 리포트 PDF
- **Premium+ (v2)**: ₹999/월 — 영양사 채팅, 라이브 Q&A
- 결제 게이트웨이: Razorpay (UPI 기본, 카드/넷뱅킹 보조)
- 목표 LTV: ₹1,400 / CAC: ₹350 이하

## 7. GTM
- **Phase 0 (week 0–4):** 랜딩 + waitlist, Instagram PCOS 커뮤니티 시드 100명
- **Phase 1 (week 4–12):** Closed beta, 영양사 인플루언서 5명 시드 (revenue share)
- **Phase 2 (week 12–24):** Open beta + Meta Ads (PCOS, diabetes 키워드), YouTube long-form 협찬
- **Phase 3 (week 24+):** 의사/클리닉 B2B2C 채널 (처방 식단 도구로 포지셔닝)

## 8. 핵심 KPI
- Activation: 가입 후 7일 내 식사 5회 이상 기록 = 35% 목표
- D30 retention: 25% 목표
- Free → Paid 전환: 6% 목표
- WhatsApp 메시지 응답률: 40% 목표

## 9. 리스크 & 대응
- 음식 DB 신뢰도 → 인도 NIN(영양연구소) 데이터 + 영양사 검수
- WhatsApp API 비용 → 마케팅 템플릿 최소화, utility 메시지 위주
- 결제 실패율 → Razorpay + 백업으로 Cashfree
- 언어 확장 비용 → MVP는 EN+HI만, 시장 검증 후 남부 언어 추가
