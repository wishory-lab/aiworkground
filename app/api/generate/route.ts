import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let category = '글쓰기'
  let prompt = ''
  
  try {
    const body = await req.json()
    category = body.category || '글쓰기'
    prompt = body.prompt || ''

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: '프롬프트를 입력해주세요.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey || apiKey.includes('your_openai') || apiKey.includes('placeholder')) {
      // API 키가 없으면 데모 모드로 작동
      console.log('⚠️ OPENAI_API_KEY not found. Running in DEMO mode.')
      return getDemoResponse(category, prompt)
    }

    // OpenAI API 호출
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `당신은 ${category} 분야의 전문가입니다. 사용자의 요청에 따라 고품질의 콘텐츠를 생성해주세요. 
            
응답 가이드:
- 글쓰기: 블로그, SNS, 이메일 등 다양한 형식으로 작성
- 디자인: 컨셉, 컬러, 레이아웃 등 구체적인 디자인 제안
- 코딩: 주석이 포함된 실행 가능한 코드 작성
- 분석: 데이터 인사이트와 시각화 제안
- 마케팅: 전략, 카피, 캠페인 아이디어
- 기타: 요청에 맞는 전문적인 답변

마크다운 형식으로 구조화하여 작성해주세요.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API Error:', error)
      
      // API 에러 시 데모 모드로 폴백
      return getDemoResponse(category, prompt)
    }

    const data = await response.json()
    const result = data.choices[0]?.message?.content || '생성 실패'

    return NextResponse.json({ 
      result,
      mode: 'ai',
      model: 'gpt-4'
    })

  } catch (error: any) {
    console.error('Generate API Error:', error)
    
    // 에러 발생 시 데모 모드로 폴백
    try {
      // 요청 본문을 다시 읽기 위해 클론 필요 (이미 읽었을 수 있음)
      const clonedReq = req.clone()
      const body = await clonedReq.json().catch(() => ({ category: '글쓰기', prompt: '' }))
      return getDemoResponse(body.category || '글쓰기', body.prompt || '')
    } catch (parseError) {
      // JSON 파싱 실패 시 기본 데모 응답
      return getDemoResponse('글쓰기', '')
    }
  }
}

// 데모 응답 (API 키 없거나 에러 시)
function getDemoResponse(category: string, prompt: string) {
  const demoResults: Record<string, string> = {
    '글쓰기': `# ${prompt.slice(0, 50)}...

## 소개

AI 기술의 발전으로 우리 삶은 급격하게 변화하고 있습니다. 이제 AI는 단순한 도구를 넘어 창작의 파트너로 자리잡고 있습니다.

## 주요 내용

### 1. 현재 트렌드
- 생성형 AI의 대중화
- 개인화된 콘텐츠 제작
- 실시간 번역 및 요약

### 2. 활용 방안
AI를 활용하면 다음과 같은 이점이 있습니다:
- 시간 절약: 반복 작업 자동화
- 품질 향상: 전문가 수준의 결과물
- 창의성 확장: 새로운 아이디어 발견

### 3. 미래 전망
AI 기술은 계속 발전하여 더욱 정교하고 인간적인 결과물을 만들어낼 것입니다.

## 결론

AI는 우리의 경쟁자가 아닌 협력자입니다. 적극적으로 활용하여 더 나은 미래를 만들어갑시다.

---
*📌 이 글은 AIWorkGround에서 생성되었습니다.*`,

    '디자인': `# 디자인 컨셉 제안

${prompt}

## 컨셉 1: Modern Minimalism

**컬러 팔레트**
- Primary: #2C3E50 (Dark Blue)
- Secondary: #ECF0F1 (Light Gray)
- Accent: #3498DB (Bright Blue)

**핵심 요소**
- 깔끔한 타이포그래피
- 넉넉한 여백 (White Space)
- 기하학적 패턴

**적용 방법**
1. 로고: 심플한 선과 형태
2. 레이아웃: 그리드 시스템
3. 이미지: 고품질 사진 위주

---

## 컨셉 2: Bold & Vibrant

**컬러 팔레트**
- Primary: #E74C3C (Red)
- Secondary: #F39C12 (Orange)
- Accent: #9B59B6 (Purple)

**핵심 요소**
- 강렬한 색상 대비
- 큰 타이포그래피
- 동적인 레이아웃

**적용 방법**
1. 로고: 굵은 서체와 생동감
2. 레이아웃: 비대칭 구성
3. 이미지: 일러스트레이션 활용

---

## 컨셉 3: Natural & Organic

