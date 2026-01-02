# 🛠️ AIWorkGround 개발 가이드

이 문서는 AIWorkGround 프로젝트의 개발 워크플로우와 모범 사례를 설명합니다.

## 📁 프로젝트 구조

```
aiworkground-fullstack/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # 대시보드 페이지
│   ├── features/          # 기능 소개 페이지
│   ├── pricing/           # 요금제 페이지
│   └── layout.tsx         # 루트 레이아웃
├── backend/               # FastAPI 백엔드
│   ├── main.py            # 메인 API 서버
│   └── requirements.txt   # Python 의존성
├── components/            # React 컴포넌트
├── database/              # 데이터베이스 스키마
│   └── schema.sql         # Supabase 스키마
├── lib/                   # 유틸리티 함수
│   └── supabase.ts         # Supabase 클라이언트
├── mcp-servers/           # MCP 서버들
│   ├── marketing_server.py
│   ├── design_server.py
│   └── developer_server.py
├── scripts/               # 유틸리티 스크립트
│   ├── run_mcp_servers.sh # Linux/Mac MCP 서버 실행
│   └── run_mcp_servers.ps1 # Windows MCP 서버 실행
└── public/                # 정적 파일
```

## 🚀 개발 워크플로우

### 1. 개발 서버 시작

#### Frontend (Next.js)
```bash
npm run dev
```
- 포트: http://localhost:3000
- 핫 리로드 자동 활성화

#### Backend (FastAPI)
```bash
npm run backend
# 또는
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
- 포트: http://localhost:8000
- API 문서: http://localhost:8000/docs

#### MCP 서버들
```bash
# Windows (PowerShell)
.\scripts\run_mcp_servers.ps1 start

# Linux/Mac
bash scripts/run_mcp_servers.sh start
```

### 2. 동시 실행 (권장)

모든 서버를 동시에 실행하려면:
```bash
# 새 터미널 창에서 각각 실행
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run backend

# Terminal 3: MCP Servers
.\scripts\run_mcp_servers.ps1 start  # Windows
# 또는
bash scripts/run_mcp_servers.sh start  # Linux/Mac
```

## 🧪 테스팅

### API 테스트
```bash
# Health check
curl http://localhost:8000/health

# API 문서 확인
# 브라우저에서 http://localhost:8000/docs 접속
```

### MCP 서버 테스트
```bash
# Windows
.\scripts\run_mcp_servers.ps1 status

# Linux/Mac
bash scripts/run_mcp_servers.sh status
```

## 📝 코딩 컨벤션

### TypeScript/React
- **컴포넌트**: PascalCase (예: `Navbar.tsx`)
- **함수**: camelCase (예: `getUserProfile`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_RETRIES`)
- **타입**: PascalCase (예: `UserProfile`)

### Python
- **모듈**: snake_case (예: `marketing_server.py`)
- **함수**: snake_case (예: `process_ai_task`)
- **클래스**: PascalCase (예: `TaskResponse`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_RETRIES`)

### 파일 구조
- 한 파일당 하나의 주요 기능
- 관련 기능은 같은 디렉토리에 그룹화
- 재사용 가능한 컴포넌트는 `components/` 디렉토리에

## 🔍 디버깅

### Frontend 디버깅
1. 브라우저 개발자 도구 사용
2. `console.log()` 활용
3. React DevTools 확장 프로그램 사용

### Backend 디버깅
1. FastAPI 자동 생성 API 문서 활용 (`/docs`)
2. 로깅 사용:
```python
import logging
logger = logging.getLogger(__name__)
logger.info("Debug message")
```

### MCP 서버 디버깅
```bash
# 로그 확인
.\scripts\run_mcp_servers.ps1 logs marketing
.\scripts\run_mcp_servers.ps1 logs design
.\scripts\run_mcp_servers.ps1 logs developer
```

## 🗄️ 데이터베이스 작업

### 스키마 변경
1. `database/schema.sql` 파일 수정
2. Supabase Dashboard → SQL Editor에서 실행
3. 마이그레이션 문서 작성 (선택사항)

### 데이터 확인
```sql
-- Supabase SQL Editor에서 실행
SELECT * FROM users LIMIT 10;
SELECT * FROM ai_tasks ORDER BY created_at DESC LIMIT 10;
```

## 🔐 환경 변수 관리

### 개발 환경
- `.env.local` 파일 사용 (Git에 커밋하지 않음)
- `.env.example` 참고하여 필요한 변수 설정

### 프로덕션 환경
- Vercel 환경 변수 설정 사용
- 민감한 정보는 절대 코드에 포함하지 않음

## 📦 의존성 관리

### Frontend
```bash
# 새 패키지 추가
npm install package-name

# 패키지 제거
npm uninstall package-name

# 의존성 업데이트
npm update
```

### Backend
```bash
# 새 패키지 추가
pip install package-name
pip freeze > backend/requirements.txt

# 패키지 제거
pip uninstall package-name
pip freeze > backend/requirements.txt
```

## 🚢 배포 전 체크리스트

- [ ] 모든 테스트 통과
- [ ] 환경 변수 설정 확인
- [ ] 데이터베이스 스키마 최신화
- [ ] 빌드 오류 없음 (`npm run build`)
- [ ] API 문서 확인
- [ ] 보안 취약점 점검
- [ ] 성능 최적화 확인

## 🐛 일반적인 문제 해결

### 포트 충돌
```bash
# 다른 포트 사용
npm run dev -- -p 3001
uvicorn main:app --port 8001
```

### 의존성 오류
```bash
# Node modules 재설치
rm -rf node_modules package-lock.json
npm install

# Python 가상환경 재생성
rm -rf venv
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r backend/requirements.txt
```

### 환경 변수 인식 안 됨
1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 서버 재시작
3. 변수명 오타 확인

## 📚 추가 리소스

- [Next.js 문서](https://nextjs.org/docs)
- [FastAPI 문서](https://fastapi.tiangolo.com/)
- [Supabase 문서](https://supabase.com/docs)
- [Clerk 문서](https://clerk.com/docs)

---

**질문이 있나요?** [GitHub Issues](https://github.com/aiworkground/aiworkground-fullstack/issues)에 문의하세요!

