# 🎪 AIWorkground

> Your AI Playground for Real Work

[![Live Demo](https://img.shields.io/badge/demo-aiworkground.com-blue?style=for-the-badge)](https://aiworkground.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com)

## 🚀 Live Demo

**https://aiworkground.com**

## ✨ Features

### 🎯 3-in-1 AI Platform

- **⚡ Marketing AI**: 콘텐츠를 1분 만에 생성하고 자동화
- **🎨 Design AI**: 디자인을 30초 만에 완성하고 제안받기
- **💻 Developer AI**: 코드 리뷰와 문서화를 즉시 처리

### 📊 Key Metrics

- 🚀 **300%** 생산성 향상
- ⚡ **1분** 만에 콘텐츠 생성
- 🎨 **30초** 만에 디자인 완성

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.35
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI

### Backend
- **API**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **Payments**: Stripe

### Integrations
- 🎨 Figma Plugin
- 💻 GitHub App
- 💬 Slack Bot
- 🤖 MCP Servers (Marketing, Design, Developer)

### Deployment
- **Hosting**: Vercel
- **Domain**: aiworkground.com (Gabia)
- **CDN**: Global Edge Network
- **SSL**: Automatic HTTPS

## 📦 Installation

\\\ash
# Clone repository
git clone https://github.com/wishory-lab/aiworkground.git
cd aiworkground

# Install dependencies
npm install --legacy-peer-deps

# Setup environment variables
cp .env.example .env
# Edit .env with your keys

# Run development server
npm run dev

# Open http://localhost:3000
\\\

## 🏗️ Build & Deploy

\\\ash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel --prod
\\\

## 📁 Project Structure

\\\
aiworkground/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── dashboard/         # Dashboard
│   ├── features/          # Features page
│   ├── pricing/           # Pricing page
│   └── layout.tsx         # Root layout
├── backend/               # FastAPI backend
├── components/            # React components
├── database/              # Database schema
├── figma-plugin/          # Figma plugin
├── github-app/            # GitHub App
├── mcp-servers/           # MCP servers
│   ├── marketing/         # Marketing AI
│   ├── design/            # Design AI
│   └── developer/         # Developer AI
├── public/                # Static assets
├── scripts/               # Utility scripts
└── slack-bot/             # Slack Bot

\\\

## 🎨 Design System

### Colors
- **Primary**: #2563eb (Blue) → #7c3aed (Purple)
- **Secondary**: #f97316 (Orange)
- **Accent**: #ec4899 (Pink)

### Typography
- **Font**: Inter (sans-serif)
- **Headings**: Bold, tracking-tight
- **Body**: Regular, line-height 1.6

## 🌐 Pages

- **Homepage** (/): Landing page with features
- **Dashboard** (/dashboard): User dashboard with stats
- **Features** (/features): Detailed feature showcase
- **Pricing** (/pricing): Pricing plans (Free, Pro, Enterprise)

## 📊 Performance

- **First Load JS**: ~100KB
- **Build Time**: ~51s
- **Lighthouse Score**: 95+
- **Core Web Vitals**: ✅ All Green

## 🔧 Environment Variables

\\\env
# Next.js
NEXT_PUBLIC_SITE_URL=https://aiworkground.com

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# AI APIs
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
\\\

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\git checkout -b feature/AmazingFeature\)
3. Commit your changes (\git commit -m 'Add some AmazingFeature'\)
4. Push to the branch (\git push origin feature/AmazingFeature\)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**Wishory Lab**

- Website: https://aiworkground.com
- GitHub: [@wishory-lab](https://github.com/wishory-lab)
- Email: wishory@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- Tailwind CSS for beautiful styling
- Lucide for gorgeous icons

---

**Made with ❤️ by Wishory Lab** 🎪

⭐ Star us on GitHub if you like this project!
