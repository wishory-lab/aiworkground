# 🚀 AIWorkGround 프로덕션 배포 가이드

## 📋 배포 전 체크리스트

### 1. 환경 변수 준비
- [ ] Clerk 프로덕션 키 발급
- [ ] Supabase 프로덕션 프로젝트 설정
- [ ] OpenAI API 키 확인
- [ ] Anthropic API 키 확인 (선택사항)
- [ ] Stripe 프로덕션 키 발급 (선택사항)

### 2. 코드 최종 확인
- [ ] 빌드 테스트 통과
- [ ] 모든 기능 테스트 완료
- [ ] 모바일 반응형 확인
- [ ] 다국어 지원 확인

### 3. 도메인 설정
- [ ] aiworkground.com 도메인 확인
- [ ] DNS 설정 준비

---

## 🌐 Vercel 배포 (권장)

### Step 1: Vercel 계정 및 프로젝트 설정

1. **Vercel 계정 생성**
   - [Vercel](https://vercel.com) 접속
   - GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "Add New Project" 클릭
   - GitHub 저장소 선택: `aiworkground-fullstack`
   - Framework Preset: **Next.js** 자동 감지
   - Root Directory: `.` (루트)

### Step 2: 환경 변수 설정

Vercel 대시보드 → Project Settings → Environment Variables에서 다음 변수들을 추가:

#### 필수 환경 변수

```env
# Site URL
NEXT_PUBLIC_SITE_URL=https://www.aiworkground.com

# Clerk Authentication (프로덕션 키 사용)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic (선택사항)
ANTHROPIC_API_KEY=sk-ant-...

# Stripe (선택사항)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Environment
ENVIRONMENT=production
```

#### 환경별 설정
- **Production**: 모든 환경 변수 설정
- **Preview**: 개발용 키 사용 가능
- **Development**: 로컬 개발용

### Step 3: 빌드 설정 확인

Vercel이 자동으로 감지하지만, 확인:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x 이상

### Step 4: 도메인 연결

1. **Vercel 대시보드 → Settings → Domains**
2. **도메인 추가**: `www.aiworkground.com`
3. **DNS 설정** (도메인 제공업체에서):
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **루트 도메인** (`aiworkground.com`)도 추가하려면:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel IP)
   ```

### Step 5: 배포 실행

1. **자동 배포** (GitHub 연동 시):
   - `main` 브랜치에 push하면 자동 배포
   - Pull Request 생성 시 Preview 배포

2. **수동 배포**:
   ```bash
   # Vercel CLI 설치
   npm i -g vercel
   
   # 로그인
   vercel login
   
   # 프로덕션 배포
   vercel --prod
   ```

---

## 🔒 보안 설정

### 1. Clerk 프로덕션 키 사용

**중요**: 개발용 키(`pk_test_...`)를 프로덕션 키(`pk_live_...`)로 변경

1. [Clerk Dashboard](https://dashboard.clerk.com) 접속
2. 프로덕션 환경 선택
3. API Keys → Publishable Key / Secret Key 복사
4. Vercel 환경 변수에 설정

### 2. Supabase RLS 활성화

```sql
-- 모든 테이블에 RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_results ENABLE ROW LEVEL SECURITY;
-- ... (나머지 테이블)
```

### 3. CORS 설정

Supabase Dashboard → Settings → API → CORS
- 허용 도메인: `https://www.aiworkground.com`

---

## 📊 배포 후 확인 사항

### 1. 기능 테스트

- [ ] 홈페이지 로딩 확인
- [ ] 언어 전환 (KO, EN, JA, ZH, TH, VI, MS, RU)
- [ ] 회원가입/로그인
- [ ] 대시보드 접근
- [ ] 콘텐츠 생성 기능
- [ ] 챗봇 동작
- [ ] 모바일 반응형

### 2. 성능 확인

```bash
# Lighthouse 점수 확인
npx lighthouse https://www.aiworkground.com --view
```

**목표 점수**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### 3. SSL 인증서 확인

```bash
curl -vI https://www.aiworkground.com
```

Vercel이 자동으로 SSL 인증서를 발급합니다.

---

## 🔄 자동 배포 설정

### GitHub Actions (선택사항)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🆘 트러블슈팅

### 빌드 실패

```bash
# 로컬에서 빌드 테스트
npm run build

# 캐시 삭제 후 재빌드
rm -rf .next
npm run build
```

### 환경 변수 오류

1. Vercel Dashboard → Settings → Environment Variables 확인
2. 변수 이름 오타 확인 (대소문자 구분)
3. "Redeploy" 클릭

### 데이터베이스 연결 오류

1. Supabase URL 및 키 확인
2. RLS 정책 검토
3. Supabase Dashboard → Database → Connection pooler 확인

### 도메인 연결 오류

1. DNS 전파 확인 (최대 48시간 소요)
   ```bash
   nslookup www.aiworkground.com
   ```
2. Vercel Dashboard → Domains에서 상태 확인
3. 도메인 제공업체 DNS 설정 재확인

---

## 📱 모니터링

### Vercel Analytics

1. Vercel Dashboard → Analytics 탭
2. Enable Analytics
3. 실시간 트래픽 모니터링

### Error Tracking (선택사항)

Sentry 추가:
```bash
npm install @sentry/nextjs
```

---

## 📞 지원

배포 관련 문제 발생 시:
- 이메일: hello@aiworkground.com
- GitHub Issues: https://github.com/aiworkground/aiworkground-fullstack/issues

---

**🎉 배포 완료 후 https://www.aiworkground.com 에서 확인하세요!**

