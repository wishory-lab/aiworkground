# 🚀 AIWorkGround 개발 환경 설정 가이드

이 가이드는 AIWorkGround 프로젝트를 로컬에서 개발하기 위한 완전한 설정 가이드입니다.

## 📋 사전 요구사항

### 필수 소프트웨어
- **Node.js** 18.0.0 이상
- **npm** 8.0.0 이상
- **Python** 3.11 이상
- **Git**

### 선택적 소프트웨어
- **PostgreSQL** (로컬 개발용, Supabase 사용 시 불필요)
- **Docker** (MCP 서버 컨테이너화용)

---

## 🔧 1단계: 프로젝트 클론 및 의존성 설치

### 1.1 저장소 클론
```bash
git clone https://github.com/aiworkground/aiworkground-fullstack.git
cd aiworkground-fullstack
```

### 1.2 Frontend 의존성 설치
```bash
npm install
# 또는
npm install --legacy-peer-deps  # 의존성 충돌 시
```

### 1.3 Backend 의존성 설치
```bash
# Python 가상환경 생성 (권장)
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# 의존성 설치
cd backend
pip install -r requirements.txt
cd ..
```

---

## 🔑 2단계: 환경 변수 설정

### 2.1 .env 파일 생성
```bash
# .env.example을 .env로 복사
cp .env.example .env
```

### 2.2 각 서비스 API 키 발급

#### Clerk (인증)
1. [Clerk Dashboard](https://dashboard.clerk.com) 접속
2. 새 애플리케이션 생성
3. API Keys 섹션에서 키 복사
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Webhooks 섹션에서 Webhook Secret 복사
   - `CLERK_WEBHOOK_SECRET`

#### Supabase (데이터베이스)
1. [Supabase Dashboard](https://app.supabase.com) 접속
2. 새 프로젝트 생성
3. Settings → API에서 다음 값 복사:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY` (Service Role Key)
4. SQL Editor에서 `database/schema.sql` 실행

#### OpenAI (AI API)
1. [OpenAI Platform](https://platform.openai.com/api-keys) 접속
2. 새 API 키 생성
3. `OPENAI_API_KEY`에 복사

#### Anthropic Claude (AI API)
1. [Anthropic Console](https://console.anthropic.com/) 접속
2. API Keys 섹션에서 새 키 생성
3. `ANTHROPIC_API_KEY`에 복사

#### Stripe (결제)
1. [Stripe Dashboard](https://dashboard.stripe.com/apikeys) 접속
2. Test mode에서 키 복사:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
3. Webhooks 섹션에서 Webhook Secret 복사

### 2.3 .env 파일 완성
`.env` 파일을 열고 모든 값이 올바르게 설정되었는지 확인하세요.

---

## 🗄️ 3단계: 데이터베이스 설정

### 3.1 Supabase 프로젝트 생성
1. [Supabase](https://app.supabase.com)에서 새 프로젝트 생성
2. 프로젝트 이름: `aiworkground`
3. 데이터베이스 비밀번호 설정 (안전하게 저장)

### 3.2 스키마 실행
1. Supabase Dashboard → SQL Editor
2. `database/schema.sql` 파일 내용 복사
3. SQL Editor에 붙여넣고 실행
4. 모든 테이블이 생성되었는지 확인

### 3.3 Row Level Security (RLS) 확인
스키마에 RLS 정책이 포함되어 있습니다. 필요시 추가 정책을 설정하세요.

---

## 🚀 4단계: 개발 서버 실행

### 4.1 Frontend 서버 (Next.js)
```bash
npm run dev
```
서버가 `http://localhost:3000`에서 실행됩니다.

### 4.2 Backend 서버 (FastAPI)
새 터미널 창에서:
```bash
# 가상환경 활성화 (아직 안 했다면)
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Backend 서버 실행
npm run backend
# 또는
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
서버가 `http://localhost:8000`에서 실행됩니다.

### 4.3 MCP 서버 실행 (선택사항)
MCP 서버는 별도로 실행할 수 있습니다:
```bash
# Marketing Server
cd mcp-servers
python marketing_server.py

# Design Server
python design_server.py

# Developer Server
python developer_server.py
```

또는 스크립트 사용:
```bash
# macOS/Linux
bash scripts/run_mcp_servers.sh

# Windows
# PowerShell에서 개별 실행
```

---

## ✅ 5단계: 설정 확인

### 5.1 Health Check
브라우저에서 다음 URL 확인:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/health

### 5.2 데이터베이스 연결 확인
Supabase Dashboard → Table Editor에서 테이블이 생성되었는지 확인

### 5.3 인증 테스트
1. http://localhost:3000 접속
2. Sign Up 버튼 클릭
3. Clerk 인증 플로우 테스트

---

## 🐛 문제 해결

### 의존성 설치 오류
```bash
# Node modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Python 가상환경 문제
```bash
# 가상환경 재생성
rm -rf venv
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r backend/requirements.txt
```

### 포트 충돌
```bash
# 다른 포트 사용
npm run dev -- -p 3001  # Frontend
uvicorn main:app --port 8001  # Backend
```

### 환경 변수 인식 안 됨
1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 서버 재시작
3. 변수명 오타 확인 (대소문자 구분)

---

## 📚 추가 리소스

### 문서
- [Next.js 문서](https://nextjs.org/docs)
- [FastAPI 문서](https://fastapi.tiangolo.com/)
- [Supabase 문서](https://supabase.com/docs)
- [Clerk 문서](https://clerk.com/docs)

### 프로젝트 구조
```
aiworkground-fullstack/
├── app/              # Next.js App Router
├── backend/          # FastAPI 백엔드
├── components/       # React 컴포넌트
├── database/         # 데이터베이스 스키마
├── lib/              # 유틸리티 함수
├── mcp-servers/      # MCP 서버들
└── public/           # 정적 파일
```

---

## 🎯 다음 단계

설정이 완료되면 다음을 진행하세요:
1. [EXECUTION_PLAN.md](./EXECUTION_PLAN.md) 확인
2. 개발 작업 시작
3. 기능 구현 및 테스트

---

**문제가 있나요?** [GitHub Issues](https://github.com/aiworkground/aiworkground-fullstack/issues)에 문의하세요!

