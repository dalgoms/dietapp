# ThaliFit 12주 실행 로드맵 (비전공자 창업자 기준)

## 가정
- 창업자 1인, 풀타임, 비전공자 (마케팅/세일즈 가능, 코딩 X)
- 시드 자금 ₹15~20 lakh (약 ₹1,800만 = 한화 약 3,000만원)
- 인도 외부에서 운영 가능 (해외 창업자 가정), 인도 영양사·개발자 원격 고용
- 목표: 12주 후 closed beta 100명 + 유료 전환 5명

---

## 인력 구성 (인도 시장 단가, 2026 기준)

| 역할 | 형태 | 비용 | 시작 시점 |
|---|---|---|---|
| Full-stack 개발자 (Node + React Native) | 풀타임 계약 | ₹1,20,000/월 | Week 1 |
| UI/UX 디자이너 | 파트타임 (월 80시간) | ₹40,000/월 | Week 1 |
| 영양사 (RD, PCOS/당뇨 경험) | 자문 (월 20시간) | ₹25,000/월 | Week 2 |
| 컨텐츠 라이터 (영어+힌디) | 프리랜서 건당 | ₹15,000/월 | Week 4 |
| 창업자 (본인) | 풀타임 | salary 0, equity | Week 0 |

**월 인건비 합계:** ₹2,00,000 (약 ₹240만 = 한화 약 400만원)
**12주 인건비:** ₹6,00,000

---

## 인프라 / SaaS 비용 (월)
- AWS (EC2 t3.small + RDS db.t3.micro): ₹3,500
- WhatsApp Business API (Gupshup/AiSensy 재판매): ₹2,500 base + 사용량
- Razorpay: 무료 (거래당 2%)
- Vercel (랜딩): 무료
- Sentry, Mixpanel: ₹3,000
- 도메인 + SSL: ₹500
- 합계: ~₹10,000/월 → 12주 ₹30,000

---

## 마케팅 예산 (12주)
- Meta Ads (Facebook + Instagram, PCOS/diabetes 키워드): ₹2,00,000
- 영양사 인플루언서 시드 5명 (revenue share + ₹10,000 advance × 5): ₹50,000
- 컨텐츠 (블로그 12편, IG 릴스 20편 외주): ₹50,000
- 합계: ₹3,00,000

---

## 총 예산 (12주)
| 항목 | 금액 |
|---|---|
| 인건비 | ₹6,00,000 |
| 인프라 | ₹30,000 |
| 마케팅 | ₹3,00,000 |
| 법무·회계·예비비 | ₹1,70,000 |
| **합계** | **₹11,00,000** (한화 약 1,800만원) |

시드 ₹15~20 lakh 안에서 12주 운영 + 12주치 추가 buffer 확보.

---

## 주차별 마일스톤

### Week 0 (사전)
- 창업자 단독 작업
- 도메인 구입 (thalifit.app)
- AWS, GitHub, Razorpay, Meta Business, WhatsApp Business 계정 생성
- 인도 법인 설립 시작 (Pvt Ltd, 약 4주 소요) — 또는 해외 법인 운영 결정
- **딜리버러블:** 계정 모두 ready, 회사 등록 신청

### Week 1
- 개발자 + 디자이너 채용 완료 (LinkedIn / Cutshort / Internshala)
- DB 생성 (db-design.md 그대로 PostgreSQL 마이그레이션)
- 랜딩(landing.html + app.js) 배포 (Vercel)
- **창업자 작업:** Meta Ads 픽셀 설치, Mixpanel 이벤트 정의
- **딜리버러블:** thalifit.app live, lead 캡처 동작

### Week 2
- 영양사 자문 계약, food-seed.json 100건 → 300건 확장 검수
- API 서버 (api-server.js) Week 1~5 endpoint 구현 (leads, OTP, user, health-profile)
- WhatsApp Business API 승인 신청 (보통 5~7일)
- **창업자 작업:** whatsapp-templates.md 8개 템플릿 Meta 승인 제출
- **딜리버러블:** OTP 동작, lead → user 전환 가능

### Week 3
- 온보딩 8 화면 (onboarding-flow.md) React Native 구현
- meal-plan-engine.js 연결, generateMealPlan endpoint 동작
- **창업자 작업:** 영양사와 100명 카탈로그 검수, 결제 플로우 와이어프레임
- **딜리버러블:** 온보딩 → 첫 식단 받기 end-to-end 동작 (내부 테스트)

### Week 4
- thali_logs (일일 기록) 화면 + endpoint
- WhatsApp 템플릿 1, 3, 4 발송 자동화
- 컨텐츠 라이터 채용, 블로그 시작 (PCOS 키워드 3편)
- **창업자 작업:** 영양사 인플루언서 5명 콜드 아웃리치 (Instagram DM)
- **딜리버러블:** 첫 alpha 테스터 5명 (지인) 가입

### Week 5
- 주간 리포트 생성 (weekly_progress 템플릿용)
- 푸시 알림 + WhatsApp 응답 webhook 처리
- **창업자 작업:** 영양사 협업 1명 계약 완료, IG 릴스 협업 시작
- **딜리버러블:** alpha 사용자 10명 적극 사용 중

