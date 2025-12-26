import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIWorkground - Your AI Playground for Real Work',
  description: '마케팅, 디자인, 개발을 위한 3-in-1 AI 생산성 플랫폼',
  keywords: ['AI', 'Productivity', 'Marketing', 'Design', 'Development', 'Automation'],
  authors: [{ name: 'AIWorkground Team' }],
  metadataBase: new URL('https://aiworkground.com'),
  openGraph: {
    title: 'AIWorkground - Your AI Playground for Real Work',
    description: '마케팅, 디자인, 개발을 위한 3-in-1 AI 생산성 플랫폼',
    url: 'https://aiworkground.com',
    siteName: 'AIWorkground',
    images: ['/og-image.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
