'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { useUser } from '@clerk/nextjs'
import { 
  LayoutDashboard, 
  FileText, 
  Zap, 
  Users, 
  TrendingUp,
  Plus,
  Sparkles,
  Clock,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

type Language = 'ko' | 'en' | 'ja' | 'zh'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [language, setLanguage] = useState<Language>('ko')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const translations = {
    ko: {
      title: '대시보드',
      subtitle: 'AI 플레이그라운드 개요',
      stats: [
        { label: '생성된 콘텐츠', value: '127', change: '+12%' },
        { label: '활성 프로젝트', value: '8', change: '+3' },
        { label: '팀 멤버', value: '12', change: '+2' },
        { label: '완료율', value: '94%', change: '+5%' }
      ],
      quickStart: '빠른 시작',
      actions: [
        { label: '콘텐츠 생성', href: '/generate' },
        { label: '새 프로젝트', href: '/projects/new' },
        { label: '디자인 목업', href: '/design' }
      ],
      recentActivity: '최근 활동',
      activities: [
        { title: '블로그 포스트 생성됨', time: '2분 전' },
        { title: 'Figma 디자인 제안', time: '15분 전' },
        { title: 'GitHub PR 자동 리뷰', time: '1시간 전' },
        { title: 'SNS 포스팅 예약됨', time: '3시간 전' }
      ],
      sidebar: {
        dashboard: '대시보드',
        projects: '프로젝트',
        tools: 'AI 도구',
        team: '팀'
      }
    },
    en: {
      title: 'Dashboard',
      subtitle: 'Your AI playground overview',
      stats: [
        { label: 'Generated Content', value: '127', change: '+12%' },
        { label: 'Active Projects', value: '8', change: '+3' },
        { label: 'Team Members', value: '12', change: '+2' },
        { label: 'Completion Rate', value: '94%', change: '+5%' }
      ],
      quickStart: 'Quick Start',
      actions: [
        { label: 'Generate Content', href: '/generate' },
        { label: 'New Project', href: '/projects/new' },
        { label: 'Design Mockup', href: '/design' }
      ],
      recentActivity: 'Recent Activity',
      activities: [
        { title: 'Blog post generated', time: '2 minutes ago' },
        { title: 'Figma design suggestion', time: '15 minutes ago' },
        { title: 'GitHub PR auto-review', time: '1 hour ago' },
        { title: 'SNS post scheduled', time: '3 hours ago' }
      ],
      sidebar: {
        dashboard: 'Dashboard',
        projects: 'Projects',
        tools: 'AI Tools',
        team: 'Team'
      }
    },
    ja: {
      title: 'ダッシュボード',
      subtitle: 'AIプレイグラウンド概要',
      stats: [
        { label: '生成されたコンテンツ', value: '127', change: '+12%' },
        { label: 'アクティブプロジェクト', value: '8', change: '+3' },
        { label: 'チームメンバー', value: '12', change: '+2' },
        { label: '完了率', value: '94%', change: '+5%' }
      ],
      quickStart: 'クイックスタート',
      actions: [
        { label: 'コンテンツ生成', href: '/generate' },
        { label: '新しいプロジェクト', href: '/projects/new' },
        { label: 'デザインモックアップ', href: '/design' }
      ],
      recentActivity: '最近の活動',
      activities: [
        { title: 'ブログ記事生成', time: '2分前' },
        { title: 'Figmaデザイン提案', time: '15分前' },
        { title: 'GitHub PR自動レビュー', time: '1時間前' },
        { title: 'SNS投稿予約', time: '3時間前' }
      ],
      sidebar: {
        dashboard: 'ダッシュボード',
        projects: 'プロジェクト',
        tools: 'AIツール',
        team: 'チーム'
      }
    },
    zh: {
      title: '仪表板',
      subtitle: 'AI游乐场概览',
      stats: [
        { label: '生成的内容', value: '127', change: '+12%' },
        { label: '活跃项目', value: '8', change: '+3' },
        { label: '团队成员', value: '12', change: '+2' },
        { label: '完成率', value: '94%', change: '+5%' }
      ],
      quickStart: '快速开始',
      actions: [
        { label: '生成内容', href: '/generate' },
        { label: '新建项目', href: '/projects/new' },
        { label: '设计模型', href: '/design' }
      ],
      recentActivity: '最近活动',
      activities: [
        { title: '博客文章已生成', time: '2分钟前' },
        { title: 'Figma设计建议', time: '15分钟前' },
        { title: 'GitHub PR自动审查', time: '1小时前' },
        { title: 'SNS帖子已预约', time: '3小时前' }
      ],
      sidebar: {
        dashboard: '仪表板',
        projects: '项目',
        tools: 'AI工具',
        team: '团队'
      }
    }
  }

  const t = translations[language]

  const statIcons = [FileText, Zap, Users, TrendingUp]
  const activityIcons = [FileText, Sparkles, CheckCircle2, Clock]

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar currentPage="dashboard" language={language} setLanguage={setLanguage} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-lg border-r border-purple-100 min-h-screen p-6 hidden md:block">
          <nav className="space-y-2">
            {[
              { label: t.sidebar.dashboard, icon: LayoutDashboard, href: '/dashboard' },
              { label: t.sidebar.projects, icon: FileText, href: '/projects' },
              { label: t.sidebar.tools, icon: Sparkles, href: '/generate' },
              { label: t.sidebar.team, icon: Users, href: '/team' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group"
              >
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                <span className="text-gray-700 group-hover:text-purple-600 font-medium">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className={`max-w-6xl mx-auto space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {t.title}
              </h1>
              <p className="text-gray-600">
                {t.subtitle}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.stats.map((stat, index) => {
                const Icon = statIcons[index]
                const colors = [
                  'from-blue-500 to-blue-600',
                  'from-purple-500 to-purple-600',
                  'from-pink-500 to-pink-600',
                  'from-orange-500 to-orange-600'
                ]
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl p-6 border-2 border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${colors[index]}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border-2 border-purple-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t.quickStart}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {t.actions.map((action, index) => {
                  const icons = [Sparkles, Plus, LayoutDashboard]
                  const Icon = icons[index]
                  return (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all group"
                    >
                      <Icon className="w-6 h-6 text-purple-600" />
                      <span className="font-medium text-gray-700 group-hover:text-purple-600">
                        {action.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 border-2 border-purple-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t.recentActivity}</h2>
              <div className="space-y-4">
                {t.activities.map((activity, index) => {
                  const Icon = activityIcons[index]
                  const colors = [
                    'bg-blue-100 text-blue-600',
                    'bg-purple-100 text-purple-600',
                    'bg-green-100 text-green-600',
                    'bg-orange-100 text-orange-600'
                  ]
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all"
                    >
                      <div className={`p-2 rounded-lg ${colors[index]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}