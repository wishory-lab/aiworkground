# 🚀 AIWorkGround 빠른 시작 가이드

## ✅ 현재 상태

### 완료된 작업
- ✅ 프로젝트 정리 및 구조화
- ✅ 개발 환경 설정 문서 작성
- ✅ 환경 변수 설정 (Clerk, OpenAI, Supabase)
- ✅ Backend 의존성 설치
- ✅ 개발 서버 실행 스크립트 준비

## 🎯 빠른 시작 (3단계)

### 1단계: 개발 서버 실행

#### Frontend (Next.js)
```bash
cd C:\aiworkground-fullstack
npm run dev
```
→ http://localhost:3000 에서 확인

#### Backend (FastAPI)
```bash
# 새 터미널 창에서
cd C:\aiworkground-fullstack
npm run backend
```
→ http://localhost:8000/docs 에서 API 문서 확인

#### MCP Servers (선택사항)
```bash
# 새 터미널 창에서
cd C:\aiworkground-fullstack
.\scripts\run_mcp_servers.ps1 start
```

### 2단계: Supabase 설정

1. **프로젝트 생성**
   - [Supabase Dashboard](https://app.supabase.com) 접속
   - "New Project" 클릭
   - 프로젝트 이름: `aiworkground`
   - Database Password 설정 (저장해두세요!)

2. **API 키 복사**
   - Settings → API
   - 다음 값들을 `.env.local`에 업데이트:
     ```
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

3. **스키마 실행**
   - SQL Editor 열기
   - `database/schema.sql` 파일 내용 복사
   - 붙여넣기 후 "Run" 클릭
   - Table Editor에서 테이블 생성 확인

### 3단계: 기능 테스트

1. **인증 테스트**
   - http://localhost:3000 접속
   - "Sign Up" 클릭
   - Clerk 인증 완료
   - 대시보드 접속 확인

2. **AI 작업 생성**
   - 대시보드에서 "Create Task" 클릭
   - 작업 타입 선택 (Marketing/Design/Development)
   - 작업 생성 및 처리 확인

## 📋 유용한 명령어

### 개발 서버
```bash
# Frontend만 실행
npm run dev

# Frontend + Backend 동시 실행
npm run dev:all

# Backend만 실행
npm run backend
```

### MCP 서버 관리
```bash
# 시작
.\scripts\run_mcp_servers.ps1 start

# 상태 확인
.\scripts\run_mcp_servers.ps1 status

# 중지
.\scripts\run_mcp_servers.ps1 stop

# 로그 확인
.\scripts\run_mcp_servers.ps1 logs marketing
```

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 타입 체크
npm run type-check

# 린트
npm run lint
```

## 🔧 문제 해결

### 포트 충돌
```bash
# 다른 포트 사용
npm run dev -- -p 3001  # Frontend
uvicorn main:app --port 8001  # Backend
```

### 환경 변수 인식 안 됨
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 서버 재시작
3. 변수명 오타 확인

### 의존성 오류
```bash
# Node modules 재설치
rm -rf node_modules package-lock.json
npm install

# Python 의존성 재설치
.\venv\Scripts\pip.exe install -r backend\requirements.txt
```

## 📚 추가 문서

- [SETUP.md](./SETUP.md) - 상세한 개발 환경 설정
- [DEVELOPMENT.md](./DEVELOPMENT.md) - 개발 워크플로우
- [NEXT_STEPS.md](./NEXT_STEPS.md) - 다음 단계 가이드
- [EXECUTION_PLAN.md](./EXECUTION_PLAN.md) - 전체 실행 계획

## 🎉 다음 단계

1. **Supabase 프로젝트 생성** (가장 중요!)
2. **개발 서버 실행 및 테스트**
3. **기본 기능 테스트**
4. **EXECUTION_PLAN.md의 다음 단계 진행**

---

**질문이 있나요?** [GitHub Issues](https://github.com/aiworkground/aiworkground-fullstack/issues)에 문의하세요!

