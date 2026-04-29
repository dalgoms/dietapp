# ThaliFit 운영방안 (Operations Plan)

펀딩 완료 후 18개월 운영 설계. 비전공자 창업자가 직접 매니지먼트 가능한 수준의 단순 거버넌스.

---

## 1. 조직 구조

### Month 1 (펀딩 직후, 6명)
```
창업자/CEO (본인)
├── Full-stack Engineer #1
├── Designer (파트타임)
├── Content Writer (프리랜서)
└── RD Advisor (자문)
```

### Month 6 (10명)
```
창업자/CEO
├── Tech Lead (former Eng #1, 승진)
│   ├── Backend Eng #2
│   └── Mobile Eng #1
├── Head of Growth (신규 채용)
│   ├── Performance Marketer
│   └── Content Manager
├── Head of Nutrition (RD, 풀타임 전환)
│   └── RD Junior #1
└── Ops Coordinator
```

### Month 12 (16명)
- + iOS Engineer, QA, Customer Success Lead, RD #2, Performance Marketer #2, Data Analyst

---

## 2. 의사결정 거버넌스 (RACI)

| 의사결정 | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| 제품 우선순위 | Tech Lead | CEO | RD, Designer | Team |
| 가격 변경 | Head of Growth | CEO | Tech Lead, RD | Investors |
| 마케팅 채널 예산 | Performance Mkt | Head of Growth | CEO | Team |
| 음식 DB 추가 | RD Junior | Head of Nutrition | Tech | CEO |
| WhatsApp 템플릿 | Content Mgr | Head of Growth | RD, Legal | CEO |
| 핵심 hire (lead 직급+) | CEO | CEO | Investors (formal) | Team |
| Series A 타이밍 | CEO | CEO | Board (예정) | Team |

**원칙:** CEO는 Accountable이지 Responsible이 아니다. Responsible은 라인 매니저.

---

## 3. 운영 cadence

### 일일 (월~금)
- 09:30–09:45 Standup (Slack 비동기, 어제·오늘·blocker)
- 비동기 워크 시간 보호 (회의 14:00 이후만)

### 주간
- **월 11:00** Product review (Tech Lead + Designer + RD, 60분)
- **수 14:00** Growth review (CEO + Growth + Mktg, 60분, KPI dashboard)
- **금 16:00** All-hands (60분, win/learn/ask)

### 월간
- **첫째 주 월요일** Monthly business review (3h)
  - KPI 12종 review
  - Cohort retention
  - Cash position
  - 다음 달 OKR 확정

### 분기
- **Quarter end +7일** Board update (서면 4페이지 + 30분 콜)
- 분기 OKR 회고 + 다음 분기 OKR 설정

---

## 4. KPI 대시보드 (12종, Mixpanel + Metabase)

### Acquisition
1. 신규 가입 / 일·주·월
2. 채널별 CAC (Meta, IG, Influencer, Organic)
3. Landing → Signup 전환율 (목표 18%+)

### Activation
4. 가입 → Onboarding 완료 (목표 70%+)
5. Onboarding → 첫 식사 로그 (목표 50%+)
6. D1 active rate (목표 60%+)

### Retention
7. D7 retention (목표 35%+)
8. D30 retention (목표 25%+)
9. WhatsApp 응답률 (목표 40%+)

### Revenue
10. Free → Paid 전환 (목표 6%, 보수 3%)
11. MRR 성장률 (목표 m/m 25%+)
12. Churn rate (목표 월 5% 이하)

---

## 5. 컨텐츠/영양 검수 프로세스

### 음식 DB 추가 (RD 검수)
1. RD Junior가 NIN/IFCT 데이터 + 시판 영양정보 라벨로 draft 작성
2. RD Senior 1차 검수 (영양가 + GI + diet_tag)
3. CTO 측 자동 sanity check (kcal vs macro 정합성, 음수값 차단)
4. Production 반영
5. 분기별 audit: 100건 random sample 재검수, 오류율 ≤2% 유지

### 식단 plan 검수
- 매주 무작위 20개 사용자 plan을 RD Senior가 검수
- 이슈 시: meal-plan-engine 룰 수정 (PR 형태로 git에 기록)
- 사용자 클레임 시: 24h 내 답변 + RD 코멘트 첨부

### 컨텐츠 (블로그, IG)
- Writer 초안 → RD 검수 → CEO 최종 → 게시
- 의학 클레임 금지어 리스트 자동 검출 (예: "cure", "guaranteed")

---

## 6. 고객 지원 (CS)

### 채널 우선순위
1. **WhatsApp inbound** (응답 SLA: 영업시간 내 1h, 이외 12h)
2. In-app chat (SLA 동일)
3. Email (SLA 24h)

### 운영
- Month 0~6: 창업자 직접 답변 (사용자 인사이트 직접 청취)
- Month 6+: CS Lead 1명 채용, 창업자는 escalation만
- FAQ 자동화 (Intercom 또는 자체 봇), 30% deflection 목표

