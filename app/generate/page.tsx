'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser, useClerk } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { 
  Sparkles, 
  FileText, 
  Mail, 
  Code, 
  Megaphone,
  Loader2,
  Copy,
  Check,
  Globe,
  LogOut,
  ChevronDown
} from 'lucide-react'

type ContentType = 'blog' | 'marketing' | 'code' | 'email'
type Language = 'ko' | 'en' | 'ja' | 'zh'

export default function GeneratePage() {
  const { user, isSignedIn } = useUser()
  const { signOut } = useClerk()
  const [language, setLanguage] = useState<Language>('ko')
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [contentType, setContentType] = useState<ContentType>('blog')
  const [prompt, setPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const languages = [
    { code: 'ko' as Language, label: '한국어', flag: '🇰🇷' },
    { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
    { code: 'ja' as Language, label: '日本語', flag: '🇯🇵' },
    { code: 'zh' as Language, label: '中文', flag: '🇨🇳' },
  ]

  const translations = {
    ko: {
      title: '놀라운 콘텐츠 생성하기',
      subtitle: '콘텐츠 타입을 선택하고 원하는 내용을 설명해주세요',
      badge: 'AI 콘텐츠 생성기',
      inputLabel: '무엇을 만들고 싶으신가요?',
      generateBtn: 'AI로 생성하기',
      generating: '생성 중...',
      generatedTitle: '생성된 콘텐츠',
      copy: '복사',
      copied: '복사됨!',
      dashboard: '대시보드',
      logout: '로그아웃',
      signInPrompt: '계속하려면 로그인하세요',
      signIn: '로그인',
      contentTypes: {
        blog: '블로그 포스트',
        marketing: '마케팅 카피',
        code: '코드 스니펫',
        email: '이메일 템플릿'
      },
      placeholders: {
        blog: '헬스케어 분야의 AI 미래에 대한 블로그 포스트 작성...',
        marketing: '새로운 AI 도구 출시 이메일 작성...',
        code: 'CSV 데이터 분석을 위한 Python 함수 작성...',
        email: '미팅 후 전문적인 후속 이메일 작성...'
      }
    },
    en: {
      title: 'Generate Amazing Content',
      subtitle: 'Choose a content type and describe what you want to create',
      badge: 'AI Content Generator',
      inputLabel: 'What do you want to create?',
      generateBtn: 'Generate with AI',
      generating: 'Generating...',
      generatedTitle: 'Generated Content',
      copy: 'Copy',
      copied: 'Copied!',
      dashboard: 'Dashboard',
      logout: 'Logout',
      signInPrompt: 'Please sign in to continue',
      signIn: 'Sign In',
      contentTypes: {
        blog: 'Blog Post',
        marketing: 'Marketing Copy',
        code: 'Code Snippet',
        email: 'Email Template'
      },
      placeholders: {
        blog: 'Write a blog post about the future of AI in healthcare...',
        marketing: 'Create a product launch email for our new AI tool...',
        code: 'Write a Python function to analyze CSV data...',
        email: 'Write a professional follow-up email after a meeting...'
      }
    },
    ja: {
      title: '素晴らしいコンテンツを生成',
      subtitle: 'コンテンツタイプを選択して、作成したい内容を説明してください',
      badge: 'AIコンテンツジェネレーター',
      inputLabel: '何を作りたいですか？',
      generateBtn: 'AIで生成',
      generating: '生成中...',
      generatedTitle: '生成されたコンテンツ',
      copy: 'コピー',
      copied: 'コピーしました！',
      dashboard: 'ダッシュボード',
      logout: 'ログアウト',
      signInPrompt: '続行するにはサインインしてください',
      signIn: 'サインイン',
      contentTypes: {
        blog: 'ブログ記事',
        marketing: 'マーケティングコピー',
        code: 'コードスニペット',
        email: 'メールテンプレート'
      },
      placeholders: {
        blog: '医療分野におけるAIの未来についてのブログ記事を書く...',
        marketing: '新しいAIツールの製品発表メールを作成...',
        code: 'CSVデータを分析するPython関数を書く...',
        email: '会議後のプロフェッショナルなフォローアップメールを書く...'
      }
    },
    zh: {
      title: '生成精彩内容',
      subtitle: '选择内容类型并描述您想创建的内容',
      badge: 'AI内容生成器',
      inputLabel: '您想创建什么？',
      generateBtn: '用AI生成',
      generating: '生成中...',
      generatedTitle: '生成的内容',
      copy: '复制',
      copied: '已复制！',
      dashboard: '仪表板',
      logout: '退出登录',
      signInPrompt: '请登录以继续',
      signIn: '登录',
      contentTypes: {
        blog: '博客文章',
        marketing: '营销文案',
        code: '代码片段',
        email: '电子邮件模板'
      },
      placeholders: {
        blog: '写一篇关于医疗保健领域AI未来的博客文章...',
        marketing: '为我们的新AI工具创建产品发布邮件...',
        code: '编写一个用于分析CSV数据的Python函数...',
        email: '撰写会议后的专业跟进邮件...'
      }
    }
  }

  const t = translations[language]

  const contentTypes = [
    { 
      type: 'blog' as ContentType, 
      icon: FileText, 
      color: 'from-blue-500 to-blue-600',
    },
    { 
      type: 'marketing' as ContentType, 
      icon: Megaphone, 
      color: 'from-purple-500 to-purple-600',
    },
    { 
      type: 'code' as ContentType, 
      icon: Code, 
      color: 'from-green-500 to-green-600',
    },
    { 
      type: 'email' as ContentType, 
      icon: Mail, 
      color: 'from-pink-500 to-pink-600',
    },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedContent('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          contentType,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setGeneratedContent(data.content)
      } else {
        alert('Error: ' + (data.error || 'Failed to generate content'))
      }
    } catch (error) {
      console.error('Generation error:', error)
      alert('Failed to generate content. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
  }

  const selectedType = contentTypes.find(ct => ct.type === contentType)!
  const currentLang = languages.find(l => l.code === language)!

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.signInPrompt}</h1>
          <Link
            href="/sign-in"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
          >
            {t.signIn}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AIWorkground
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {currentLang.flag} {currentLang.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border-2 border-purple-100 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setShowLangMenu(false)
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors flex items-center space-x-2 ${
                          language === lang.code ? 'bg-purple-50 text-purple-600 font-bold' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 font-medium">
                {t.dashboard}
              </Link>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {user?.firstName || 'User'}
                </span>
                <UserButton afterSignOutUrl="/" />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">{t.logout}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-lg px-4 py-2 rounded-full border-2 border-purple-100 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t.title}
            </h1>
            <p className="text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Content Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setContentType(type.type)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  contentType === type.type
                    ? 'border-purple-500 bg-white shadow-xl scale-105'
                    : 'border-purple-100 bg-white/80 hover:border-purple-300 hover:shadow-lg'
                }`}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${type.color} w-fit mb-4`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">{t.contentTypes[type.type]}</h3>
              </button>
            ))}
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-2xl p-8 border-2 border-purple-100 shadow-lg">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              {t.inputLabel}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.placeholders[contentType]}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
            />
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`mt-6 w-full bg-gradient-to-r ${selectedType.color} text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                isGenerating || !prompt.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-2xl hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>{t.generating}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  <span>{t.generateBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Content */}
          {generatedContent && (
            <div className="bg-white rounded-2xl p-8 border-2 border-purple-100 shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{t.generatedTitle}</h2>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-medium">{t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 text-purple-600" />
                      <span className="text-purple-600 font-medium">{t.copy}</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {generatedContent}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}