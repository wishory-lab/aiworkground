# 🔐 Vercel 환경 변수 설정 가이드

## 📍 환경 변수 설정 위치

### Step 1: Vercel 대시보드 접속
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 로그인 (GitHub 계정으로 로그인)

### Step 2: 프로젝트 선택
1. 대시보드에서 **"seunghwan"** 또는 **"aiworkground-fullstack"** 프로젝트 클릭
2. 프로젝트 페이지로 이동

### Step 3: Settings 메뉴로 이동
1. 상단 네비게이션 바에서 **"Settings"** 탭 클릭
2. 왼쪽 사이드바에서 **"Environment Variables"** 클릭

### Step 4: 환경 변수 추가
1. **"Add New"** 또는 **"Add"** 버튼 클릭
2. 다음 필드 입력:
   - **Key**: 환경 변수 이름 (예: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
   - **Value**: 환경 변수 값 (예: `pk_live_...`)
   - **Environment**: 
     - ✅ Production (프로덕션용)
     - ✅ Preview (프리뷰용)
     - ✅ Development (개발용)
     - 또는 **"All"** 선택 (모든 환경에 적용)

3. **"Save"** 버튼 클릭

---

## 📋 필수 환경 변수 목록

다음 환경 변수들을 **모두** 추가하세요:

### 1. Site URL
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://www.aiworkground.com
Environment: All
```

### 2. Clerk Authentication (프로덕션 키 사용!)
```
Key: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: pk_live_... (프로덕션 키)
Environment: All

Key: CLERK_SECRET_KEY
Value: sk_live_... (프로덕션 시크릿 키)
Environment: All
```

**⚠️ 중요**: `pk_test_...` (테스트 키)가 아닌 `pk_live_...` (프로덕션 키)를 사용하세요!

### 3. Supabase
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environment: All

Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environment: All

Key: SUPABASE_SERVICE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environment: All
```

### 4. OpenAI
```
Key: OPENAI_API_KEY
Value: sk-...
Environment: All
```

### 5. Anthropic (선택사항)
```
Key: ANTHROPIC_API_KEY
Value: sk-ant-...
Environment: All
```

### 6. Stripe (선택사항 - 결제 기능 사용 시)
```
Key: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_live_...
Environment: All

Key: STRIPE_SECRET_KEY
Value: sk_live_...
Environment: All
```

### 7. Environment
```
Key: ENVIRONMENT
Value: production
Environment: All
```

---

## 🔍 키 값 찾는 방법

### Clerk 키 찾기
1. [Clerk Dashboard](https://dashboard.clerk.com) 접속
2. 프로젝트 선택
3. **"API Keys"** 메뉴 클릭
4. **Production** 환경 선택
5. **Publishable Key** 복사 → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`에 입력
6. **Secret Key** 복사 → `CLERK_SECRET_KEY`에 입력

### Supabase 키 찾기
1. [Supabase Dashboard](https://app.supabase.com) 접속
2. 프로젝트 선택
3. **Settings** → **API** 메뉴 클릭
4. **Project URL** 복사 → `NEXT_PUBLIC_SUPABASE_URL`에 입력
5. **anon public** 키 복사 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 입력
6. **service_role** 키 복사 → `SUPABASE_SERVICE_KEY`에 입력

### OpenAI 키 찾기
1. [OpenAI Platform](https://platform.openai.com) 접속
2. **API Keys** 메뉴 클릭
3. 기존 키 확인 또는 새 키 생성
4. 키 복사 → `OPENAI_API_KEY`에 입력

---

## ✅ 설정 완료 후 확인

### 1. 모든 환경 변수 추가 확인
- 총 **7개 이상**의 환경 변수가 추가되어야 합니다
- 각 변수의 **Environment**가 올바르게 설정되었는지 확인

### 2. 재배포
환경 변수를 추가/수정한 후:
1. **"Deployments"** 탭으로 이동
2. 최신 배포 옆 **"..."** 메뉴 클릭
3. **"Redeploy"** 선택
4. 또는 자동으로 재배포될 때까지 대기

### 3. 배포 확인
- 배포가 성공적으로 완료되는지 확인
- 빌드 로그에서 에러가 없는지 확인

---

## 🚨 주의사항

1. **프로덕션 키 사용**: 테스트 키(`pk_test_...`)가 아닌 프로덕션 키(`pk_live_...`)를 사용하세요
2. **키 노출 금지**: 환경 변수 값은 절대 공개하지 마세요
3. **대소문자 구분**: 환경 변수 이름은 정확히 입력하세요 (대소문자 구분)
4. **공백 없음**: 키 값 앞뒤에 공백이 없어야 합니다

---

## 📸 스크린샷 가이드

### 환경 변수 설정 화면 위치:
```
Vercel Dashboard
  └─ 프로젝트 선택
      └─ Settings (상단 탭)
          └─ Environment Variables (왼쪽 사이드바)
              └─ Add New 버튼
```

---

## 🆘 문제 해결

### 환경 변수가 적용되지 않는 경우
1. **재배포 필요**: 환경 변수 추가 후 반드시 재배포
2. **변수 이름 확인**: 대소문자 정확히 입력했는지 확인
3. **Environment 선택**: Production, Preview, Development 모두 선택했는지 확인

### 여전히 에러가 발생하는 경우
1. 빌드 로그에서 "Missing environment variable" 메시지 확인
2. 누락된 환경 변수 추가
3. 다시 재배포

---

**💡 팁**: 환경 변수를 모두 추가한 후 스크린샷을 찍어두면 나중에 참고하기 좋습니다!

