'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { Globe, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'

type Language = 'ko' | 'en' | 'ja' | 'zh'

interface NavbarProps {
  currentPage?: string
  language: Language
  setLanguage: (lang: Language) => void
}

export default function Navbar({ currentPage, language, setLanguage }: NavbarProps) {
  const { user, isSignedIn } = useUser()
  const { signOut } = useClerk()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const languages = [
    { code: 'ko' as Language, label: '한국어', flag: '🇰🇷' },
    { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
    { code: 'ja' as Language, label: '日本語', flag: '🇯🇵' },
    { code: 'zh' as Language, label: '中文', flag: '🇨🇳' },
  ]

  const translations = {
    ko: {
      features: '기능',
      pricing: '가격',
      dashboard: '대시보드',
      login: '로그인',
      logout: '로그아웃',
      generate: 'AI 생성'
    },
    en: {
      features: 'Features',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      login: 'Login',
      logout: 'Logout',
      generate: 'Generate'
    },
    ja: {
      features: '機能',
      pricing: '料金',
      dashboard: 'ダッシュボード',
      login: 'ログイン',
      logout: 'ログアウト',
      generate: '生成'
    },
    zh: {
      features: '功能',
      pricing: '价格',
      dashboard: '仪表板',
      login: '登录',
      logout: '退出',
      generate: '生成'
    }
  }

  const t = translations[language]
  const currentLang = languages.find(l => l.code === language)!

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AIWorkground
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/features"
              className={`font-medium transition-colors ${
                currentPage === 'features'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {t.features}
            </Link>
            <Link
              href="/pricing"
              className={`font-medium transition-colors ${
                currentPage === 'pricing'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {t.pricing}
            </Link>

            {isSignedIn && (
              <>
                <Link
                  href="/generate"
                  className={`font-medium transition-colors ${
                    currentPage === 'generate'
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {t.generate}
                </Link>
                <Link
                  href="/dashboard"
                  className={`font-medium transition-colors ${
                    currentPage === 'dashboard'
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {t.dashboard}
                </Link>
              </>
            )}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  {currentLang.flag}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showLangMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLangMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border-2 border-purple-100 py-2 z-20">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setShowLangMenu(false)
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors flex items-center space-x-2 ${
                          language === lang.code
                            ? 'bg-purple-50 text-purple-600 font-bold'
                            : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            {isSignedIn ? (
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
            ) : (
              <Link
                href="/sign-in"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                {t.login}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-50"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 space-y-3 border-t border-purple-100">
            <Link
              href="/features"
              className="block px-4 py-2 text-gray-600 hover:bg-purple-50 rounded-lg"
              onClick={() => setShowMobileMenu(false)}
            >
              {t.features}
            </Link>
            <Link
              href="/pricing"
              className="block px-4 py-2 text-gray-600 hover:bg-purple-50 rounded-lg"
              onClick={() => setShowMobileMenu(false)}
            >
              {t.pricing}
            </Link>
            {isSignedIn && (
              <>
                <Link
                  href="/generate"
                  className="block px-4 py-2 text-gray-600 hover:bg-purple-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t.generate}
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-600 hover:bg-purple-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t.dashboard}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}