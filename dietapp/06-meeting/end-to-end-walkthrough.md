# End-to-End 운영 시나리오 (Day 0 → Month 18)

미팅 메인 콘텐츠. 상대방이 "이 사람이 진짜 처음부터 끝까지 그림이 있구나"를 느끼게 만드는 자료. 60분 미팅의 25분이 이 walkthrough에 할당됨.

각 단계 = **무엇을 / 누가 / 결과물 / 의사결정 포인트** 4축으로 구성.

---

## Phase 0: 합의 (Day -14 ~ Day 0)

### 무엇을
- 협업 모드 확정 (full co-founder / fractional / convertible)
- Term sheet 사인
- 법인 형태 결정 (인도 Pvt Ltd vs 싱가포르 + 인도 자회사)
- 도메인·계정 (thalifit.app, AWS, GitHub, Razorpay, Meta Business, WhatsApp Business) 생성

### 누가
- **본인:** Term sheet draft, 계정 생성, 법무 자문 외주 매니지
- **파트너:** 검토·서명, 자본 transfer (옵션별), 법인 등록 명의

### 결과물
- 사인된 Term sheet
- 회사 등기 신청 완료 (Pvt Ltd 등록 4주 소요)
- 운영 계정 6종 ready

### 의사결정 포인트
- 법인 위치: Year 3 글로벌 펀딩 의향 → 싱가포르, 인도 단독 → Pvt Ltd

---

## Phase 1: 빌드 (Week 1~4)

### Week 1 — 인력 + 인프라

**무엇을:**
- 풀스택 개발자 1명 채용 (Cutshort + LinkedIn outreach 30건)
- UI/UX 디자이너 파트타임 1명 (Behance + Dribbble)
- DB 마이그레이션 (db-design.md → PostgreSQL)
- 랜딩 + waitlist 라이브 (landing.html + app.js Vercel 배포)

**누가:**
- 본인: 채용 인터뷰 (1차 screening), DB 스펙 개발자에게 인계, 랜딩 카피 최종 검수
- 파트너: 채용 최종 결정 동석 (Day 5), Meta Business 광고 계정 결제 카드 등록

**결과물:**
- 풀스택 + 디자이너 offer accepted
- thalifit.app 라이브, 첫 lead 캡처 가능
- AWS RDS PostgreSQL + EC2 t3.small running

**의사결정 포인트:**
- 풀스택 후보 A (시니어 ₹1.4L) vs B (미드 ₹0.95L) — Day 5 결정

---

### Week 2 — 백엔드 + WhatsApp

**무엇을:**
- API endpoint 5종 (leads, OTP, user, health-profile) 구현 (api-server.js)
- WhatsApp Business API 승인 신청 (Gupshup 통해)
- 음식 DB 시드 50건 (food-seed.json) → 100건 확장
- Mixpanel + Sentry 셋업

**누가:**
- 본인: WhatsApp 템플릿 8종 Meta 승인 제출, 영양사 자문 계약
- 개발자: API + DB 작업
- 파트너: 영양사 후보 reference 1~2명 소개 (있다면)

**결과물:**
- OTP 동작, lead → user 전환 가능
- WhatsApp 첫 템플릿 승인
- 영양사 자문 계약 (₹25K/월)

**의사결정 포인트:**
- WhatsApp BSP: Gupshup vs AiSensy — 가격 vs UX 비교 후 결정

---

### Week 3 — 온보딩 + 식단 엔진

**무엇을:**
- React Native 온보딩 8 화면 (onboarding-flow.md 그대로)
- meal-plan-engine.js 통합, generateMealPlan endpoint 동작
- BMR + macro split + 음식 필터 룰 영양사 검수

**누가:**
- 본인: 온보딩 카피·flow QA, 영양사와 macro 룰 1:1 검수
- 개발자: 코드 통합, mobile UI
- 디자이너: 8 화면 컴포넌트 finalize

**결과물:**
- 가입 → 첫 식단 받기 end-to-end 동작 (내부 테스트)
- 영양사 검수 통과한 4개 condition (PCOS, T2D, 갑상선, 일반) 룰

**의사결정 포인트:**
- 첫 출시 condition 범위: 4개 모두 vs PCOS+일반 2개 (보수적 시작) → PCOS+일반으로 시작 권장