### Week 6
- Razorpay 구독 결제 통합 (월/연 플랜)
- Premium 게이팅 (free vs premium 기능 차등)
- **창업자 작업:** 가격 테스트 (₹299 vs ₹399), 인앱 카피 A/B
- **딜리버러블:** 결제 동작, 첫 유료 전환 1~2명

### Week 7
- 버그 픽스 sprint, 분석 대시보드 정비
- **창업자 작업:** Meta Ads 캠페인 런칭 (₹50,000 우선 집행)
- **딜리버러블:** Ads 통한 lead 100명, beta 가입 30명

### Week 8
- 사용자 피드백 반영 — top 5 이탈 지점 수정
- 음식 DB 300 → 600건 확장
- **창업자 작업:** 최초 Cohort 코호트 retention 분석, 영양사 인플루언서 3명 추가
- **딜리버러블:** D7 retention 측정 (목표 35%)

### Week 9
- WhatsApp 코칭 자동화 강화 (swap suggestion 응답 처리)
- 푸시 + 이메일 dunning (결제 실패 복구)
- **창업자 작업:** 첫 PR 노출 시도 (YourStory, Inc42 인도 미디어)
- **딜리버러블:** 유료 사용자 누적 10명

### Week 10
- 힌디 번역 추가 (UI 핵심 string + 템플릿 1, 3)
- App Store / Play Store 제출 (지금까지 PWA로 운영했다면)
- **창업자 작업:** Closed beta → Open beta 전환 결정
- **딜리버러블:** Play Store live (iOS는 v2)

### Week 11
- Open beta 런칭, Ads 예산 ₹1,00,000 추가 집행
- 영양사 라이브 Q&A 세션 1회 (premium 사용자 대상)
- **창업자 작업:** 결혼 시즌(11~2월) 캠페인 "pre-wedding glow-up" 시작
- **딜리버러블:** 누적 가입 500명, 유료 전환 30명

### Week 12
- 성과 리뷰 + 다음 분기 계획
- **창업자 작업:** 시드 펀딩 deck 작성 (이 12주의 데이터 기반)
- **딜리버러블:** 12주 보고서, Series A 준비 결정

---

## 창업자 (비전공자) 주간 시간 배분

| 활동 | 주당 시간 |
|---|---|
| 채용 + 인력 매니지먼트 | 8h |
| 컨텐츠 + 마케팅 (블로그, 광고, 인플루언서) | 15h |
| 사용자 인터뷰 + 지원 | 8h |
| 영양사 협업 + 음식 DB 검수 보조 | 5h |
| 데이터 분석 (Mixpanel 대시보드) | 4h |
| 법무·회계·결제 운영 | 3h |
| 기획·우선순위 결정 | 7h |
| **합계** | **50h** |

---

## 비전공자가 직접 다뤄야 하는 도구

| 도구 | 용도 | 학습 시간 |
|---|---|---|
| Figma | 디자이너 결과물 리뷰 | 2h |
| Mixpanel | 사용자 funnel 분석 | 4h |
| Meta Business Manager | 광고 + WhatsApp 템플릿 | 6h |
| Razorpay 대시보드 | 결제 모니터링 | 1h |
| GitHub Issues | 개발팀 task 트래킹 | 2h |
| Notion | 영양사·인플루언서 collab | 1h |

---

## 위험 시나리오 + 대응

| 위험 | 발생 시점 | 대응 |
|---|---|---|
| WhatsApp 템플릿 거절 | Week 2 | 변형 카피로 재제출, 백업으로 SMS (MSG91) 준비 |
| 개발자 이탈 | Week 3~6 | 코드 GitHub에 매주 push 의무화, Bench 후보 항상 1명 |
| Ads CAC > ₹600 | Week 8 | 인플루언서 비중 ↑, organic 컨텐츠 강화 |
| 식단 정확도 클레임 | Week 6+ | 영양사 검수 audit log 보존, 의학 disclaimer 강화 |
| 결제 실패율 >15% | Week 7+ | UPI Autopay 우선, 카드는 보조 |

---

## 12주 후 결정 트리

- **사용자 500+, 유료 30+, D30 25%+** → Series A 준비, 남부 언어 확장
- **사용자 500+, 유료 <15** → 가격/포지셔닝 피봇, B2B2C (의사 채널) 시도
- **사용자 <300** → 마케팅 채널 재검토, ICP 재정의 (BMI 27+ 여성으로 좁히기)

---

## 다음 한 가지 결정 (week 0 즉시)

**인도 법인 설립 vs 해외 법인 + 인도 지사**
- 인도 법인 (Pvt Ltd): 인도 결제·고용 단순, 외환규제(FEMA) 처리 필요
- 해외 법인 (예: 싱가포르) + 인도 자회사: 향후 글로벌 펀딩 유리, 초기 비용 2배

비전공자 창업자에게는 **첫해는 인도 단독 법인**, Series A 직전에 flip 권장.
