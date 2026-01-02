import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { type, prompt, projectId, language = 'ko' } = await req.json()

    if (!prompt || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: type and prompt' },
        { status: 400 }
      )
    }

    // 언어별 시스템 프롬프트
    const systemPrompts: Record<string, Record<string, string>> = {
      ko: {
        marketing: `당신은 전문 마케팅 카피라이터입니다. 
매력적이고 설득력 있는 마케팅 콘텐츠를 한국어로 작성합니다.
SEO 최적화된 키워드를 포함하고, 행동 유도(CTA)를 명확히 합니다.
한국 문화와 트렌드를 반영한 콘텐츠를 작성하세요.`,
        
        design: `당신은 시니어 UI/UX 디자이너입니다.
사용자 경험을 최우선으로 하는 디자인 제안을 한국어로 합니다.
색상, 레이아웃, 타이포그래피에 대한 구체적인 가이드를 제공합니다.
한국 사용자의 선호도를 고려한 디자인을 제안하세요.`,
        
        code: `당신은 시니어 풀스택 개발자입니다.
깨끗하고 유지보수 가능한 코드를 작성합니다.
베스트 프랙티스를 따르고, 한국어로 주석을 포함합니다.`,
      },
      en: {
        marketing: `You are a professional marketing copywriter.
Create compelling and persuasive marketing content in English.
Include SEO-optimized keywords and clear call-to-actions (CTAs).
Adapt content for international/Western audiences.`,
        
        design: `You are a senior UI/UX designer.
Provide design suggestions prioritizing user experience in English.
Give specific guidelines on colors, layouts, and typography.
Consider global design trends and best practices.`,
        
        code: `You are a senior full-stack developer.
Write clean, maintainable code with English comments.
Follow industry best practices and standards.`,
      },
      ja: {
        marketing: `あなたはプロのマーケティングコピーライターです。
魅力的で説得力のあるマーケティングコンテンツを日本語で作成します。
SEO最適化されたキーワードを含め、明確なCTAを設定します。
日本の文化とトレンドを反映したコンテンツを作成してください。`,
        
        design: `あなたはシニアUI/UXデザイナーです。
ユーザー体験を最優先するデザイン提案を日本語で行います。
色、レイアウト、タイポグラフィに関する具体的なガイドを提供します。`,
        
        code: `あなたはシニアフルスタック開発者です。
クリーンで保守可能なコードを書きます。
ベストプラクティスに従い、日本語でコメントを含めます。`,
      },
      zh: {
        marketing: `你是专业的营销文案撰稿人。
用中文创作引人注目且有说服力的营销内容。
包含SEO优化的关键词和明确的行动号召（CTA）。
反映中国文化和趋势的内容。`,
        
        design: `你是高级UI/UX设计师。
用中文提供以用户体验为优先的设计建议。
提供有关颜色、布局和排版的具体指南。`,
        
        code: `你是高级全栈开发人员。
编写干净、可维护的代码。
遵循最佳实践，并用中文注释。`,
      },
    }

    // 언어 감지 및 기본값 설정
    const selectedLanguage = language in systemPrompts ? language : 'ko'
    const prompts = systemPrompts[selectedLanguage]

    console.log('Generating AI content:', { 
      user: user.id, 
      type, 
      language: selectedLanguage,
      promptLength: prompt.length 
    })

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: prompts[type as keyof typeof prompts] || prompts.marketing,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const generatedContent = completion.choices[0]?.message?.content || ''

    console.log('AI generation successful, length:', generatedContent.length)

    // Supabase에서 사용자 프로필 조회 또는 생성
    let profileId: string | null = null
    
    const profileResult = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single()

    if (profileResult.data) {
      profileId = profileResult.data.id
    } else {
      console.log('Creating new profile for user:', user.id)
      const newProfileResult = await supabaseAdmin
        .from('profiles')
        .insert({
          clerk_user_id: user.id,
          email: user.emailAddresses[0]?.emailAddress || '',
          full_name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
          avatar_url: user.imageUrl || null,
        })
        .select('id')
        .single()

      if (newProfileResult.data) {
        profileId = newProfileResult.data.id
      }
    }

    // Supabase에 저장
    if (profileId) {
      await supabaseAdmin.from('ai_contents').insert({
        user_id: profileId,
        project_id: projectId || null,
        type,
        content: {
          prompt,
          result: generatedContent,
          model: 'gpt-4o-mini',
          language: selectedLanguage,
          timestamp: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json({
      success: true,
      content: generatedContent,
      language: selectedLanguage,
      tokens: completion.usage?.total_tokens || 0,
    })
  } catch (error: any) {
    console.error('AI Generation Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    )
  }
}