---

### Week 4 — Logging + Beta 시작

**무엇을:**
- thali_logs 화면 + endpoint
- WhatsApp 템플릿 1, 3, 4 (welcome, daily reminder, weekly progress) 발송 자동화
- Closed beta 5명 (지인 시드)
- 컨텐츠: 블로그 PCOS 키워드 3편 publish

**누가:**
- 본인: beta 사용자 5명 모집 + 1:1 인터뷰, 컨텐츠 라이터 채용
- 개발자: WhatsApp webhook 응답 처리

**결과물:**
- 첫 5명 active 사용
- 블로그 첫 SEO traffic
- 사용자 인터뷰 5건 transcript

**의사결정 포인트:**
- Beta 5명 → 50명 확장 시점 (Week 5 vs Week 6)

---

## Phase 2: 검증 (Week 5~12)

### Week 5~6 — Closed beta 50명

**무엇을:**
- Beta 50명 모집 (waitlist + 영양사 인플루언서 시드 1명)
- 일일 리뷰 + 매주 retention cohort
- 식단 엔진 fine-tune (사용자 feedback 반영)

**누가:**
- 본인: 50명 1:1 WhatsApp, week 5명 인터뷰
- 개발자: 버그 픽스 sprint
- 영양사: plan 검수 audit (week 20개 random sample)

**결과물:**
- D7 retention 측정 (목표 35%, baseline 미달이면 onboarding 수정)
- Bug 우선순위 list (top 10)
- 영양사 인플루언서 첫 1명 협업 계약 (revenue share 20%)

**의사결정 포인트:**
- D7 retention <25% 시: 출시 1주 연기 + onboarding 재작업

---

### Week 7~8 — 결제 + 유료 전환

**무엇을:**
- Razorpay 구독 결제 통합 (월 ₹299, 연 ₹1,999)
- Premium 게이팅 (free vs premium 차등)
- UPI Autopay 우선, 카드 보조

**누가:**
- 본인: Razorpay 계정 setup + 가격 A/B 결정
- 개발자: 결제 flow + webhook
- 파트너: 첫 결제 시점 SMS/이메일 알림 받음 (투명성)

**결과물:**
- 결제 동작
- 첫 유료 1~3명 (beta 50명 중)

**의사결정 포인트:**
- 가격 ₹299 vs ₹399 A/B (sample size 부족하면 ₹299 default)

---

### Week 9~10 — Open beta + Ads 첫 집행

**무엇을:**
- Open beta 전환 (waitlist 전체 invite)
- Meta Ads ₹50,000 첫 집행 (PCOS 키워드)
- 인플루언서 IG 릴스 협업 1건 라이브

**누가:**
- 본인: Ads creative 디렉팅, 인플루언서 협업 매니지
- 컨텐츠 라이터: 블로그 6편 추가
- 디자이너: Ads creative 5종

**결과물:**
- 가입 250+
- 첫 paid CAC 측정 (목표 ≤₹500)
- IG 팔로워 500+

**의사결정 포인트:**
- CAC > ₹600: Ads 일시 중단 + creative 재작업
- CAC < ₹400: Ads ₹1L로 확장

---

### Week 11~12 — 첫 마일스톤 평가

**무엇을:**
- 가입 500 + 유료 30 + D30 25% 달성 평가
- 영양사 인플루언서 5명 라인업 완료
- 12주 retrospective + 다음 분기 OKR

**누가:**
- 본인: 데이터 분석 + 파트너 보고
- 파트너: 다음 분기 자본 추가 투입 결정 (옵션별)

**결과물:**
- 12주 보고서 (사용자 인터뷰 5건 인사이트 + KPI 12종 dashboard)
- 다음 분기 우선순위 합의

**의사결정 포인트:**
- **가입 ≥400 + 유료 ≥20 + D30 ≥20%** = green → 확장 모드
- 미달 = yellow → product retrospective + 1개월 재검증
- 50% 미만 = red → ICP 재정의 또는 피봇 회의

---

## Phase 3: 확장 (Month 4~9)

### Month 4 — 음식 DB 600건 + 힌디 UI