**컬러 팔레트**
- Primary: #27AE60 (Green)
- Secondary: #D4A574 (Beige)
- Accent: #7F8C8D (Gray)

**핵심 요소**
- 자연스러운 질감
- 부드러운 곡선
- 따뜻한 색감

**적용 방법**
1. 로고: 유기적인 형태
2. 레이아웃: 유동적인 배치
3. 이미지: 자연 소재 사진

---

*🎨 더 구체적인 디자인이 필요하면 AIWorkGround Pro를 이용해보세요!*`,

    '코딩': `# 코드 생성 결과

요청: ${prompt}

\`\`\`javascript
// AIWorkGround - 자동 생성 코드

/**
 * 메인 함수
 * @description ${prompt.slice(0, 50)}
 */
function main() {
  // 1. 초기 설정
  const config = {
    version: '1.0.0',
    author: 'AIWorkGround',
    date: new Date().toISOString()
  };
  
  console.log('🚀 프로그램 시작:', config);
  
  // 2. 데이터 처리
  const data = processData();
  
  // 3. 결과 출력
  displayResult(data);
  
  return data;
}

/**
 * 데이터 처리 함수
 */
function processData() {
  const rawData = [1, 2, 3, 4, 5];
  
  // 데이터 변환
  const processed = rawData.map(item => ({
    id: item,
    value: item * 2,
    timestamp: Date.now()
  }));
  
  return processed;
}

/**
 * 결과 출력 함수
 */
function displayResult(data) {
  console.log('📊 처리 결과:');
  console.table(data);
  
  const summary = {
    total: data.length,
    sum: data.reduce((acc, item) => acc + item.value, 0)
  };
  
  console.log('✅ 요약:', summary);
}

// 실행
main();
\`\`\`

## 사용 방법

1. **설치**
\`\`\`bash
npm install
\`\`\`

2. **실행**
\`\`\`bash
node app.js
\`\`\`

3. **테스트**
\`\`\`bash
npm test
\`\`\`

## 주요 기능

✅ 데이터 처리  
✅ 결과 출력  
✅ 에러 핸들링  

---

*💻 더 복잡한 코드가 필요하면 구체적인 요구사항을 알려주세요!*`,

    '분석': `# 데이터 분석 결과

**분석 주제**: ${prompt}

## 📊 핵심 인사이트

### 1. 주요 트렌드
- 📈 성장률: +156%
- 👥 사용자 증가: 2M → 5M
- 💰 매출 증가: $10M → $25M

### 2. 세그먼트 분석

| 구분 | 비율 | 성장률 |
|------|------|--------|
| 신규 사용자 | 35% | +203% |
| 재방문 사용자 | 45% | +128% |
| 유료 전환 | 20% | +89% |

### 3. 지역별 현황

**북미**: 45% (가장 큰 시장)  
**유럽**: 30% (빠른 성장)  
**아시아**: 25% (신흥 시장)

### 4. 사용자 행동 패턴

- 평균 세션 시간: 12분
- 페이지뷰/방문: 8.3
- 이탈률: 23% (↓15%)

## 💡 개선 제안

1. **모바일 최적화**
   - 모바일 사용자 비중 증가 (60%)
   - 반응형 디자인 강화 필요

2. **개인화 기능**
   - AI 추천 시스템 도입
   - 사용자별 맞춤 콘텐츠

3. **커뮤니티 활성화**
   - 사용자 간 소통 채널
   - 피드백 수집 강화

## 📈 예상 효과

- 사용자 증가: +40%
- 참여도 향상: +25%
- 전환율 개선: +15%

---

*📊 더 자세한 분석이 필요하면 AIWorkGround Analytics를 이용해보세요!*`,

    '마케팅': `# 마케팅 캠페인 전략

**캠페인 주제**: ${prompt}

## 🎯 캠페인 개요

**목표**: 브랜드 인지도 +30%, 전환율 +20%  
**기간**: 3개월  
**예산**: $50,000  

## 📱 채널별 전략

### 1. 소셜 미디어 (40% 예산)

**Instagram**
- 릴스 콘텐츠 주 3회 발행
- 인플루언서 협업 (팔로워 10K+)
- 해시태그: #AIWorkGround #CreativeAI

**TikTok**
- 숏폼 비디오 (15-30초)
- 챌린지 캠페인 기획
- UGC (사용자 생성 콘텐츠) 활용

### 2. 콘텐츠 마케팅 (30% 예산)

**블로그**
- SEO 최적화 글 주 2회
- 키워드: "AI 창작 도구", "콘텐츠 생성 AI"

**유튜브**
- 튜토리얼 영상 (10-15분)
- 사용자 성공 스토리

### 3. 이메일 마케팅 (20% 예산)

**시퀀스 구성**
1. Welcome 이메일 (가입 즉시)
2. 활용 팁 (가입 후 3일)
3. 성공 사례 (가입 후 7일)
4. 프로모션 (가입 후 14일)

### 4. 유료 광고 (10% 예산)

**Google Ads**
- 키워드: "AI 콘텐츠 생성", "AI 디자인 도구"
- CPC 입찰: $1.5 - $3.0

**Facebook Ads**
- 타겟: 25-45세, 크리에이터
- 리타겟팅 캠페인

## 📊 성과 지표 (KPI)

- 웹사이트 방문자: 100K → 150K
- 신규 가입: 5K → 8K
- 전환율: 2% → 3.5%
- ROI: 300%+

## 💡 크리에이티브 컨셉

**메인 메시지**: "AI로 창작하는 무한한 가능성"

**비주얼 스타일**
- 다크 테마 + 네온 그라데이션
- 3D 타이포그래피
- 미래지향적 이미지

**카피 예시**
- "3초 만에 아이디어를 현실로"
- "당신의 창의성, AI가 완성합니다"
- "전문가 수준의 결과물, 클릭 한 번으로"

## 🎁 프로모션

**런칭 프로모션**
- 첫 달 무료 체험
- 조기 가입자 50% 할인
- 친구 추천 시 양쪽 1개월 무료

---

*🚀 캠페인 실행 지원이 필요하면 AIWorkGround Marketing을 이용해보세요!*`,

    '영상': `# 영상 콘텐츠 기획안

**주제**: ${prompt}

## 🎬 영상 개요

**형식**: 유튜브 숏폼 (60초)  
**타겟**: 20-35세 크리에이터  
**톤앤매너**: 역동적, 미래지향적  

## 📝 스크립트

### [0-5초] 오프닝 - 훅
**영상**: 빠른 컷, 눈에 띄는 비주얼  
**자막**: "3초 만에 AI로 콘텐츠 생성?"  
**내레이션**: "믿기지 않겠지만, 지금 바로 보여드릴게요!"

### [5-15초] 문제 제기
**영상**: 고민하는 크리에이터 모습  
**자막**: "콘텐츠 만드는 데 너무 오래 걸리나요?"  
**내레이션**: "아이디어는 있는데 실행이 어렵죠?"

### [15-40초] 솔루션 제시
**영상**: AIWorkGround 화면 녹화  
**자막**: 
- "AI에게 원하는 걸 말하기만 하면"
- "3초 만에 전문가급 결과물"
- "글, 디자인, 코드 모두 가능"

**내레이션**: "AIWorkGround가 모든 걸 해결해드립니다"

### [40-50초] 결과 강조
**영상**: 완성된 결과물 여러 개  
**자막**: "이 모든 게 AI로 만들어졌어요"  
**내레이션**: "이제 창작이 쉬워집니다"

### [50-60초] 클로징 - CTA
**영상**: 로고 + QR 코드  
**자막**: "지금 무료로 시작하세요!"  
**내레이션**: "링크는 댓글에!"

## 🎨 비주얼 가이드

**색상**: 다크 배경 + 네온 블루/퍼플  
**폰트**: 굵은 Sans-serif  
**트랜지션**: 빠른 컷, 스냅 효과  

## 🎵 사운드

**배경음악**: 업비트 일렉트로닉 (120 BPM)  
**효과음**: 
- 클릭 소리 (UI 인터랙션)
- 우쉬 사운드 (화면 전환)
- 성공 징글 (결과 표시)

## 📊 예상 성과

- 조회수: 100K+
- 참여율: 8%+
- 클릭률: 5%+

---

*🎥 영상 제작 지원이 필요하면 AIWorkGround Video를 이용해보세요!*`,

    '음악': `# 음악 컨셉

**주제**: ${prompt}

## 🎵 곡 개요

**장르**: Ambient / Chill  
**템포**: 80-90 BPM  
**키**: C Major  
**길이**: 3분  

## 🎹 악기 구성

### 메인 악기
- **피아노**: 부드러운 멜로디 라인
- **신스 패드**: 따뜻한 배경음
- **어쿠스틱 기타**: 리듬 섹션

### 서브 악기
- **스트링**: 감성적인 레이어
- **벨 톤**: 포인트 사운드

## 🎼 곡 구성

### [0:00-0:30] Intro
- 피아노 단독 멜로디
- 서서히 신스 패드 추가
- 차분한 시작

### [0:30-1:30] Verse 1
- 기타 리듬 진입
- 피아노 + 신스 조화
- 편안한 분위기

### [1:30-2:00] Bridge
- 스트링 레이어 추가
- 감정선 상승
- 벨 톤 포인트

### [2:00-2:45] Verse 2
- 풀 사운드
- 모든 악기 하모니
- 절정 구간

### [2:45-3:00] Outro
- 점진적 페이드아웃
- 피아노 단독으로 마무리
- 여운 남기기

## 🎧 믹싱 가이드

**EQ**
- Low: 따뜻한 베이스 (80-200Hz)
- Mid: 명확한 멜로디 (500-2kHz)
- High: 밝은 하이엔드 (8kHz+)

**리버브**
- 룸 리버브 (피아노)
- 홀 리버브 (스트링)
- 플레이트 리버브 (보컬 패드)

## 💡 분위기

- 차분함: 명상, 독서에 적합
- 따뜻함: 카페, 작업 공간
- 집중력: 업무, 공부 BGM

---

*🎼 실제 작곡이 필요하면 AIWorkGround Music을 이용해보세요!*`,

    '챗봇': `# 챗봇 시나리오

**목적**: ${prompt}

## 💬 대화 플로우

### 시작 인사

**봇**: 안녕하세요! AIWorkGround 고객센터입니다. 무엇을 도와드릴까요?

**옵션 버튼**:
1. ❓ 사용법 문의
2. 💳 요금제 안내
3. 🔧 기술 지원
4. 💬 기타 문의

---

### 시나리오 1: 사용법 문의

**사용자**: 사용법 문의

**봇**: 어떤 기능이 궁금하신가요?

**옵션**:
1. 📝 텍스트 생성
2. 🎨 이미지 생성
3. 💻 코드 생성
4. 🔙 처음으로

---

**사용자**: 텍스트 생성

**봇**: 텍스트 생성은 아주 간단해요!

1️⃣ 카테고리 선택 (글쓰기, 마케팅 등)
2️⃣ 원하는 내용 입력
3️⃣ [생성하기] 버튼 클릭
4️⃣ 결과 확인 및 다운로드

📹 [튜토리얼 영상 보기]

다른 도움이 필요하신가요?

---

### 시나리오 2: 요금제 안내

**사용자**: 요금제 안내

**봇**: AIWorkGround 요금제를 안내해드릴게요!

💎 **Free** - $0/월
- 월 50회 생성
- 기본 기능
- 커뮤니티 지원

🚀 **Pro** - $29/월
- 무제한 생성
- 고급 기능
- 우선 지원
- API 액세스

🏢 **Enterprise** - 맞춤 견적
- 전용 서버
- 맞춤 개발
- 전담 매니저

어떤 플랜이 궁금하신가요?

---

### 시나리오 3: 기술 지원

**사용자**: 기술 지원

**봇**: 어떤 문제가 발생했나요?

**자주 묻는 질문**:

**Q: 생성이 안 돼요**
A: 다음을 확인해주세요:
- 인터넷 연결 상태
- 브라우저 업데이트
- 캐시 삭제 후 재시도

**Q: 결과가 이상해요**
A: 프롬프트를 더 구체적으로 작성해보세요:
❌ "디자인 만들어줘"
✅ "미니멀한 카페 로고 디자인, 파란색과 흰색 사용"

**Q: 다운로드가 안 돼요**
A: 팝업 차단을 해제하거나 다른 브라우저를 시도해보세요.

해결이 안 되면 [📧 이메일 문의]를 이용해주세요.

---

### 종료

**봇**: 더 도와드릴 것이 있을까요?

**옵션**:
- ✅ 해결됐어요 (만족도 조사)
- 🔄 처음부터 다시
- 👤 상담원 연결

---

## 🤖 봇 성격

- 친근하고 전문적
- 이모지 적절히 사용
- 빠른 응답
- 단계별 안내

## 📊 예상 효과

- 응답 시간: 즉시
- 해결율: 80%+
- 만족도: 4.5/5

---

*💬 실제 챗봇 구현이 필요하면 AIWorkGround Chatbot을 이용해보세요!*`
  }

  const categoryName = category || '글쓰기'
  const result = demoResults[categoryName] || demoResults['글쓰기']

  return NextResponse.json({ 
    result,
    mode: 'demo',
    message: '데모 모드로 작동 중입니다. OPENAI_API_KEY를 설정하면 실제 AI 생성이 가능합니다.'
  })
}
