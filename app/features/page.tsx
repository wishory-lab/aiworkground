'use client';

import { useState } from 'react';
import { 
  Zap, 
  Globe, 
  Shield, 
  Users, 
  Code,
  Palette,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';

// 다국어 지원
const translations = {
  ko: {
    title: 'AIWorkground의 강력한 기능',
    subtitle: '전문가급 AI 기술로 업무 효율성을 극대화하세요',
    coreFeatures: '핵심 기능',
    aiGeneration: {
      title: '최첨단 AI 콘텐츠 생성',
      desc: 'GPT-4 기반 AI로 블로그, 마케팅 카피, 코드, 이메일 등 다양한 형태의 전문적인 콘텐츠를 생성합니다.',
      features: ['GPT-4 최신 모델 사용', '4가지 콘텐츠 타입 지원', '실시간 생성', 'SEO 최적화']
    },
    multilingual: {
      title: '글로벌 다국어 지원',
      desc: '한국어, 영어, 일본어, 중국어 4개 언어를 완벽 지원하여 글로벌 비즈니스 확장을 도와드립니다.',
      features: ['4개 언어 완벽 지원', '실시간 언어 전환', '현지화된 UI/UX', '문화적 맥락 고려']
    },
    collaboration: {
      title: '팀 협업 최적화',
      desc: '실시간 협업 기능과 버전 관리로 팀의 생산성을 극대화하고 효율적인 워크플로우를 구축합니다.',
      features: ['실시간 공동 작업', '버전 히스토리 관리', '팀 멤버 권한 설정', '피드백 및 리뷰 시스템']
    },
    security: {
      title: '엔터프라이즈급 보안',
      desc: 'SOC2 Type II 인증과 ISO 27001 표준을 준수하여 최고 수준의 데이터 보안을 제공합니다.',
      features: ['SOC2 Type II 인증', 'ISO 27001 준수', '암호화된 데이터 전송', '정기 보안 감사']
    },
    advanced: '고급 기능',
    analytics: {
      title: '상세 분석 및 인사이트',
      desc: '콘텐츠 성과 분석, 사용자 행동 패턴, ROI 측정 등 데이터 기반 의사결정을 지원합니다.'
    },
    api: {
      title: 'REST API 연동',
      desc: '강력한 API를 통해 기존 시스템과 완벽하게 통합하고 커스텀 솔루션을 구축하세요.'
    },
    templates: {
      title: '프리미엄 템플릿',
      desc: '업계별 최적화된 500+ 프리미엄 템플릿으로 더 빠르고 정확한 콘텐츠 생성이 가능합니다.'
    }
  },
  en: {
    title: 'Powerful Features of AIWorkground',
    subtitle: 'Maximize work efficiency with professional-grade AI technology',
    coreFeatures: 'Core Features',
    aiGeneration: {
      title: 'Cutting-Edge AI Content Generation',
      desc: 'Generate professional content including blogs, marketing copy, code, and emails using GPT-4 based AI.',
      features: ['Latest GPT-4 model', '4 content types supported', 'Real-time generation', 'SEO optimized']
    },
    multilingual: {
      title: 'Global Multilingual Support',
      desc: 'Perfect support for 4 languages (Korean, English, Japanese, Chinese) to help expand your global business.',
      features: ['4 languages fully supported', 'Real-time language switching', 'Localized UI/UX', 'Cultural context considered']
    },
    collaboration: {
      title: 'Team Collaboration Optimization',
      desc: 'Maximize team productivity and build efficient workflows with real-time collaboration and version management.',
      features: ['Real-time collaboration', 'Version history management', 'Team member permissions', 'Feedback and review system']
    },
    security: {
      title: 'Enterprise-Grade Security',
      desc: 'Provides the highest level of data security with SOC2 Type II certification and ISO 27001 compliance.',
      features: ['SOC2 Type II certified', 'ISO 27001 compliant', 'Encrypted data transmission', 'Regular security audits']
    },
    advanced: 'Advanced Features',
    analytics: {
      title: 'Detailed Analytics & Insights',
      desc: 'Support data-driven decisions with content performance analysis, user behavior patterns, and ROI measurement.'
    },
    api: {
      title: 'REST API Integration',
      desc: 'Seamlessly integrate with existing systems and build custom solutions through powerful APIs.'
    },
    templates: {
      title: 'Premium Templates',
      desc: 'Enable faster and more accurate content generation with 500+ industry-optimized premium templates.'
    }
  },
  ja: {
    title: 'AIWorkgroundの強力な機能',
    subtitle: 'プロフェッショナル級AI技術で業務効率を最大化',
    coreFeatures: 'コア機能',
    aiGeneration: {
      title: '最先端AIコンテンツ生成',
      desc: 'GPT-4ベースのAIで、ブログ、マーケティングコピー、コード、メールなど様々な形式のプロフェッショナルコンテンツを生成します。',
      features: ['最新GPT-4モデル使用', '4つのコンテンツタイプ対応', 'リアルタイム生成', 'SEO最適化']
    },
    multilingual: {
      title: 'グローバル多言語サポート',
      desc: '韓国語、英語、日本語、中国語の4言語を完全サポートし、グローバルビジネス拡張をサポートします。',
      features: ['4言語完全対応', 'リアルタイム言語切替', 'ローカライズされたUI/UX', '文化的文脈考慮']
    },
    collaboration: {
      title: 'チーム協業最適化',
      desc: 'リアルタイム協業機能とバージョン管理でチームの生産性を最大化し、効率的なワークフローを構築します。',
      features: ['リアルタイム共同作業', 'バージョン履歴管理', 'チームメンバー権限設定', 'フィードバック・レビューシステム']
    },
    security: {
      title: 'エンタープライズ級セキュリティ',
      desc: 'SOC2 Type II認証とISO 27001標準に準拠し、最高レベルのデータセキュリティを提供します。',
      features: ['SOC2 Type II認証', 'ISO 27001準拠', '暗号化データ転送', '定期セキュリティ監査']
    },
    advanced: '高度な機能',
    analytics: {
      title: '詳細分析とインサイト',
      desc: 'コンテンツパフォーマンス分析、ユーザー行動パターン、ROI測定などデータ基盤の意思決定を支援します。'
    },
    api: {
      title: 'REST API連携',
      desc: '強力なAPIを通じて既存システムと完全統合し、カスタムソリューションを構築してください。'
    },
    templates: {
      title: 'プレミアムテンプレート',
      desc: '業界別最適化された500+プレミアムテンプレートでより速く正確なコンテンツ生成が可能です。'
    }
  },
  zh: {
    title: 'AIWorkground的强大功能',
    subtitle: '用专业级AI技术最大化工作效率',
    coreFeatures: '核心功能',
    aiGeneration: {
      title: '前沿AI内容生成',
      desc: '使用基于GPT-4的AI生成博客、营销文案、代码、邮件等各种形式的专业内容。',
      features: ['使用最新GPT-4模型', '支持4种内容类型', '实时生成', 'SEO优化']
    },
    multilingual: {
      title: '全球多语言支持',
      desc: '完美支持韩语、英语、日语、中文4种语言，助力您的全球业务扩展。',
      features: ['4种语言完全支持', '实时语言切换', '本地化UI/UX', '考虑文化背景']
    },
    collaboration: {
      title: '团队协作优化',
      desc: '通过实时协作功能和版本管理最大化团队生产力，构建高效工作流程。',
      features: ['实时协作', '版本历史管理', '团队成员权限设置', '反馈和评审系统']
    },
    security: {
      title: '企业级安全',
      desc: '通过SOC2 Type II认证和ISO 27001标准合规，提供最高级别的数据安全。',
      features: ['SOC2 Type II认证', 'ISO 27001合规', '加密数据传输', '定期安全审计']
    },
    advanced: '高级功能',
    analytics: {
      title: '详细分析和洞察',
      desc: '通过内容性能分析、用户行为模式、ROI测量等支持数据驱动的决策。'
    },
    api: {
      title: 'REST API集成',
      desc: '通过强大的API与现有系统完美集成，构建定制解决方案。'
    },
    templates: {
      title: '高级模板',
      desc: '通过500+行业优化的高级模板实现更快更准确的内容生成。'
    }
  }
};

export default function FeaturesPage() {
  const [currentLanguage, setCurrentLanguage] = useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  
  const t = translations[currentLanguage];

  const coreFeatures = [
    {
      icon: Zap,
      title: t.aiGeneration.title,
      description: t.aiGeneration.desc,
      features: t.aiGeneration.features,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Globe,
      title: t.multilingual.title,
      description: t.multilingual.desc,
      features: t.multilingual.features,
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: Users,
      title: t.collaboration.title,
      description: t.collaboration.desc,
      features: t.collaboration.features,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Shield,
      title: t.security.title,
      description: t.security.desc,
      features: t.security.features,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const advancedFeatures = [
    {
      icon: BarChart3,
      title: t.analytics.title,
      description: t.analytics.desc,
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Code,
      title: t.api.title,
      description: t.api.desc,
      color: 'from-green-500 to-blue-600'
    },
    {
      icon: Palette,
      title: t.templates.title,
      description: t.templates.desc,
      color: 'from-pink-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.coreFeatures}
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {coreFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.advanced}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 mx-auto`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              지금 시작해보세요
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              30일 무료 체험으로 AIWorkground의 모든 기능을 경험해보세요
            </p>
            <a
              href="/sign-up"
              className="inline-flex items-center bg-white text-purple-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              무료 체험 시작하기
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}