# ThaliFit DB 설계 (PostgreSQL 15+)

schema.json의 모든 entity를 1:1 매핑. UUID PK, snake_case, 모든 테이블에 `created_at`/`updated_at` 포함.

## ER 개요
```
leads (펀널 입구) ──선택적 conversion──> users
users 1 ── 1 health_profiles
users 1 ── N meal_plans 1 ── N meal_plan_days 1 ── N meal_plan_items
users 1 ── N thali_logs 1 ── N thali_log_items
food_items (마스터 DB) ── meal_plan_items, thali_log_items 가 참조
users 1 ── N subscriptions
bmi_checks (익명 세션 가능)
```

## 1. `leads` — 랜딩 폼 캡처 (app.js → POST /leads)
```sql
CREATE TABLE leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_e164      VARCHAR(20) NOT NULL,
  email           VARCHAR(255),
  source          VARCHAR(40) NOT NULL,  -- hero_form|final_form|bmi_widget|ad|referral
  utm_source      VARCHAR(80),
  utm_campaign    VARCHAR(120),
  consent_whatsapp BOOLEAN NOT NULL DEFAULT FALSE,
  converted_user_id UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_leads_phone ON leads(phone_e164);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
```

## 2. `users` — 가입자
```sql
CREATE TABLE users (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_e164         VARCHAR(20) UNIQUE NOT NULL,
  name               VARCHAR(120),
  email              VARCHAR(255),
  language           VARCHAR(8) NOT NULL DEFAULT 'en',  -- en|hi
  city               VARCHAR(80),
  subscription_tier  VARCHAR(20) NOT NULL DEFAULT 'free',  -- free|premium|premium_plus
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_phone ON users(phone_e164);
CREATE INDEX idx_users_tier ON users(subscription_tier);
```

## 3. `health_profiles` — 온보딩 결과
```sql
CREATE TABLE health_profiles (
  user_id           UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  gender            VARCHAR(10) NOT NULL,
  age               SMALLINT NOT NULL CHECK (age BETWEEN 13 AND 90),
  height_cm         NUMERIC(5,1) NOT NULL,
  weight_kg         NUMERIC(5,1) NOT NULL,
  waist_cm          NUMERIC(5,1),
  diet_type         VARCHAR(20) NOT NULL,  -- vegetarian|non_vegetarian|eggetarian|jain|vegan
  religion_filter   VARCHAR(20),           -- halal|no_beef|no_pork|null
  region            VARCHAR(10) NOT NULL,  -- north|south|east|west|central
  conditions        TEXT[] NOT NULL DEFAULT '{}',  -- pcos, type2_diabetes 등
  goal              VARCHAR(30) NOT NULL,
  target_weight_kg  NUMERIC(5,1),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_health_conditions ON health_profiles USING GIN (conditions);
```

## 4. `food_items` — 마스터 음식 DB (인도 NIN 데이터 시드)
```sql
CREATE TABLE food_items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en           VARCHAR(120) NOT NULL,
  name_hi           VARCHAR(120),
  category          VARCHAR(20) NOT NULL,  -- grain|dal|sabzi|dairy|non_veg|snack|beverage|sweet
  region            VARCHAR(15) NOT NULL DEFAULT 'pan_indian',
  diet_tags         TEXT[] NOT NULL DEFAULT '{}',  -- veg, jain_safe, vegan 등
  default_unit      VARCHAR(15) NOT NULL,  -- roti|katori|glass|piece|tbsp|tsp|cup
  kcal_per_unit     NUMERIC(6,1) NOT NULL,
  carb_g            NUMERIC(5,1),
  protein_g         NUMERIC(5,1),
  fat_g             NUMERIC(5,1),
  gi                SMALLINT,
  pcos_friendly     BOOLEAN NOT NULL DEFAULT FALSE,
  diabetes_friendly BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_food_category ON food_items(category);
CREATE INDEX idx_food_diet_tags ON food_items USING GIN (diet_tags);
CREATE INDEX idx_food_search ON food_items USING GIN (to_tsvector('simple', name_en || ' ' || COALESCE(name_hi, '')));

-- 시드 예시
INSERT INTO food_items (name_en, name_hi, category, default_unit, kcal_per_unit, carb_g, protein_g, fat_g, gi, pcos_friendly, diabetes_friendly, diet_tags) VALUES
('Chapati (whole wheat)', 'चपाती', 'grain', 'roti', 80, 15.0, 3.0, 0.5, 62, TRUE, TRUE, '{veg,jain_safe}'),
('Moong Dal', 'मूंग दाल', 'dal', 'katori', 120, 18.0, 8.0, 0.5, 38, TRUE, TRUE, '{veg,jain_safe,vegan}'),
('Plain Curd', 'दही', 'dairy', 'katori', 60, 4.0, 3.5, 3.0, 14, TRUE, TRUE, '{veg}'),
('Besan Chilla', 'बेसन चीला', 'snack', 'piece', 110, 12.0, 5.0, 4.0, 35, TRUE, TRUE, '{veg}');
```

