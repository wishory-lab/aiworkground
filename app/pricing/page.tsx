'use client';

import { useState } from 'react';
import { 
  Check, 
  Zap, 
  Crown, 
  Building2, 
  ArrowRight,
  Star,
  Users,
  Shield,
  Sparkles,
  GraduationCap,
  Rocket,
  Globe,
  Clock,
  Award,
  Target,
  TrendingUp,
  Calculator,
  Briefcase
} from 'lucide-react';
import Navbar from '@/components/Navbar';

// 다국어 지원
const translations = {
  ko: {
    title: '전문가급 솔루션을 위한 프리미엄 가격 정책',
    subtitle: '비즈니스 규모와 전문성 수준에 최적화된 맞춤형 엔터프라이즈 플랜',
    monthly: '월간',
    annual: '연간',
    mostPopular: '가장 선택',
    bestValue: '최고 가치',
    enterprise: '엔터프라이즈',
    getStarted: '전문가 체험 시작',
    contactSales: '전용 컨설턴트 상담',
    features: '핵심 기능',
    savings: '절약',
    limitedTime: '한정 특가',
    promos: {
      student: '학생/교육자 전용 70% 할인',
      startup: '스타트업 성장 패키지',
      enterprise: '엔터프라이즈 연간 할인',
      professional: '프리랜서 & 에이전시',
      developer: '개발자 & 크리에이터',
      team: '팀 & 부서 단위'
    },
    targetSegments: {
      title: '타겟별 맞춤 특가 혜택',
      subtitle: '당신의 전문 분야에 최적화된 특별 프로모션을 만나보세요'
    },
    calculator: {
      title: 'ROI 계산기',
      subtitle: 'AIWorkground로 절약할 수 있는 비용을 계산해보세요'
    }
  },
  en: {
    title: 'Premium Pricing for Professional-Grade Solutions',
    subtitle: 'Customized enterprise plans optimized for your business scale and expertise level',
    monthly: 'Monthly',
    annual: 'Annual',
    mostPopular: 'Most Popular',
    bestValue: 'Best Value',
    enterprise: 'Enterprise',
    getStarted: 'Start Expert Trial',
    contactSales: 'Dedicated Consultant',
    features: 'Key Features',
    savings: 'Save',
    limitedTime: 'Limited Time',
    promos: {
      student: '70% Discount for Students/Educators',
      startup: 'Startup Growth Package',
      enterprise: 'Enterprise Annual Discount',
      professional: 'Freelancer & Agency',
      developer: 'Developer & Creator',
      team: 'Team & Department'
    },
    targetSegments: {
      title: 'Targeted Special Offers',
      subtitle: 'Discover special promotions optimized for your professional field'
    },
    calculator: {
      title: 'ROI Calculator',
      subtitle: 'Calculate the costs you can save with AIWorkground'
    }
  },
  ja: {
    title: 'プロフェッショナル級ソリューションのプレミアム価格',
    subtitle: 'ビジネス規模と専門性レベルに最適化されたカスタマイズエンタープライズプラン',
    monthly: '月額',
    annual: '年額',
    mostPopular: '最人気',
    bestValue: '最高価値',
    enterprise: 'エンタープライズ',
    getStarted: 'エキスパート体験開始',
    contactSales: '専任コンサルタント相談',
    features: '主要機能',
    savings: '節約',
    limitedTime: '期間限定',
    promos: {
      student: '学生・教育者専用70%割引',
      startup: 'スタートアップ成長パッケージ',
      enterprise: 'エンタープライズ年間割引',
      professional: 'フリーランサー＆エージェンシー',
      developer: '開発者＆クリエイター',
      team: 'チーム＆部署単位'
    },
    targetSegments: {
      title: 'ターゲット別カスタム特価',
      subtitle: 'あなたの専門分野に最適化された特別プロモーション'
    },
    calculator: {
      title: 'ROI計算機',
      subtitle: 'AIWorkgroundで節約できるコストを計算'
    }
  },
  zh: {
    title: '专业级解决方案的高级定价',
    subtitle: '针对您的业务规模和专业水平优化的定制企业计划',
    monthly: '月付',
    annual: '年付',
    mostPopular: '最受欢迎',
    bestValue: '最超值',
    enterprise: '企业版',
    getStarted: '开始专家试用',
    contactSales: '专属顾问咨询',
    features: '主要功能',
    savings: '节省',
    limitedTime: '限时优惠',
    promos: {
      student: '学生/教育工作者专享70%折扣',
      startup: '创业成长套餐',
      enterprise: '企业年付折扣',
      professional: '自由职业者和代理商',
      developer: '开发者和创作者',
      team: '团队和部门'
    },
    targetSegments: {
      title: '目标群体定制特价',
      subtitle: '发现针对您专业领域优化的特别促销'
    },
    calculator: {
      title: 'ROI计算器',
      subtitle: '计算使用AIWorkground可以节省的成本'
    }
  }
};

