# 🤖 OpenAI API 키 설정 가이드

## 현재 상태

현재 OpenAI API 키가 설정되지 않아 **데모 모드**로 작동하고 있습니다.

## OpenAI API 키 발급

### 1단계: OpenAI 계정 생성
1. [OpenAI Platform](https://platform.openai.com/) 접속
2. 회원가입 또는 로그인
3. 결제 정보 등록 (크레딧 필요)

### 2단계: API 키 생성
1. OpenAI Dashboard → **API Keys** 메뉴
2. "Create new secret key" 클릭
3. 키 이름 입력 (예: `aiworkground-dev`)
4. 키 복사 ⚠️ **한 번만 표시되므로 반드시 저장!**

### 3단계: .env.local 파일 업데이트

`.env.local` 파일을 열어서 다음 줄을 찾아 실제 키로 교체하세요:

```env
# === AI APIS ===
OPENAI_API_KEY=sk-실제_키_값_여기
```

**예시:**
```env
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### 4단계: 서버 재시작

환경 변수를 변경한 후 반드시 서버를 재시작하세요:

```bash
# 현재 서버 종료 (Ctrl+C)
npm run dev
```

## 확인

서버 재시작 후:
1. http://localhost:3000/generate 접속
2. 프롬프트 입력 후 "생성하기" 클릭
3. 실제 AI 생성 결과가 표시되는지 확인
4. "데모 모드" 배지가 "AI 모드"로 변경되는지 확인

## 비용 안내

OpenAI API 사용 시 비용이 발생합니다:

- **GPT-4**: 약 $0.03 / 1K 토큰 (입력), $0.06 / 1K 토큰 (출력)
- **GPT-3.5-turbo**: 약 $0.0015 / 1K 토큰 (입력), $0.002 / 1K 토큰 (출력)

**권장**: 개발 단계에서는 GPT-3.5-turbo 사용을 권장합니다.

## 데모 모드 vs AI 모드

### 데모 모드 (현재)
- OpenAI API 키 없이 작동
- 템플릿 기반 응답
- 빠른 응답
- 실제 AI 생성 아님

### AI 모드 (OpenAI 키 설정 후)
- 실제 GPT 모델 사용
- 프롬프트에 맞는 맞춤 응답
- 더 정확하고 창의적인 결과
- API 비용 발생

## 문제 해결

### 오류: "API key is invalid"
- `.env.local`의 `OPENAI_API_KEY`가 올바른지 확인
- 키가 `sk-`로 시작하는지 확인
- 서버 재시작 확인

### 오류: "Insufficient quota"
- OpenAI 계정에 크레딧이 있는지 확인
- 결제 정보가 등록되어 있는지 확인

### 여전히 데모 모드로 작동
- `.env.local` 파일 저장 확인
- 서버 완전히 재시작 (프로세스 종료 후 다시 시작)
- 브라우저 캐시 삭제

---

**도움이 필요하신가요?** [OpenAI 문서](https://platform.openai.com/docs)를 참고하세요!

