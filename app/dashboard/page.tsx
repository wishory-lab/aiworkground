'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp,
  PlusCircle,
  Palette,
  Github,
  MessageSquare,
  Calendar,
  Globe,
  Sparkles,
  User,
  ArrowRight,
  Zap,
  Code,
  Video,
  Music,
  Mail,
  Copy,
  Check
} from 'lucide-react';

// 다국어 지원 (모든 언어팩 + 러시아어)
const translations = {
  ko: {
    title: '대시보드',
    subtitle: 'AI로 창작하는 무한한 가능성',
    stats: {
      generatedContent: '생성된 콘텐츠',
      todayUsage: '오늘 사용량',
      totalUsage: '총 사용량',
      savedTime: '절약한 시간'
    },
    quickStart: {
      title: '빠른 시작',
      generateContent: '콘텐츠 생성',
      viewTemplates: '인기 템플릿',
      myContent: '내 콘텐츠'
    },
    recentContent: {
      title: '최근 생성된 콘텐츠',
      viewAll: '모두 보기',
      empty: '아직 생성된 콘텐츠가 없습니다'
    },
    popularCategories: {
      title: '인기 카테고리',
      writing: '글쓰기',
      design: '디자인',
      coding: '코딩',
      marketing: '마케팅'
    },
    welcome: '님, 환영합니다!',
    getStarted: '지금 시작하기'
  },
  en: {
    title: 'Dashboard',
    subtitle: 'Infinite Possibilities with AI Creation',
    stats: {
      generatedContent: 'Generated Content',
      todayUsage: 'Today Usage',
      totalUsage: 'Total Usage',
      savedTime: 'Time Saved'
    },
    quickStart: {
      title: 'Quick Start',
      generateContent: 'Generate Content',
      viewTemplates: 'Popular Templates',
      myContent: 'My Content'
    },
    recentContent: {
      title: 'Recent Generated Content',
      viewAll: 'View All',
      empty: 'No content generated yet'
    },
    popularCategories: {
      title: 'Popular Categories',
      writing: 'Writing',
      design: 'Design',
      coding: 'Coding',
      marketing: 'Marketing'
    },
    welcome: ', welcome!',
    getStarted: 'Get Started'
  },
  ja: {
    title: 'ダッシュボード',
    subtitle: 'AIで創る無限の可能性',
    stats: {
      generatedContent: '生成コンテンツ',
      todayUsage: '今日の使用量',
      totalUsage: '総使用量',
      savedTime: '節約した時間'
    },
    quickStart: {
      title: 'クイックスタート',
      generateContent: 'コンテンツ生成',
      viewTemplates: '人気テンプレート',
      myContent: 'マイコンテンツ'
    },
    recentContent: {
      title: '最近生成されたコンテンツ',
      viewAll: 'すべて見る',
      empty: 'まだ生成されたコンテンツがありません'
    },
    popularCategories: {
      title: '人気カテゴリ',
      writing: 'ライティング',
      design: 'デザイン',
      coding: 'コーディング',
      marketing: 'マーケティング'
    },
    welcome: 'さん、ようこそ！',
    getStarted: '今すぐ始める'
  },
  zh: {
    title: '仪表板',
    subtitle: 'AI创作的无限可能',
    stats: {
      generatedContent: '生成内容',
      todayUsage: '今日使用量',
      totalUsage: '总使用量',
      savedTime: '节省时间'
    },
    quickStart: {
      title: '快速开始',
      generateContent: '生成内容',
      viewTemplates: '热门模板',
      myContent: '我的内容'
    },
    recentContent: {
      title: '最近生成的内容',
      viewAll: '查看全部',
      empty: '还没有生成内容'
    },
    popularCategories: {
      title: '热门类别',
      writing: '写作',
      design: '设计',
      coding: '编程',
      marketing: '营销'
    },
    welcome: '，欢迎！',
    getStarted: '立即开始'
  },
  th: {
    title: 'แดชบอร์ด',
    subtitle: 'ความเป็นไปได้ไม่สิ้นสุดด้วยการสร้าง AI',
    stats: {
      generatedContent: 'เนื้อหาที่สร้าง',
      todayUsage: 'การใช้งานวันนี้',
      totalUsage: 'การใช้งานทั้งหมด',
      savedTime: 'เวลาที่ประหยัด'
    },
    quickStart: {
      title: 'เริ่มต้นด่วน',
      generateContent: 'สร้างเนื้อหา',
      viewTemplates: 'เทมเพลตยอดนิยม',
      myContent: 'เนื้อหาของฉัน'
    },
    recentContent: {
      title: 'เนื้อหาที่สร้างล่าสุด',
      viewAll: 'ดูทั้งหมด',
      empty: 'ยังไม่มีเนื้อหาที่สร้าง'
    },
    popularCategories: {
      title: 'หมวดหมู่ยอดนิยม',
      writing: 'การเขียน',
      design: 'การออกแบบ',
      coding: 'การเขียนโค้ด',
      marketing: 'การตลาด'
    },
    welcome: ' ยินดีต้อนรับ!',
    getStarted: 'เริ่มต้นเลย'
  },
  vi: {
    title: 'Bảng điều khiển',
    subtitle: 'Khả năng vô hạn với AI Creation',
    stats: {
      generatedContent: 'Nội dung đã tạo',
      todayUsage: 'Sử dụng hôm nay',
      totalUsage: 'Tổng sử dụng',
      savedTime: 'Thời gian tiết kiệm'
    },
    quickStart: {
      title: 'Bắt đầu nhanh',
      generateContent: 'Tạo nội dung',
      viewTemplates: 'Mẫu phổ biến',
      myContent: 'Nội dung của tôi'
    },
    recentContent: {
      title: 'Nội dung đã tạo gần đây',
      viewAll: 'Xem tất cả',
      empty: 'Chưa có nội dung nào được tạo'
    },
    popularCategories: {
      title: 'Danh mục phổ biến',
      writing: 'Viết',
      design: 'Thiết kế',
      coding: 'Lập trình',
      marketing: 'Tiếp thị'
    },
    welcome: ', chào mừng!',
    getStarted: 'Bắt đầu ngay'
  },
  ms: {
    title: 'Papan Pemuka',
    subtitle: 'Kemungkinan Tanpa Had dengan Penciptaan AI',
    stats: {
      generatedContent: 'Kandungan Dijana',
      todayUsage: 'Penggunaan Hari Ini',
      totalUsage: 'Jumlah Penggunaan',
      savedTime: 'Masa Dijimat'
    },
    quickStart: {
      title: 'Mulakan Pantas',
      generateContent: 'Jana Kandungan',
      viewTemplates: 'Templat Popular',
      myContent: 'Kandungan Saya'
    },
    recentContent: {
      title: 'Kandungan Dijana Terkini',
      viewAll: 'Lihat Semua',
      empty: 'Belum ada kandungan yang dijana'
    },
    popularCategories: {
      title: 'Kategori Popular',
      writing: 'Menulis',
      design: 'Reka Bentuk',
      coding: 'Pengaturcaraan',
      marketing: 'Pemasaran'
    },
    welcome: ', selamat datang!',
    getStarted: 'Mulakan Sekarang'
  },
  ru: {
    title: 'Панель управления',
    subtitle: 'Бесконечные возможности с AI Creation',
    stats: {
      generatedContent: 'Созданный контент',
      todayUsage: 'Использование сегодня',
      totalUsage: 'Всего использовано',
      savedTime: 'Сэкономлено времени'
    },
    quickStart: {
      title: 'Быстрый старт',
      generateContent: 'Создать контент',
      viewTemplates: 'Популярные шаблоны',
      myContent: 'Мой контент'
    },
    recentContent: {
      title: 'Недавно созданный контент',
      viewAll: 'Посмотреть все',
      empty: 'Контент еще не создан'
    },
    popularCategories: {
      title: 'Популярные категории',
      writing: 'Письмо',
      design: 'Дизайн',
      coding: 'Программирование',
      marketing: 'Маркетинг'
    },
    welcome: ', добро пожаловать!',
    getStarted: 'Начать сейчас'
  }
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<'ko' | 'en' | 'ja' | 'zh' | 'th' | 'vi' | 'ms' | 'ru'>('ko');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [generatedContents, setGeneratedContents] = useState<Array<{
    id: string;
    prompt: string;
    category: string;
    result: string;
    mode: string;
    createdAt: string;
    language: string;
  }>>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    links?: Array<{ text: string; url: string }>;
    timestamp: string;
  }>>([]);
  
  // URL 경로에서 언어 감지
  useEffect(() => {
    const pathLang = pathname?.split('/')[1];
    if (pathLang === 'ko' || pathLang === 'en' || pathLang === 'ja' || pathLang === 'zh' || pathLang === 'th' || pathLang === 'vi' || pathLang === 'ms' || pathLang === 'ru') {
      setLanguage(pathLang as typeof language);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ko')) {
        setLanguage('ko');
      } else if (browserLang.startsWith('ja')) {
        setLanguage('ja');
      } else if (browserLang.startsWith('zh')) {
        setLanguage('zh');
      } else if (browserLang.startsWith('th')) {
        setLanguage('th');
      } else if (browserLang.startsWith('vi')) {
        setLanguage('vi');
      } else if (browserLang.startsWith('ms')) {
        setLanguage('ms');
      } else if (browserLang.startsWith('ru')) {
        setLanguage('ru');
      } else {
        setLanguage('en');
      }
    }
  }, [pathname]);
  
  // localStorage에서 생성된 콘텐츠 불러오기 (실시간 업데이트)
  useEffect(() => {
    const loadContents = () => {
      try {
        const stored = localStorage.getItem('aiworkground_generated_contents')
        if (stored) {
          const contents = JSON.parse(stored)
          setGeneratedContents(contents)
        }
      } catch (error) {
        console.error('Failed to load generated contents:', error)
      }
    }
    
    // 챗봇 대화 내역 불러오기
    const loadChatHistory = () => {
      try {
        const stored = localStorage.getItem('aiworkground_chat_history')
        if (stored) {
          const history = JSON.parse(stored)
          setChatHistory(history)
        }
      } catch (error) {
        console.error('Failed to load chat history:', error)
      }
    }
    
    // 초기 로드
    loadContents()
    loadChatHistory()
    
    // storage 이벤트 리스너 추가 (다른 탭에서 변경 시)
    window.addEventListener('storage', () => {
      loadContents()
      loadChatHistory()
    })
    
    // 주기적으로 확인 (같은 탭에서 변경 시)
    const interval = setInterval(() => {
      loadContents()
      loadChatHistory()
    }, 1000)
    
    return () => {
      window.removeEventListener('storage', () => {
        loadContents()
        loadChatHistory()
      })
      clearInterval(interval)
    }
  }, []);
  
  const t = translations[language];

  if (!isLoaded) {
    const loadingText = language === 'ko' ? '로딩 중...' : 
                       language === 'en' ? 'Loading...' : 
                       language === 'ja' ? '読み込み中...' :
                       language === 'zh' ? '加载中...' :
                       language === 'th' ? 'กำลังโหลด...' :
                       language === 'vi' ? 'Đang tải...' :
                       language === 'ms' ? 'Memuatkan...' :
                       'Загрузка...'
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">{loadingText}</p>
        </div>
      </div>
    );
  }

  // 통계 데이터 (AI 콘텐츠 생성 중심)
  const stats = [
    {
      title: t.stats.generatedContent,
      value: '127',
      change: '+12',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      unit: language === 'ko' ? '개' : language === 'en' ? ' items' : language === 'ja' ? '件' : language === 'zh' ? '个' : language === 'th' ? 'รายการ' : language === 'vi' ? ' mục' : language === 'ms' ? ' item' : ' шт'
    },
    {
      title: t.stats.todayUsage,
      value: '23',
      change: '+5',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      unit: language === 'ko' ? '회' : language === 'en' ? ' times' : language === 'ja' ? '回' : language === 'zh' ? '次' : language === 'th' ? 'ครั้ง' : language === 'vi' ? ' lần' : language === 'ms' ? ' kali' : ' раз'
    },
    {
      title: t.stats.totalUsage,
      value: '2.4K',
      change: '+18%',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      unit: ''
    },
    {
      title: t.stats.savedTime,
      value: '42',
      change: '+8',
      icon: Calendar,
      color: 'from-orange-500 to-rose-500',
      unit: language === 'ko' ? '시간' : language === 'en' ? ' hours' : language === 'ja' ? '時間' : language === 'zh' ? '小时' : language === 'th' ? 'ชั่วโมง' : language === 'vi' ? ' giờ' : language === 'ms' ? ' jam' : ' часов'
    }
  ];

  // 빠른 시작 (AI 콘텐츠 생성 중심)
  const quickStartItems = [
    {
      title: t.quickStart.generateContent,
      href: `/${language}/generate`,
      icon: Sparkles,
      color: 'from-blue-500 to-purple-500',
      desc: language === 'ko' ? 'AI로 즉시 콘텐츠 생성' : language === 'en' ? 'Generate content instantly with AI' : language === 'ja' ? 'AIで即座にコンテンツ生成' : language === 'zh' ? '使用AI即时生成内容' : language === 'th' ? 'สร้างเนื้อหาทันทีด้วย AI' : language === 'vi' ? 'Tạo nội dung ngay lập tức với AI' : language === 'ms' ? 'Jana kandungan serta-merta dengan AI' : 'Создавайте контент мгновенно с AI'
    },
    {
      title: t.quickStart.viewTemplates,
      href: `/${language}/generate`,
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      desc: language === 'ko' ? '인기 템플릿으로 빠르게 시작' : language === 'en' ? 'Start quickly with popular templates' : language === 'ja' ? '人気テンプレートで素早く開始' : language === 'zh' ? '使用热门模板快速开始' : language === 'th' ? 'เริ่มต้นอย่างรวดเร็วด้วยเทมเพลตยอดนิยม' : language === 'vi' ? 'Bắt đầu nhanh với mẫu phổ biến' : language === 'ms' ? 'Mulakan dengan cepat menggunakan templat popular' : 'Быстрый старт с популярными шаблонами'
    },
    {
      title: t.quickStart.myContent,
      href: `/dashboard`,
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      desc: language === 'ko' ? '생성한 콘텐츠 관리 및 확인' : language === 'en' ? 'Manage and view your generated content' : language === 'ja' ? '生成したコンテンツの管理と確認' : language === 'zh' ? '管理和查看您生成的内容' : language === 'th' ? 'จัดการและดูเนื้อหาที่สร้าง' : language === 'vi' ? 'Quản lý và xem nội dung đã tạo' : language === 'ms' ? 'Urus dan lihat kandungan yang dijana' : 'Управляйте и просматривайте созданный контент'
    }
  ];

  // 시간 포맷 함수
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) {
      return language === 'ko' ? '방금 전' : language === 'en' ? 'Just now' : language === 'ja' ? 'たった今' : language === 'zh' ? '刚刚' : language === 'th' ? 'เมื่อสักครู่' : language === 'vi' ? 'Vừa xong' : language === 'ms' ? 'Baru sahaja' : 'Только что'
    } else if (diffMins < 60) {
      return language === 'ko' ? `${diffMins}분 전` : language === 'en' ? `${diffMins} min ago` : language === 'ja' ? `${diffMins}分前` : language === 'zh' ? `${diffMins}分钟前` : language === 'th' ? `${diffMins} นาทีที่แล้ว` : language === 'vi' ? `${diffMins} phút trước` : language === 'ms' ? `${diffMins} minit lalu` : `${diffMins} мин назад`
    } else if (diffHours < 24) {
      return language === 'ko' ? `${diffHours}시간 전` : language === 'en' ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ago` : language === 'ja' ? `${diffHours}時間前` : language === 'zh' ? `${diffHours}小时前` : language === 'th' ? `${diffHours} ชั่วโมงที่แล้ว` : language === 'vi' ? `${diffHours} giờ trước` : language === 'ms' ? `${diffHours} jam lalu` : `${diffHours} час${diffHours > 1 ? 'а' : ''} назад`
    } else {
      return language === 'ko' ? `${diffDays}일 전` : language === 'en' ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago` : language === 'ja' ? `${diffDays}日前` : language === 'zh' ? `${diffDays}天前` : language === 'th' ? `${diffDays} วันที่แล้ว` : language === 'vi' ? `${diffDays} ngày trước` : language === 'ms' ? `${diffDays} hari lalu` : `${diffDays} дн${diffDays > 1 ? 'ей' : 'ь'} назад`
    }
  }

  // 카테고리별 아이콘 및 색상 매핑
  const getCategoryInfo = (category: string) => {
    const categoryLower = category.toLowerCase()
    if (categoryLower.includes('글쓰기') || categoryLower.includes('writing') || categoryLower.includes('ライティング') || categoryLower.includes('写作') || categoryLower.includes('การเขียน') || categoryLower.includes('viết') || categoryLower.includes('menulis') || categoryLower.includes('письмо')) {
      return { icon: FileText, color: 'from-blue-500 to-cyan-500' }
    } else if (categoryLower.includes('디자인') || categoryLower.includes('design') || categoryLower.includes('デザイン') || categoryLower.includes('设计') || categoryLower.includes('การออกแบบ') || categoryLower.includes('thiết kế') || categoryLower.includes('reka bentuk') || categoryLower.includes('дизайн')) {
      return { icon: Palette, color: 'from-purple-500 to-pink-500' }
    } else if (categoryLower.includes('코딩') || categoryLower.includes('coding') || categoryLower.includes('コーディング') || categoryLower.includes('编程') || categoryLower.includes('การเขียนโค้ด') || categoryLower.includes('lập trình') || categoryLower.includes('pengaturcaraan') || categoryLower.includes('программирование')) {
      return { icon: Code, color: 'from-green-500 to-emerald-500' }
    } else if (categoryLower.includes('마케팅') || categoryLower.includes('marketing') || categoryLower.includes('マーケティング') || categoryLower.includes('营销') || categoryLower.includes('การตลาด') || categoryLower.includes('tiếp thị') || categoryLower.includes('pemasaran') || categoryLower.includes('маркетинг')) {
      return { icon: Mail, color: 'from-orange-500 to-rose-500' }
    } else if (categoryLower.includes('분석') || categoryLower.includes('analytics') || categoryLower.includes('分析')) {
      return { icon: BarChart3, color: 'from-green-500 to-emerald-500' }
    } else if (categoryLower.includes('영상') || categoryLower.includes('video') || categoryLower.includes('動画')) {
      return { icon: Video, color: 'from-red-500 to-pink-500' }
    } else if (categoryLower.includes('음악') || categoryLower.includes('music') || categoryLower.includes('音楽')) {
      return { icon: Music, color: 'from-indigo-500 to-purple-500' }
    }
    return { icon: FileText, color: 'from-gray-500 to-gray-600' }
  }

  // 인기 카테고리
  const popularCategories = [
    {
      name: t.popularCategories.writing,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      count: '45',
      href: `/generate?category=${encodeURIComponent(t.popularCategories.writing)}`
    },
    {
      name: t.popularCategories.design,
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      count: '32',
      href: `/generate?category=${encodeURIComponent(t.popularCategories.design)}`
    },
    {
      name: t.popularCategories.coding,
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      count: '28',
      href: `/generate?category=${encodeURIComponent(t.popularCategories.coding)}`
    },
    {
      name: t.popularCategories.marketing,
      icon: Mail,
      color: 'from-orange-500 to-rose-500',
      count: '22',
      href: `/generate?category=${encodeURIComponent(t.popularCategories.marketing)}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Home */}
            <div className="flex items-center gap-4">
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
            <button
              onClick={() => router.push('/')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all flex items-center gap-2"
              title={language === 'ko' ? '홈으로' : language === 'en' ? 'Home' : language === 'ja' ? 'ホーム' : language === 'zh' ? '首页' : language === 'th' ? 'หน้าแรก' : language === 'vi' ? 'Trang chủ' : language === 'ms' ? 'Laman utama' : 'Главная'}
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ko' ? '홈' : language === 'en' ? 'Home' : language === 'ja' ? 'ホーム' : language === 'zh' ? '首页' : language === 'th' ? 'หน้าแรก' : language === 'vi' ? 'Trang chủ' : language === 'ms' ? 'Utama' : 'Главная'}</span>
            </button>
            </div>

            {/* Language & User */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>
                    {language === 'ko' ? '한국어' : 
                     language === 'en' ? 'English' : 
                     language === 'ja' ? '日本語' :
                     language === 'zh' ? '中文' :
                     language === 'th' ? 'ไทย' :
                     language === 'vi' ? 'Tiếng Việt' :
                     language === 'ms' ? 'Bahasa' :
                     'Русский'}
                  </span>
                </button>
                
                {showLanguageMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowLanguageMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                      {(['ko', 'en', 'ja', 'zh', 'th', 'vi', 'ms', 'ru'] as const).map((lang) => {
                        const langNames = { 
                          ko: '한국어', 
                          en: 'English', 
                          ja: '日本語',
                          zh: '中文',
                          th: 'ไทย',
                          vi: 'Tiếng Việt',
                          ms: 'Bahasa',
                          ru: 'Русский'
                        }
                        return (
                          <button
                            key={lang}
                            onClick={() => {
                              setLanguage(lang)
                              setShowLanguageMenu(false)
                              router.push('/dashboard')
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-all ${
                              language === lang
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700'
                            } ${lang === 'ko' ? 'rounded-t-lg' : lang === 'ru' ? 'rounded-b-lg' : ''}`}
                          >
                            {langNames[lang]}
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* User Profile */}
              {user && (
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-300 hidden sm:inline">
                    {user.firstName || user.emailAddresses[0]?.emailAddress}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {user?.firstName ? `${user.firstName}${t.welcome}` : t.title}
            </h1>
            <p className="text-gray-400 text-lg">{t.subtitle}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl blur-xl" style={{
                  background: `linear-gradient(to bottom right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`
                }}></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-green-400 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}{stat.unit}
                  </div>
                  <div className="text-sm text-gray-400">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Start */}
          <div className="mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
              <h2 className="text-2xl font-bold text-white mb-6">{t.quickStart.title}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {quickStartItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => router.push(item.href)}
                    className="group relative p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 bg-gray-900/50"
                  >
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-base font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.desc}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all absolute top-4 right-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Generated Content */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{t.recentContent.title}</h2>
                  <button 
                    onClick={() => router.push('/generate')}
                    className="text-sm text-purple-400 hover:text-purple-300 font-medium"
                  >
                    {t.recentContent.viewAll} →
                  </button>
                </div>
                {generatedContents.length > 0 ? (
                  <div className="space-y-4">
                    {generatedContents.slice(0, 10).map((content) => {
                      const categoryInfo = getCategoryInfo(content.category)
                      const CategoryIcon = categoryInfo.icon
                      return (
                        <div
                          key={content.id}
                          className="group p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 hover:bg-gray-900/50 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                              <CategoryIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-semibold text-white line-clamp-1">
                                  {content.prompt.length > 50 ? content.prompt.substring(0, 50) + '...' : content.prompt}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 flex-shrink-0">
                                  {content.category}
                                </span>
                              </div>
                              <div className="bg-gray-900/50 rounded-lg p-3 mb-2 border border-gray-700">
                                <p className="text-sm text-gray-300 line-clamp-3 whitespace-pre-wrap">
                                  {content.result}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">{formatTimeAgo(content.createdAt)}</p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    navigator.clipboard.writeText(content.result)
                                    setCopiedId(content.id)
                                    setTimeout(() => setCopiedId(null), 2000)
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all text-xs"
                                >
                                  {copiedId === content.id ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      {language === 'ko' ? '복사됨' : language === 'en' ? 'Copied' : language === 'ja' ? 'コピー済み' : language === 'zh' ? '已复制' : language === 'th' ? 'คัดลอกแล้ว' : language === 'vi' ? 'Đã sao chép' : language === 'ms' ? 'Disalin' : 'Скопировано'}
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      {language === 'ko' ? '복사' : language === 'en' ? 'Copy' : language === 'ja' ? 'コピー' : language === 'zh' ? '复制' : language === 'th' ? 'คัดลอก' : language === 'vi' ? 'Sao chép' : language === 'ms' ? 'Salin' : 'Копировать'}
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">{t.recentContent.empty}</p>
                    <button
                      onClick={() => router.push('/generate')}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all"
                    >
                      {t.getStarted}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Popular Categories */}
            <div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
                <h2 className="text-2xl font-bold text-white mb-6">{t.popularCategories.title}</h2>
                <div className="space-y-3">
                  {popularCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => router.push(category.href)}
                      className="w-full group p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 hover:bg-gray-900/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}>
                            <category.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {category.count} {language === 'ko' ? '개 생성' : language === 'en' ? 'generated' : language === 'ja' ? '件生成' : language === 'zh' ? '个已生成' : language === 'th' ? 'รายการสร้าง' : language === 'vi' ? 'đã tạo' : language === 'ms' ? 'dijana' : 'создано'}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}