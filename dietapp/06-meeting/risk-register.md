# Risk Register — 15 risks + 담당자

미팅에서 "리스크 어떻게 보세요" 질문 받았을 때 이 파일 그대로 보여주면 신뢰 +30%.

| # | Risk | 영역 | 발생 가능성 | 영향 | 담당 | 1차 대응 | 2차 대응 (escalation) |
|---|---|---|---|---|---|---|---|
| 1 | 풀스택 Tech Lead 이탈 | 인력 | 中 | 高 | 본인 | GitHub weekly push 의무 + bench 후보 1명 상시 | 30일 내 신규 채용, CTO advisor 풀타임 30일 contract |
| 2 | 파트너 commit 약화 (시간/관심) | 파트너십 | 中 | 高 | 본인 | 주간 1:1에서 솔직 피드백 | 30일 cooling → 모드 재협상 (B→C) |
| 3 | 가입 12주 마일스톤 미달 | 시장 | 中 | 高 | 본인 (Growth) | ICP 재인터뷰 + 메시징 A/B | Yellow zone: 1개월 재검증, Red zone: 피봇 회의 |
| 4 | CAC > ₹600 (Ads 비효율) | 마케팅 | 中 | 中 | 본인 | Ads 일시 중단, creative 재작업, 인플루언서 비중↑ | 채널 mix 재설계, 영업 SDR 도입 |
| 5 | 유료 전환 <3% | 비즈니스 | 中 | 高 | 본인 | 가격 A/B (₹199 vs ₹299), Premium feature 강화 | 가격 모델 재검토 (one-time vs subscription) |
| 6 | D30 retention <15% | 제품 | 中 | 高 | 본인 + Tech | Onboarding 재설계, WhatsApp 메시지 빈도 조정 | 식단 엔진 fundamental 재검토 |
| 7 | WhatsApp Business 계정 정지 | 인프라 | 低 | 高 | 본인 | SMS (MSG91) 백업 채널 자동 활성화 | Meta BSP 항소, in-app 푸시로 fallback |
| 8 | 음식 DB 의학 클레임 (저혈당 등) | 법무·의료 | 低 | 매우 高 | RD + 본인 | RD 검수 audit log 보관, 사용자 1:1 응대, 환불 + 의료 referral | meal-plan-engine 룰 retrospective + 보강 |
| 9 | DPDP Act 위반 (개인정보) | 법무 | 低 | 매우 高 | 본인 + 외주 법무 | DPO 지정, 동의 철회 UI, KMS 분리 | Breach 시 72h 내 신고 절차서대로 |
| 10 | 결제 실패율 >15% | 인프라 | 中 | 中 | 본인 + Tech | UPI Autopay 비중↑, 카드 보조 | Cashfree 듀얼 게이트웨이 도입 |
| 11 | HealthifyMe 모방 (PCOS 모드 출시) | 경쟁 | 中 | 高 | 본인 | RD 임상 제휴 lock-in, B2B2C 클리닉 채널 선점 | 카테고리 깊이 (T2D + Thyroid) 추가 차별화 |
| 12 | 파트너 도메인 네트워크 소진 | 파트너십 | 中 | 中 | 파트너 | 월 1회 정보 공유 의무화 | Advisor 보강 (RD + 의사 추가 영입) |
| 13 | 인도 출장·체류 비자 issue (해외 거주 시) | 운영 | 中 | 中 | 본인 | Year 1 분기별 1주 출장 / Year 2 풀타임 거주 | 인도 GM 1명 Month 6 채용 (예산 반영) |
| 14 | Series A 펀딩 실패 (Month 18) | 자본 | 中 | 매우 高 | 본인 + 파트너 | M18 시점 break-even 가시권 → 자본 없이 운영 가능 | Bridge round (₹3~5Cr) → 24개월 확장 |
| 15 | 운영 모델 분쟁 (CEO vs Chair) | 거버넌스 | 中 | 매우 高 | 본인 + 파트너 | 주간 1:1 fixed agenda + 의사결정 4단계 | Advisor 조정 → 그래도 안 되면 buyout 조항 |

---

## Risk monitoring cadence

| 주기 | Review |
|---|---|
| 주 | 1, 4, 6, 10 (운영) |
| 월 | 3, 5, 11 (성장·비즈니스) |
| 분기 | 2, 12, 15 (파트너십·거버넌스) |
| 반기 | 7, 8, 9, 14 (인프라·법무·자본) |
| 발생 시 즉시 | 8, 9 (법무·의료) |

---

## 트리거별 escalation 절차 (top 5)

### Risk #2 (파트너 commit 약화)
- 트리거: 주간 1:1 cancel 2회 연속 또는 월 KPI 미review
- T+1주: 본인이 직접 솔직 대화
- T+4주: Advisor 동석 1:1
- T+8주: Mode 재협상 회의 (옵션 변경)

### Risk #3 (12주 가입 미달)
- 트리거: Week 8 시점 가입 <200
- T+0: 1주 인터뷰 sprint (사용자 10명 + 미가입자 10명)
- T+1주: Growth 가설 5개 → A/B 동시 진행
- T+4주: Week 12 평가, Yellow/Red 결정

### Risk #8 (의학 클레임)
- 트리거: 사용자가 식단 후 부작용 보고
- T+1h: RD Senior + 본인 동시 보고, 사용자 1:1 응대 시작
- T+24h: 임상 review, 환불 결정
- T+72h: meal-plan-engine 룰 보완 (PR 형태로 git에 기록)
- T+1주: 동일 condition 사용자 전체 audit

### Risk #14 (Series A 실패)
- 트리거: Month 15에 term sheet 0건
- T+0: Bridge round 옵션 검토 시작
- T+1개월: 기존 투자자 + advisor 네트워크 활용 ₹3Cr 확보
- T+2개월: Burn 30% 컷 (마케팅 중단, 핵심 인력만 유지)
- T+3개월: ARR ₹50L 도달 시점까지 burn 최소화

### Risk #15 (거버넌스 분쟁)
- 트리거: L3 의사결정 합의 안 되어 30일 cooling 발동
- T+30일: Advisor 의견 청취
- T+60일: 안 되면 buyout 조항 검토 시작

---

## 미팅에서 risk register 사용법

**상대가 "리스크 어떻게 보세요?" 라고 물으면:**

> "15개로 정리해뒀습니다. 이 중 가장 무서운 게 4개입니다 — Tech Lead 이탈(#1), 의학 클레임(#8), Series A 실패(#14), 그리고 우리 둘 사이 거버넌스 분쟁(#15). 나머지 11개는 운영으로 해결되지만, 이 4개는 회사를 끝낼 수 있어서 trigger 정의 + escalation 절차까지 미리 잡아뒀습니다.
>
> 특히 #15는 솔직히 말씀드리면 — 공동창업이 깨지는 가장 흔한 이유고, 그래서 partnership-terms.md에 buyout까지 명시했습니다. 안전망이 있으면 오히려 둘 다 더 자유롭게 일할 수 있다고 봅니다."

이렇게 답하면 **시니어 신호 + 솔직함 + 운영 성숙도** 동시 발신.
