'use client';

import { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { Globe, Menu, X, Zap } from 'lucide-react';
import Link from 'next/link';

type Language = 'ko' | 'en' | 'ja' | 'zh';

interface NavbarProps {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
}

const translations = {
  ko: {
    features: '기능',
    pricing: '가격',
    login: '로그인',
    dashboard: '대시보드',
    generate: 'AI 생성',
    logout: '로그아웃'
  },
  en: {
    features: 'Features',
    pricing: 'Pricing',
    login: 'Login',
    dashboard: 'Dashboard',
    generate: 'Generate',
    logout: 'Logout'
  },
  ja: {
    features: '機能',
    pricing: '価格',
    login: 'ログイン',
    dashboard: 'ダッシュボード',
    generate: 'AI生成',
    logout: 'ログアウト'
  },
  zh: {
    features: '功能',
    pricing: '价格',
    login: '登录',
    dashboard: '仪表板',
    generate: 'AI生成',
    logout: '退出登录'
  }
};

const languages = [
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' }
];

export default function Navbar({ currentLanguage, setCurrentLanguage }: NavbarProps) {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const t = translations[currentLanguage];
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AIWorkground</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              {t.features}
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              {t.pricing}
            </Link>
            
            {isSignedIn && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                  {t.dashboard}
                </Link>
                <Link href="/generate" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                  {t.generate}
                </Link>
              </>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang?.flag}</span>
                <span className="text-sm">{currentLang?.name}</span>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                        currentLanguage === lang.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Section */}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link
                href="/sign-in"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                {t.login}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Selector */}
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              <Globe className="w-5 h-5" />
            </button>
            
            {isSignedIn && <UserButton afterSignOutUrl="/" />}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="/features" 
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.features}
            </Link>
            <Link 
              href="/pricing" 
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.pricing}
            </Link>
            
            {isSignedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.dashboard}
                </Link>
                <Link 
                  href="/generate" 
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.generate}
                </Link>
              </>
            ) : (
              <Link 
                href="/sign-in" 
                className="block px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.login}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mobile Language Dropdown */}
      {isLanguageOpen && (
        <div className="md:hidden absolute right-4 top-16 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLanguage(lang.code);
                setIsLanguageOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                currentLanguage === lang.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}