### 환불 정책 (DPDP + 인도 소비자보호법)
- 첫 구독 7일 내 환불 100%
- 그 이후 미사용 잔여기간 비례 환불
- 명백한 의학적 부적합 클레임 시 RD 검토 후 100% 환불

---

## 7. 컴플라이언스

### DPDP Act (인도 개인정보보호법, 2025 시행)
- 데이터 처리자(DPO) 지정 (Month 3, 외주 ₹50K/년)
- 명시적 동의 + 철회 UI 항상 노출
- Health 데이터 = "sensitive personal data" → 별도 KMS 키 (AWS KMS)
- Breach 발생 시 72h 내 신고 (자동 alert + 절차서 보유)

### 의료/광고 규제
- 광고 클레임 ASCI 가이드 준수 (treatment·cure 단어 금지)
- "8kg in 90 days" 같은 결과 광고 시 disclaimer + 사례 N=10 보유 필수
- 의사 인용 시 medical council 등록번호 명시

### 결제 (RBI)
- Razorpay 통한 결제만 (PCI-DSS 부담 X)
- UPI Autopay = NPCI 가이드 준수
- 영수증 자동 발행, GST 18% 별도 표기

---

## 8. 위기 대응 플레이북

### 시나리오 A: WhatsApp 계정 정지
- T+0: 창업자에게 자동 alert
- T+1h: 백업 SMS 채널 자동 활성화
- T+24h: Meta BSP(Gupshup) 통해 항소
- T+48h: 미해결 시 MSG91 + 이메일 dunning만 운영, 사용자에게 in-app 공지

### 시나리오 B: 사용자 의학적 클레임 (예: "이 식단으로 저혈당 왔다")
- T+0: CEO + Head of Nutrition 즉시 보고
- T+1h: 사용자 1:1 응대 (RD Senior가 직접)
- T+24h: 임상 review, 필요시 환불 + medical referral
- T+72h: meal-plan-engine 룰 retrospective + 보완

### 시나리오 C: 핵심 hire 이탈 (Tech Lead)
- 코드 GitHub 항상 push 의무 → 손실 최소
- Backup CTO advisor 즉시 30일 풀타임 contract 전환 (사전 합의)
- 신규 채용 60일 내 목표

### 시나리오 D: 결제 실패율 급증 (>15%)
- T+24h: Razorpay 분석 → 카드 vs UPI 분리
- T+48h: 백업 게이트웨이(Cashfree) 비중 30%로 split test

---

## 9. 보드 운영 (Series A 전까지)

### 구성 (Pre-seed 시점)
- Board 미설립, **Investor Update 서면** + 분기 콜로 대체
- Lead investor에게 observer right만 부여 (정식 board는 Series A에)

### 월간 update (founder note)
1. Headline KPI 5종 (1줄)
2. Win 3가지
3. Learn 3가지 (실패·인사이트)
4. Ask 1~2가지 (소개·자문)
5. Cash position
배포: 매월 5일 이메일

---

## 10. 채용 운영

### 채널
- Engineering: Cutshort, Wellfound, GitHub direct outreach
- RD: PCOS Society of India 네트워크, IDA(영양사 협회)
- Growth/Marketing: LinkedIn + Plaksha alumni network

### 프로세스 (총 7~10일)
1. JD 게시 + screening (CEO 1차)
2. 기술 과제 (24h, 무급) — Eng만
3. 1:1 (60분, hiring manager)
4. Reference check (필수, 최소 2명)
5. Offer + 14일 결정 기한

### 보상 원칙
- 시장 75th percentile 현금 + ESOP 4년 vesting (1년 cliff)
- ESOP pool: Year 1 10%, Year 2 12% 확장
- Pre-seed 직원에게는 0.5~2% 범위

---

## 11. 도구 스택

| 영역 | 도구 | 월 비용 |
|---|---|---|
| Code | GitHub Team | ₹400/user |
| Project | Linear | ₹600/user |
| Design | Figma | ₹1,200/seat |
| Comms | Slack Pro | ₹560/user |
| Docs | Notion Team | ₹650/user |
| Analytics | Mixpanel + Metabase | ₹15K base |
| Error tracking | Sentry | ₹2K |
| Email mktg | MailerLite | ₹1.2K |
| Customer support | Intercom (Month 6+) | ₹15K |

---

## 12. 창업자(본인) 시간 가드레일

| 영역 | 주당 시간 | 위임 시점 |
|---|---|---|
| 채용 + 매니지먼트 | 8h | Month 6: HR ops 도입 |
| 사용자 인터뷰 (week 5건 의무) | 6h | 절대 위임 X (Year 2까지) |
| 마케팅 전략 | 6h | Month 6: Head of Growth |
| 컨텐츠 검수 | 4h | Month 4: Content Mgr |
| 영양사 협업 | 4h | Month 6: Head of Nutrition |
| 분석 (KPI) | 4h | Year 2: Data Analyst |
| 투자자/보드 | 4h | 위임 X (Series A까지) |
| 법무·재무·운영 | 3h | Month 9: Ops Lead |
| 기획·전략 | 11h | 위임 X |
| **합계** | **50h** | |
