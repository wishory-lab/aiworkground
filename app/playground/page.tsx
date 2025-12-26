'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Globe, Sparkles, Copy, Check } from 'lucide-react'

type AIType = 'marketing' | 'design' | 'code'
type Language = 'ko' | 'en' | 'ja' | 'zh'

const languages: { code: Language; flag: string; name: string }[] = [
  { code: 'ko', flag: '🇰🇷', name: '한국어' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
]

const uiTexts: Record<Language, any> = {
  ko: {
    title: 'AI Playground',
    subtitle: '다국어 AI 콘텐츠 생성',
    loginRequired: '로그인이 필요합니다',
    loginMessage: 'AI Playground를 사용하려면 먼저 로그인해주세요.',
    loginButton: '로그인하기',
    input: '입력',
    output: '출력',
    outputLanguage: '출력 언어',
    generationType: '생성 타입',
    marketing: '마케팅',
    design: '디자인',
    code: '코드',
    prompt: '프롬프트',
    promptPlaceholder: '생성하고 싶은 내용을 입력하세요...',
    promptTip: '💡 Tip: 구체적으로 작성할수록 더 좋은 결과를 얻을 수 있어요!',
    generateButton: '생성하기',
    generating: '생성 중...',
    copy: '복사',
    copied: '복사됨!',
    resultPlaceholder: '생성된 결과가 여기에 표시됩니다.',
    backToDashboard: '대시보드로 돌아가기',
  },
  en: {
    title: 'AI Playground',
    subtitle: 'Multilingual AI Content Generation',
    loginRequired: 'Login Required',
    loginMessage: 'Please log in to use AI Playground.',
    loginButton: 'Log In',
    input: 'Input',
    output: 'Output',
    outputLanguage: 'Output Language',
    generationType: 'Generation Type',
    marketing: 'Marketing',
    design: 'Design',
    code: 'Code',
    prompt: 'Prompt',
    promptPlaceholder: 'Enter what you want to generate...',
    promptTip: '💡 Tip: The more specific, the better the results!',
    generateButton: 'Generate',
    generating: 'Generating...',
    copy: 'Copy',
    copied: 'Copied!',
    resultPlaceholder: 'Generated result will appear here.',
    backToDashboard: 'Back to Dashboard',
  },
  ja: {
    title: 'AI Playground',
    subtitle: '多言語AIコンテンツ生成',
    loginRequired: 'ログインが必要です',
    loginMessage: 'AI Playgroundを使用するには、ログインしてください。',
    loginButton: 'ログイン',
    input: '入力',
    output: '出力',
    outputLanguage: '出力言語',
    generationType: '生成タイプ',
    marketing: 'マーケティング',
    design: 'デザイン',
    code: 'コード',
    prompt: 'プロンプト',
    promptPlaceholder: '生成したい内容を入力してください...',
    promptTip: '💡 ヒント：具体的に書くほど良い結果が得られます！',
    generateButton: '生成',
    generating: '生成中...',
    copy: 'コピー',
    copied: 'コピーしました！',
    resultPlaceholder: '生成された結果がここに表示されます。',
    backToDashboard: 'ダッシュボードに戻る',
  },
  zh: {
    title: 'AI Playground',
    subtitle: '多语言AI内容生成',
    loginRequired: '需要登录',
    loginMessage: '请登录以使用AI Playground。',
    loginButton: '登录',
    input: '输入',
    output: '输出',
    outputLanguage: '输出语言',
    generationType: '生成类型',
    marketing: '营销',
    design: '设计',
    code: '代码',
    prompt: '提示',
    promptPlaceholder: '输入您想生成的内容...',
    promptTip: '💡 提示：越具体，结果越好！',
    generateButton: '生成',
    generating: '生成中...',
    copy: '复制',
    copied: '已复制！',
    resultPlaceholder: '生成的结果将显示在这里。',
    backToDashboard: '返回仪表板',
  },
}

export default function PlaygroundPage() {
  const { isSignedIn } = useUser()
  const searchParams = useSearchParams()
  const { language: globalLanguage, setLanguage } = useLanguage()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  
  // URL에서 언어 파라미터 읽기
  useEffect(() => {
    const langParam = searchParams.get('lang') as Language
    if (langParam && ['ko', 'en', 'ja', 'zh'].includes(langParam)) {
      setLanguage(langParam)
    }
  }, [searchParams, setLanguage])

  const [type, setType] = useState<AIType>('marketing')
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [outputLanguage, setOutputLanguage] = useState<Language>(globalLanguage)

  const t = uiTexts[globalLanguage]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setResult('')

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, prompt, language: outputLanguage }),
      })

      const data = await res.json()

      if (data.success) {
        setResult(data.content)
      } else {
        setResult(`오류: ${data.error}`)
      }
    } catch (error: any) {
      setResult(`오류: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.loginRequired}
          </h1>
          <p className="text-gray-600 mb-8">{t.loginMessage}</p>
          <Link href="/sign-in">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
              {t.loginButton}
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      {/* 헤더 */}
      <header className="flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer">
            AIWorkground
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {/* 언어 선택 */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
            >
              <Globe className="w-5 h-5" />
              <span>{languages.find(l => l.code === globalLanguage)?.flag}</span>
            </button>
            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-2 min-w-[150px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setOutputLanguage(lang.code)
                      setShowLanguageMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3 ${
                      globalLanguage === lang.code ? 'bg-purple-50' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link href="/dashboard">
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all">
              {t.backToDashboard}
            </button>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">{t.title}</h2>
        <p className="text-xl text-gray-600 text-center mb-12">{t.subtitle}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 입력 섹션 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="text-purple-600" />
              {t.input}
            </h3>

            {/* 생성 타입 선택 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t.generationType}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['marketing', 'design', 'code'] as AIType[]).map((t_type) => (
                  <button
                    key={t_type}
                    onClick={() => setType(t_type)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      type === t_type
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t[t_type]}
                  </button>
                ))}
              </div>
            </div>

            {/* 출력 언어 선택 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t.outputLanguage}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setOutputLanguage(lang.code)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                      outputLanguage === lang.code
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 프롬프트 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t.prompt}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.promptPlaceholder}
                className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">{t.promptTip}</p>
            </div>

            {/* 생성 버튼 */}
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.generating : t.generateButton}
            </button>
          </div>

          {/* 출력 섹션 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Sparkles className="text-pink-600" />
                {t.output}
              </h3>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  {copied ? t.copied : t.copy}
                </button>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg p-6 min-h-[400px] border-2 border-gray-200">
              {result ? (
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{result}</p>
              ) : (
                <p className="text-gray-400 text-center mt-32">{t.resultPlaceholder}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
