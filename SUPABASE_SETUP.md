# 🗄️ Supabase 설정 가이드

## 1단계: Supabase 프로젝트 생성

### 1.1 프로젝트 생성
1. [Supabase Dashboard](https://app.supabase.com) 접속
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: `aiworkground`
   - **Database Password**: 안전한 비밀번호 설정 ⚠️ **반드시 저장해두세요!**
   - **Region**: 가장 가까운 지역 선택 (예: Northeast Asia (Seoul))
4. "Create new project" 클릭
5. 프로젝트 생성 완료 대기 (약 2-3분)

### 1.2 API 키 확인
프로젝트 생성 완료 후:

1. **Settings** → **API** 메뉴로 이동
2. 다음 값들을 복사:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key (secret) → `SUPABASE_SERVICE_KEY`

## 2단계: 환경 변수 업데이트

`.env.local` 파일을 열어서 다음 값들을 업데이트하세요:

```env
# === DATABASE ===
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQxNzY5MzIwLCJleHAiOjE5NTczNDUzMjB9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2NDE3NjkzMjAsImV4cCI6MTk1NzM0NTMyMH0...
```

⚠️ **주의**: `SUPABASE_SERVICE_KEY`는 절대 공개하지 마세요! 서버 사이드에서만 사용합니다.

## 3단계: 데이터베이스 스키마 실행

### 3.1 SQL Editor 열기
1. Supabase Dashboard에서 프로젝트 선택
2. 왼쪽 메뉴에서 **SQL Editor** 클릭
3. **New query** 클릭

### 3.2 스키마 파일 복사
1. 프로젝트의 `database/schema.sql` 파일 열기
2. 전체 내용 복사 (Ctrl+A, Ctrl+C)

### 3.3 스키마 실행
1. SQL Editor에 붙여넣기 (Ctrl+V)
2. **Run** 버튼 클릭 (또는 Ctrl+Enter)
3. 성공 메시지 확인:
   ```
   Success. No rows returned
   ```

### 3.4 테이블 확인
1. 왼쪽 메뉴에서 **Table Editor** 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - ✅ `users`
   - ✅ `teams`
   - ✅ `team_members`
   - ✅ `ai_tasks`
   - ✅ `task_results`
   - ✅ `platform_integrations`
   - ✅ `subscriptions`
   - ✅ `usage_tracking`
   - ✅ `api_keys`
   - ✅ `webhooks`
   - ✅ `audit_logs`

## 4단계: Row Level Security (RLS) 확인

스키마에 RLS 정책이 포함되어 있습니다. 확인 방법:

1. **Authentication** → **Policies** 메뉴로 이동
2. 각 테이블에 정책이 설정되어 있는지 확인:
   - `users` - "Users can view their own data"
   - `ai_tasks` - "Users can access their own tasks"
   - `task_results` - "Users can access their own task results"
   - `platform_integrations` - "Users can access their own integrations"

## 5단계: 연결 테스트

### 5.1 Backend 서버 재시작
환경 변수를 업데이트한 후 Backend 서버를 재시작하세요:

```bash
# Backend 서버 종료 (Ctrl+C)
# 다시 시작
cd C:\aiworkground-fullstack
npm run backend
```

### 5.2 Health Check
브라우저에서 다음 URL 접속:
- http://localhost:8000/health

응답 예시:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00",
  "version": "1.0.0"
}
```

### 5.3 API 문서 확인
- http://localhost:8000/docs

## 문제 해결

### 오류: "Database not available"
- `.env.local`의 `SUPABASE_URL`과 `SUPABASE_SERVICE_KEY` 확인
- Backend 서버 재시작

### 오류: "Invalid API key"
- API 키가 올바르게 복사되었는지 확인
- 공백이나 줄바꿈이 없는지 확인

### 오류: "Table does not exist"
- SQL Editor에서 스키마가 성공적으로 실행되었는지 확인
- Table Editor에서 테이블 목록 확인

### RLS 정책 오류
- Authentication → Policies에서 정책 확인
- 필요시 `database/schema.sql`의 RLS 부분 다시 실행

## 다음 단계

Supabase 설정이 완료되면:
1. ✅ Backend 서버 재시작
2. ✅ Health Check 테스트
3. ✅ Frontend에서 회원가입/로그인 테스트
4. ✅ AI 작업 생성 테스트

---

**도움이 필요하신가요?** [Supabase 문서](https://supabase.com/docs)를 참고하세요!

