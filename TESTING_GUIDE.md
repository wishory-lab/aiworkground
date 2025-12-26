# WorkflowAI 테스트 실행 가이드

## 🚀 빠른 시작 가이드

### 사전 준비사항
1. **Node.js 18+** 설치 확인: `node --version`
2. **Python 3.8+** 설치 확인: `python3 --version`  
3. **Git** 설치 확인: `git --version`

### 1단계: 환경 설정
```bash
# 프로젝트 디렉토리로 이동
cd workflow-ai-fullstack

# 환경 설정 스크립트 실행 (대화형)
./setup.sh
```

**설정 중 필요한 정보:**
- ✅ **Supabase**: 무료 계정 생성 → 새 프로젝트 → URL & 키 복사
- ✅ **Clerk**: 무료 계정 생성 → 애플리케이션 생성 → 키 복사  
- ✅ **OpenAI**: API 키 생성 (유료, $5 크레딧 추천)
- ✅ **Stripe**: 무료 테스트 계정 → API 키 생성

### 2단계: 데이터베이스 설정
```bash
# Supabase 웹 대시보드에서 SQL 에디터 열기
# database/schema.sql 파일 내용 복사 & 실행
```

### 3단계: 개발 서버 실행
```bash
# 모든 서비스 동시 실행
./start-dev.sh
```

서비스 확인:
- 🎨 **프론트엔드**: http://localhost:3000
- 🔧 **백엔드 API**: http://localhost:8000  
- 🤖 **MCP 서버들**: 8001, 8002, 8003

---

## 🧪 테스트 시나리오

### 시나리오 1: 마케팅 콘텐츠 생성
1. http://localhost:3000 접속
2. Clerk로 회원가입/로그인
3. "마케팅" 탭 클릭
4. "새 콘텐츠 생성" 에서:
   - 유형: 블로그 포스트
   - 주제: "AI 생산성 도구"  
   - 길이: 보통
5. "AI 콘텐츠 생성" 버튼 클릭
6. **결과**: 실시간 진행률 → 완성된 블로그 포스트

### 시나리오 2: 디자인 이미지 생성
1. "디자인" 탭 클릭
2. "새 디자인 생성" 에서:
   - 유형: 로고 디자인
   - 설명: "현대적인 AI 회사 로고"
   - 스타일: 미니멀
3. "AI 디자인 생성" 버튼 클릭  
4. **결과**: 진행률 표시 → 생성된 이미지

### 시나리오 3: 코드 리뷰
1. "개발" 탭 클릭
2. 코드 입력란에 JavaScript 함수 입력
3. 언어: JavaScript 선택
4. "AI 코드 분석" 버튼 클릭
5. **결과**: 코드 품질 점수, 개선 제안, 버그 리포트

---

## 🐞 문제 해결 가이드

### 문제 1: "API 서버 연결 실패"
**원인**: 백엔드 서버가 실행되지 않음
```bash
# 해결방법
cd backend
source venv/bin/activate  
python3 -m uvicorn main:app --reload --port 8000
```

### 문제 2: "MCP 서버 오류"
**원인**: MCP 서버가 시작되지 않음
```bash  
# 상태 확인
./scripts/run_mcp_servers.sh status

# 로그 확인
./scripts/run_mcp_servers.sh logs marketing

# 재시작
./scripts/run_mcp_servers.sh restart
```

### 문제 3: "데이터베이스 연결 오류"
**원인**: Supabase 설정 잘못됨
1. `.env` 파일에서 `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` 확인
2. Supabase 대시보드에서 API 키 재생성
3. `database/schema.sql` 파일을 Supabase에서 실행했는지 확인

### 문제 4: "OpenAI API 오류"  
**원인**: API 키 또는 크레딧 부족
1. OpenAI 계정에서 API 키 상태 확인
2. 사용량 및 한도 확인
3. 결제 정보 등록 (최소 $5 권장)

---

## 📊 성능 체크리스트

### ✅ 기본 기능
- [ ] 회원가입/로그인 (Clerk)
- [ ] 대시보드 로딩 및 통계 표시
- [ ] 3개 AI 모듈 탭 전환
- [ ] API 연결 상태 표시

### ✅ 마케팅 AI
- [ ] 콘텐츠 유형 선택 (블로그, SNS, 이메일 등)
- [ ] AI 생성 요청 및 진행률 표시  
- [ ] 생성 결과 표시 (텍스트, 워드수, SEO 점수)
- [ ] 복사/다운로드 기능

### ✅ 디자인 AI  
- [ ] 이미지 유형 선택 (로고, 배너, 포스터 등)
- [ ] 프롬프트 입력 및 스타일 선택
- [ ] 이미지 생성 시뮬레이션
- [ ] 갤러리 및 브랜드 키트 탐색

### ✅ 개발 AI
- [ ] 코드 입력 및 언어 선택
- [ ] 코드 리뷰 결과 (점수, 이슈, 제안)
- [ ] 테스트 코드 생성
- [ ] 문서화 자동 생성

---

## 🚀 배포 준비

### 개발 환경 → 프로덕션 전환
```bash
# 환경 변수 업데이트
cp .env .env.production
# .env.production에서 프로덕션 URL들로 변경

# 프로덕션 빌드
npm run build

# Docker 컨테이너로 실행
docker-compose up -d
```

### 필수 프로덕션 설정
1. **도메인 & SSL**: Let's Encrypt 또는 Cloudflare
2. **환경 변수**: 프로덕션 API 키들로 교체
3. **데이터베이스**: Supabase Pro 플랜 (또는 자체 PostgreSQL)
4. **모니터링**: Sentry, LogRocket 등
5. **백업**: 데이터베이스 백업 자동화

---

## 📈 성능 벤치마크

### 목표 성능 지표
- **페이지 로딩**: < 2초
- **API 응답**: < 500ms
- **AI 작업 처리**: < 30초  
- **실시간 업데이트**: < 1초
- **동시 사용자**: 100명+

### 모니터링 지표
```bash
# API 응답 시간 체크
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8000/health

# MCP 서버 상태 체크  
./scripts/run_mcp_servers.sh health

# 메모리/CPU 사용률
docker stats
```

---

## 🎯 다음 단계 (선택사항)

### 고급 기능 추가
1. **실시간 협업**: WebSocket 통합
2. **파일 업로드**: AWS S3 또는 Supabase Storage
3. **이메일 알림**: Resend 또는 SendGrid  
4. **결제 시스템**: Stripe 구독 활성화
5. **분석**: Google Analytics, Mixpanel

### 마케팅 & 런칭
1. **랜딩 페이지**: Next.js로 마케팅 사이트
2. **Product Hunt**: 제품 등록 및 런칭
3. **소셜 미디어**: Twitter, LinkedIn 마케팅
4. **커뮤니티**: Discord, Slack 통합

---

**🎉 축하합니다! WorkflowAI가 완전히 작동하는 상태입니다!**