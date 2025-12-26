'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Zap,
  Palette,
  Code2,
  TrendingUp,
  Users,
  Globe,
  Shield,
  Layers,
  GitBranch,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Play,
  Figma,
  Github,
  Slack
} from 'lucide-react';

export default function Features() {
  const [activeTab, setActiveTab] = useState('marketing');

  const tabs = [
    { id: 'marketing', label: 'Marketing AI', icon: Zap, color: 'orange' },
    { id: 'design', label: 'Design AI', icon: Palette, color: 'purple' },
    { id: 'developer', label: 'Developer AI', icon: Code2, color: 'emerald' },
  ];

  const features = {
    marketing: [
      {
        icon: TrendingUp,
        title: 'AI 콘텐츠 생성',
        description: '블로그 포스트, SNS 콘텐츠, 이메일 마케팅 자동 생성',
        benefits: ['1분 만에 콘텐츠 생성', 'SEO 최적화', '다국어 지원']
      },
      {
        icon: BarChart3,
        title: '실시간 트렌드 분석',
        description: '시장 트렌드를 실시간으로 분석하고 인사이트 제공',
        benefits: ['소셜 미디어 모니터링', '경쟁사 분석', '키워드 추천']
      },
      {
        icon: MessageSquare,
        title: 'SNS 자동 포스팅',
        description: '여러 플랫폼에 동시 예약 포스팅',
        benefits: ['멀티 플랫폼 지원', '최적 시간 추천', '성과 분석']
      },
      {
        icon: Lightbulb,
        title: '캠페인 아이디어 제안',
        description: 'AI가 마케팅 캠페인 아이디어를 자동 생성',
        benefits: ['타겟 맞춤 제안', '크리에이티브 아이디어', 'A/B 테스트 설계']
      },
    ],
    design: [
      {
        icon: Figma,
        title: 'Figma 플러그인',
        description: 'Figma에서 직접 AI 디자인 제안 받기',
        benefits: ['실시간 디자인 제안', '색상 팔레트 생성', '레이아웃 최적화']
      },
      {
        icon: Palette,
        title: 'AI 디자인 제안',
        description: '브랜드 가이드에 맞는 디자인 자동 생성',
        benefits: ['브랜드 일관성', '다양한 변형', '즉시 적용']
      },
      {
        icon: Layers,
        title: '실시간 협업',
        description: '팀원들과 실시간으로 디자인 협업',
        benefits: ['동시 편집', '버전 관리', '코멘트 시스템']
      },
      {
        icon: Sparkles,
        title: '이미지 생성 & 편집',
        description: 'AI로 이미지 생성 및 고급 편집',
        benefits: ['텍스트→이미지', '배경 제거', '스타일 변환']
      },
    ],
    developer: [
      {
        icon: Github,
        title: 'GitHub App 통합',
        description: 'GitHub과 완벽하게 통합된 자동화',
        benefits: ['PR 자동 리뷰', 'Issue 분석', 'CI/CD 연동']
      },
      {
        icon: Code2,
        title: '자동 코드 리뷰',
        description: 'AI가 코드를 분석하고 개선 사항 제안',
        benefits: ['버그 탐지', '보안 취약점 검사', '성능 최적화']
      },
      {
        icon: GitBranch,
        title: 'PR 자동화',
        description: 'Pull Request 메시지 자동 생성',
        benefits: ['커밋 요약', '변경사항 분석', '체크리스트 생성']
      },
      {
        icon: Slack,
        title: 'Slack Bot 연동',
        description: 'Slack에서 직접 AI 기능 사용',
        benefits: ['즉시 코드 리뷰', '팀 알림', '일일 리포트']
      },
    ],
  };

  const integrations = [
    { name: 'Figma', icon: Figma, color: 'bg-purple-100 text-purple-600' },
    { name: 'GitHub', icon: Github, color: 'bg-slate-900 text-white' },
    { name: 'Slack', icon: Slack, color: 'bg-purple-600 text-white' },
    { name: 'Google', icon: Globe, color: 'bg-blue-500 text-white' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:scale-105 transition-transform">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Sparkles size={18} fill="currentColor" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              AIWorkground
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <Link href="/#features" className="hover:text-purple-600 transition-colors">기능 소개</Link>
            <Link href="/pricing" className="hover:text-purple-600 transition-colors">가격</Link>
            <Link href="/features" className="text-purple-600">상세 기능</Link>
            <Link href="/dashboard" className="px-5 py-2 rounded-full bg-slate-900 text-white font-semibold hover:bg-purple-600 hover:shadow-lg transition-all">
              대시보드
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 shadow-sm mb-8">
            <Rocket className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              모든 기능 탐색하기
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              강력한 AI 도구
            </span>로<br />
            업무를 혁신하세요
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            마케팅, 디자인, 개발 전 영역에서 생산성을 300% 향상시키세요
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group">
              무료로 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-50 hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-slate-700" />
              데모 보기
            </button>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${
                        tab.color === 'orange' ? 'from-orange-500 to-pink-500' :
                        tab.color === 'purple' ? 'from-indigo-500 to-purple-600' :
                        'from-emerald-400 to-teal-500'
                      } text-white shadow-xl scale-105`
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <tab.icon size={24} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features[activeTab as keyof typeof features].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${
                  activeTab === 'marketing' ? 'bg-orange-100' :
                  activeTab === 'design' ? 'bg-purple-100' : 'bg-emerald-100'
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${
                    activeTab === 'marketing' ? 'text-orange-600' :
                    activeTab === 'design' ? 'text-purple-600' : 'text-emerald-600'
                  }`} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        activeTab === 'marketing' ? 'text-orange-500' :
                        activeTab === 'design' ? 'text-purple-500' : 'text-emerald-500'
                      }`} />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">완벽한 통합</h2>
          <p className="text-slate-600 text-lg mb-12">
            이미 사용하고 계신 도구들과 원활하게 연동됩니다
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {integrations.map((integration, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${integration.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <integration.icon size={32} />
                </div>
                <p className="font-bold text-slate-900">{integration.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">검증된 성과</h2>
            <p className="text-purple-100 text-lg">
              수천 개의 팀이 AIWorkground로 성과를 내고 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '300%', label: '평균 생산성 향상' },
              { value: '10,000+', label: '활성 사용자' },
              { value: '1M+', label: '생성된 콘텐츠' },
              { value: '99.9%', label: '서비스 가동률' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-black mb-2">{stat.value}</div>
                <div className="text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-pink-500 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                지금 바로 체험해보세요
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                무료 플랜으로 모든 기능을 14일간 무료로 사용해보세요
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-slate-900 font-bold text-lg hover:scale-105 transition-all shadow-lg"
              >
                무료로 시작하기
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}