## 5. `meal_plans`, `meal_plan_days`, `meal_plan_items` — 생성된 식단
```sql
CREATE TABLE meal_plans (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date    DATE NOT NULL,
  duration_days SMALLINT NOT NULL DEFAULT 7,
  target_kcal   INT,
  carb_pct      SMALLINT,
  protein_pct   SMALLINT,
  fat_pct       SMALLINT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_meal_plans_user ON meal_plans(user_id, start_date DESC);

CREATE TABLE meal_plan_days (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id     UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
  day_index   SMALLINT NOT NULL CHECK (day_index BETWEEN 1 AND 7),
  UNIQUE (plan_id, day_index)
);

CREATE TABLE meal_plan_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id      UUID NOT NULL REFERENCES meal_plan_days(id) ON DELETE CASCADE,
  slot        VARCHAR(20) NOT NULL,  -- breakfast|mid_morning|lunch|evening_snack|dinner
  food_id     UUID NOT NULL REFERENCES food_items(id),
  qty         NUMERIC(5,2) NOT NULL,
  unit        VARCHAR(15) NOT NULL,
  display_order SMALLINT NOT NULL DEFAULT 0
);
CREATE INDEX idx_mp_items_day ON meal_plan_items(day_id, slot);
```

## 6. `thali_logs`, `thali_log_items` — 일일 기록
```sql
CREATE TABLE thali_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  log_date    DATE NOT NULL,
  slot        VARCHAR(20) NOT NULL,
  adherence   VARCHAR(15) NOT NULL DEFAULT 'matched_plan', -- matched_plan|swapped|skipped
  logged_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, log_date, slot)
);
CREATE INDEX idx_thali_logs_user_date ON thali_logs(user_id, log_date DESC);

CREATE TABLE thali_log_items (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_id    UUID NOT NULL REFERENCES thali_logs(id) ON DELETE CASCADE,
  food_id   UUID NOT NULL REFERENCES food_items(id),
  qty       NUMERIC(5,2) NOT NULL,
  unit      VARCHAR(15) NOT NULL
);
```

## 7. `subscriptions` — Razorpay 결제
```sql
CREATE TABLE subscriptions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier                VARCHAR(20) NOT NULL,         -- premium|premium_plus
  billing_cycle       VARCHAR(10) NOT NULL,         -- monthly|yearly
  amount_inr          INT NOT NULL,                 -- 299 or 1999
  razorpay_sub_id     VARCHAR(60),
  razorpay_payment_id VARCHAR(60),
  status              VARCHAR(20) NOT NULL,         -- active|cancelled|past_due
  current_period_end  TIMESTAMPTZ NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_sub_user ON subscriptions(user_id, status);
```

## 8. `bmi_checks` — 랜딩 위젯 익명 로그 (app.js trackEvent에서 전송)
```sql
CREATE TABLE bmi_checks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  VARCHAR(60),
  user_id     UUID REFERENCES users(id),
  height_cm   NUMERIC(5,1) NOT NULL,
  weight_kg   NUMERIC(5,1) NOT NULL,
  bmi         NUMERIC(4,1) NOT NULL,
  category    VARCHAR(30) NOT NULL,
  checked_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_bmi_checked ON bmi_checks(checked_at DESC);
```

## 인덱싱 원칙
- 사용자별 시간순 조회가 잦은 테이블(`thali_logs`, `meal_plans`, `subscriptions`)은 `(user_id, date DESC)` 복합 인덱스
- `food_items`는 한+영 검색을 위해 GIN full-text 인덱스
- `health_profiles.conditions` 같은 배열은 GIN

## 데이터 보존/프라이버시
- `health_profiles`는 PII급 → 백업 시 별도 KMS 키로 암호화
- 인도 DPDP Act 준수: 동의 철회 시 `users` soft-delete + 90일 후 health/log 데이터 hard-delete 배치
- `leads`의 `phone_e164`는 30일 마케팅 동의 미전환 시 자동 익명화

## 마이그레이션 순서 (실행)
1. `users` → 2. `health_profiles` → 3. `food_items` (시드 1,200건) → 4. `meal_plans` 계열 → 5. `thali_logs` 계열 → 6. `leads` → 7. `subscriptions` → 8. `bmi_checks`
