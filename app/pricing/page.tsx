'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'

type Language = 'ko' | 'en' | 'ja' | 'zh'

export default function PricingPage() {
  const [language, setLanguage] = useState<Language>('ko')
  const [isAnnual, setIsAnnual] = useState(false)

  const translations = {
    ko: {
      title: '간단하고 투명한 가격',
      subtitle: '프로젝트 규모에 맞는 플랜을 선택하세요',
      monthly: '월간',
      annual: '연간',
      save: '20% 절약',
      getStarted: '시작하기',
      contactSales: '영업팀 문의',
      plans: {
        free: {
          name: '무료',
          price: '₩0',
          description: '개인 프로젝트와 테스트용',
          features: [
            'AI 콘텐츠 생성 10회/월',
            '기본 템플릿',
            '커뮤니티 지원',
            '1개 프로젝트'
          ]
        },
        pro: {
          name: '프로',
          priceMonthly: '₩29,000',
          priceAnnual: '₩290,000',
          description: '전문가와 소규모 팀용',
          popular: '인기',
          features: [
            'AI 콘텐츠 생성 무제한',
            '모든 프리미엄 템플릿',
            '우선 지원',
            '무제한 프로젝트',
            'Figma/GitHub 통합',
            '팀 협업 (최대 5명)'
          ]
        },
        enterprise: {
          name: '엔터프라이즈',
          price: '맞춤 견적',
          description: '대규모 조직용',
          features: [
            '모든 Pro 기능',
            '무제한 팀원',
            '전담 계정 매니저',
            'SLA 보장',
            '맞춤 통합',
            '온프레미스 옵션'
          ]
        }
      }
    },
    en: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose a plan that fits your project scale',
      monthly: 'Monthly',
      annual: 'Annual',
      save: 'Save 20%',
      getStarted: 'Get Started',
      contactSales: 'Contact Sales',
      plans: {
        free: {
          name: 'Free',
          price: '$0',
          description: 'For personal projects and testing',
          features: [
            '10 AI generations/month',
            'Basic templates',
            'Community support',
            '1 project'
          ]
        },
        pro: {
          name: 'Pro',
          priceMonthly: '$29',
          priceAnnual: '$290',
          description: 'For professionals and small teams',
          popular: 'Popular',
          features: [
            'Unlimited AI generations',
            'All premium templates',
            'Priority support',
            'Unlimited projects',
            'Figma/GitHub integrations',
            'Team collaboration (up to 5)'
          ]
        },
        enterprise: {
          name: 'Enterprise',
          price: 'Custom',
          description: 'For large organizations',
          features: [
            'All Pro features',
            'Unlimited team members',
            'Dedicated account manager',
            'SLA guarantee',
            'Custom integrations',
            'On-premise option'
          ]
        }
      }
    },
    ja: {
      title: 'シンプルで透明な料金',
      subtitle: 'プロジェクト規模に合わせたプランを選択',
      monthly: '月額',
      annual: '年額',
      save: '20%お得',
      getStarted: '始める',
      contactSales: '営業に問い合わせ',
      plans: {
        free: {
          name: '無料',
          price: '¥0',
          description: '個人プロジェクトとテスト用',
          features: [
            'AI生成10回/月',
            '基本テンプレート',
            'コミュニティサポート',
            '1プロジェクト'
          ]
        },
        pro: {
          name: 'プロ',
          priceMonthly: '¥2,900',
          priceAnnual: '¥29,000',
          description: 'プロフェッショナルと小規模チーム用',
          popular: '人気',
          features: [
            'AI生成無制限',
            'すべてのプレミアムテンプレート',
            '優先サポート',
            '無制限プロジェクト',
            'Figma/GitHub統合',
            'チーム協業（最大5名）'
          ]
        },
        enterprise: {
          name: 'エンタープライズ',
          price: 'カスタム',
          description: '大規模組織用',
          features: [
            'すべてのPro機能',
            '無制限チームメンバー',
            '専任アカウントマネージャー',
            'SLA保証',
            'カスタム統合',
            'オンプレミスオプション'
          ]
        }
      }
    },
    zh: {
      title: '简单透明的定价',
      subtitle: '选择适合您项目规模的计划',
      monthly: '月付',
      annual: '年付',
      save: '节省20%',
      getStarted: '开始使用',
      contactSales: '联系销售',
      plans: {
        free: {
          name: '免费',
          price: '¥0',
          description: '适用于个人项目和测试',
          features: [
            'AI生成10次/月',
            '基础模板',
            '社区支持',
            '1个项目'
          ]
        },
        pro: {
          name: '专业版',
          priceMonthly: '¥290',
          priceAnnual: '¥2,900',
          description: '适用于专业人士和小团队',
          popular: '热门',
          features: [
            'AI生成无限次',
            '所有高级模板',
            '优先支持',
            '无限项目',
            'Figma/GitHub集成',
            '团队协作（最多5人）'
          ]
        },
        enterprise: {
          name: '企业版',
          price: '定制',
          description: '适用于大型组织',
          features: [
            '所有专业版功能',
            '无限团队成员',
            '专属客户经理',
            'SLA保证',
            '定制集成',
            '本地部署选项'
          ]
        }
      }
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar currentPage="pricing" language={language} setLanguage={setLanguage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 border-2 border-purple-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                !isAnnual ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
            >
              {t.monthly}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                isAnnual ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
            >
              {t.annual}
              {isAnnual && (
                <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  {t.save}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl p-8 border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.plans.free.name}</h3>
            <p className="text-gray-600 mb-6">{t.plans.free.description}</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">{t.plans.free.price}</span>
            </div>
            <Link
              href="/sign-up"
              className="block w-full text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all mb-6"
            >
              {t.getStarted}
            </Link>
            <ul className="space-y-3">
              {t.plans.free.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-3xl p-8 border-2 border-purple-500 relative shadow-2xl scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>{t.plans.pro.popular}</span>
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.plans.pro.name}</h3>
            <p className="text-gray-600 mb-6">{t.plans.pro.description}</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">
                {isAnnual ? t.plans.pro.priceAnnual : t.plans.pro.priceMonthly}
              </span>
              <span className="text-gray-600">/{isAnnual ? language === 'ko' ? '년' : language === 'ja' ? '年' : language === 'zh' ? '年' : 'year' : language === 'ko' ? '월' : language === 'ja' ? '月' : language === 'zh' ? '月' : 'month'}</span>
            </div>
            <Link
              href="/sign-up"
              className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all mb-6"
            >
              {t.getStarted}
            </Link>
            <ul className="space-y-3">
              {t.plans.pro.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-3xl p-8 border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.plans.enterprise.name}</h3>
            <p className="text-gray-600 mb-6">{t.plans.enterprise.description}</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">{t.plans.enterprise.price}</span>
            </div>
            <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all mb-6">
              {t.contactSales}
            </button>
            <ul className="space-y-3">
              {t.plans.enterprise.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}