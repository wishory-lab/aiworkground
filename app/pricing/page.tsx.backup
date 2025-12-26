'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Check,
  Zap,
  Rocket,
  Crown,
  ArrowRight,
  Users,
  Infinity
} from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      icon: Sparkles,
      price: { monthly: 0, annual: 0 },
      description: '개인 사용자를 위한 무료 플랜',
      features: [
        '월 10개 콘텐츠 생성',
        '기본 디자인 제안',
        '월 5회 코드 리뷰',
        '커뮤니티 지원',
        '1GB 저장공간',
      ],
      cta: '무료로 시작하기',
      popular: false,
      gradient: 'from-slate-500 to-slate-600',
    },
    {
      name: 'Pro',
      icon: Zap,
      price: { monthly: 29000, annual: 290000 },
      description: '프로페셔널을 위한 완벽한 선택',
      features: [
        '무제한 콘텐츠 생성',
        'AI 맞춤 디자인 제안',
        '무제한 코드 리뷰',
        '우선 지원',
        '50GB 저장공간',
        'Figma 플러그인',
        'GitHub App 통합',
        'Slack Bot 연동',
      ],
      cta: 'Pro 시작하기',
      popular: true,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 99000, annual: 990000 },
      description: '팀과 기업을 위한 최고급 플랜',
      features: [
        'Pro의 모든 기능',
        '무제한 팀 멤버',
        '전담 계정 매니저',
        'SLA 99.9% 보장',
        '무제한 저장공간',
        '커스텀 AI 모델',
        'API 액세스',
        '온프레미스 배포 옵션',
        '맞춤형 교육',
      ],
      cta: '영업팀 문의',
      popular: false,
      gradient: 'from-indigo-500 to-purple-500',
    },
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
            <Link href="/pricing" className="text-purple-600">가격</Link>
            <Link href="/features" className="hover:text-purple-600 transition-colors">상세 기능</Link>
            <Link href="/dashboard" className="px-5 py-2 rounded-full bg-slate-900 text-white font-semibold hover:bg-purple-600 hover:shadow-lg transition-all">
              대시보드
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            당신에게 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">딱 맞는</span> 플랜
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            규모에 관계없이 모든 팀을 위한 합리적인 가격
          </p>

          {/* Annual Toggle */}
          <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 border border-slate-200 mb-16">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                !isAnnual ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              월간 결제
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                isAnnual ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              연간 결제
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                2개월 무료
              </span>
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-white rounded-3xl p-8 border-2 transition-all hover:shadow-2xl ${
                  plan.popular
                    ? 'border-purple-500 shadow-xl scale-105'
                    : 'border-slate-200 hover:border-purple-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white mb-6`}>
                  <plan.icon size={28} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-black text-slate-900">
                    {plan.price[isAnnual ? 'annual' : 'monthly'] === 0
                      ? '무료'
                      : `₩${(plan.price[isAnnual ? 'annual' : 'monthly'] / (isAnnual ? 12 : 1)).toLocaleString()}`}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-slate-600 ml-2">/ 월</span>
                  )}
                </div>

                <Link
                  href="/dashboard"
                  className={`block w-full py-3 rounded-xl font-bold text-center transition-all mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">자주 묻는 질문</h2>
          <div className="space-y-6">
            {[
              {
                q: '무료 플랜으로 시작할 수 있나요?',
                a: '네! 신용카드 등록 없이 무료 플랜으로 바로 시작하실 수 있습니다.',
              },
              {
                q: '언제든지 플랜을 변경할 수 있나요?',
                a: '네, 언제든지 업그레이드 또는 다운그레이드가 가능합니다.',
              },
              {
                q: '환불 정책은 어떻게 되나요?',
                a: '첫 30일 이내에는 전액 환불이 가능합니다.',
              },
              {
                q: '팀 멤버는 몇 명까지 추가할 수 있나요?',
                a: 'Pro 플랜은 최대 10명, Enterprise는 무제한입니다.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-slate-200 pb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              아직 고민 중이신가요?
            </h2>
            <p className="text-purple-100 text-lg mb-8">
              무료 플랜으로 먼저 체험해보세요. 신용카드 필요 없습니다.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              무료로 시작하기
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}