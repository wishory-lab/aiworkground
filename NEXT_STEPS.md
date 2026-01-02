# 🚀 AIWorkGround 다음 단계 가이드

## ✅ 완료된 작업
- [x] 프로젝트 정리
- [x] 개발 환경 설정 문서 작성
- [x] 백엔드 API 개선
- [x] 환경 변수 설정 (Clerk, OpenAI, Supabase)

## 📋 다음 단계

### 1. Supabase 프로젝트 설정 (우선순위: 높음)

#### 1.1 Supabase 프로젝트 생성
1. [Supabase Dashboard](https://app.supabase.com) 접속
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `aiworkground`
   - Database Password: 안전한 비밀번호 설정 (저장해두세요!)
   - Region: 가장 가까운 지역 선택
4. 프로젝트 생성 완료 대기 (약 2분)

#### 1.2 API 키 복사
1. Supabase Dashboard → Settings → API
2. 다음 값들을 `.env.local`에 업데이트:
   - `SUPABASE_URL` → Project URL
   - `SUPABASE_ANON_KEY` → anon public key
   - `SUPABASE_SERVICE_KEY` → service_role key (secret)

#### 1.3 데이터베이스 스키마 실행
1. Supabase Dashboard → SQL Editor
2. `database/schema.sql` 파일 내용 전체 복사
3. SQL Editor에 붙여넣기
4. "Run" 버튼 클릭
5. 모든 테이블이 생성되었는지 확인:
   - Table Editor에서 다음 테이블 확인:
     - `users`
     - `teams`
     - `ai_tasks`
     - `task_results`
     - `platform_integrations`
     - `subscriptions`

### 2. 개발 서버 실행 확인

#### 2.1 Frontend 서버
```bash
# 이미 실행 중일 수 있음
# 새 터미널에서 확인
curl http://localhost:3000
```

#### 2.2 Backend 서버
```bash
# 새 터미널에서
cd C:\aiworkground-fullstack
npm run backend
```

#### 2.3 MCP 서버 (선택사항)
```bash
# 새 터미널에서
cd C:\aiworkground-fullstack
.\scripts\run_mcp_servers.ps1 start
```

### 3. 기본 기능 테스트

#### 3.1 인증 테스트
1. 브라우저에서 http://localhost:3000 접속
2. "Sign Up" 버튼 클릭
3. Clerk 인증 플로우 진행
4. 회원가입 완료 후 대시보드 접속 확인

#### 3.2 AI 작업 생성 테스트
1. 대시보드에서 "Create Task" 클릭
2. 작업 타입 선택 (Marketing/Design/Development)
3. 작업 생성 및 처리 확인

### 4. 문제 해결

#### 환경 변수 인식 안 됨
- 서버 재시작 필요
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 변수명 오타 확인

#### Supabase 연결 오류
- API 키가 올바른지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- RLS 정책 확인

#### Clerk 인증 오류
- Clerk Dashboard에서 애플리케이션 설정 확인
- Webhook URL 설정 확인 (필요시)

## 🎯 체크리스트

### Supabase 설정
- [ ] Supabase 프로젝트 생성
- [ ] API 키 복사 및 `.env.local` 업데이트
- [ ] `database/schema.sql` 실행
- [ ] 테이블 생성 확인

### 개발 서버
- [ ] Frontend 서버 실행 확인 (http://localhost:3000)
- [ ] Backend 서버 실행 확인 (http://localhost:8000)
- [ ] MCP 서버 실행 확인 (선택사항)

### 기능 테스트
- [ ] 회원가입/로그인 테스트
- [ ] AI 작업 생성 테스트
- [ ] 데이터베이스 연동 확인

## 📚 참고 문서

- [SETUP.md](./SETUP.md) - 개발 환경 설정
- [DEVELOPMENT.md](./DEVELOPMENT.md) - 개발 가이드
- [EXECUTION_PLAN.md](./EXECUTION_PLAN.md) - 전체 실행 계획

---

**다음 작업**: Supabase 프로젝트 설정부터 시작하세요!

