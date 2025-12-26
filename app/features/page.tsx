'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { Zap, Palette, Code2, CheckCircle2 } from 'lucide-react'

type Language = 'ko' | 'en' | 'ja' | 'zh'

export default function FeaturesPage() {
  const [language, setLanguage] = useState<Language>('ko')
  const [activeTab, setActiveTab] = useState<'marketing' | 'design' | 'developer'>('marketing')

  const translations = {
    ko: {
      title: '강력한 AI 기능',
      subtitle: 'AIWorkground의 강력한 기능을 살펴보세요',
      marketing: '마케팅 AI',
      design: '디자인 AI',
      developer: '개발자 AI',
      tabs: {
        marketing: {
          title: '마케팅 자동화',
          description: 'AI 기반 마케팅 콘텐츠 생성 및 자동화',
          features: [
            { title: 'AI 콘텐츠 생성', desc: '블로그, SNS 포스트를 1분 만에 생성' },
            { title: 'SNS 자동 포스팅', desc: '다양한 플랫폼에 자동으로 게시' },
            { title: '실시간 트렌드 분석', desc: 'AI가 최신 트렌드를 분석하고 제안' },
            { title: '이메일 캠페인', desc: '개인화된 이메일 마케팅 자동화' }
          ]
        },
        design: {
          title: '디자인 가속화',
          description: 'AI가 디자인 작업을 30초 만에 완성',
          features: [
            { title: 'Figma 플러그인 연동', desc: 'Figma에서 바로 AI 디자인 제안' },
            { title: 'AI 맞춤 디자인 제안', desc: '브랜드에 맞는 디자인 자동 생성' },
            { title: '실시간 팀 협업', desc: '팀원들과 실시간으로 협업' },
            { title: '디자인 시스템', desc: '일관된 디자인 시스템 자동 생성' }
          ]
        },
        developer: {
          title: '개발 생산성',
          description: '코드 리뷰와 문서화를 즉시 처리',
          features: [
            { title: 'GitHub App 통합', desc: 'GitHub와 완벽하게 통합' },
            { title: '자동 코드 리뷰', desc: 'AI가 코드 품질을 자동으로 검토' },
            { title: 'PR 메시지 자동화', desc: 'Pull Request 설명 자동 생성' },
            { title: '문서 자동 생성', desc: 'API 문서를 자동으로 생성' }
          ]
        }
      }
    },
    en: {
      title: 'Powerful AI Features',
      subtitle: 'Explore the powerful features of AIWorkground',
      marketing: 'Marketing AI',
      design: 'Design AI',
      developer: 'Developer AI',
      tabs: {
        marketing: {
          title: 'Marketing Automation',
          description: 'AI-powered marketing content generation and automation',
          features: [
            { title: 'AI Content Generation', desc: 'Generate blog posts and social media content in 1 minute' },
            { title: 'Auto Social Posting', desc: 'Automatically post to multiple platforms' },
            { title: 'Real-time Trend Analysis', desc: 'AI analyzes and suggests latest trends' },
            { title: 'Email Campaigns', desc: 'Automated personalized email marketing' }
          ]
        },
        design: {
          title: 'Design Acceleration',
          description: 'AI completes design work in 30 seconds',
          features: [
            { title: 'Figma Plugin Integration', desc: 'Get AI design suggestions directly in Figma' },
            { title: 'AI Custom Design Proposals', desc: 'Auto-generate brand-aligned designs' },
            { title: 'Real-time Team Collaboration', desc: 'Collaborate with team members in real-time' },
            { title: 'Design System', desc: 'Auto-generate consistent design systems' }
          ]
        },
        developer: {
          title: 'Development Productivity',
          description: 'Instant code review and documentation',
          features: [
            { title: 'GitHub App Integration', desc: 'Seamlessly integrated with GitHub' },
            { title: 'Automated Code Review', desc: 'AI automatically reviews code quality' },
            { title: 'PR Message Automation', desc: 'Auto-generate Pull Request descriptions' },
            { title: 'Auto Documentation', desc: 'Automatically generate API documentation' }
          ]
        }
      }
    },
    ja: {
      title: '強力なAI機能',
      subtitle: 'AIWorkgroundの強力な機能を探索',
      marketing: 'マーケティングAI',
      design: 'デザインAI',
      developer: '開発者AI',
      tabs: {
        marketing: {
          title: 'マーケティング自動化',
          description: 'AIベースのマーケティングコンテンツ生成と自動化',
          features: [
            { title: 'AIコンテンツ生成', desc: 'ブログやSNS投稿を1分で生成' },
            { title: 'SNS自動投稿', desc: '複数のプラットフォームに自動投稿' },
            { title: 'リアルタイムトレンド分析', desc: 'AIが最新トレンドを分析して提案' },
            { title: 'メールキャンペーン', desc: 'パーソナライズされたメールマーケティング自動化' }
          ]
        },
        design: {
          title: 'デザイン加速',
          description: 'AIが30秒でデザイン作業を完成',
          features: [
            { title: 'Figmaプラグイン連携', desc: 'FigmaでAIデザイン提案' },
            { title: 'AIカスタムデザイン提案', desc: 'ブランドに合ったデザイン自動生成' },
            { title: 'リアルタイムチーム協業', desc: 'チームメンバーとリアルタイムで協業' },
            { title: 'デザインシステム', desc: '一貫したデザインシステム自動生成' }
          ]
        },
        developer: {
          title: '開発生産性',
          description: 'コードレビューとドキュメント化を即座に処理',
          features: [
            { title: 'GitHub App統合', desc: 'GitHubと完全統合' },
            { title: '自動コードレビュー', desc: 'AIがコード品質を自動検証' },
            { title: 'PRメッセージ自動化', desc: 'Pull Request説明を自動生成' },
            { title: 'ドキュメント自動生成', desc: 'APIドキュメントを自動生成' }
          ]
        }
      }
    },
    zh: {
      title: '强大的AI功能',
      subtitle: '探索AIWorkground的强大功能',
      marketing: '营销AI',
      design: '设计AI',
      developer: '开发者AI',
      tabs: {
        marketing: {
          title: '营销自动化',
          description: '基于AI的营销内容生成和自动化',
          features: [
            { title: 'AI内容生成', desc: '1分钟生成博客和社交媒体内容' },
            { title: '社交媒体自动发布', desc: '自动发布到多个平台' },
            { title: '实时趋势分析', desc: 'AI分析并建议最新趋势' },
            { title: '电子邮件活动', desc: '个性化电子邮件营销自动化' }
          ]
        },
        design: {
          title: '设计加速',
          description: 'AI在30秒内完成设计工作',
          features: [
            { title: 'Figma插件集成', desc: '直接在Figma中获取AI设计建议' },
            { title: 'AI定制设计提案', desc: '自动生成符合品牌的设计' },
            { title: '实时团队协作', desc: '与团队成员实时协作' },
            { title: '设计系统', desc: '自动生成一致的设计系统' }
          ]
        },
        developer: {
          title: '开发生产力',
          description: '即时代码审查和文档化',
          features: [
            { title: 'GitHub App集成', desc: '与GitHub无缝集成' },
            { title: '自动代码审查', desc: 'AI自动审查代码质量' },
            { title: 'PR消息自动化', desc: '自动生成Pull Request描述' },
            { title: '自动文档生成', desc: '自动生成API文档' }
          ]
        }
      }
    }
  }

  const t = translations[language]
  const tabIcons = {
    marketing: Zap,
    design: Palette,
    developer: Code2
  }

  const TabIcon = tabIcons[activeTab]
  const activeTabData = t.tabs[activeTab]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar currentPage="features" language={language} setLanguage={setLanguage} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          {(['marketing', 'design', 'developer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 p-6 rounded-2xl border-2 transition-all ${
                activeTab === tab
                  ? 'border-purple-500 bg-white shadow-xl scale-105'
                  : 'border-purple-100 bg-white/80 hover:border-purple-300'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900">{t[tab]}</h3>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-12 border-2 border-purple-100 shadow-2xl">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
              <TabIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{activeTabData.title}</h2>
              <p className="text-gray-600">{activeTabData.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTabData.features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}