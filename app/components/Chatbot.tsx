'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Send, X, Minimize2, MessageCircle, Sparkles, ExternalLink, Lock } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  links?: Array<{ text: string; url: string }>
  timestamp: string
}

interface ChatbotProps {
  language: 'ko' | 'en' | 'ja' | 'zh' | 'th' | 'vi' | 'ms' | 'ru'
}

export default function Chatbot({ language }: ChatbotProps) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const translations = {
    ko: {
      welcome: '안녕하세요! 오늘 어떻게 보내고 계신가요? 무엇을 도와드리면 좋을까요?',
      initialGreeting: '안녕하세요! 오늘 어떻게 보내고 계신가요? 무엇을 도와드리면 좋을까요?',
      placeholder: '메시지를 입력하세요...',
      send: '전송',
      close: '닫기',
      minimize: '최소화',
      siteDescription: 'AIWorkGround는 AI를 활용한 콘텐츠 생성 플랫폼입니다. 글쓰기, 디자인, 코딩, 마케팅 등 다양한 콘텐츠를 AI로 생성할 수 있습니다.',
      generateLink: '콘텐츠 생성',
      dashboardLink: '대시보드',
      templatesLink: '템플릿 보기',
      greeting: '안녕하세요!',
      howAreYou: '좋아요! 오늘도 도와드릴 준비가 되어 있어요. 무엇을 도와드릴까요?',
      thanks: '천만에요! 다른 도움이 필요하시면 언제든지 말씀해주세요.',
      unknown: '죄송해요, 잘 이해하지 못했어요. 다시 말씀해주시거나 "사이트 설명", "콘텐츠 생성", "대시보드" 중 하나를 말씀해주세요.',
      loginRequired: '더 많은 대화를 하시려면 로그인이 필요해요. 로그인하시겠어요?',
      loginButton: '로그인하기',
      remainingMessages: '남은 무료 메시지: {count}개',
      // 일상 대화 응답
      travel: '여행 가셨군요! 어디로 가셨어요? 재미있게 보내고 계신가요?',
      tired: '피곤하시군요. 푹 쉬시고, 필요하시면 언제든지 말씀해주세요!',
      happy: '좋아요! 기분 좋은 하루 보내고 계시는군요. 더 도와드릴 게 있으면 말씀해주세요!',
      sad: '아, 그렇군요. 힘든 일이 있으시면 언제든지 이야기해주세요. 제가 도와드릴 수 있는 게 있으면 좋겠어요.',
      work: '일하시는군요! 바쁘시겠어요. 필요하시면 언제든지 말씀해주세요.',
      food: '음식 얘기 좋아해요! 뭐 드시고 싶으세요?',
      weather: '날씨 얘기네요! 오늘 날씨가 어떤가요?',
      casual: '그렇군요! 더 이야기해주세요. 듣고 싶어요.'
    },
    en: {
      welcome: 'Hello! How are you doing today? What can I help you with?',
      initialGreeting: 'Hello! How are you doing today? What can I help you with?',
      placeholder: 'Type a message...',
      send: 'Send',
      close: 'Close',
      minimize: 'Minimize',
      siteDescription: 'AIWorkGround is an AI-powered content creation platform. You can generate various content including writing, design, coding, and marketing using AI.',
      generateLink: 'Generate Content',
      dashboardLink: 'Dashboard',
      templatesLink: 'View Templates',
      greeting: 'Hello!',
      howAreYou: 'I\'m doing great! Ready to help you today. What can I do for you?',
      thanks: 'You\'re welcome! Feel free to ask if you need anything else.',
      unknown: 'Sorry, I didn\'t understand that. Could you please rephrase or mention one of: "site description", "generate content", or "dashboard"?',
      loginRequired: 'To continue chatting, please sign in. Would you like to sign in?',
      loginButton: 'Sign In',
      remainingMessages: 'Remaining free messages: {count}',
      travel: 'Traveling! Where did you go? Having fun?',
      tired: 'You seem tired. Get some rest, and let me know if you need anything!',
      happy: 'Great! Having a good day. Let me know if you need anything else!',
      sad: 'I see. If you\'re going through something tough, feel free to talk. I\'m here to help if I can.',
      work: 'Working! You must be busy. Let me know if you need anything.',
      food: 'Food talk! What do you want to eat?',
      weather: 'Weather talk! How\'s the weather today?',
      casual: 'I see! Tell me more.'
    },
    ja: {
      welcome: 'こんにちは！今日はどのように過ごしていますか？何かお手伝いできることはありますか？',
      initialGreeting: 'こんにちは！今日はどのように過ごしていますか？何かお手伝いできることはありますか？',
      placeholder: 'メッセージを入力...',
      send: '送信',
      close: '閉じる',
      minimize: '最小化',
      siteDescription: 'AIWorkGroundはAIを活用したコンテンツ作成プラットフォームです。ライティング、デザイン、コーディング、マーケティングなど、様々なコンテンツをAIで生成できます。',
      generateLink: 'コンテンツ生成',
      dashboardLink: 'ダッシュボード',
      templatesLink: 'テンプレートを見る',
      greeting: 'こんにちは！',
      howAreYou: '元気です！今日もお手伝いする準備ができています。何かお手伝いできることはありますか？',
      thanks: 'どういたしまして！他に何か必要なことがあれば、いつでもお知らせください。',
      unknown: '申し訳ございませんが、理解できませんでした。もう一度言い直していただくか、「サイト説明」「コンテンツ生成」「ダッシュボード」のいずれかを言ってください。',
      loginRequired: 'さらに会話を続けるには、ログインが必要です。ログインしますか？',
      loginButton: 'ログイン',
      remainingMessages: '残りの無料メッセージ: {count}件'
    },
    zh: {
      welcome: '你好！今天过得怎么样？我能为您做些什么？',
      initialGreeting: '你好！今天过得怎么样？我能为您做些什么？',
      placeholder: '输入消息...',
      send: '发送',
      close: '关闭',
      minimize: '最小化',
      siteDescription: 'AIWorkGround是一个AI驱动的内容创作平台。您可以使用AI生成各种内容，包括写作、设计、编程和营销。',
      generateLink: '生成内容',
      dashboardLink: '仪表板',
      templatesLink: '查看模板',
      greeting: '你好！',
      howAreYou: '我很好！今天也准备好帮助您了。我能为您做些什么？',
      thanks: '不客气！如果您需要其他帮助，请随时告诉我。',
      unknown: '抱歉，我没有理解。请您重新表述，或者提到以下之一："网站说明"、"生成内容"或"仪表板"。',
      loginRequired: '要继续聊天，请登录。您要登录吗？',
      loginButton: '登录',
      remainingMessages: '剩余免费消息: {count}条',
      travel: '去旅行了！您去了哪里？玩得开心吗？',
      tired: '您看起来累了。好好休息，如果需要什么随时告诉我！',
      happy: '太好了！看来您今天心情不错。如果还需要什么帮助，请告诉我！',
      sad: '我明白了。如果您遇到困难，随时可以和我聊聊。如果我能帮上忙就好了。',
      work: '在工作啊！您一定很忙。如果需要什么，随时告诉我。',
      food: '聊食物！您想吃什么？',
      weather: '聊天气！今天天气怎么样？',
      casual: '这样啊！多告诉我一些。我想听。'
    },
    th: {
      welcome: 'สวัสดี! วันนี้เป็นอย่างไรบ้างคะ? มีอะไรให้ช่วยไหมคะ?',
      initialGreeting: 'สวัสดี! วันนี้เป็นอย่างไรบ้างคะ? มีอะไรให้ช่วยไหมคะ?',
      placeholder: 'พิมพ์ข้อความ...',
      send: 'ส่ง',
      close: 'ปิด',
      minimize: 'ย่อ',
      siteDescription: 'AIWorkGround เป็นแพลตฟอร์มการสร้างเนื้อหาที่ใช้ AI คุณสามารถสร้างเนื้อหาต่างๆ รวมถึงการเขียน การออกแบบ การเขียนโค้ด และการตลาดโดยใช้ AI',
      generateLink: 'สร้างเนื้อหา',
      dashboardLink: 'แดชบอร์ด',
      templatesLink: 'ดูเทมเพลต',
      greeting: 'สวัสดี!',
      howAreYou: 'สบายดีค่ะ! พร้อมช่วยเหลือคุณวันนี้ มีอะไรให้ช่วยไหมคะ?',
      thanks: 'ยินดีค่ะ! ถ้ามีอะไรอื่นที่ต้องการความช่วยเหลือ แจ้งได้เลยนะคะ',
      unknown: 'ขอโทษค่ะ ไม่เข้าใจเลย กรุณาพูดใหม่หรือพูดถึงหนึ่งใน: "คำอธิบายเว็บไซต์", "สร้างเนื้อหา", หรือ "แดชบอร์ด"',
      loginRequired: 'เพื่อสนทนาต่อ กรุณาเข้าสู่ระบบ คุณต้องการเข้าสู่ระบบไหมคะ?',
      loginButton: 'เข้าสู่ระบบ',
      remainingMessages: 'ข้อความฟรีที่เหลือ: {count} ข้อความ',
      travel: 'ไปเที่ยวมาเหรอคะ! ไปที่ไหนมาคะ? สนุกไหมคะ?',
      tired: 'ดูเหนื่อยนะคะ พักผ่อนให้เต็มที่ และบอกฉันได้เลยถ้าต้องการอะไร!',
      happy: 'ดีค่ะ! ดูเหมือนว่าคุณกำลังมีวันที่ดีอยู่ ต้องการความช่วยเหลืออะไรเพิ่มเติมบอกได้เลยค่ะ!',
      sad: 'เข้าใจแล้วค่ะ ถ้ามีเรื่องยากๆ ก็เล่าให้ฟังได้เลยนะคะ ฉันจะช่วยได้ถ้ามีอะไรให้ช่วย',
      work: 'กำลังทำงานอยู่เหรอคะ! คงยุ่งมากเลย ต้องการอะไรบอกได้เลยค่ะ',
      food: 'คุยเรื่องอาหาร! อยากกินอะไรคะ?',
      weather: 'คุยเรื่องอากาศ! วันนี้อากาศเป็นอย่างไรคะ?',
      casual: 'เข้าใจแล้ว! บอกเพิ่มเติมได้เลย อยากฟังค่ะ'
    },
    vi: {
      welcome: 'Xin chào! Hôm nay bạn thế nào? Tôi có thể giúp gì cho bạn?',
      initialGreeting: 'Xin chào! Hôm nay bạn thế nào? Tôi có thể giúp gì cho bạn?',
      placeholder: 'Nhập tin nhắn...',
      send: 'Gửi',
      close: 'Đóng',
      minimize: 'Thu nhỏ',
      siteDescription: 'AIWorkGround là nền tảng tạo nội dung sử dụng AI. Bạn có thể tạo nhiều loại nội dung bao gồm viết, thiết kế, lập trình và tiếp thị bằng AI.',
      generateLink: 'Tạo nội dung',
      dashboardLink: 'Bảng điều khiển',
      templatesLink: 'Xem mẫu',
      greeting: 'Xin chào!',
      howAreYou: 'Tôi khỏe! Sẵn sàng giúp bạn hôm nay. Tôi có thể giúp gì cho bạn?',
      thanks: 'Không có gì! Nếu bạn cần gì khác, cứ nói nhé.',
      unknown: 'Xin lỗi, tôi không hiểu. Bạn có thể nói lại hoặc đề cập đến một trong: "mô tả trang web", "tạo nội dung", hoặc "bảng điều khiển".',
      loginRequired: 'Để tiếp tục trò chuyện, vui lòng đăng nhập. Bạn có muốn đăng nhập không?',
      loginButton: 'Đăng nhập',
      remainingMessages: 'Tin nhắn miễn phí còn lại: {count} tin nhắn',
      travel: 'Đi du lịch à! Bạn đi đâu vậy? Vui không?',
      tired: 'Trông bạn mệt mỏi quá. Nghỉ ngơi đi, và cho tôi biết nếu cần gì nhé!',
      happy: 'Tuyệt! Có vẻ bạn đang có một ngày tốt lành. Cho tôi biết nếu cần gì thêm nhé!',
      sad: 'Tôi hiểu. Nếu bạn đang gặp khó khăn, cứ nói chuyện với tôi. Tôi sẽ giúp nếu có thể.',
      work: 'Đang làm việc à! Chắc bạn bận lắm. Cho tôi biết nếu cần gì nhé.',
      food: 'Nói về đồ ăn! Bạn muốn ăn gì?',
      weather: 'Nói về thời tiết! Thời tiết hôm nay thế nào?',
      casual: 'Vậy à! Kể thêm cho tôi nghe đi. Tôi muốn nghe.'
    },
    ms: {
      welcome: 'Hello! Bagaimana hari anda? Bagaimana saya boleh membantu anda?',
      initialGreeting: 'Hello! Bagaimana hari anda? Bagaimana saya boleh membantu anda?',
      placeholder: 'Taip mesej...',
      send: 'Hantar',
      close: 'Tutup',
      minimize: 'Kecilkan',
      siteDescription: 'AIWorkGround adalah platform penciptaan kandungan yang menggunakan AI. Anda boleh menjana pelbagai kandungan termasuk penulisan, reka bentuk, pengaturcaraan, dan pemasaran menggunakan AI.',
      generateLink: 'Jana Kandungan',
      dashboardLink: 'Papan Pemuka',
      templatesLink: 'Lihat Templat',
      greeting: 'Hello!',
      howAreYou: 'Saya sihat! Bersedia untuk membantu anda hari ini. Bagaimana saya boleh membantu?',
      thanks: 'Sama-sama! Jika anda memerlukan bantuan lain, sila beritahu saya.',
      unknown: 'Maaf, saya tidak faham. Bolehkah anda menyebut semula atau menyebut salah satu: "penerangan laman web", "jana kandungan", atau "papan pemuka".',
      loginRequired: 'Untuk terus berbual, sila log masuk. Adakah anda ingin log masuk?',
      loginButton: 'Log Masuk',
      remainingMessages: 'Mesej percuma yang tinggal: {count} mesej',
      travel: 'Pergi melancong! Pergi mana? Seronok tak?',
      tired: 'Nampak penat. Rehatlah, dan beritahu saya jika perlukan apa-apa!',
      happy: 'Bagus! Nampaknya anda sedang mempunyai hari yang baik. Beritahu saya jika perlukan apa-apa lagi!',
      sad: 'Faham. Jika anda menghadapi kesukaran, bercakap dengan saya. Saya akan membantu jika boleh.',
      work: 'Bekerja! Mesti sibuk. Beritahu saya jika perlukan apa-apa.',
      food: 'Bercakap tentang makanan! Nak makan apa?',
      weather: 'Bercakap tentang cuaca! Cuaca hari ini macam mana?',
      casual: 'Begitu! Ceritakan lagi. Saya nak dengar.'
    },
    ru: {
      welcome: 'Привет! Как дела сегодня? Чем могу помочь?',
      initialGreeting: 'Привет! Как дела сегодня? Чем могу помочь?',
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
      close: 'Закрыть',
      minimize: 'Свернуть',
      siteDescription: 'AIWorkGround - это платформа для создания контента с использованием AI. Вы можете генерировать различный контент, включая письмо, дизайн, программирование и маркетинг, используя AI.',
      generateLink: 'Создать контент',
      dashboardLink: 'Панель управления',
      templatesLink: 'Просмотр шаблонов',
      greeting: 'Привет!',
      howAreYou: 'Отлично! Готов помочь вам сегодня. Чем могу помочь?',
      thanks: 'Пожалуйста! Если вам нужна другая помощь, дайте знать.',
      unknown: 'Извините, я не понял. Можете переформулировать или упомянуть одно из: "описание сайта", "создать контент" или "панель управления".',
      loginRequired: 'Чтобы продолжить общение, пожалуйста, войдите в систему. Хотите войти?',
      loginButton: 'Войти',
      remainingMessages: 'Осталось бесплатных сообщений: {count}',
      travel: 'Путешествуете! Куда поехали? Весело?',
      tired: 'Выглядите уставшим. Отдохните, и дайте знать, если что-то нужно!',
      happy: 'Отлично! Похоже, у вас хороший день. Дайте знать, если что-то еще нужно!',
      sad: 'Понимаю. Если у вас трудности, поговорите со мной. Помогу, если смогу.',
      work: 'Работаете! Наверное, заняты. Дайте знать, если что-то нужно.',
      food: 'Разговор о еде! Что хотите съесть?',
      weather: 'Разговор о погоде! Какая сегодня погода?',
      casual: 'Понятно! Расскажи больше. Хочу послушать.'
    }
  }

  const t = translations[language] || translations.en

  // 메시지 카운트 불러오기
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aiworkground_chat_message_count')
      if (stored) {
        setMessageCount(parseInt(stored, 10))
      }
    } catch (error) {
      console.error('Failed to load message count:', error)
    }
  }, [])

  // 초기 인사 메시지
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: t.initialGreeting || t.welcome,
        timestamp: new Date().toISOString()
      }
      setMessages([welcomeMessage])
      saveMessage(welcomeMessage)
    }
  }, [isOpen])

  // 메시지 저장 (localStorage)
  const saveMessage = (message: Message) => {
    try {
      const stored = localStorage.getItem('aiworkground_chat_history')
      const history = stored ? JSON.parse(stored) : []
      history.push(message)
      // 최대 100개 메시지만 유지
      const updated = history.slice(-100)
      localStorage.setItem('aiworkground_chat_history', JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save message:', error)
    }
  }

  // 스크롤을 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 응답 생성 함수 (이전 메시지 맥락 고려)
  const generateResponse = (userInput: string, previousMessages: Message[] = []): { content: string; links?: Array<{ text: string; url: string }> } => {
    const lowerInput = userInput.toLowerCase().trim()
    
    // 이전 메시지에서 맥락 파악 (최근 3개 메시지)
    const recentMessages = previousMessages.slice(-3).map(m => m.content.toLowerCase())
    const conversationContext = recentMessages.join(' ')

    // 인사
    if (lowerInput.includes('안녕') || lowerInput.includes('hello') || lowerInput.includes('hi') || 
        lowerInput.includes('こんにちは') || lowerInput.includes('你好') || lowerInput.includes('สวัสดี') ||
        lowerInput.includes('xin chào') || lowerInput.includes('selamat') || lowerInput.includes('привет')) {
      return { content: t.greeting + ' ' + t.howAreYou }
    }

    // 안부
    if (lowerInput.includes('어떻게') || lowerInput.includes('how are you') || lowerInput.includes('元気') ||
        lowerInput.includes('怎么样') || lowerInput.includes('เป็นอย่างไร') || lowerInput.includes('thế nào')) {
      return { content: t.howAreYou }
    }

    // 감사
    if (lowerInput.includes('감사') || lowerInput.includes('thanks') || lowerInput.includes('ありがとう') ||
        lowerInput.includes('谢谢') || lowerInput.includes('ขอบคุณ') || lowerInput.includes('cảm ơn') ||
        lowerInput.includes('terima kasih') || lowerInput.includes('спасибо')) {
      return { content: t.thanks }
    }

    // 사이트 설명
    if (lowerInput.includes('사이트') || lowerInput.includes('site') || lowerInput.includes('サイト') ||
        lowerInput.includes('网站') || lowerInput.includes('เว็บไซต์') || lowerInput.includes('trang web') ||
        lowerInput.includes('laman') || lowerInput.includes('сайт') || lowerInput.includes('설명') ||
        lowerInput.includes('description') || lowerInput.includes('説明') || lowerInput.includes('说明')) {
      return {
        content: t.siteDescription,
        links: [
          { text: t.generateLink, url: '/generate' },
          { text: t.dashboardLink, url: '/dashboard' },
          { text: t.templatesLink, url: '/generate' }
        ]
      }
    }

    // 콘텐츠 생성
    if (lowerInput.includes('생성') || lowerInput.includes('generate') || lowerInput.includes('生成') ||
        lowerInput.includes('สร้าง') || lowerInput.includes('tạo') || lowerInput.includes('jana') ||
        lowerInput.includes('создать') || lowerInput.includes('만들') || lowerInput.includes('만들기')) {
      return {
        content: language === 'ko' ? '콘텐츠 생성 페이지로 이동하시겠어요?' : 
                 language === 'en' ? 'Would you like to go to the content generation page?' :
                 language === 'ja' ? 'コンテンツ生成ページに移動しますか？' :
                 language === 'zh' ? '您想转到内容生成页面吗？' :
                 language === 'th' ? 'ต้องการไปที่หน้าสร้างเนื้อหาไหมคะ?' :
                 language === 'vi' ? 'Bạn có muốn chuyển đến trang tạo nội dung không?' :
                 language === 'ms' ? 'Adakah anda ingin pergi ke halaman penjanaan kandungan?' :
                 'Хотите перейти на страницу создания контента?',
        links: [
          { text: t.generateLink, url: '/generate' }
        ]
      }
    }

    // 대시보드
    if (lowerInput.includes('대시보드') || lowerInput.includes('dashboard') || lowerInput.includes('ダッシュボード') ||
        lowerInput.includes('仪表板') || lowerInput.includes('แดชบอร์ด') || lowerInput.includes('bảng điều khiển') ||
        lowerInput.includes('papan pemuka') || lowerInput.includes('панель')) {
      return {
        content: language === 'ko' ? '대시보드로 이동하시겠어요?' : 
                 language === 'en' ? 'Would you like to go to the dashboard?' :
                 language === 'ja' ? 'ダッシュボードに移動しますか？' :
                 language === 'zh' ? '您想转到仪表板吗？' :
                 language === 'th' ? 'ต้องการไปที่แดชบอร์ดไหมคะ?' :
                 language === 'vi' ? 'Bạn có muốn chuyển đến bảng điều khiển không?' :
                 language === 'ms' ? 'Adakah anda ingin pergi ke papan pemuka?' :
                 'Хотите перейти на панель управления?',
        links: [
          { text: t.dashboardLink, url: '/dashboard' }
        ]
      }
    }

    // 일상적인 대화 패턴 인식 (친구처럼 응답)
    // 여행 관련 (과거형/현재형 구분)
    if (lowerInput.includes('여행') || lowerInput.includes('travel') || lowerInput.includes('旅行') ||
        lowerInput.includes('旅游') || lowerInput.includes('ท่องเที่ยว') || lowerInput.includes('du lịch') ||
        lowerInput.includes('pelancongan') || lowerInput.includes('путешествие')) {
      
      const pastTense = lowerInput.includes('왔어') || lowerInput.includes('갔어') || lowerInput.includes('다녀왔어') ||
                       lowerInput.includes('went') || lowerInput.includes('行った') || lowerInput.includes('去了') ||
                       lowerInput.includes('ไปแล้ว') || lowerInput.includes('đã đi') || lowerInput.includes('sudah pergi') ||
                       lowerInput.includes('уже поехал')
      
      if (pastTense) {
        // 과거형 - 이미 다녀왔을 때
        const responses = {
          ko: ['여행 다녀오셨군요! 어디로 가셨어요? 재미있게 보내셨나요?', '여행 어떠셨어요? 좋은 추억 많이 만드셨나요?'],
          en: ['You went on a trip! Where did you go? Did you have fun?', 'How was your trip? Did you make good memories?'],
          ja: ['旅行に行かれたんですね！どこに行かれましたか？楽しかったですか？', '旅行はいかがでしたか？良い思い出ができましたか？'],
          zh: ['您去旅行了！您去了哪里？玩得开心吗？', '旅行怎么样？有没有留下美好的回忆？'],
          th: ['ไปเที่ยวมาเหรอคะ! ไปที่ไหนมาคะ? สนุกไหมคะ?', 'เที่ยวเป็นอย่างไรบ้างคะ? มีความทรงจำดีๆ มากไหมคะ?'],
          vi: ['Bạn đã đi du lịch! Bạn đi đâu? Vui không?', 'Chuyến đi thế nào? Có kỷ niệm đẹp không?'],
          ms: ['Pergi melancong! Pergi mana? Seronok tak?', 'Macam mana perjalanan? Ada kenangan indah tak?'],
          ru: ['Вы путешествовали! Куда ездили? Было весело?', 'Как прошла поездка? Остались хорошие воспоминания?']
        }
        const langResponses = responses[language] || responses.en
        return { content: langResponses[Math.floor(Math.random() * langResponses.length)] }
      } else {
        // 현재형/미래형
        return { content: (t as any).travel || (language === 'ko' ? '여행 가시는군요! 어디로 가시나요? 재미있게 보내세요!' : 'Traveling! Where are you going? Have fun!') }
      }
    }

    // 피곤함
    if (lowerInput.includes('피곤') || lowerInput.includes('tired') || lowerInput.includes('疲れた') ||
        lowerInput.includes('累') || lowerInput.includes('เหนื่อย') || lowerInput.includes('mệt') ||
        lowerInput.includes('penat') || lowerInput.includes('устал') || lowerInput.includes('힘들어')) {
      return { content: (t as any).tired || (language === 'ko' ? '피곤하시군요. 푹 쉬시고, 필요하시면 언제든지 말씀해주세요!' : 'You seem tired. Get some rest, and let me know if you need anything!') }
    }

    // 기분 좋음
    if (lowerInput.includes('좋아') || lowerInput.includes('happy') || lowerInput.includes('嬉しい') ||
        lowerInput.includes('开心') || lowerInput.includes('ดีใจ') || lowerInput.includes('vui') ||
        lowerInput.includes('gembira') || lowerInput.includes('рад') || lowerInput.includes('기분 좋') ||
        lowerInput.includes('신나') || lowerInput.includes('즐거워')) {
      return { content: (t as any).happy || (language === 'ko' ? '좋아요! 기분 좋은 하루 보내고 계시는군요. 더 도와드릴 게 있으면 말씀해주세요!' : 'Great! Having a good day. Let me know if you need anything else!') }
    }

    // 슬픔/힘듦
    if (lowerInput.includes('슬퍼') || lowerInput.includes('sad') || lowerInput.includes('悲しい') ||
        lowerInput.includes('难过') || lowerInput.includes('เศร้า') || lowerInput.includes('buồn') ||
        lowerInput.includes('sedih') || lowerInput.includes('грустно') || lowerInput.includes('힘들어') ||
        lowerInput.includes('우울') || lowerInput.includes('스트레스')) {
      return { content: (t as any).sad || (language === 'ko' ? '아, 그렇군요. 힘든 일이 있으시면 언제든지 이야기해주세요. 제가 도와드릴 수 있는 게 있으면 좋겠어요.' : 'I see. If you\'re going through something tough, feel free to talk. I\'m here to help if I can.') }
    }

    // 일/업무
    if (lowerInput.includes('일') || lowerInput.includes('work') || lowerInput.includes('仕事') ||
        lowerInput.includes('工作') || lowerInput.includes('งาน') || lowerInput.includes('làm việc') ||
        lowerInput.includes('kerja') || lowerInput.includes('работа') || lowerInput.includes('업무') ||
        lowerInput.includes('회사') || lowerInput.includes('출근')) {
      return { content: (t as any).work || (language === 'ko' ? '일하시는군요! 바쁘시겠어요. 필요하시면 언제든지 말씀해주세요.' : 'Working! You must be busy. Let me know if you need anything.') }
    }

    // 음식 관련 (과거형/완료형 체크)
    if (lowerInput.includes('음식') || lowerInput.includes('food') || lowerInput.includes('食べ物') ||
        lowerInput.includes('食物') || lowerInput.includes('อาหาร') || lowerInput.includes('thức ăn') ||
        lowerInput.includes('makanan') || lowerInput.includes('еда') || lowerInput.includes('먹') ||
        lowerInput.includes('밥') || lowerInput.includes('식사') || lowerInput.includes('맛있')) {
      
      // 과거형/완료형 체크 (이미 먹었는지 확인)
      const pastTense = lowerInput.includes('먹었') || lowerInput.includes('먹었어') || lowerInput.includes('먹었어요') ||
                       lowerInput.includes('ate') || lowerInput.includes('먹었습니다') || lowerInput.includes('식사했') ||
                       lowerInput.includes('食べた') || lowerInput.includes('吃了') || lowerInput.includes('กินแล้ว') ||
                       lowerInput.includes('đã ăn') || lowerInput.includes('sudah makan') || lowerInput.includes('уже поел')
      
      if (pastTense) {
        // 이미 먹었다고 했을 때
        const responses = {
          ko: ['맛있게 드셨나요? 어떤 음식 드셨어요?', '좋아요! 배부르시겠어요. 다음엔 뭐 드시고 싶으세요?', '맛있게 드셨다니 다행이에요!'],
          en: ['Did you enjoy it? What did you eat?', 'Great! You must be full. What would you like to eat next time?', 'Glad you enjoyed it!'],
          ja: ['美味しかったですか？何を食べましたか？', '良かったです！お腹いっぱいですね。次は何を食べたいですか？', '美味しく食べられたようで良かったです！'],
          zh: ['好吃吗？您吃了什么？', '太好了！您一定很饱了。下次想吃什么？', '很高兴您吃得开心！'],
          th: ['อร่อยไหมคะ? กินอะไรคะ?', 'ดีค่ะ! คงอิ่มแล้วนะคะ ครั้งต่อไปอยากกินอะไรคะ?', 'ดีใจที่ทานได้อร่อยค่ะ!'],
          vi: ['Ngon không? Bạn đã ăn gì?', 'Tốt! Chắc bạn no rồi. Lần sau muốn ăn gì?', 'Vui vì bạn ăn ngon!'],
          ms: ['Sedap tak? Makan apa?', 'Bagus! Mesti kenyang dah. Nak makan apa lain kali?', 'Gembira anda menikmatinya!'],
          ru: ['Вкусно было? Что вы ели?', 'Отлично! Наверное, сыты. Что хотите съесть в следующий раз?', 'Рад, что вам понравилось!']
        }
        const langResponses = responses[language] || responses.en
        return { content: langResponses[Math.floor(Math.random() * langResponses.length)] }
      } else {
        // 미래형/현재형 (먹고 싶은지 물어볼 때)
        return { content: (t as any).food || (language === 'ko' ? '음식 얘기 좋아해요! 뭐 드시고 싶으세요?' : 'Food talk! What do you want to eat?') }
      }
    }

    // 날씨
    if (lowerInput.includes('날씨') || lowerInput.includes('weather') || lowerInput.includes('天気') ||
        lowerInput.includes('天气') || lowerInput.includes('อากาศ') || lowerInput.includes('thời tiết') ||
        lowerInput.includes('cuaca') || lowerInput.includes('погода') || lowerInput.includes('비') ||
        lowerInput.includes('눈') || lowerInput.includes('맑')) {
      return { content: (t as any).weather || (language === 'ko' ? '날씨 얘기네요! 오늘 날씨가 어떤가요?' : 'Weather talk! How\'s the weather today?') }
    }

    // 일반적인 일상 대화 (짧은 응답)
    if (lowerInput.length < 20 && !lowerInput.includes('?') && !lowerInput.includes('？')) {
      const casualResponses = {
        ko: ['그렇군요! 더 이야기해주세요.', '오, 정말요?', '흥미롭네요!', '그래요?', '좋아요!'],
        en: ['I see! Tell me more.', 'Oh really?', 'Interesting!', 'Is that so?', 'Nice!'],
        ja: ['そうですか！もっと教えてください。', '本当ですか？', '面白いですね！', 'そうなんですか？', 'いいですね！'],
        zh: ['这样啊！多告诉我一些。', '真的吗？', '有趣！', '是这样吗？', '很好！'],
        th: ['เข้าใจแล้ว! บอกเพิ่มเติมได้เลย', 'จริงเหรอคะ?', 'น่าสนใจนะคะ!', 'อย่างนั้นเหรอคะ?', 'ดีค่ะ!'],
        vi: ['Vậy à! Kể thêm cho tôi nghe đi.', 'Thật sao?', 'Thú vị đấy!', 'Vậy à?', 'Tốt!'],
        ms: ['Begitu! Ceritakan lagi.', 'Betul ke?', 'Menarik!', 'Begitu ke?', 'Bagus!'],
        ru: ['Понятно! Расскажи больше.', 'Правда?', 'Интересно!', 'Так?', 'Хорошо!']
      }
      const responses = casualResponses[language] || casualResponses.en
      return { content: responses[Math.floor(Math.random() * responses.length)] }
    }

    // 기본 응답
    return { content: t.unknown }
  }

  // 메시지 전송
  const handleSend = () => {
    if (!input.trim()) return

    // 로그인 체크 (10회 제한)
    const currentCount = messageCount + 1
    if (!user && currentCount > 10) {
      // 로그인 요구 메시지 표시
      const loginMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: t.loginRequired,
        links: [
          { text: t.loginButton, url: '/sign-in' }
        ],
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, loginMessage])
      saveMessage(loginMessage)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    saveMessage(userMessage)
    
    // 메시지 카운트 증가
    const newCount = currentCount
    setMessageCount(newCount)
    localStorage.setItem('aiworkground_chat_message_count', newCount.toString())
    
    setInput('')
    setIsTyping(true)

    // 응답 생성 (시뮬레이션) - 이전 메시지 맥락 전달
    setTimeout(() => {
      const response = generateResponse(userMessage.content, messages)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        links: response.links,
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, assistantMessage])
      saveMessage(assistantMessage)
      setIsTyping(false)
    }, 1000)
  }

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // 남은 메시지 수 계산
  const remainingMessages = user ? Infinity : Math.max(0, 10 - messageCount)
  const showRemainingCount = !user && remainingMessages > 0 && remainingMessages <= 10

  // 챗봇이 숨겨진 경우 아무것도 렌더링하지 않음
  if (isHidden) {
    return null
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:scale-110 transition-all flex items-center justify-center relative"
      >
        <MessageCircle className="w-6 h-6" />
        {showRemainingCount && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {remainingMessages}
          </span>
        )}
      </button>
    )
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group">
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:scale-110 transition-all flex flex-col items-center justify-center gap-1">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              {showRemainingCount && (
                <span className="text-xs font-bold bg-red-500 rounded-full px-1.5 py-0.5">
                  {remainingMessages}
                </span>
              )}
            </div>
          </button>
          
          {/* X 버튼 - 챗봇 숨기기 */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsHidden(true)
            }}
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
            title={t.close}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        
        {/* 친근한 메시지 표시 - 모바일에서는 숨김 */}
        <div className="hidden sm:block absolute right-20 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap border border-gray-700 animate-fadeIn">
          <p className="text-sm font-medium">{t.initialGreeting || t.welcome}</p>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-800 rotate-45 border-r border-b border-gray-700"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* 배경 오버레이 - 클릭 시 닫기 */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
        onClick={() => {
          setIsOpen(false)
          setIsHidden(true)
        }}
      />
      
      {/* 챗봇 창 */}
      <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:w-96 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col max-h-[600px] mx-4 sm:mx-0 pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-sm sm:text-base">AIWorkGround</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-all"
            title={t.minimize}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsOpen(false)
              setIsHidden(true)
            }}
            className="p-2 rounded-lg hover:bg-red-500/30 text-white transition-all border border-white/20 hover:border-red-400 hover:scale-110"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-900/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.links && message.links.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-blue-300 hover:text-blue-200 underline flex items-center gap-1"
                    >
                      {link.text}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-gray-700 bg-gray-800">
        {showRemainingCount && (
          <div className="mb-2 text-xs text-gray-400 text-center">
            {t.remainingMessages.replace('{count}', remainingMessages.toString())}
          </div>
        )}
        {!user && messageCount >= 10 && (
          <div className="mb-2 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-xs text-yellow-400 text-center">
            {t.loginRequired}
          </div>
        )}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            disabled={!user && messageCount >= 10}
            className="flex-1 bg-gray-700 text-white rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || (!user && messageCount >= 10)}
            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {!user && messageCount >= 10 ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        {!user && messageCount >= 10 && (
          <button
            onClick={() => router.push('/sign-in')}
            className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Lock className="w-4 h-4" />
            {t.loginButton}
          </button>
        )}
      </div>
      </div>
    </div>
  )
}

