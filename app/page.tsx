'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import { Play, ArrowRight, Sparkles, Zap, CheckCircle2, Rocket, Palette, Code2 } from 'lucide-react'

type Language = 'ko' | 'en' | 'ja' | 'zh'

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser()
  const [language, setLanguage] = useState<Language>('ko')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const translations = {
    ko: {
      badge: '일하면서 놀자! 🎪',
      hero: 'AI로 일하고\n놀이터처럼 즐기세요',
      subtitle: '마케팅 · 디자인 · 개발을 하나의 플랫폼에서.\nAIWorkground는 복잡한 업무를 게임처럼 쉽고 재미있게 만듭니다.',
      getStarted: '무료로 시작하기',
      goToDashboard: '대시보드로 이동',
      watchDemo: '데모 보기',
      stats: {
        productivity: '생산성 향상',
        contentTime: '콘텐츠 생성',
        designTime: '디자인 완성'
      },
      features: {
        title: '주요 기능',
        marketing: {
          title: '마케팅 AI',
          desc: '콘텐츠를 1분 만에 생성하고 자동화',
          items: ['AI 콘텐츠 생성', 'SNS 자동 포스팅', '실시간 트렌드 분석']
        },
        design: {
          title: '디자인 AI',
          desc: '디자인을 30초 만에 완성',
          items: ['Figma 플러그인 연동', 'AI 맞춤 디자인 제안', '실시간 팀 협업']
        },
        developer: {
          title: '개발자 AI',
          desc: '코드 리뷰/문서화 즉시 처리',
          items: ['GitHub App 통합', '자동 코드 리뷰 & 수정', 'PR 메시지 자동화']
        }
      },
      cta: {
        title: '지금 바로 시작하세요',
        button: '무료로 시작하기',
        buttonLoggedIn: '대시보드로 이동'
      },
      footer: '© 2024 AIWorkground. All rights reserved.'
    },
    en: {
      badge: 'Work & Play! 🎪',
      hero: 'Work with AI,\nEnjoy Like a Playground',
      subtitle: 'Marketing · Design · Development in one platform.\nAIWorkground makes complex work as easy and fun as a game.',
      getStarted: 'Get Started Free',
      goToDashboard: 'Go to Dashboard',
      watchDemo: 'Watch Demo',
      stats: {
        productivity: 'Productivity Boost',
        contentTime: 'Content Generation',
        designTime: 'Design Completion'
      },
      features: {
        title: 'Key Features',
        marketing: {
          title: 'Marketing AI',
          desc: 'Generate and automate content in 1 minute',
          items: ['AI Content Generation', 'Auto Social Posting', 'Real-time Trend Analysis']
        },
        design: {
          title: 'Design AI',
          desc: 'Complete designs in 30 seconds',
          items: ['Figma Plugin Integration', 'AI Custom Design Proposals', 'Real-time Team Collaboration']
        },
        developer: {
          title: 'Developer AI',
          desc: 'Instant code review and documentation',
          items: ['GitHub App Integration', 'Auto Code Review & Fix', 'PR Message Automation']
        }
      },
      cta: {
        title: 'Get Started Now',
        button: 'Start Free',
        buttonLoggedIn: 'Go to Dashboard'
      },
      footer: '© 2024 AIWorkground. All rights reserved.'
    },
    ja: {
      badge: '働きながら遊ぼう！🎪',
      hero: 'AIで働き、\n遊び場のように楽しむ',
      subtitle: 'マーケティング・デザイン・開発を1つのプラットフォームで。\nAIWorkgroundは複雑な業務をゲームのように簡単で楽しくします。',
      getStarted: '無料で始める',
      goToDashboard: 'ダッシュボードへ',
      watchDemo: 'デモを見る',
      stats: {
        productivity: '生産性向上',
        contentTime: 'コンテンツ生成',
        designTime: 'デザイン完成'
      },
      features: {
        title: '主要機能',
        marketing: {
          title: 'マーケティングAI',
          desc: '1分でコンテンツを生成・自動化',
          items: ['AIコンテンツ生成', 'SNS自動投稿', 'リアルタイムトレンド分析']
        },
        design: {
          title: 'デザインAI',
          desc: '30秒でデザイン完成',
          items: ['Figmaプラグイン連携', 'AIカスタムデザイン提案', 'リアルタイムチーム協業']
        },
        developer: {
          title: '開発者AI',
          desc: 'コードレビュー/ドキュメント化を即座に処理',
          items: ['GitHub App統合', '自動コードレビュー&修正', 'PRメッセージ自動化']
        }
      },
      cta: {
        title: '今すぐ始めよう',
        button: '無料で始める',
        buttonLoggedIn: 'ダッシュボードへ'
      },
      footer: '© 2024 AIWorkground. All rights reserved.'
    },
    zh: {
      badge: '边工作边玩！🎪',
      hero: '用AI工作，\n像游乐场一样享受',
      subtitle: '营销·设计·开发一体化平台。\nAIWorkground让复杂的工作像游戏一样简单有趣。',
      getStarted: '免费开始',
      goToDashboard: '前往仪表板',
      watchDemo: '观看演示',
      stats: {
        productivity: '生产力提升',
        contentTime: '内容生成',
        designTime: '设计完成'
      },
      features: {
        title: '主要功能',
        marketing: {
          title: '营销AI',
          desc: '1分钟生成和自动化内容',
          items: ['AI内容生成', '社交媒体自动发布', '实时趋势分析']
        },
        design: {
          title: '设计AI',
          desc: '30秒完成设计',
          items: ['Figma插件集成', 'AI定制设计提案', '实时团队协作']
        },
        developer: {
          title: '开发者AI',
          desc: '即时代码审查和文档化',
          items: ['GitHub App集成', '自动代码审查和修复', 'PR消息自动化']
        }
      },
      cta: {
        title: '立即开始',
        button: '免费开始',
        buttonLoggedIn: '前往仪表板'
      },
      footer: '© 2024 AIWorkground. All rights reserved.'
    }
  }

  const t = translations[language]

  // CTA 버튼 링크 결정
  const ctaLink = isLoaded ? (isSignedIn ? '/dashboard' : '/sign-up') : '/sign-up'
  const ctaText = isLoaded ? (isSignedIn ? t.goToDashboard : t.getStarted) : t.getStarted

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full border-2 border-purple-200 mb-8 shadow-lg">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-bold text-purple-600">{t.badge}</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 whitespace-pre-line">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t.hero}
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto whitespace-pre-line leading-relaxed">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link
              href={ctaLink}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group bg-white/80 backdrop-blur-lg text-purple-600 px-10 py-4 rounded-xl font-bold text-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>{t.watchDemo}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: '300%', label: t.stats.productivity },
              { value: '1분', label: t.stats.contentTime },
              { value: '30초', label: t.stats.designTime }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-100 shadow-lg">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.features.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { key: 'marketing', icon: Zap, color: 'from-blue-500 to-blue-600' },
              { key: 'design', icon: Palette, color: 'from-purple-500 to-purple-600' },
              { key: 'developer', icon: Code2, color: 'from-pink-500 to-pink-600' }
            ].map((feature) => {
              const Icon = feature.icon
              const data = t.features[feature.key as keyof typeof t.features]
              return (
                <div key={feature.key} className="group bg-white rounded-3xl p-8 border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{data.title}</h3>
                  <p className="text-gray-600 mb-6">{data.desc}</p>
                  <ul className="space-y-3">
                    {data.items.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.cta.title}
          </h2>
          <Link
            href={ctaLink}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Rocket className="w-6 h-6" />
            <span>{isLoaded && isSignedIn ? t.cta.buttonLoggedIn : t.cta.button}</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-purple-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  )
}