**무엇을:**
- 음식 DB 100 → 600건 (RD 1명 풀타임 + 인턴 2명, ₹8L 6개월 예산)
- 힌디 UI 핵심 string 100% (온보딩 + WhatsApp 템플릿 우선)
- iOS native 개발 시작

**누가:**
- 본인: RD 채용, 힌디 라이터 외주, iOS 개발자 1명 추가 채용
- 개발자: iOS 코드 베이스 시작

---

### Month 5~6 — 결제 + 자동화 강화

**무엇을:**
- WhatsApp swap suggestion 자동화 (사용자가 "2"로 응답 시 음식 입력 → 자동 로깅)
- Email/SMS dunning (결제 실패 복구)
- Premium+ Tier 베타 (RD 채팅, ₹999/월)

**누가:**
- 본인: dunning 메시지 카피 + Premium+ 영양사 매칭 운영
- 개발자: webhook + Razorpay 재시도 로직

**결과물:**
- 결제 실패 복구율 +30%
- Premium+ 첫 5명

---

### Month 7~9 — B2B2C 채널 진입

**무엇을:**
- 부인과/내분비과 클리닉 30곳 콜드 아웃리치 → 5곳 파일럿
- 의사 처방 도구 포지셔닝 (PCOS 환자 routing)
- 영양사 인플루언서 10명 라인업

**누가:**
- 본인: 의사 미팅 직접 (인도 출장 1주 ×2회)
- 파트너: 의사 네트워크 소개 (있다면)
- Head of Growth 채용 (Month 6, ₹1.5L/월)

**결과물:**
- 클리닉 5곳 파일럿 라이브
- B2B2C 가입 비중 15%+

---

## Phase 4: 가속 (Month 10~18)

### Month 10~12 — App Store + 1차 시장 검증

**무엇을:**
- iOS App Store + Play Store 정식 런칭
- Tamil 언어 추가 (남부 시장 진입)
- ARR ₹50L 달성

**누가:**
- 본인: PR (YourStory, Inc42 인터뷰), 신규 시장 캠페인
- 개발자: iOS 출시 + 다국어 인프라

**결과물:**
- App Store 평점 4.3+
- 가입 누적 3만, 유료 1,200

---

### Month 13~15 — Series A 준비

**무엇을:**
- ARR ₹1Cr 도달, LTV/CAC 5x+
- 데이터룸 정비 (cohort table, unit economics, traction graphs)
- 투자자 30명 콜드 아웃리치

**누가:**
- 본인: 투자자 미팅 (week 5건)
- 파트너: 시니어 advisor 소개 (있다면)
- 신규: Finance Lead 채용

**결과물:**
- Series A term sheet 1~3건

---

### Month 16~18 — Series A close + 다음 phase

**무엇을:**
- Series A ₹8~12Cr close
- 운동·웨어러블 통합 (Premium+ feature)
- B2B2C 클리닉 30곳 → 100곳 확장

**결과물:**
- ARR ₹1.7Cr+
- 직원 25명
- 시장 PCOS·T2D 카테고리 인지도 1위 (HealthifyMe와 별도 segment)

---

## 운영 체크포인트 (Decision gates)

| 시점 | Green | Yellow | Red |
|---|---|---|---|
| Week 4 | beta 5명 active | beta 2명 | beta 0 |
| Week 12 | 가입 ≥400, 유료 ≥20 | 가입 200~400 | <200 |
| Month 6 | MRR ≥₹1L | ₹50K~1L | <₹50K |
| Month 12 | ARR ≥₹50L | ₹25~50L | <₹25L |
| Month 18 | ARR ≥₹1Cr, Series A live | ₹50L~1Cr | <₹50L |

Yellow = 1개월 재검토, Red = 피봇 회의 (파트너와 동석).

---

## 미팅 중 이 walkthrough 사용법

- **풀버전 안 읽음.** 미팅에서는 phase별 1줄 요약만.
- 상대가 "Week 7 결제 부분 더 듣고 싶다" 식으로 들어오면 그 phase만 deep-dive.
- 미팅 끝나고 PDF로 leave-behind.
- 톤: "이대로 무조건 간다"가 아니라 "이게 우리 default plan이고, 같이 조정 가능합니다."
