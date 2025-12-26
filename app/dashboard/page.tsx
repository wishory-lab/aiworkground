'use client'

import React from 'react';
import Link from 'next/link';
import { 
  Home,
  Sparkles, 
  Zap, 
  Palette, 
  Code2,
  TrendingUp,
  Settings,
  Bell,
  Search,
  FileText,
  Activity,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: '생성된 콘텐츠', value: '127', change: '+12%', iconColor: 'text-orange-600', bgColor: 'bg-orange-100' },
    { label: '활성 프로젝트', value: '8', change: '+3', iconColor: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: '팀 멤버', value: '12', change: '+2', iconColor: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: '완료율', value: '94%', change: '+5%', iconColor: 'text-green-600', bgColor: 'bg-green-100' },
  ];

  const activities = [
    { title: '블로그 포스트 생성 완료', time: '5분 전', type: 'marketing' },
    { title: 'Figma 디자인 제안 받음', time: '1시간 전', type: 'design' },
    { title: 'GitHub PR 자동 리뷰 완료', time: '3시간 전', type: 'developer' },
    { title: 'SNS 포스팅 예약 완료', time: '5시간 전', type: 'marketing' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed w-full z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:scale-105 transition-transform">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Sparkles size={18} fill="currentColor" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              AIWorkground
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Search size={20} className="text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 p-6">
          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-50 text-purple-600 font-medium transition-colors">
              <Home size={20} />
              대시보드
            </Link>
            <Link href="/features" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors">
              <Sparkles size={20} />
              기능
            </Link>
            <Link href="/pricing" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors">
              <TrendingUp size={20} />
              가격
            </Link>
            <div className="pt-4 border-t border-slate-200 mt-4">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase mb-2">AI 도구</p>
              <a href="#marketing" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors">
                <Zap size={20} />
                Marketing AI
              </a>
              <a href="#design" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors">
                <Palette size={20} />
                Design AI
              </a>
              <a href="#developer" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors">
                <Code2 size={20} />
                Developer AI
              </a>
            </div>
            <div className="pt-4">
              <a href="#settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors">
                <Settings size={20} />
                설정
              </a>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">환영합니다! 👋</h1>
            <p className="text-slate-600">AIWorkground에서 생산성을 극대화하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    {idx === 0 && <FileText className={`w-6 h-6 ${stat.iconColor}`} />}
                    {idx === 1 && <Activity className={`w-6 h-6 ${stat.iconColor}`} />}
                    {idx === 2 && <Users className={`w-6 h-6 ${stat.iconColor}`} />}
                    {idx === 3 && <CheckCircle2 className={`w-6 h-6 ${stat.iconColor}`} />}
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">빠른 시작</h2>
            <p className="text-purple-100 mb-6">AI 도구를 사용하여 새로운 프로젝트를 시작하세요.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-left transition-all group">
                <Zap className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Marketing AI</h3>
                <p className="text-sm text-purple-100">콘텐츠 생성</p>
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-left transition-all group">
                <Palette className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Design AI</h3>
                <p className="text-sm text-purple-100">디자인 제작</p>
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-left transition-all group">
                <Code2 className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Developer AI</h3>
                <p className="text-sm text-purple-100">코드 리뷰</p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">최근 활동</h2>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
                전체 보기 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className={`w-10 h-10 rounded-lg ${
                    activity.type === 'marketing' ? 'bg-orange-100' :
                    activity.type === 'design' ? 'bg-purple-100' : 'bg-emerald-100'
                  } flex items-center justify-center`}>
                    {activity.type === 'marketing' && <Zap className="w-5 h-5 text-orange-600" />}
                    {activity.type === 'design' && <Palette className="w-5 h-5 text-purple-600" />}
                    {activity.type === 'developer' && <Code2 className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{activity.title}</p>
                    <p className="text-sm text-slate-500">{activity.time}</p>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <ArrowRight size={16} className="text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}