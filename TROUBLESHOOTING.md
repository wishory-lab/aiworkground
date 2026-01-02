# 🔧 Vercel 배포 트러블슈팅 가이드

## 현재 상황

모든 배포가 Error 상태입니다. 다음 단계를 따라 문제를 해결하세요.

## 1. 최신 배포 로그 확인

Vercel 대시보드에서:
1. 가장 최신 배포 클릭
2. "Build Logs" 탭 확인
3. 에러 메시지 확인

## 2. 일반적인 빌드 에러 해결

### 타입 에러
- ✅ **수정 완료**: `app/api/ai/generate/route.ts`의 타입 에러 수정
- 최신 커밋: `191faf0 - Fix TypeScript type error by using separate profileId variable`

### 환경 변수 누락
Vercel Dashboard → Settings → Environment Variables에서 확인:

**필수 환경 변수:**
```env
NEXT_PUBLIC_SITE_URL=https://www.aiworkground.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
OPENAI_API_KEY=sk-...
```

### Import 경로 에러
- `@/lib/supabase` 경로가 올바른지 확인
- `tsconfig.json`의 `paths` 설정 확인

## 3. 수동 재배포

### 방법 1: Vercel 대시보드에서
1. Vercel Dashboard → Deployments
2. 최신 배포 옆 "..." 메뉴 클릭
3. "Redeploy" 선택

### 방법 2: Git Push로 트리거
```bash
# 빈 커밋으로 재배포 트리거
git commit --allow-empty -m "Trigger redeploy"
git push
```

## 4. 빌드 로그에서 확인할 항목

### 성공적인 빌드 로그:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Creating an optimized production build
```

### 실패하는 경우:
- 타입 에러: `Type error: ...`
- 환경 변수 에러: `Missing environment variable: ...`
- Import 에러: `Cannot find module: ...`

## 5. 빠른 체크리스트

- [ ] 최신 코드가 GitHub에 푸시되었는지 확인
- [ ] Vercel이 최신 커밋을 감지했는지 확인
- [ ] 모든 필수 환경 변수가 설정되었는지 확인
- [ ] 빌드 로그에서 구체적인 에러 메시지 확인
- [ ] `next.config.js` 설정이 올바른지 확인

## 6. 추가 디버깅

### 로컬에서 빌드 테스트
```bash
# .next 폴더 삭제
rm -rf .next

# 빌드 실행
npm run build
```

### 타입 체크만 실행
```bash
npm run type-check
```

## 7. 여전히 실패하는 경우

1. **Vercel 지원팀에 문의**
   - Vercel Dashboard → Help → Contact Support
   - 빌드 로그 전체 복사하여 첨부

2. **GitHub Issues 확인**
   - 프로젝트 저장소의 Issues 확인
   - 유사한 문제가 있는지 검색

3. **환경 변수 재확인**
   - 모든 키가 올바른지 확인
   - 프로덕션 키를 사용하는지 확인 (테스트 키 아님)

---

**💡 팁**: 최신 배포 로그의 정확한 에러 메시지를 공유해주시면 더 구체적인 해결책을 제시할 수 있습니다.

