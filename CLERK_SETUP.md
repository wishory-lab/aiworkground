# 🔐 Clerk 설정 가이드

## 문제 해결

현재 `.env.local` 파일에 Clerk 키가 placeholder 값으로 설정되어 있습니다.

## 해결 방법

### 1단계: Clerk 계정 및 키 발급

1. [Clerk Dashboard](https://dashboard.clerk.com) 접속
2. 로그인 또는 회원가입
3. "Create Application" 클릭
4. 애플리케이션 이름 입력 (예: `aiworkground`)
5. 인증 방법 선택 (Email, Google, GitHub 등)
6. "Create" 클릭

### 2단계: API 키 복사

1. Clerk Dashboard에서 생성한 애플리케이션 선택
2. 왼쪽 메뉴에서 **API Keys** 클릭
3. 다음 키들을 복사:
   - **Publishable key** (예: `pk_test_...`)
   - **Secret key** (예: `sk_test_...`)

### 3단계: .env.local 파일 업데이트

`.env.local` 파일을 열어서 다음 값들을 실제 키로 교체하세요:

```env
# === AUTHENTICATION ===
CLERK_SECRET_KEY=sk_test_실제_키_값_여기
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_실제_키_값_여기
```

⚠️ **주의**: 
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`는 `pk_test_` 또는 `pk_live_`로 시작해야 합니다
- `CLERK_SECRET_KEY`는 `sk_test_` 또는 `sk_live_`로 시작해야 합니다
- placeholder 값(`your_clerk_publishable_key_here`)이 아닌 실제 키를 입력하세요

### 4단계: 서버 재시작

환경 변수를 변경한 후 반드시 서버를 재시작하세요:

```bash
# Frontend 서버 재시작
# 현재 실행 중인 서버 종료 (Ctrl+C)
npm run dev
```

### 5단계: 확인

1. 브라우저에서 http://localhost:3000 접속
2. Clerk 오류 메시지가 사라졌는지 확인
3. 회원가입/로그인 버튼이 정상 작동하는지 확인

## Webhook 설정 (선택사항)

사용자 생성/업데이트 이벤트를 받으려면:

1. Clerk Dashboard → **Webhooks** 메뉴
2. "Add Endpoint" 클릭
3. Endpoint URL 입력:
   ```
   http://localhost:3000/api/webhooks/clerk
   ```
   (프로덕션에서는 실제 도메인 사용)
4. Events 선택:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. "Create" 클릭
6. **Signing Secret** 복사
7. `.env.local`에 추가:
   ```env
   CLERK_WEBHOOK_SECRET=whsec_실제_시크릿_값
   ```

## 문제 해결

### 오류: "The publishableKey passed to Clerk is invalid"
- `.env.local`의 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`가 실제 키인지 확인
- `pk_test_` 또는 `pk_live_`로 시작하는지 확인
- 서버 재시작 확인

### 오류: "Clerk key is still placeholder"
- `.env.local` 파일에서 `your_clerk_publishable_key_here`를 실제 키로 교체
- 파일 저장 후 서버 재시작

### 환경 변수가 인식되지 않음
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 변수명 오타 확인 (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
3. 서버 완전히 재시작 (프로세스 종료 후 다시 시작)

## 테스트

Clerk 설정이 완료되면:

1. http://localhost:3000 접속
2. "Sign Up" 또는 "Sign In" 버튼 클릭
3. Clerk 인증 플로우가 정상 작동하는지 확인
4. 회원가입 후 대시보드 접속 확인

---

**도움이 필요하신가요?** [Clerk 문서](https://clerk.com/docs)를 참고하세요!