export default function PricingPage() {
  const [currentLanguage, setCurrentLanguage] = useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  
  const t = translations[currentLanguage];

  const plans = [
    {
      name: 'Professional',
      icon: Zap,
      price: { monthly: 49, annual: 390 },
      originalPrice: { monthly: 99, annual: 990 },
      description: '프리랜서와 소규모 전문 팀을 위한 완전한 AI 솔루션',
      badge: null,
      color: 'from-blue-500 to-purple-600',
      features: [
        '월 5,000개 프리미엄 AI 생성',
        '업계별 전문 템플릿 1,000개',
        '고급 브랜드 톤앤매너 학습',
        'GPT-4 Turbo + Claude 3.5 접근',
        '실시간 팩트 체킹',
        '다국어 번역 (4개 언어)',
        '우선순위 이메일 지원',
        'API 액세스 (1,000 calls/월)',
        '고급 분석 대시보드'
      ],
      cta: t.getStarted,
      href: '/sign-up?plan=professional',
      popular: false,
      savings: billingCycle === 'annual' ? '60% 절약' : '50% 할인',
      badge: billingCycle === 'annual' ? '4개월 무료!' : '첫 달 50% 할인!'
    },
    {
      name: 'Business Elite',
      icon: Crown,
      price: { monthly: 149, annual: 1490 },
      originalPrice: { monthly: 299, annual: 2990 },
      description: '성장하는 비즈니스와 전문 에이전시를 위한 엔터프라이즈급 솔루션',
      badge: t.mostPopular,
      color: 'from-purple-600 to-indigo-700',
      features: [
        '월 25,000개 프리미엄 AI 생성',
        '모든 전문 템플릿 + 맞춤형 템플릿',
        '전담 성공 매니저 배정',
        '팀 협업 도구 (최대 25명)',
        '화이트라벨 솔루션',
        'SSO 통합 (SAML, OAuth)',
        '고급 워크플로우 자동화',
        '무제한 API 액세스',
        '24/7 우선순위 전화 지원',
        '맞춤형 AI 모델 훈련',
        '고급 보안 감사 도구'
      ],
      cta: t.getStarted,
      href: '/sign-up?plan=business',
      popular: true,
      savings: billingCycle === 'annual' ? '67% 절약' : '50% 할인',
      badge: billingCycle === 'annual' ? '2개월 무료 + 무료 온보딩!' : '무료 컨설팅 포함!'
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: { monthly: 499, annual: 4990 },
      originalPrice: { monthly: 999, annual: 9990 },
      description: '대규모 조직과 Fortune 500 기업을 위한 맞춤형 엔터프라이즈 솔루션',
      badge: t.bestValue,
      color: 'from-indigo-700 to-purple-800',
      features: [
        '무제한 AI 생성',
        '전담 계정 매니저 + 기술 팀',
        'Fortune 500 수준 보안',
        '무제한 팀 멤버',
        '온프레미스 배포 옵션',
        '맞춤형 AI 모델 개발',
        '컴플라이언스 지원 (SOC2, ISO)',
        '99.99% SLA 보장',
        '실시간 전화 지원',
        '고급 통합 (Salesforce, SAP)',
        '맞춤형 교육 프로그램',
        '분기별 비즈니스 리뷰'
      ],
      cta: t.contactSales,
      href: '/contact?plan=enterprise',
      popular: false,
      savings: billingCycle === 'annual' ? '75% 절약' : '50% 할인',
      badge: billingCycle === 'annual' ? '무료 POC + 전담팀 배정!' : '무료 30일 POC!'
    }
  ];

  // 타겟별 특별 프로모션
  const targetedOffers = [
    {
      title: t.promos.student,
      segment: 'Students & Educators',
      description: '학생증 또는 교육기관 이메일 인증으로 모든 플랜 70% 할인',
      icon: GraduationCap,
      color: 'from-green-400 to-emerald-500',
      features: ['무료 6개월 체험', '전용 교육 리소스', '학술 연구 지원'],
      originalPrice: '$149/월',
      discountedPrice: '$45/월',
      badge: '교육 특가',
      cta: '학생 인증하기'
    },
    {
      title: t.promos.startup,
      segment: 'Startups (Series A 이하)',
      description: '3년 이하 스타트업 대상 성장 지원 패키지',
      icon: Rocket,
      color: 'from-orange-400 to-red-500',
      features: ['첫 6개월 무료', 'VC 네트워킹 지원', '성장 컨설팅'],
      originalPrice: '$149/월',
      discountedPrice: '처음 6개월 $0',
      badge: 'STARTUP',
      cta: '스타트업 인증'
    },
    {
      title: t.promos.professional,
      segment: 'Freelancers & Agencies',
      description: '프리랜서와 에이전시를 위한 맞춤형 솔루션',
      icon: Briefcase,
      color: 'from-blue-400 to-indigo-500',
      features: ['클라이언트 포털', '화이트라벨링', '수익 공유'],
      originalPrice: '$149/월',
      discountedPrice: '$89/월',
      badge: 'PRO',
      cta: '에이전시 등록'
    },
    {
      title: t.promos.developer,
      segment: 'Developers & Creators',
      description: '개발자와 크리에이터를 위한 특별 혜택',
      icon: Target,
      color: 'from-purple-400 to-pink-500',
      features: ['무제한 API 액세스', '개발자 커뮤니티', '오픈소스 크레딧'],
      originalPrice: '$49/월',
      discountedPrice: '$29/월',
      badge: 'DEV',
      cta: 'GitHub 연동'
    },
    {
      title: t.promos.team,
      segment: 'Teams & Departments',
      description: '팀과 부서 단위의 대량 할인 혜택',
      icon: Users,
      color: 'from-teal-400 to-blue-500',
      features: ['10명 이상 40% 할인', '팀 관리 도구', '일괄 결제'],
      originalPrice: '$149/명',
      discountedPrice: '$89/명',
      badge: 'TEAM',
      cta: '팀 견적 요청'
    },
    {
      title: t.promos.enterprise,
      segment: 'Large Enterprise',
      description: '대기업을 위한 맞춤형 엔터프라이즈 솔루션',
      icon: Building2,
      color: 'from-gray-600 to-gray-800',
      features: ['맞춤형 계약', '온프레미스 옵션', '전담 지원팀'],
      originalPrice: '$499/월',
      discountedPrice: '맞춤 견적',
      badge: 'ENTERPRISE',
      cta: '엔터프라이즈 상담'
    }
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return '무료';
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 rounded-full text-purple-900 text-sm font-bold mb-8 border border-purple-200">
              <Award className="w-5 h-5 mr-2" />
              ENTERPRISE-GRADE PRICING
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              {t.subtitle}
            </p>

            {/* Enhanced Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-xl border border-gray-200 relative">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 relative ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.monthly}
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 relative ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.annual}
                <span className="absolute -top-3 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                  Save 67%
                </span>
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600 font-medium">
              💎 연간 결제 시 최대 67% 절약 + 추가 혜택
            </div>
          </div>

          {/* Enhanced Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-2xl border-2 transition-all duration-500 hover:shadow-3xl hover:-translate-y-3 ${
                  plan.popular 
                    ? 'border-purple-400 ring-4 ring-purple-100 scale-110' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {/* Enhanced Badge */}
                {plan.badge && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className={`inline-flex items-center px-6 py-3 rounded-full text-white text-sm font-bold bg-gradient-to-r ${plan.color} shadow-xl border-4 border-white`}>
                      <Crown className="w-4 h-4 mr-2" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Enhanced Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r ${plan.color} text-white mb-6 shadow-lg`}>
                      <plan.icon className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Enhanced Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-end justify-center mb-3">
                      <span className="text-sm text-gray-500 line-through mr-2">
                        {formatPrice(plan.originalPrice[billingCycle])}
                      </span>
                    </div>
                    <div className="flex items-end justify-center mb-2">
                      <span className="text-6xl font-bold text-gray-900">
                        {formatPrice(plan.price[billingCycle])}
                      </span>
                      <span className="text-gray-500 ml-2 mb-3">
                        /{billingCycle === 'monthly' ? '월' : '년'}
                      </span>
                    </div>
                    
                    <div className="flex justify-center space-x-2 mb-4">
                      <span className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
                        💰 {plan.savings}
                      </span>
                      {plan.badge && (
                        <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-bold px-4 py-2 rounded-full">
                          🎁 {plan.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced CTA Button */}
                  <a
                    href={plan.href}
                    className={`block w-full text-center py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'border-2 border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="inline w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Targeted Special Offers */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                🎯 {t.targetSegments.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.targetSegments.subtitle}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {targetedOffers.map((offer, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${offer.color}`}></div>
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${offer.color}`}>
                      {offer.badge}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${offer.color} text-white mb-6 shadow-lg`}>
                    <offer.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {offer.title}
                    </h3>
                    
                    <div className="text-sm text-gray-600 font-medium mb-4">
                      {offer.segment}
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500 line-through">{offer.originalPrice}</span>
                        <span className="text-2xl font-bold text-gray-900">{offer.discountedPrice}</span>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {offer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r ${offer.color} text-white hover:shadow-lg hover:-translate-y-1`}>
                      {offer.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Calculator Section */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-4 gap-4 transform rotate-12 scale-150">
                  {[...Array(20)].map((_, i) => (
                    <Calculator key={i} className="w-8 h-8" />
                  ))}
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white text-sm font-bold mb-6">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    {t.calculator.title}
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    {t.calculator.title}
                  </h2>
                  <p className="text-xl text-blue-100">
                    {t.calculator.subtitle}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                    {
                      metric: '작업 시간 단축',
                      value: '75%',
                      description: '주당 30시간 → 7.5시간으로 단축',
                      icon: Clock
                    },
                    {
                      metric: '콘텐츠 품질 향상',
                      value: '300%',
                      description: '전문가급 퀄리티로 브랜드 가치 향상',
                      icon: Award
                    },
                    {
                      metric: '연간 비용 절약',
                      value: '$50K+',
                      description: '외주 비용 대비 연간 $50,000+ 절약',
                      icon: TrendingUp
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                      <item.icon className="w-12 h-12 text-white mx-auto mb-4" />
                      <div className="text-4xl font-bold text-white mb-2">{item.value}</div>
                      <div className="text-lg font-semibold text-blue-100 mb-2">{item.metric}</div>
                      <div className="text-sm text-blue-200">{item.description}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button className="inline-flex items-center bg-white text-purple-900 font-bold px-10 py-5 rounded-2xl text-lg hover:bg-gray-100 transition-colors duration-300 shadow-2xl">
                    <Calculator className="mr-3 w-5 h-5" />
                    맞춤형 ROI 계산하기
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 rounded-3xl p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/30"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white text-sm font-bold mb-8">
                <Sparkles className="w-5 h-5 mr-2" />
                ENTERPRISE EXCLUSIVE OFFER
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                전문가들이 선택한 이유를<br />직접 경험해보세요
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Fortune 500 기업이 신뢰하는 AIWorkground의 진정한 가치를 30일 무료 체험과 전담 성공 매니저를 통해 경험해보세요
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6">
                <a
                  href="/sign-up?trial=enterprise"
                  className="inline-flex items-center bg-white text-purple-900 font-bold px-12 py-6 rounded-2xl text-xl hover:bg-gray-100 transition-colors duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 w-full sm:w-auto justify-center"
                >
                  <Crown className="mr-3 w-6 h-6" />
                  30일 무료 엔터프라이즈 체험
                  <ArrowRight className="ml-3 w-6 h-6" />
                </a>
                <button className="inline-flex items-center border-2 border-white text-white font-bold px-12 py-6 rounded-2xl text-xl hover:bg-white hover:text-purple-900 transition-all duration-300 w-full sm:w-auto justify-center">
                  <Briefcase className="mr-3 w-6 h-6" />
                  C-Level 전용 데모 예약
                </button>
              </div>

              <div className="mt-8 text-sm text-blue-200">
                ✅ 신용카드 불필요 • ✅ 즉시 모든 기능 이용 • ✅ 전담 온보딩 지원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}