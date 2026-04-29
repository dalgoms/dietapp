# ThaliFit 3개년 재무 모델

## 가정 (모든 시나리오 공통)

| 변수 | 보수 (Bear) | 기준 (Base) | 낙관 (Bull) |
|---|---|---|---|
| 월 신규 가입 (Month 18) | 8,000 | 15,000 | 28,000 |
| Free → Paid 전환 | 3% | 6% | 9% |
| 연간 retention (Premium) | 50% | 65% | 75% |
| Annual plan 비중 | 40% | 60% | 75% |
| Blended ARPU (annualized) | ₹1,100 | ₹1,400 | ₹1,650 |
| CAC | ₹500 | ₹350 | ₹250 |

이하는 **Base 시나리오** 기준.

---

## P&L 요약 (월간, 18개월)

| Month | New users | Paid (cum) | MRR | COGS | OpEx | Burn |
|---|---|---|---|---|---|---|
| M1 | 100 | 5 | ₹1.5K | ₹2K | ₹2.0L | ₹2.0L |
| M3 | 500 | 30 | ₹9K | ₹5K | ₹2.4L | ₹2.3L |
| M6 | 1,500 | 120 | ₹36K | ₹15K | ₹3.5L | ₹3.1L |
| M9 | 4,000 | 320 | ₹96K | ₹35K | ₹5.0L | ₹3.9L |
| M12 | 8,000 | 700 | ₹2.1L | ₹65K | ₹6.5L | ₹4.4L |
| M15 | 12,000 | 1,500 | ₹4.5L | ₹1.0L | ₹8.0L | ₹3.5L |
| M18 | 15,000 | 2,800 | ₹8.4L | ₹1.5L | ₹10L | ₹1.6L |

**18개월 누적 burn: ₹54L (자본 ₹1.5Cr 중 36%)**
M19부터 break-even 가시권 → Series A 협상에서 강한 위치.

---

## 자본 사용처 (₹1.5Cr, 18개월)

| 항목 | 18M 합계 | 비중 |
|---|---|---|
| Salaries (Eng + Designer + RD + Growth) | ₹68L | 45% |
| Marketing (Ads + Influencer + Content) | ₹45L | 30% |
| Nutrition & Content (RD 자문 + DB 구축 + Writer) | ₹22L | 15% |
| Infra + SaaS + Legal + 예비 | ₹15L | 10% |

---

## 매출 분해 (Month 18, MRR ₹8.4L 기준)

| 구성 | 사용자 수 | ARPU/월 | 매출 |
|---|---|---|---|
| Premium 월간 (40%) | 1,120 | ₹299 | ₹3.35L |
| Premium 연간 (60%, 월환산) | 1,680 | ₹166 | ₹2.79L |
| 상승 추세 미반영 ARPU growth | — | — | ₹2.26L |
| **합계 MRR** | **2,800** | — | **₹8.4L** |

---

## COGS 분해 (Month 18 기준 월 ₹1.5L)

| 항목 | 비용 |
|---|---|
| WhatsApp BSP (Gupshup) | ₹65K |
| AWS (EC2 + RDS + S3) | ₹35K |
| Payment fees (Razorpay 2%) | ₹17K |
| Mixpanel + Sentry + tools | ₹12K |
| Email + SMS 백업 | ₹8K |
| 기타 (스토리지, CDN) | ₹13K |

**Gross margin: ₹8.4L − ₹1.5L = ₹6.9L (82%)**

---

## OpEx 분해 (Month 18, 월 ₹10L)

| 항목 | 비용 |
|---|---|
| Salaries (10명) | ₹6.0L |
| Marketing (Ads + Influencer) | ₹2.5L |
| RD freelance + Content | ₹0.6L |
| Office (co-working 2 desks) | ₹0.3L |
| Legal + 회계 | ₹0.3L |
| 기타 | ₹0.3L |

---

## 시나리오별 18개월 결과

| 시나리오 | M18 Paid | M18 MRR | 18M 누적 burn | M19 상태 |
|---|---|---|---|---|
| **Bear** | 1,400 | ₹3.8L | ₹98L | 추가 burn 필요, Bridge round |
| **Base** | 2,800 | ₹8.4L | ₹54L | Break-even 가시권, Series A ready |
| **Bull** | 5,500 | ₹18L | ₹15L | 즉시 흑자, Series A 협상 우위 |

**의사결정:** Bear 시나리오에서도 ₹1.5Cr로 18개월 생존 가능 → 자본 안전성 검증.

---

## 36개월 hyper view (Base 가정 연장)

| Year | Cum signups | Cum paid (active) | ARR end-of-year | Net | 비고 |
|---|---|---|---|---|---|
| Y1 | 35K | 700 | ₹25L | -₹50L | 펀딩 잔액 ₹1.0Cr |
| Y2 | 250K | 5,000 | ₹84L | -₹15L | Series A close (₹8~12Cr) |
| Y3 | 700K | 18,000 | ₹3Cr | +₹40L | B2B2C 확장, EBITDA+ |

---

## Sensitivity (단일 변수 변화 시 M18 MRR)

| 변수 | -20% | Base | +20% |
|---|---|---|---|
| 월 신규 가입 | ₹6.7L | ₹8.4L | ₹10.1L |
| 유료 전환율 | ₹6.7L | ₹8.4L | ₹10.1L |
| Annual 비중 | ₹8.0L | ₹8.4L | ₹8.8L |
| ARPU | ₹6.7L | ₹8.4L | ₹10.1L |

가장 민감한 변수: **유료 전환율 + 신규 가입**. 그래서 마케팅 ₹45L과 성장팀 채용 우선순위.

---

## Series A 가정 (Month 18~24)

- ARR: ₹84L+ (Month 24)
- 라운드 사이즈: ₹8~12Cr
- Pre-money: ₹40~60Cr
- 희석: 18~22%
- Use: 영업 확장 + B2B2C + iOS + 남부언어

---

## 투자자가 보고 싶어하는 숫자 (요약)

✅ **LTV/CAC > 3** (우리 4.5x Year 1)
✅ **Gross margin > 70%** (우리 82% Y3)
✅ **Payback < 12 months** (우리 6.4개월)
✅ **MRR 성장률 25%+ m/m** (우리 모델 평균 28%)
✅ **18개월 runway** (보수 시나리오에서도 보장)
