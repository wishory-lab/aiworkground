'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Sparkles, 
  Zap, 
  Globe, 
  Rocket,
  ArrowRight,
  Play,
  Check,
  Star,
  Users,
  TrendingUp,
  MessageSquare,
  FileText,
  Palette,
  Code,
  BarChart,
  Video,
  Music,
  Mail,
  Crown,
  User,
  ChevronDown,
  Home as HomeIcon
} from 'lucide-react'
import Chatbot from './components/Chatbot'

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguage] = useState<'ko' | 'en' | 'ja' | 'zh' | 'th' | 'vi' | 'ms' | 'ru'>('ko')
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  // URL 경로에서 언어 감지
  useEffect(() => {
    const pathLang = pathname?.split('/')[1] // /ko, /en, /ja 등
    if (pathLang === 'ko' || pathLang === 'en' || pathLang === 'ja' || pathLang === 'zh' || pathLang === 'th' || pathLang === 'vi' || pathLang === 'ms' || pathLang === 'ru') {
      setLanguage(pathLang as typeof language)
    } else {
      // 기본 경로(/)인 경우 브라우저 언어 감지
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('ko')) {
        setLanguage('ko')
      } else if (browserLang.startsWith('ja')) {
        setLanguage('ja')
      } else if (browserLang.startsWith('zh')) {
        setLanguage('zh')
      } else if (browserLang.startsWith('th')) {
        setLanguage('th')
      } else if (browserLang.startsWith('vi')) {
        setLanguage('vi')
      } else if (browserLang.startsWith('ms')) {
        setLanguage('ms')
      } else if (browserLang.startsWith('ru')) {
        setLanguage('ru')
      } else {
        setLanguage('en') // 기본값은 영어
      }
    }
  }, [pathname])

  const translations = {
    ko: {
      hero: {
        title: {
          ai: "AI",
          work: "Work",
          ground: "Ground"
        },
        subtitle: "AI로 창작하는 무한한 가능성",
        description: "글쓰기부터 디자인, 코딩까지 - 모든 창작 작업을 한 곳에서",
        cta1: "무료로 시작하기",
        cta2: "데모 보기"
      },
      stats: {
        users: "글로벌 사용자",
        projects: "생성된 프로젝트",
        satisfaction: "만족도",
        countries: "서비스 국가"
      },
      features: {
        title: "무엇을 만들고 싶으세요?",
        items: [
          { icon: FileText, name: "글쓰기", desc: "블로그, SNS, 이메일" },
          { icon: Palette, name: "디자인", desc: "포스터, 배너, 로고" },
          { icon: Code, name: "코딩", desc: "웹, 앱, API" },
          { icon: BarChart, name: "분석", desc: "데이터, 리포트, 차트" },
          { icon: Video, name: "영상", desc: "스크립트, 편집, 자막" },
          { icon: Music, name: "음악", desc: "작곡, 편곡, 사운드" },
          { icon: Mail, name: "마케팅", desc: "캠페인, 광고, 뉴스레터" },
          { icon: MessageSquare, name: "챗봇", desc: "고객응대, FAQ, 상담" }
        ]
      },
      templates: {
        title: "인기 템플릿",
        subtitle: "클릭 한 번으로 시작하는 창작",
        items: [
          {
            title: "바이럴 SNS 콘텐츠",
            category: "마케팅",
            preview: "2025년 AI 트렌드를 활용한 인스타그램 릴스 대본 3개...",
            gradient: "from-pink-500 to-rose-500",
            uses: "15.2K"
          },
          {
            title: "랜딩 페이지 코드",
            category: "개발",
            preview: "React + Tailwind CSS로 만드는 모던 랜딩 페이지...",
            gradient: "from-blue-500 to-cyan-500",
            uses: "12.8K"
          },
          {
            title: "브랜드 스토리텔링",
            category: "기획",
            preview: "고객의 마음을 사로잡는 감동적인 브랜드 스토리...",
            gradient: "from-purple-500 to-indigo-500",
            uses: "10.5K"
          },
          {
            title: "3D 로고 디자인",
            category: "디자인",
            preview: "프리미엄 3D 입체 로고 + 브랜드 가이드...",
            gradient: "from-orange-500 to-amber-500",
            uses: "9.3K"
          }
        ]
      },
      trending: {
        title: "🔥 지금 인기 있는 기능",
        badge: "HOT"
      }
    },
    en: {
      hero: {
        title: {
          ai: "AI",
          work: "Work",
          ground: "Ground"
        },
        subtitle: "Infinite Possibilities with AI Creation",
        description: "From writing to design, coding - All creative work in one place",
        cta1: "Start Free",
        cta2: "Watch Demo"
      },
      stats: {
        users: "Global Users",
        projects: "Projects Created",
        satisfaction: "Satisfaction",
        countries: "Countries"
      },
      features: {
        title: "What do you want to create?",
        items: [
          { icon: FileText, name: "Writing", desc: "Blogs, SNS, Emails" },
          { icon: Palette, name: "Design", desc: "Posters, Banners, Logos" },
          { icon: Code, name: "Coding", desc: "Web, Apps, APIs" },
          { icon: BarChart, name: "Analytics", desc: "Data, Reports, Charts" },
          { icon: Video, name: "Video", desc: "Scripts, Editing, Subtitles" },
          { icon: Music, name: "Music", desc: "Compose, Arrange, Sound" },
          { icon: Mail, name: "Marketing", desc: "Campaigns, Ads, Newsletter" },
          { icon: MessageSquare, name: "Chatbot", desc: "Support, FAQ, Chat" }
        ]
      },
      templates: {
        title: "Popular Templates",
        subtitle: "Start creating with one click",
        items: [
          {
            title: "Viral SNS Content",
            category: "Marketing",
            preview: "3 Instagram Reels scripts using 2025 AI trends...",
            gradient: "from-pink-500 to-rose-500",
            uses: "15.2K"
          },
          {
            title: "Landing Page Code",
            category: "Development",
            preview: "Modern landing page with React + Tailwind CSS...",
            gradient: "from-blue-500 to-cyan-500",
            uses: "12.8K"
          },
          {
            title: "Brand Storytelling",
            category: "Planning",
            preview: "Touching brand story that captures hearts...",
            gradient: "from-purple-500 to-indigo-500",
            uses: "10.5K"
          },
          {
            title: "3D Logo Design",
            category: "Design",
            preview: "Premium 3D logo + Brand guidelines...",
            gradient: "from-orange-500 to-amber-500",
            uses: "9.3K"
          }
        ]
      },
      trending: {
        title: "🔥 Trending Features",
        badge: "HOT"
      }
    },
    ja: {
      hero: {
        title: {
          ai: "AI",
          work: "ワーク",
          ground: "グラウンド"
        },
        subtitle: "AIで創る無限の可能性",
        description: "文章作成からデザイン、コーディングまで - すべての創作を一か所で",
        cta1: "無料で始める",
        cta2: "デモを見る"
      },
      stats: {
        users: "グローバルユーザー",
        projects: "作成プロジェクト",
        satisfaction: "満足度",
        countries: "サービス国"
      },
      features: {
        title: "何を作りたいですか？",
        items: [
          { icon: FileText, name: "ライティング", desc: "ブログ、SNS、メール" },
          { icon: Palette, name: "デザイン", desc: "ポスター、バナー、ロゴ" },
          { icon: Code, name: "コーディング", desc: "Web、アプリ、API" },
          { icon: BarChart, name: "分析", desc: "データ、レポート、チャート" },
          { icon: Video, name: "動画", desc: "スクリプト、編集、字幕" },
          { icon: Music, name: "音楽", desc: "作曲、編曲、サウンド" },
          { icon: Mail, name: "マーケティング", desc: "キャンペーン、広告、メルマガ" },
          { icon: MessageSquare, name: "チャットボット", desc: "サポート、FAQ、相談" }
        ]
      },
      templates: {
        title: "人気テンプレート",
        subtitle: "ワンクリックで創作開始",
        items: [
          {
            title: "バイラルSNSコンテンツ",
            category: "マーケティング",
            preview: "2025年のAIトレンドを活用したInstagramリール台本3つ...",
            gradient: "from-pink-500 to-rose-500",
            uses: "15.2K"
          },
          {
            title: "ランディングページコード",
            category: "開発",
            preview: "React + Tailwind CSSで作るモダンランディングページ...",
            gradient: "from-blue-500 to-cyan-500",
            uses: "12.8K"
          },
          {
            title: "ブランドストーリーテリング",
            category: "企画",
            preview: "心をつかむ感動的なブランドストーリー...",
            gradient: "from-purple-500 to-indigo-500",
            uses: "10.5K"
          },
          {
            title: "3Dロゴデザイン",
            category: "デザイン",
            preview: "プレミアム3Dロゴ + ブランドガイド...",
            gradient: "from-orange-500 to-amber-500",
            uses: "9.3K"
          }
        ]
      },
      trending: {
        title: "🔥 人気機能",
        badge: "HOT"
      }
    },
    zh: {
      hero: {
        title: {
          ai: "AI",
          work: "工作",
          ground: "场"
        },
        subtitle: "AI创作的无限可能",
        description: "从写作到设计、编程 - 所有创作工作集于一处",
        cta1: "免费开始",
        cta2: "观看演示"
      },
      stats: {
        users: "全球用户",
        projects: "创建项目",
        satisfaction: "满意度",
        countries: "服务国家"
      },
      features: {
        title: "您想创作什么？",
        items: [
          { icon: FileText, name: "写作", desc: "博客、社交、邮件" },
          { icon: Palette, name: "设计", desc: "海报、横幅、标志" },
          { icon: Code, name: "编程", desc: "网站、应用、API" },
          { icon: BarChart, name: "分析", desc: "数据、报告、图表" },
          { icon: Video, name: "视频", desc: "脚本、编辑、字幕" },
          { icon: Music, name: "音乐", desc: "作曲、编曲、音效" },
          { icon: Mail, name: "营销", desc: "活动、广告、邮件" },
          { icon: MessageSquare, name: "聊天机器人", desc: "客服、FAQ、咨询" }
        ]
      },
      templates: {
        title: "热门模板",
        subtitle: "一键开始创作",
        items: [
          {
            title: "病毒式SNS内容",
            category: "营销",
            preview: "利用2025年AI趋势的Instagram Reels脚本3个...",
            gradient: "from-pink-500 to-rose-500",
            uses: "15.2K"
          },
          {
            title: "落地页代码",
            category: "开发",
            preview: "使用React + Tailwind CSS创建现代落地页...",
            gradient: "from-blue-500 to-cyan-500",
            uses: "12.8K"
          },
          {
            title: "品牌故事讲述",
            category: "策划",
            preview: "打动人心的感人品牌故事...",
            gradient: "from-purple-500 to-indigo-500",
            uses: "10.5K"
          },
          {
            title: "3D标志设计",
            category: "设计",
            preview: "高级3D标志 + 品牌指南...",
            gradient: "from-orange-500 to-amber-500",
            uses: "9.3K"
          }
        ]
      },
      trending: {
        title: "🔥 热门功能",
        badge: "HOT"
      }
    }
  }

  // Fallback for missing languages
  const getTranslation = (lang: typeof language): typeof translations.en => {
    if (lang === 'ko' || lang === 'en' || lang === 'ja' || lang === 'zh') {
      return translations[lang]
    }
    return translations.en
  }

  const t = getTranslation(language)

  // 페이지 이동 핸들러
  const handleStartFree = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    try {
      router.push('/generate')
    } catch (error) {
      console.error('Navigation error:', error)
      window.location.href = '/generate'
    }
  }

  const handleWatchDemo = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    // 데모 영상 또는 튜토리얼 페이지로 이동
    try {
      window.open('https://www.youtube.com/watch?v=demo', '_blank')
    } catch (error) {
      console.error('Window open error:', error)
    }
  }

  const handleFeatureClick = (featureName: string, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    try {
      router.push(`/generate?category=${encodeURIComponent(featureName)}`)
    } catch (error) {
      console.error('Navigation error:', error)
      window.location.href = `/generate?category=${encodeURIComponent(featureName)}`
    }
  }

  const handleTemplateClick = (templateTitle: string, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    try {
      router.push(`/generate?template=${encodeURIComponent(templateTitle)}`)
    } catch (error) {
      console.error('Navigation error:', error)
      window.location.href = `/generate?template=${encodeURIComponent(templateTitle)}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-lg opacity-75"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AIWorkGround
              </span>
            </div>

            {/* Language & Login */}
            <div className="flex items-center gap-4">
              {/* Language Switcher - Compact */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs sm:text-sm hidden sm:inline">
                    {language.toUpperCase()}
                  </span>
                </button>
                
                {showLanguageMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowLanguageMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                      {(['ko', 'en', 'ja', 'zh', 'th', 'vi', 'ms', 'ru'] as const).map((lang) => {
                        const langCodes = { 
                          ko: 'KO', 
                          en: 'EN', 
                          ja: 'JA',
                          zh: 'ZH',
                          th: 'TH',
                          vi: 'VI',
                          ms: 'MS',
                          ru: 'RU'
                        }
                        return (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang)
                            setShowLanguageMenu(false)
                            // 항상 언어 코드를 포함한 경로로 이동
                            router.push(`/${lang}`)
                          }}
                          className={`w-full text-center px-3 py-2 text-sm transition-all ${
                            language === lang
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold'
                              : 'text-gray-300 hover:bg-gray-700'
                          } ${lang === 'ko' ? 'rounded-t-lg' : lang === 'ru' ? 'rounded-b-lg' : ''}`}
                        >
                          {langCodes[lang]}
                        </button>
                      )
                    })}
                  </div>
                  </>
                )}
              </div>

              {/* Login Button */}
              <button
                onClick={() => router.push('/sign-in')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all"
              >
                <User className="w-4 h-4" />
                <span>{language === 'ko' ? '로그인' : language === 'en' ? 'Sign In' : 'ログイン'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Title with 3D Effect - AI Work Ground 분리 */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-3xl opacity-50"></span>
              
              {/* AI */}
              <span 
                className="relative bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mr-3 sm:mr-4 md:mr-6"
                style={{
                  textShadow: `
                    1px 1px 0 rgba(37, 99, 235, 0.4),
                    2px 2px 0 rgba(37, 99, 235, 0.3),
                    3px 3px 0 rgba(59, 130, 246, 0.3),
                    4px 4px 0 rgba(96, 165, 250, 0.2),
                    6px 6px 20px rgba(37, 99, 235, 0.5)
                  `
                }}
              >
                {t.hero.title.ai}
              </span>

              {/* Work */}
              <span 
                className="relative bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent mx-2 sm:mx-3 md:mx-4"
                style={{
                  textShadow: `
                    1px 1px 0 rgba(124, 58, 237, 0.4),
                    2px 2px 0 rgba(124, 58, 237, 0.3),
                    3px 3px 0 rgba(147, 51, 234, 0.3),
                    4px 4px 0 rgba(168, 85, 247, 0.2),
                    6px 6px 20px rgba(124, 58, 237, 0.5)
                  `
                }}
              >
                {t.hero.title.work}
              </span>

              {/* Ground */}
              <span 
                className="relative bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 bg-clip-text text-transparent ml-2 sm:ml-3 md:ml-4"
                style={{
                  textShadow: `
                    1px 1px 0 rgba(236, 72, 153, 0.4),
                    2px 2px 0 rgba(236, 72, 153, 0.3),
                    3px 3px 0 rgba(244, 114, 182, 0.3),
                    4px 4px 0 rgba(251, 113, 133, 0.2),
                    6px 6px 20px rgba(236, 72, 153, 0.5)
                  `
                }}
              >
                {t.hero.title.ground}
              </span>
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl text-gray-300 mb-4 font-light">
            {t.hero.subtitle}
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button 
              onClick={(e) => handleStartFree(e)}
              type="button"
              className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all hover:scale-105 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-transform group-hover:scale-110"></div>
              <div className="relative flex items-center gap-2 text-white">
                <Rocket className="w-5 h-5" />
                {t.hero.cta1}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button 
              onClick={(e) => handleWatchDemo(e)}
              type="button"
              className="px-8 py-4 rounded-xl font-semibold text-lg bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5" />
              {t.hero.cta2}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-1">2M+</div>
                <div className="text-sm text-gray-400">{t.stats.users}</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-1">10M+</div>
                <div className="text-sm text-gray-400">{t.stats.projects}</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-rose-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl font-bold text-pink-400 mb-1">98%</div>
                <div className="text-sm text-gray-400">{t.stats.satisfaction}</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-1">150+</div>
                <div className="text-sm text-gray-400">{t.stats.countries}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Circular Icons */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.features.title}
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            Choose your creative workspace
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {t.features.items.map((item, index) => {
              const Icon = item.icon
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-orange-500 to-rose-500',
                'from-green-500 to-emerald-500',
                'from-red-500 to-pink-500',
                'from-indigo-500 to-purple-500',
                'from-yellow-500 to-orange-500',
                'from-teal-500 to-cyan-500'
              ]
              
              return (
                <button
                  key={index}
                  onClick={(e) => handleFeatureClick(item.name, e)}
                  type="button"
                  className="group relative cursor-pointer"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-500`}></div>
                  
                  {/* Card */}
                  <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:border-gray-600 transition-all duration-300 group-hover:scale-105">
                    {/* Icon Circle */}
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} rounded-full blur-lg opacity-75`}></div>
                      <div className={`relative w-full h-full bg-gradient-to-br ${gradients[index]} rounded-full flex items-center justify-center shadow-2xl`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 text-center">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400 text-center">
                      {item.desc}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Templates Gallery */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.templates.title}
            </h2>
            <p className="text-gray-400 text-lg">{t.templates.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                {t.templates.items.map((template: any, index: number) => (
              <div
                key={index}
                onClick={(e) => handleTemplateClick(template.title, e)}
                className="group relative cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleTemplateClick(template.title, e as any)
                  }
                }}
              >
                {/* Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-500`}></div>
                
                {/* Card */}
                <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300">
                  {/* Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${template.gradient}`}></div>
                  
                  <div className="p-8">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${template.gradient} text-white`}>
                        {template.category}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{template.uses}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                      {template.title}
                    </h3>

                    {/* Preview */}
                    <p className="text-gray-400 mb-6 line-clamp-2">
                      {template.preview}
                    </p>

                    {/* CTA */}
                    <button className="w-full py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium flex items-center justify-center gap-2 transition-all group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                      <Play className="w-4 h-4" />
                      <span>바로 체험하기</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="text-5xl">🔥</span>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {t.trending.title}
                </h2>
              </div>

              <div className="grid gap-4">
                {[
                  { name: language === 'ko' ? "AI 자동화 스크립트" : "AI Automation Scripts", users: "24K", trend: "+156%" },
                  { name: language === 'ko' ? "바이럴 콘텐츠 생성" : "Viral Content Creation", users: "18K", trend: "+203%" },
                  { name: language === 'ko' ? "브랜드 스토리텔링" : "Brand Storytelling", users: "15K", trend: "+128%" }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleFeatureClick(item.name, e)}
                    type="button"
                    className="flex items-center justify-between p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-gray-600">#{index + 1}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400">{item.users} users</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-bold">{item.trend}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {language === 'ko' ? '지금 바로 시작하세요' : 'Start Creating Today'}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {language === 'ko' 
                  ? '무료로 시작하고, 무한한 가능성을 경험하세요'
                  : 'Start free and experience infinite possibilities'
                }
              </p>
              <button 
                onClick={(e) => handleStartFree(e)}
                type="button"
                className="px-12 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-3 mx-auto cursor-pointer"
              >
                <Crown className="w-6 h-6" />
                <span>{language === 'ko' ? '무료 체험하기' : 'Try for Free'}</span>
                <Sparkles className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-white">AIWorkGround</span>
          </div>
          <p className="text-sm">
            © 2025 AIWorkGround. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot language={language} />
    </div>
  )
}
