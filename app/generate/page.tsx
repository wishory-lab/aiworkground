'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Sparkles, 
  Send,
  Copy,
  Download,
  RefreshCw,
  FileText,
  Palette,
  Code,
  BarChart,
  Video,
  Music,
  Mail,
  MessageSquare,
  Zap,
  ArrowLeft,
  CheckCircle,
  Loader2,
  X,
  Check
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function GeneratePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams?.get('category')
  const templateParam = searchParams?.get('template')

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || '')
  const [prompt, setPrompt] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [language, setLanguage] = useState<'ko' | 'en' | 'ja' | 'zh' | 'th' | 'vi' | 'ms'>('ko')
  const [generationMode, setGenerationMode] = useState<'demo' | 'ai'>('demo')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pendingTemplate, setPendingTemplate] = useState<{ prompt: string; category: string; title: string } | null>(null)
  const [editablePrompt, setEditablePrompt] = useState<string>('')

  // 카테고리 이름 다국어 지원
  const categoryNames: Record<string, Record<'ko' | 'en' | 'ja' | 'zh' | 'th' | 'vi' | 'ms', string>> = {
    writing: { ko: '글쓰기', en: 'Writing', ja: 'ライティング', zh: '写作', th: 'การเขียน', vi: 'Viết', ms: 'Menulis' },
    design: { ko: '디자인', en: 'Design', ja: 'デザイン', zh: '设计', th: 'การออกแบบ', vi: 'Thiết kế', ms: 'Reka bentuk' },
    coding: { ko: '코딩', en: 'Coding', ja: 'コーディング', zh: '编程', th: 'การเขียนโค้ด', vi: 'Lập trình', ms: 'Pengaturcaraan' },
    analytics: { ko: '분석', en: 'Analytics', ja: '分析', zh: '分析', th: 'การวิเคราะห์', vi: 'Phân tích', ms: 'Analisis' },
    video: { ko: '영상', en: 'Video', ja: '動画', zh: '视频', th: 'วิดีโอ', vi: 'Video', ms: 'Video' },
    music: { ko: '음악', en: 'Music', ja: '音楽', zh: '音乐', th: 'ดนตรี', vi: 'Âm nhạc', ms: 'Muzik' },
    marketing: { ko: '마케팅', en: 'Marketing', ja: 'マーケティング', zh: '营销', th: 'การตลาด', vi: 'Tiếp thị', ms: 'Pemasaran' },
    chatbot: { ko: '챗봇', en: 'Chatbot', ja: 'チャットボット', zh: '聊天机器人', th: 'แชทบอท', vi: 'Chatbot', ms: 'Chatbot' }
  }

  // 카테고리 목록 (전체)
  const allCategories = [
    { icon: FileText, key: 'writing', color: 'from-blue-500 to-cyan-500', example: '블로그 포스트를 작성해주세요: AI의 미래에 대해' },
    { icon: Palette, key: 'design', color: 'from-purple-500 to-pink-500', example: '미니멀한 카페 브랜딩 컨셉 3가지 제안해주세요' },
    { icon: Code, key: 'coding', color: 'from-orange-500 to-rose-500', example: 'React로 로그인 페이지 컴포넌트 만들어주세요' },
    { icon: BarChart, key: 'analytics', color: 'from-green-500 to-emerald-500', example: '이 데이터에서 핵심 인사이트 5가지 찾아주세요' },
    { icon: Video, key: 'video', color: 'from-red-500 to-pink-500', example: '유튜브 소개 영상 스크립트 작성해주세요' },
    { icon: Music, key: 'music', color: 'from-indigo-500 to-purple-500', example: '차분한 카페 배경음악 컨셉 설명해주세요' },
    { icon: Mail, key: 'marketing', color: 'from-yellow-500 to-orange-500', example: '신제품 출시 이메일 캠페인 작성해주세요' },
    { icon: MessageSquare, key: 'chatbot', color: 'from-teal-500 to-cyan-500', example: '고객 FAQ 자동 응답 시나리오 만들어주세요' }
  ]

  // 상단 카테고리 버튼용 (7개만)
  const quickCategories = [
    { icon: FileText, key: 'writing', color: 'from-blue-500 to-cyan-500', example: '블로그 포스트를 작성해주세요: AI의 미래에 대해' },
    { icon: Palette, key: 'design', color: 'from-purple-500 to-pink-500', example: '미니멀한 카페 브랜딩 컨셉 3가지 제안해주세요' },
    { icon: Code, key: 'coding', color: 'from-orange-500 to-rose-500', example: 'React로 로그인 페이지 컴포넌트 만들어주세요' },
    { icon: BarChart, key: 'analytics', color: 'from-green-500 to-emerald-500', example: '이 데이터에서 핵심 인사이트 5가지 찾아주세요' },
    { icon: Video, key: 'video', color: 'from-red-500 to-pink-500', example: '유튜브 소개 영상 스크립트 작성해주세요' },
    { icon: Music, key: 'music', color: 'from-indigo-500 to-purple-500', example: '차분한 카페 배경음악 컨셉 설명해주세요' },
    { icon: Mail, key: 'marketing', color: 'from-yellow-500 to-orange-500', example: '신제품 출시 이메일 캠페인 작성해주세요' }
  ]

  // 기존 categories 변수는 사이드바용으로 유지
  const categories = allCategories

  // 인기 템플릿 풀 (더 많은 템플릿 추가)
  const templatePool = {
    ko: [
      { title: '바이럴 SNS 콘텐츠', prompt: '2025년 AI 트렌드를 활용한 인스타그램 릴스 대본 3개를 작성해주세요. 각 대본은 15초 분량이며, 후킹 문구로 시작해야 합니다.', category: '마케팅' },
      { title: 'AI 자동화 스크립트', prompt: 'Excel 데이터를 자동으로 그래프로 만드는 Python 코드를 작성해주세요. pandas와 matplotlib를 사용해주세요.', category: '코딩' },
      { title: '브랜드 스토리텔링', prompt: '친환경 스타트업의 브랜드 스토리를 감동적으로 작성해주세요. 창업 배경, 미션, 고객 가치를 포함해주세요.', category: '글쓰기' },
      { title: '3D 로고 디자인 컨셉', prompt: 'IT 스타트업을 위한 3D 로고 디자인 컨셉 3가지를 제안해주세요. 각 컨셉의 색상, 형태, 의미를 설명해주세요.', category: '디자인' },
      { title: '빠른 이메일 작성', prompt: '고객에게 보낼 감사 이메일을 전문적이면서도 친근하게 작성해주세요. 최근 구매에 대한 감사와 할인 쿠폰 제공을 포함해주세요.', category: '마케팅' },
      { title: '블로그 포스트 작성', prompt: '웹3.0과 메타버스의 미래에 대한 블로그 포스트를 작성해주세요. 기술적 배경, 시장 전망, 실생활 적용 사례를 포함해주세요.', category: '글쓰기' },
      { title: '제품 설명서 작성', prompt: '스마트 홈 IoT 기기의 사용 설명서를 작성해주세요. 설치 방법, 주요 기능, 문제 해결 가이드를 포함해주세요.', category: '글쓰기' },
      { title: 'UI/UX 디자인 가이드', prompt: '모바일 앱의 다크모드 UI/UX 디자인 가이드라인을 작성해주세요. 색상 팔레트, 타이포그래피, 컴포넌트 스타일을 포함해주세요.', category: '디자인' },
      { title: '데이터 분석 리포트', prompt: '전자상거래 매출 데이터를 분석하여 월별 트렌드, 인기 상품 카테고리, 고객 구매 패턴을 분석해주세요.', category: '분석' },
      { title: '유튜브 썸네일 디자인', prompt: '프로그래밍 튜토리얼 유튜브 영상용 썸네일 디자인 컨셉 3가지를 제안해주세요. 각 컨셉의 색상, 레이아웃, 타이포그래피를 설명해주세요.', category: '디자인' },
      { title: 'API 문서 작성', prompt: 'RESTful API 문서를 작성해주세요. 엔드포인트 설명, 요청/응답 예시, 에러 코드, 인증 방법을 포함해주세요.', category: '코딩' },
      { title: '마케팅 캠페인 기획', prompt: '신제품 출시를 위한 소셜 미디어 마케팅 캠페인을 기획해주세요. 타겟 고객, 메시지, 채널, 일정을 포함해주세요.', category: '마케팅' },
      { title: '음악 플레이리스트 기획', prompt: '카페에서 사용할 차분한 재즈 플레이리스트를 기획해주세요. 아티스트, 곡명, 분위기 설명을 포함해주세요.', category: '음악' },
      { title: '영상 스크립트 작성', prompt: '기업 소개 영상(2분 분량)의 스크립트를 작성해주세요. 오프닝, 본문, 클로징을 포함하고 음성과 화면 구성을 설명해주세요.', category: '영상' },
      { title: '고객 설문조사 분석', prompt: '고객 만족도 설문조사 결과를 분석하여 주요 인사이트, 개선 사항, 우선순위를 도출해주세요.', category: '분석' },
      { title: '앱 온보딩 플로우', prompt: '모바일 앱의 신규 사용자 온보딩 UX 플로우를 디자인해주세요. 단계별 화면 구성과 사용자 가이드를 포함해주세요.', category: '디자인' },
      { title: '기술 블로그 포스트', prompt: 'React 19의 새로운 기능에 대한 기술 블로그 포스트를 작성해주세요. 코드 예시와 실제 사용 사례를 포함해주세요.', category: '코딩' },
      { title: '이벤트 기획안', prompt: '온라인 개발자 컨퍼런스 이벤트 기획안을 작성해주세요. 일정, 세션 구성, 연사 초청, 홍보 전략을 포함해주세요.', category: '마케팅' },
      { title: '음악 프로덕션 가이드', prompt: 'EDM 트랙 제작을 위한 단계별 가이드를 작성해주세요. 드럼 패턴, 베이스라인, 멜로디 구성, 믹싱 팁을 포함해주세요.', category: '음악' },
      { title: '유튜브 쇼츠 스크립트', prompt: '5분 분량의 프로그래밍 팁 유튜브 쇼츠 스크립트를 작성해주세요. 후킹 문구, 핵심 내용, CTA를 포함해주세요.', category: '영상' },
    ],
    en: [
      { title: 'Viral SNS Content', prompt: 'Write 3 Instagram Reels scripts using 2025 AI trends. Each should be 15 seconds and start with a hook.', category: 'Marketing' },
      { title: 'AI Automation Script', prompt: 'Write Python code to automatically create graphs from Excel data using pandas and matplotlib.', category: 'Coding' },
      { title: 'Brand Storytelling', prompt: 'Write a touching brand story for an eco-friendly startup including founding background, mission, and customer value.', category: 'Writing' },
      { title: '3D Logo Design Concept', prompt: 'Suggest 3 3D logo design concepts for an IT startup. Explain color, shape, and meaning for each.', category: 'Design' },
      { title: 'Quick Email Writing', prompt: 'Write a professional yet friendly thank you email to customers including recent purchase appreciation and discount coupon.', category: 'Marketing' },
      { title: 'Blog Post Writing', prompt: 'Write a blog post about the future of Web3.0 and Metaverse. Include technical background, market outlook, and real-life applications.', category: 'Writing' },
      { title: 'Product Manual', prompt: 'Write a user manual for a smart home IoT device. Include installation guide, key features, and troubleshooting tips.', category: 'Writing' },
      { title: 'UI/UX Design Guide', prompt: 'Create a dark mode UI/UX design guideline for mobile apps. Include color palette, typography, and component styles.', category: 'Design' },
      { title: 'Data Analysis Report', prompt: 'Analyze e-commerce sales data to identify monthly trends, popular product categories, and customer purchase patterns.', category: 'Analytics' },
      { title: 'YouTube Thumbnail Design', prompt: 'Suggest 3 thumbnail design concepts for a programming tutorial YouTube video. Explain color, layout, and typography for each.', category: 'Design' },
      { title: 'API Documentation', prompt: 'Write RESTful API documentation. Include endpoint descriptions, request/response examples, error codes, and authentication methods.', category: 'Coding' },
      { title: 'Marketing Campaign Plan', prompt: 'Plan a social media marketing campaign for a new product launch. Include target audience, messaging, channels, and timeline.', category: 'Marketing' },
      { title: 'Music Playlist Curation', prompt: 'Curate a calm jazz playlist for a cafe. Include artist names, song titles, and mood descriptions.', category: 'Music' },
      { title: 'Video Script Writing', prompt: 'Write a 2-minute corporate introduction video script. Include opening, main content, closing, and describe voiceover and screen composition.', category: 'Video' },
      { title: 'Customer Survey Analysis', prompt: 'Analyze customer satisfaction survey results to identify key insights, improvement areas, and priorities.', category: 'Analytics' },
      { title: 'App Onboarding Flow', prompt: 'Design a new user onboarding UX flow for a mobile app. Include step-by-step screen composition and user guides.', category: 'Design' },
      { title: 'Tech Blog Post', prompt: 'Write a technical blog post about React 19 new features. Include code examples and real-world use cases.', category: 'Coding' },
      { title: 'Event Planning Proposal', prompt: 'Write an event planning proposal for an online developer conference. Include schedule, session structure, speaker invitations, and promotion strategy.', category: 'Marketing' },
      { title: 'Music Production Guide', prompt: 'Write a step-by-step guide for EDM track production. Include drum patterns, basslines, melody composition, and mixing tips.', category: 'Music' },
      { title: 'YouTube Shorts Script', prompt: 'Write a 5-minute programming tips YouTube Shorts script. Include hook, core content, and CTA.', category: 'Video' },
    ],
    ja: [
      { title: 'バイラルSNSコンテンツ', prompt: '2025年のAIトレンドを活用したInstagramリールの台本を3つ作成してください。各台本は15秒で、フック文で始まる必要があります。', category: 'マーケティング' },
      { title: 'AI自動化スクリプト', prompt: 'Excelデータを自動的にグラフ化するPythonコードを作成してください。pandasとmatplotlibを使用してください。', category: 'コーディング' },
      { title: 'ブランドストーリーテリング', prompt: '環境に優しいスタートアップのブランドストーリーを感動的に作成してください。創業背景、ミッション、顧客価値を含めてください。', category: 'ライティング' },
      { title: '3Dロゴデザインコンセプト', prompt: 'ITスタートアップ向けの3Dロゴデザインコンセプトを3つ提案してください。各コンセプトの色、形状、意味を説明してください。', category: 'デザイン' },
      { title: 'クイックメール作成', prompt: '顧客に送る感謝のメールを専門的でありながら親しみやすく作成してください。最近の購入への感謝と割引クーポンの提供を含めてください。', category: 'マーケティング' },
      { title: 'ブログ投稿作成', prompt: 'Web3.0とメタバースの未来についてのブログ投稿を作成してください。技術的背景、市場展望、実生活への応用例を含めてください。', category: 'ライティング' },
      { title: '製品マニュアル作成', prompt: 'スマートホームIoTデバイスのユーザーマニュアルを作成してください。インストール方法、主要機能、トラブルシューティングガイドを含めてください。', category: 'ライティング' },
      { title: 'UI/UXデザインガイド', prompt: 'モバイルアプリのダークモードUI/UXデザインガイドラインを作成してください。カラーパレット、タイポグラフィ、コンポーネントスタイルを含めてください。', category: 'デザイン' },
      { title: 'データ分析レポート', prompt: 'Eコマース売上データを分析して、月次トレンド、人気商品カテゴリ、顧客購買パターンを分析してください。', category: '分析' },
      { title: 'YouTubeサムネイルデザイン', prompt: 'プログラミングチュートリアルYouTube動画用のサムネイルデザインコンセプトを3つ提案してください。各コンセプトの色、レイアウト、タイポグラフィを説明してください。', category: 'デザイン' },
      { title: 'APIドキュメント作成', prompt: 'RESTful APIドキュメントを作成してください。エンドポイント説明、リクエスト/レスポンス例、エラーコード、認証方法を含めてください。', category: 'コーディング' },
      { title: 'マーケティングキャンペーン企画', prompt: '新製品発売のためのソーシャルメディアマーケティングキャンペーンを企画してください。ターゲット顧客、メッセージ、チャネル、スケジュールを含めてください。', category: 'マーケティング' },
      { title: '音楽プレイリスト企画', prompt: 'カフェで使用する落ち着いたジャズプレイリストを企画してください。アーティスト名、曲名、雰囲気の説明を含めてください。', category: '音楽' },
      { title: '動画スクリプト作成', prompt: '企業紹介動画（2分）のスクリプトを作成してください。オープニング、本文、クロージングを含め、音声と画面構成を説明してください。', category: '動画' },
      { title: '顧客アンケート分析', prompt: '顧客満足度アンケート結果を分析して、主要なインサイト、改善点、優先順位を導き出してください。', category: '分析' },
      { title: 'アプリオンボーディングフロー', prompt: 'モバイルアプリの新規ユーザーオンボーディングUXフローをデザインしてください。ステップごとの画面構成とユーザーガイドを含めてください。', category: 'デザイン' },
      { title: '技術ブログ投稿', prompt: 'React 19の新機能に関する技術ブログ投稿を作成してください。コード例と実際の使用例を含めてください。', category: 'コーディング' },
      { title: 'イベント企画提案', prompt: 'オンライン開発者カンファレンスのイベント企画提案を作成してください。スケジュール、セッション構成、講演者招待、プロモーション戦略を含めてください。', category: 'マーケティング' },
      { title: '音楽プロダクションガイド', prompt: 'EDMトラック制作のステップバイステップガイドを作成してください。ドラムパターン、ベースライン、メロディ構成、ミキシングのヒントを含めてください。', category: '音楽' },
      { title: 'YouTubeショートスクリプト', prompt: '5分のプログラミングのヒントYouTubeショートスクリプトを作成してください。フック、核心内容、CTAを含めてください。', category: '動画' },
    ],
    zh: [
      { title: '病毒式SNS内容', prompt: '使用2025年AI趋势编写3个Instagram Reels脚本。每个脚本应为15秒，并以吸引人的开头开始。', category: '营销' },
      { title: 'AI自动化脚本', prompt: '编写Python代码，使用pandas和matplotlib自动将Excel数据转换为图表。', category: '编程' },
      { title: '品牌故事', prompt: '为一家环保初创公司编写感人的品牌故事，包括创业背景、使命和客户价值。', category: '写作' },
      { title: '3D标志设计概念', prompt: '为IT初创公司提出3个3D标志设计概念。解释每个概念的颜色、形状和含义。', category: '设计' },
      { title: '快速邮件撰写', prompt: '为客户撰写专业而友好的感谢邮件，包括对最近购买的感谢和折扣券提供。', category: '营销' },
      { title: '博客文章撰写', prompt: '撰写一篇关于Web3.0和元宇宙未来的博客文章。包括技术背景、市场前景和实际应用案例。', category: '写作' },
      { title: '产品手册', prompt: '为智能家居IoT设备编写用户手册。包括安装指南、主要功能和故障排除提示。', category: '写作' },
      { title: 'UI/UX设计指南', prompt: '为移动应用创建深色模式UI/UX设计指南。包括调色板、排版和组件样式。', category: '设计' },
      { title: '数据分析报告', prompt: '分析电子商务销售数据，识别月度趋势、热门产品类别和客户购买模式。', category: '分析' },
      { title: 'YouTube缩略图设计', prompt: '为编程教程YouTube视频提出3个缩略图设计概念。解释每个概念的颜色、布局和排版。', category: '设计' },
      { title: 'API文档', prompt: '编写RESTful API文档。包括端点描述、请求/响应示例、错误代码和认证方法。', category: '编程' },
      { title: '营销活动计划', prompt: '为新产品发布规划社交媒体营销活动。包括目标受众、消息、渠道和时间表。', category: '营销' },
      { title: '音乐播放列表策划', prompt: '为咖啡馆策划一个平静的爵士乐播放列表。包括艺术家名称、歌曲名称和情绪描述。', category: '音乐' },
      { title: '视频脚本撰写', prompt: '编写2分钟的企业介绍视频脚本。包括开场、主要内容、结尾，并描述画外音和画面构成。', category: '视频' },
      { title: '客户调查分析', prompt: '分析客户满意度调查结果，识别关键见解、改进领域和优先级。', category: '分析' },
      { title: '应用引导流程', prompt: '为移动应用设计新用户引导UX流程。包括分步屏幕构成和用户指南。', category: '设计' },
      { title: '技术博客文章', prompt: '撰写一篇关于React 19新功能的技术博客文章。包括代码示例和实际使用案例。', category: '编程' },
      { title: '活动策划提案', prompt: '为在线开发者会议编写活动策划提案。包括时间表、会议结构、演讲者邀请和推广策略。', category: '营销' },
      { title: '音乐制作指南', prompt: '编写EDM曲目制作的逐步指南。包括鼓模式、低音线、旋律构成和混音技巧。', category: '音乐' },
      { title: 'YouTube Shorts脚本', prompt: '编写5分钟编程技巧YouTube Shorts脚本。包括吸引人的开头、核心内容和行动号召。', category: '视频' },
    ],
    th: [
      { title: 'เนื้อหา SNS ที่ไวรัล', prompt: 'เขียนสคริปต์ Instagram Reels 3 เรื่องโดยใช้เทรนด์ AI ปี 2025 แต่ละเรื่องควรยาว 15 วินาทีและเริ่มด้วยประโยคดึงดูด', category: 'การตลาด' },
      { title: 'สคริปต์อัตโนมัติ AI', prompt: 'เขียนโค้ด Python เพื่อสร้างกราฟจากข้อมูล Excel โดยอัตโนมัติ ใช้ pandas และ matplotlib', category: 'การเขียนโค้ด' },
      { title: 'การเล่าเรื่องแบรนด์', prompt: 'เขียนเรื่องราวแบรนด์ที่สะเทือนใจสำหรับสตาร์ทอัพที่เป็นมิตรกับสิ่งแวดล้อม รวมถึงภูมิหลังการก่อตั้ง ภารกิจ และคุณค่าสำหรับลูกค้า', category: 'การเขียน' },
      { title: 'คอนเซปต์ดีไซน์โลโก้ 3D', prompt: 'เสนอคอนเซปต์ดีไซน์โลโก้ 3D 3 แบบสำหรับสตาร์ทอัพ IT อธิบายสี รูปทรง และความหมายของแต่ละแบบ', category: 'การออกแบบ' },
      { title: 'การเขียนอีเมลด่วน', prompt: 'เขียนอีเมลขอบคุณลูกค้าอย่างมืออาชีพแต่เป็นกันเอง รวมถึงการขอบคุณสำหรับการซื้อล่าสุดและการให้คูปองส่วนลด', category: 'การตลาด' },
      { title: 'การเขียนบล็อกโพสต์', prompt: 'เขียนบล็อกโพสต์เกี่ยวกับอนาคตของ Web3.0 และ Metaverse รวมถึงภูมิหลังทางเทคนิค แนวโน้มตลาด และกรณีการใช้งานจริง', category: 'การเขียน' },
      { title: 'คู่มือผลิตภัณฑ์', prompt: 'เขียนคู่มือผู้ใช้สำหรับอุปกรณ์ IoT บ้านอัจฉริยะ รวมถึงคู่มือการติดตั้ง คุณสมบัติหลัก และเคล็ดลับการแก้ปัญหา', category: 'การเขียน' },
      { title: 'คู่มือการออกแบบ UI/UX', prompt: 'สร้างแนวทางการออกแบบ UI/UX โหมดมืดสำหรับแอปมือถือ รวมถึงจานสี ตัวอักษร และสไตล์คอมโพเนนต์', category: 'การออกแบบ' },
      { title: 'รายงานการวิเคราะห์ข้อมูล', prompt: 'วิเคราะห์ข้อมูลยอดขายอีคอมเมิร์ซเพื่อระบุเทรนด์รายเดือน หมวดหมู่สินค้ายอดนิยม และรูปแบบการซื้อของลูกค้า', category: 'การวิเคราะห์' },
      { title: 'การออกแบบภาพย่อ YouTube', prompt: 'เสนอคอนเซปต์การออกแบบภาพย่อ 3 แบบสำหรับวิดีโอ YouTube สอนการเขียนโปรแกรม อธิบายสี เลย์เอาต์ และตัวอักษรของแต่ละแบบ', category: 'การออกแบบ' },
      { title: 'เอกสาร API', prompt: 'เขียนเอกสาร RESTful API รวมถึงคำอธิบาย endpoint ตัวอย่างคำขอ/คำตอบ รหัสข้อผิดพลาด และวิธีการรับรองความถูกต้อง', category: 'การเขียนโค้ด' },
      { title: 'แผนแคมเปญการตลาด', prompt: 'วางแผนแคมเปญการตลาดโซเชียลมีเดียสำหรับการเปิดตัวผลิตภัณฑ์ใหม่ รวมถึงกลุ่มเป้าหมาย ข้อความ ช่องทาง และไทม์ไลน์', category: 'การตลาด' },
      { title: 'การคัดเลือกเพลย์ลิสต์เพลง', prompt: 'คัดเลือกเพลย์ลิสต์แจ๊สที่สงบสำหรับร้านกาแฟ รวมถึงชื่อศิลปิน ชื่อเพลง และคำอธิบายบรรยากาศ', category: 'ดนตรี' },
      { title: 'การเขียนสคริปต์วิดีโอ', prompt: 'เขียนสคริปต์วิดีโอแนะนำบริษัท (2 นาที) รวมถึงการเปิด เนื้อหาหลัก การปิด และอธิบายเสียงพากย์และองค์ประกอบหน้าจอ', category: 'วิดีโอ' },
      { title: 'การวิเคราะห์แบบสำรวจลูกค้า', prompt: 'วิเคราะห์ผลการสำรวจความพึงพอใจของลูกค้าเพื่อระบุข้อมูลเชิงลึกหลัก พื้นที่ที่ต้องปรับปรุง และลำดับความสำคัญ', category: 'การวิเคราะห์' },
      { title: 'โฟลว์การแนะนำแอป', prompt: 'ออกแบบโฟลว์ UX การแนะนำผู้ใช้ใหม่สำหรับแอปมือถือ รวมถึงองค์ประกอบหน้าจอทีละขั้นตอนและคู่มือผู้ใช้', category: 'การออกแบบ' },
      { title: 'โพสต์บล็อกเทคนิค', prompt: 'เขียนโพสต์บล็อกเทคนิคเกี่ยวกับฟีเจอร์ใหม่ของ React 19 รวมถึงตัวอย่างโค้ดและกรณีการใช้งานจริง', category: 'การเขียนโค้ด' },
      { title: 'ข้อเสนอการวางแผนกิจกรรม', prompt: 'เขียนข้อเสนอการวางแผนกิจกรรมสำหรับการประชุมนักพัฒนาออนไลน์ รวมถึงตารางเวลา โครงสร้างเซสชัน การเชิญวิทยากร และกลยุทธ์การส่งเสริม', category: 'การตลาด' },
      { title: 'คู่มือการผลิตเพลง', prompt: 'เขียนคู่มือทีละขั้นตอนสำหรับการผลิตแทร็ก EDM รวมถึงแพทเทิร์นกลอง เส้นเบส องค์ประกอบเมโลดี้ และเคล็ดลับการมิกซ์', category: 'ดนตรี' },
      { title: 'สคริปต์ YouTube Shorts', prompt: 'เขียนสคริปต์ YouTube Shorts เคล็ดลับการเขียนโปรแกรม 5 นาที รวมถึงประโยคดึงดูด เนื้อหาหลัก และ CTA', category: 'วิดีโอ' },
    ],
    vi: [
      { title: 'Nội dung SNS lan truyền', prompt: 'Viết 3 kịch bản Instagram Reels sử dụng xu hướng AI 2025. Mỗi kịch bản dài 15 giây và bắt đầu bằng câu mở đầu hấp dẫn.', category: 'Tiếp thị' },
      { title: 'Script tự động hóa AI', prompt: 'Viết mã Python để tự động tạo biểu đồ từ dữ liệu Excel. Sử dụng pandas và matplotlib.', category: 'Lập trình' },
      { title: 'Kể chuyện thương hiệu', prompt: 'Viết câu chuyện thương hiệu cảm động cho một startup thân thiện với môi trường, bao gồm bối cảnh thành lập, sứ mệnh và giá trị khách hàng.', category: 'Viết' },
      { title: 'Khái niệm thiết kế logo 3D', prompt: 'Đề xuất 3 khái niệm thiết kế logo 3D cho một startup IT. Giải thích màu sắc, hình dạng và ý nghĩa cho từng khái niệm.', category: 'Thiết kế' },
      { title: 'Viết email nhanh', prompt: 'Viết email cảm ơn chuyên nghiệp nhưng thân thiện cho khách hàng, bao gồm cảm ơn về việc mua hàng gần đây và cung cấp phiếu giảm giá.', category: 'Tiếp thị' },
      { title: 'Viết bài đăng blog', prompt: 'Viết bài đăng blog về tương lai của Web3.0 và Metaverse. Bao gồm bối cảnh kỹ thuật, triển vọng thị trường và các ứng dụng thực tế.', category: 'Viết' },
      { title: 'Hướng dẫn sử dụng sản phẩm', prompt: 'Viết hướng dẫn sử dụng cho thiết bị IoT nhà thông minh. Bao gồm hướng dẫn cài đặt, tính năng chính và mẹo khắc phục sự cố.', category: 'Viết' },
      { title: 'Hướng dẫn thiết kế UI/UX', prompt: 'Tạo hướng dẫn thiết kế UI/UX chế độ tối cho ứng dụng di động. Bao gồm bảng màu, kiểu chữ và phong cách thành phần.', category: 'Thiết kế' },
      { title: 'Báo cáo phân tích dữ liệu', prompt: 'Phân tích dữ liệu bán hàng thương mại điện tử để xác định xu hướng hàng tháng, danh mục sản phẩm phổ biến và mô hình mua hàng của khách hàng.', category: 'Phân tích' },
      { title: 'Thiết kế thumbnail YouTube', prompt: 'Đề xuất 3 khái niệm thiết kế thumbnail cho video hướng dẫn lập trình YouTube. Giải thích màu sắc, bố cục và kiểu chữ cho từng khái niệm.', category: 'Thiết kế' },
      { title: 'Tài liệu API', prompt: 'Viết tài liệu RESTful API. Bao gồm mô tả endpoint, ví dụ yêu cầu/phản hồi, mã lỗi và phương thức xác thực.', category: 'Lập trình' },
      { title: 'Kế hoạch chiến dịch tiếp thị', prompt: 'Lập kế hoạch chiến dịch tiếp thị truyền thông xã hội cho việc ra mắt sản phẩm mới. Bao gồm đối tượng mục tiêu, thông điệp, kênh và thời gian biểu.', category: 'Tiếp thị' },
      { title: 'Tuyển chọn playlist nhạc', prompt: 'Tuyển chọn playlist nhạc jazz êm dịu cho quán cà phê. Bao gồm tên nghệ sĩ, tên bài hát và mô tả tâm trạng.', category: 'Âm nhạc' },
      { title: 'Viết kịch bản video', prompt: 'Viết kịch bản video giới thiệu công ty (2 phút). Bao gồm phần mở đầu, nội dung chính, phần kết và mô tả lời thoại và cấu trúc màn hình.', category: 'Video' },
      { title: 'Phân tích khảo sát khách hàng', prompt: 'Phân tích kết quả khảo sát mức độ hài lòng của khách hàng để xác định thông tin chi tiết chính, lĩnh vực cải thiện và ưu tiên.', category: 'Phân tích' },
      { title: 'Luồng giới thiệu ứng dụng', prompt: 'Thiết kế luồng UX giới thiệu người dùng mới cho ứng dụng di động. Bao gồm cấu trúc màn hình từng bước và hướng dẫn người dùng.', category: 'Thiết kế' },
      { title: 'Bài đăng blog kỹ thuật', prompt: 'Viết bài đăng blog kỹ thuật về các tính năng mới của React 19. Bao gồm ví dụ mã và trường hợp sử dụng thực tế.', category: 'Lập trình' },
      { title: 'Đề xuất lập kế hoạch sự kiện', prompt: 'Viết đề xuất lập kế hoạch sự kiện cho hội nghị nhà phát triển trực tuyến. Bao gồm lịch trình, cấu trúc phiên, mời diễn giả và chiến lược quảng bá.', category: 'Tiếp thị' },
      { title: 'Hướng dẫn sản xuất nhạc', prompt: 'Viết hướng dẫn từng bước cho việc sản xuất track EDM. Bao gồm mẫu trống, đường bass, cấu trúc giai điệu và mẹo phối âm.', category: 'Âm nhạc' },
      { title: 'Kịch bản YouTube Shorts', prompt: 'Viết kịch bản YouTube Shorts mẹo lập trình 5 phút. Bao gồm câu mở đầu hấp dẫn, nội dung cốt lõi và CTA.', category: 'Video' },
    ],
    ms: [
      { title: 'Kandungan SNS Viral', prompt: 'Tulis 3 skrip Instagram Reels menggunakan trend AI 2025. Setiap satu harus 15 saat dan bermula dengan hook.', category: 'Pemasaran' },
      { title: 'Skrip Automasi AI', prompt: 'Tulis kod Python untuk secara automatik membuat graf dari data Excel menggunakan pandas dan matplotlib.', category: 'Pengaturcaraan' },
      { title: 'Penceritaan Jenama', prompt: 'Tulis cerita jenama yang menyentuh untuk startup mesra alam termasuk latar belakang penubuhan, misi dan nilai pelanggan.', category: 'Menulis' },
      { title: 'Konsep Reka Bentuk Logo 3D', prompt: 'Cadangkan 3 konsep reka bentuk logo 3D untuk startup IT. Terangkan warna, bentuk dan makna untuk setiap satu.', category: 'Reka bentuk' },
      { title: 'Penulisan E-mel Pantas', prompt: 'Tulis e-mel terima kasih profesional namun mesra untuk pelanggan termasuk penghargaan pembelian terkini dan tawaran kupon diskaun.', category: 'Pemasaran' },
      { title: 'Penulisan Catatan Blog', prompt: 'Tulis catatan blog tentang masa depan Web3.0 dan Metaverse. Sertakan latar belakang teknikal, prospek pasaran dan aplikasi kehidupan sebenar.', category: 'Menulis' },
      { title: 'Manual Produk', prompt: 'Tulis manual pengguna untuk peranti IoT rumah pintar. Sertakan panduan pemasangan, ciri utama dan petua penyelesaian masalah.', category: 'Menulis' },
      { title: 'Panduan Reka Bentuk UI/UX', prompt: 'Cipta garis panduan reka bentuk UI/UX mod gelap untuk aplikasi mudah alih. Sertakan palet warna, tipografi dan gaya komponen.', category: 'Reka bentuk' },
      { title: 'Laporan Analisis Data', prompt: 'Analisis data jualan e-dagang untuk mengenal pasti trend bulanan, kategori produk popular dan corak pembelian pelanggan.', category: 'Analisis' },
      { title: 'Reka Bentuk Thumbnail YouTube', prompt: 'Cadangkan 3 konsep reka bentuk thumbnail untuk video tutorial pengaturcaraan YouTube. Terangkan warna, susun atur dan tipografi untuk setiap satu.', category: 'Reka bentuk' },
      { title: 'Dokumentasi API', prompt: 'Tulis dokumentasi RESTful API. Sertakan penerangan endpoint, contoh permintaan/tindak balas, kod ralat dan kaedah pengesahan.', category: 'Pengaturcaraan' },
      { title: 'Pelan Kempen Pemasaran', prompt: 'Rancang kempen pemasaran media sosial untuk pelancaran produk baharu. Sertakan khalayak sasaran, mesej, saluran dan jadual masa.', category: 'Pemasaran' },
      { title: 'Kurasi Senarai Main Muzik', prompt: 'Kurasi senarai main jazz yang tenang untuk kafe. Sertakan nama artis, tajuk lagu dan penerangan mood.', category: 'Muzik' },
      { title: 'Penulisan Skrip Video', prompt: 'Tulis skrip video pengenalan korporat 2 minit. Sertakan pembukaan, kandungan utama, penutup dan terangkan suara latar dan komposisi skrin.', category: 'Video' },
      { title: 'Analisis Tinjauan Pelanggan', prompt: 'Analisis hasil tinjauan kepuasan pelanggan untuk mengenal pasti wawasan utama, kawasan penambahbaikan dan keutamaan.', category: 'Analisis' },
      { title: 'Aliran Onboarding Aplikasi', prompt: 'Reka aliran UX onboarding pengguna baharu untuk aplikasi mudah alih. Sertakan komposisi skrin langkah demi langkah dan panduan pengguna.', category: 'Reka bentuk' },
      { title: 'Catatan Blog Teknikal', prompt: 'Tulis catatan blog teknikal tentang ciri baharu React 19. Sertakan contoh kod dan kes penggunaan dunia sebenar.', category: 'Pengaturcaraan' },
      { title: 'Cadangan Perancangan Acara', prompt: 'Tulis cadangan perancangan acara untuk persidangan pembangun dalam talian. Sertakan jadual, struktur sesi, jemputan penceramah dan strategi promosi.', category: 'Pemasaran' },
      { title: 'Panduan Pengeluaran Muzik', prompt: 'Tulis panduan langkah demi langkah untuk pengeluaran trek EDM. Sertakan corak dram, garisan bes, komposisi melodi dan petua pencampuran.', category: 'Muzik' },
      { title: 'Skrip YouTube Shorts', prompt: 'Tulis skrip YouTube Shorts tip pengaturcaraan 5 minit. Sertakan hook, kandungan teras dan CTA.', category: 'Video' },
    ]
  }

  // 랜덤 템플릿 선택 함수
  const getRandomTemplates = (pool: typeof templatePool.ko, count: number = 5) => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  // 현재 표시할 템플릿 (랜덤 선택)
  const [displayedTemplates, setDisplayedTemplates] = useState<typeof templatePool.ko>([])

  const t = {
    ko: {
      title: 'AI 생성 워크스페이스',
      subtitle: '원하는 카테고리를 선택하고 무엇이든 만들어보세요',
      selectCategory: '카테고리 선택',
      popularTemplates: '🔥 인기 템플릿',
      inputPlaceholder: '무엇을 만들고 싶으신가요? 자세히 설명해주세요...',
      generate: '생성하기',
      generating: '생성 중...',
      result: '생성 결과',
      copy: '복사',
      download: '다운로드',
      regenerate: '다시 생성',
      backHome: '홈으로',
      demoMode: '데모 모드',
      aiMode: 'AI 모드',
      quickCategory: '빠른 카테고리:',
      confirmGenerate: '생성하시겠습니까?',
      templateApplied: '템플릿이 프롬프트에 적용되었습니다',
      template: '템플릿:',
      promptPreview: '프롬프트 수정:',
      promptPlaceholder: '프롬프트를 입력하거나 수정하세요...',
      promptCharCount: '자 / 필요에 따라 프롬프트를 수정할 수 있습니다',
      cancel: '취소'
    },
    en: {
      title: 'AI Generation Workspace',
      subtitle: 'Select a category and create anything',
      selectCategory: 'Select Category',
      popularTemplates: '🔥 Popular Templates',
      inputPlaceholder: 'What would you like to create? Please describe in detail...',
      generate: 'Generate',
      generating: 'Generating...',
      result: 'Generated Result',
      copy: 'Copy',
      download: 'Download',
      regenerate: 'Regenerate',
      backHome: 'Back Home',
      demoMode: 'Demo Mode',
      aiMode: 'AI Mode',
      quickCategory: 'Quick Categories:',
      confirmGenerate: 'Generate?',
      templateApplied: 'Template has been applied to prompt',
      template: 'Template:',
      promptPreview: 'Edit Prompt:',
      promptPlaceholder: 'Enter or edit your prompt...',
      promptCharCount: ' characters / You can modify the prompt as needed',
      cancel: 'Cancel'
    },
    ja: {
      title: 'AI生成ワークスペース',
      subtitle: 'カテゴリを選択して何でも作成しましょう',
      selectCategory: 'カテゴリ選択',
      popularTemplates: '🔥 人気テンプレート',
      inputPlaceholder: '何を作成したいですか？詳しく説明してください...',
      generate: '生成',
      generating: '生成中...',
      result: '生成結果',
      copy: 'コピー',
      download: 'ダウンロード',
      regenerate: '再生成',
      backHome: 'ホームへ',
      demoMode: 'デモモード',
      aiMode: 'AIモード',
      quickCategory: 'クイックカテゴリ:',
      confirmGenerate: '生成しますか？',
      templateApplied: 'テンプレートがプロンプトに適用されました',
      template: 'テンプレート:',
      promptPreview: 'プロンプト編集:',
      promptPlaceholder: 'プロンプトを入力または編集してください...',
      promptCharCount: '文字 / 必要に応じてプロンプトを変更できます',
      cancel: 'キャンセル'
    },
    zh: {
      title: 'AI生成工作区',
      subtitle: '选择类别并创建任何内容',
      selectCategory: '选择类别',
      popularTemplates: '🔥 热门模板',
      inputPlaceholder: '您想创建什么？请详细描述...',
      generate: '生成',
      generating: '生成中...',
      result: '生成结果',
      copy: '复制',
      download: '下载',
      regenerate: '重新生成',
      backHome: '返回首页',
      demoMode: '演示模式',
      aiMode: 'AI模式',
      quickCategory: '快速类别:',
      confirmGenerate: '生成吗？',
      templateApplied: '模板已应用到提示',
      template: '模板:',
      promptPreview: '编辑提示:',
      promptPlaceholder: '输入或编辑您的提示...',
      promptCharCount: '字符 / 您可以根据需要修改提示',
      cancel: '取消'
    },
    th: {
      title: 'พื้นที่ทำงาน AI',
      subtitle: 'เลือกหมวดหมู่และสร้างอะไรก็ได้',
      selectCategory: 'เลือกหมวดหมู่',
      popularTemplates: '🔥 เทมเพลตยอดนิยม',
      inputPlaceholder: 'คุณต้องการสร้างอะไร? กรุณาอธิบายรายละเอียด...',
      generate: 'สร้าง',
      generating: 'กำลังสร้าง...',
      result: 'ผลลัพธ์ที่สร้าง',
      copy: 'คัดลอก',
      download: 'ดาวน์โหลด',
      regenerate: 'สร้างใหม่',
      backHome: 'กลับหน้าแรก',
      demoMode: 'โหมดสาธิต',
      aiMode: 'โหมด AI',
      quickCategory: 'หมวดหมู่ด่วน:',
      confirmGenerate: 'สร้างหรือไม่?',
      templateApplied: 'เทมเพลตถูกนำไปใช้กับพรอมต์แล้ว',
      template: 'เทมเพลต:',
      promptPreview: 'แก้ไขพรอมต์:',
      promptPlaceholder: 'กรอกหรือแก้ไขพรอมต์ของคุณ...',
      promptCharCount: 'ตัวอักษร / คุณสามารถแก้ไขพรอมต์ได้ตามต้องการ',
      cancel: 'ยกเลิก'
    },
    vi: {
      title: 'Không gian tạo AI',
      subtitle: 'Chọn danh mục và tạo bất cứ thứ gì',
      selectCategory: 'Chọn danh mục',
      popularTemplates: '🔥 Mẫu phổ biến',
      inputPlaceholder: 'Bạn muốn tạo gì? Vui lòng mô tả chi tiết...',
      generate: 'Tạo',
      generating: 'Đang tạo...',
      result: 'Kết quả tạo',
      copy: 'Sao chép',
      download: 'Tải xuống',
      regenerate: 'Tạo lại',
      backHome: 'Về trang chủ',
      demoMode: 'Chế độ demo',
      aiMode: 'Chế độ AI',
      quickCategory: 'Danh mục nhanh:',
      confirmGenerate: 'Tạo không?',
      templateApplied: 'Mẫu đã được áp dụng cho prompt',
      template: 'Mẫu:',
      promptPreview: 'Chỉnh sửa Prompt:',
      promptPlaceholder: 'Nhập hoặc chỉnh sửa prompt của bạn...',
      promptCharCount: ' ký tự / Bạn có thể sửa đổi prompt khi cần',
      cancel: 'Hủy'
    },
    ms: {
      title: 'Ruang Kerja Penjanaan AI',
      subtitle: 'Pilih kategori dan cipta apa sahaja',
      selectCategory: 'Pilih Kategori',
      popularTemplates: '🔥 Templat Popular',
      inputPlaceholder: 'Apa yang anda ingin cipta? Sila terangkan dengan terperinci...',
      generate: 'Cipta',
      generating: 'Sedang mencipta...',
      result: 'Hasil Penjanaan',
      copy: 'Salin',
      download: 'Muat turun',
      regenerate: 'Cipta semula',
      backHome: 'Kembali ke Laman Utama',
      demoMode: 'Mod Demo',
      aiMode: 'Mod AI',
      quickCategory: 'Kategori Pantas:',
      confirmGenerate: 'Cipta?',
      templateApplied: 'Templat telah digunakan pada prompt',
      template: 'Templat:',
      promptPreview: 'Edit Prompt:',
      promptPlaceholder: 'Masukkan atau edit prompt anda...',
      promptCharCount: ' aksara / Anda boleh mengubah prompt mengikut keperluan',
      cancel: 'Batal'
    }
  }

  const currentLang = t[language] || t.ko
  
  // 언어에 따른 템플릿 풀 선택
  const getTemplatePool = () => {
    if (language === 'ko') return templatePool.ko
    if (language === 'ja') return templatePool.ja
    if (language === 'zh') return templatePool.zh
    if (language === 'th') return templatePool.th
    if (language === 'vi') return templatePool.vi
    if (language === 'ms') return templatePool.ms
    return templatePool.en
  }

  // 페이지 로드 시 랜덤 템플릿 선택 (새로고침할 때마다 새로운 템플릿)
  useEffect(() => {
    const pool = getTemplatePool()
    setDisplayedTemplates(getRandomTemplates(pool, 5))
  }, [language]) // 언어 변경 시에도 업데이트

  // URL 파라미터로 템플릿 자동 선택
  useEffect(() => {
    if (templateParam) {
      const pool = getTemplatePool()
      const template = pool.find(t => t.title === templateParam)
      if (template) {
        setPrompt(template.prompt)
        setSelectedCategory(template.category)
      }
    }
  }, [templateParam, language])

  // 실제 AI 생성 (API 호출)
  const handleGenerate = async (customPrompt?: string, customCategory?: string) => {
    const finalPrompt = customPrompt || prompt
    const finalCategory = customCategory || selectedCategory

    if (!finalPrompt.trim()) {
      alert('프롬프트를 입력해주세요!')
      return
    }

    setIsGenerating(true)
    setResult('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: finalCategory,
          prompt: finalPrompt
        })
      })

      const data = await response.json()
      
      setResult(data.result)
      setGenerationMode(data.mode || 'demo')
      
      // 생성된 콘텐츠를 localStorage에 저장
      if (data.result && data.result.trim()) {
        const generatedContent = {
          id: Date.now().toString(),
          prompt: finalPrompt,
          category: finalCategory,
          result: data.result,
          mode: data.mode || 'demo',
          createdAt: new Date().toISOString(),
          language: language
        }
        
        // 기존 콘텐츠 불러오기
        const existingContents = JSON.parse(localStorage.getItem('aiworkground_generated_contents') || '[]')
        // 최신 것을 앞에 추가 (최대 50개만 유지)
        const updatedContents = [generatedContent, ...existingContents].slice(0, 50)
        localStorage.setItem('aiworkground_generated_contents', JSON.stringify(updatedContents))
      }
      
      if (data.message) {
        console.log('ℹ️', data.message)
      }
      
    } catch (error) {
      console.error('생성 실패:', error)
      const errorMsg = language === 'ko' ? '❌ 생성에 실패했습니다. 다시 시도해주세요.' :
                       language === 'en' ? '❌ Generation failed. Please try again.' :
                       language === 'ja' ? '❌ 生成に失敗しました。もう一度お試しください。' :
                       language === 'zh' ? '❌ 生成失败。请重试。' :
                       language === 'th' ? '❌ การสร้างล้มเหลว กรุณาลองอีกครั้ง' :
                       language === 'vi' ? '❌ Tạo thất bại. Vui lòng thử lại.' :
                       '❌ Penjanaan gagal. Sila cuba lagi.'
      setResult(errorMsg)
    } finally {
      setIsGenerating(false)
    }
  }

  // 템플릿 클릭 핸들러 (프롬프트 설정 + 확인 팝업)
  const handleTemplateClick = (template: { title: string; prompt: string; category: string }) => {
    setPrompt(template.prompt)
    // 카테고리 이름을 현재 언어로 변환
    const categoryKey = Object.keys(categoryNames).find(key => {
      const names = categoryNames[key as keyof typeof categoryNames]
      return Object.values(names).includes(template.category)
    })
    const translatedCategory = categoryKey ? categoryNames[categoryKey as keyof typeof categoryNames]?.[language] || template.category : template.category
    setSelectedCategory(translatedCategory)
    setPendingTemplate(template)
    setEditablePrompt(template.prompt) // 수정 가능한 프롬프트 초기화
    setShowConfirmModal(true)
  }

  // 팝업에서 확인 버튼 클릭 시 실제 생성 시작
  const handleConfirmGenerate = () => {
    if (pendingTemplate && editablePrompt.trim()) {
      const finalPrompt = editablePrompt.trim()
      setPrompt(finalPrompt) // 메인 프롬프트 입력란에도 업데이트
      setShowConfirmModal(false)
      handleGenerate(finalPrompt, pendingTemplate.category)
      setPendingTemplate(null)
      setEditablePrompt('')
    } else {
      const alertMsg = language === 'ko' ? '프롬프트를 입력해주세요!' :
                       language === 'en' ? 'Please enter a prompt!' :
                       language === 'ja' ? 'プロンプトを入力してください！' :
                       language === 'zh' ? '请输入提示！' :
                       language === 'th' ? 'กรุณากรอกข้อความ!' :
                       language === 'vi' ? 'Vui lòng nhập prompt!' :
                       'Sila masukkan prompt!'
      alert(alertMsg)
    }
  }

  // 팝업 취소
  const handleCancelGenerate = () => {
    setShowConfirmModal(false)
    setPendingTemplate(null)
    setEditablePrompt('')
  }

  // 복사
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 다운로드
  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `AIWorkGround_${selectedCategory || 'output'}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-lg opacity-75"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AIWorkGround
              </span>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Generation Mode Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                generationMode === 'ai' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                {generationMode === 'ai' ? '🤖 AI 모드' : '🎮 데모 모드'}
              </div>

              {/* Language */}
              <div className="flex items-center gap-2 flex-wrap">
                {(['ko', 'en', 'ja', 'zh', 'th', 'vi', 'ms'] as const).map((lang) => {
                  const langLabels: Record<typeof lang, string> = {
                    ko: '한',
                    en: 'EN',
                    ja: '日',
                    zh: '中',
                    th: 'TH',
                    vi: 'VI',
                    ms: 'MS'
                  }
                  return (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      language === lang
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                      title={langLabels[lang]}
                  >
                      {langLabels[lang]}
                  </button>
                  )
                })}
              </div>

              {/* Back Home */}
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentLang.backHome}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {currentLang.title}
            </h1>
            <p className="text-gray-400 text-lg">{currentLang.subtitle}</p>
          </div>

          {/* Confirmation Modal */}
          {showConfirmModal && pendingTemplate && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
              onClick={handleCancelGenerate}
            >
              <div 
                className="bg-gray-800 border border-gray-700 rounded-2xl p-4 sm:p-6 max-w-lg w-full mx-4 shadow-2xl animate-fadeIn relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCancelGenerate}
                  className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentLang.confirmGenerate}</h3>
                    <p className="text-sm text-gray-400">{currentLang.templateApplied}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-xs text-gray-400 mb-2">{currentLang.template}</p>
                    <p className="text-sm font-semibold text-white mb-4">{pendingTemplate.title}</p>
                    <p className="text-xs text-gray-400 mb-2">{currentLang.promptPreview}</p>
                    <textarea
                      value={editablePrompt}
                      onChange={(e) => setEditablePrompt(e.target.value)}
                      placeholder={currentLang.promptPlaceholder}
                      className="w-full h-32 bg-gray-800/50 text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 text-sm"
                      disabled={isGenerating}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {editablePrompt.length}{currentLang.promptCharCount}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCancelGenerate}
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all"
                  >
                    {currentLang.cancel}
                  </button>
                  <button
                    onClick={handleConfirmGenerate}
                    disabled={isGenerating}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {currentLang.generating}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {currentLang.generate}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Popular Templates Section - 상단으로 이동 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              {currentLang.popularTemplates}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {displayedTemplates.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTemplateClick(template)}
                  disabled={isGenerating}
                  className="text-left p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 transition-all border border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-white group-hover:text-purple-400 transition-colors">{template.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-400 transition-colors">{template.prompt}</p>
                  <div className="mt-2 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    클릭하여 적용 →
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Category Buttons - 인기템플릿 하단 */}
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <span className="text-sm text-gray-400 font-medium">{currentLang.quickCategory}</span>
              {quickCategories.map((cat) => {
                const Icon = cat.icon
                const categoryName = categoryNames[cat.key]?.[language] || categoryNames[cat.key]?.en || cat.key
                const isSelected = selectedCategory === categoryName || selectedCategory === cat.key
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(categoryName)
                      setPrompt(cat.example)
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r ' + cat.color + ' text-white shadow-lg scale-105'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{categoryName}</span>
                  </button>
                )
              })}
            </div>
          </div>

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Left: Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">{currentLang.selectCategory}</h3>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon
                    const categoryName = categoryNames[cat.key]?.[language] || categoryNames[cat.key]?.en || cat.key
                    const isSelected = selectedCategory === categoryName || selectedCategory === cat.key
                    return (
                      <button
                        key={cat.key}
                        onClick={() => {
                          setSelectedCategory(categoryName)
                          setPrompt(cat.example)
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r ' + cat.color + ' text-white shadow-lg scale-105'
                            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-white/20' : 'bg-gray-700'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">{categoryName}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right: Input & Result */}
            <div className="lg:col-span-2">
              {/* Input Area */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={currentLang.inputPlaceholder}
                  className="w-full h-40 bg-gray-900/50 text-white rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                  disabled={isGenerating}
                />
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleGenerate()}
                    disabled={isGenerating || !prompt.trim()}
                    className="relative flex items-center gap-2 px-8 py-3 rounded-xl font-semibold overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
                    <div className="relative flex items-center gap-2 text-white">
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{currentLang.generating}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>{currentLang.generate}</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Result Area */}
              {result && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h3 className="text-xl font-bold text-white">{currentLang.result}</h3>
                      {generationMode === 'demo' && (
                        <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
                          데모
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all hover:scale-105"
                        title={currentLang.copy}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-xs">
                              {language === 'ko' ? '복사됨' : language === 'en' ? 'Copied' : language === 'ja' ? 'コピー済み' : language === 'zh' ? '已复制' : language === 'th' ? 'คัดลอกแล้ว' : language === 'vi' ? 'Đã sao chép' : 'Disalin'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="text-xs">{currentLang.copy}</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all hover:scale-110"
                        title={currentLang.download}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleGenerate()}
                        disabled={isGenerating}
                        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all hover:scale-110 disabled:opacity-50"
                        title={currentLang.regenerate}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="bg-gray-900/50 rounded-xl p-6 text-gray-300 whitespace-pre-wrap text-sm leading-relaxed border border-gray-700">
                      {result}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
