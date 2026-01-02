// components/AIWorkGroundLogo.tsx - 수정된 브랜드명 적용
'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  theme?: 'light' | 'dark' | 'gradient';
}

export default function AIWorkGroundLogo({ 
  size = 'md', 
  variant = 'full', 
  theme = 'gradient' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-28 h-6',
    md: 'w-36 h-8',
    lg: 'w-52 h-12',
    xl: 'w-72 h-16'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // 로고 아이콘 (뉴럴 네트워크 패턴)
  const LogoIcon = () => (
    <div className={`${iconSizes[size]} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* 외부 원형 */}
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="url(#gradient1)" 
          strokeWidth="3"
          className="animate-pulse"
        />
        
        {/* 중앙 노드들 */}
        <circle cx="30" cy="30" r="4" fill="url(#gradient1)" />
        <circle cx="70" cy="30" r="4" fill="url(#gradient1)" />
        <circle cx="50" cy="50" r="6" fill="url(#gradient2)" />
        <circle cx="30" cy="70" r="4" fill="url(#gradient1)" />
        <circle cx="70" cy="70" r="4" fill="url(#gradient1)" />
        
        {/* 연결선 */}
        <line x1="30" y1="30" x2="50" y2="50" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
        <line x1="70" y1="30" x2="50" y2="50" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
        <line x1="50" y1="50" x2="30" y2="70" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
        <line x1="50" y1="50" x2="70" y2="70" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
        
        {/* 그라데이션 정의 */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#2563EB" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );

  // 텍스트 로고 - AIWorkGround
  const LogoText = () => {
    const textColors = {
      light: 'text-gray-800',
      dark: 'text-white',
      gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
    };

    const textSizes = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-3xl',
      xl: 'text-5xl'
    };

    return (
      <div className={`font-black ${textSizes[size]} ${textColors[theme]} tracking-tight`}>
        AI<span className="text-blue-500">Work</span><span className="text-purple-500">G</span>round
      </div>
    );
  };

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return <LogoText />;
  }

  return (
    <div className={`${sizeClasses[size]} flex items-center gap-3`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
}

// 브랜드명 상수
export const BRAND_NAME = "AIWorkGround";
export const BRAND_TAGLINE = {
  en: "AI-Powered Creative WorkGround",
  ko: "AI 기반 창의적 작업공간",
  ja: "AI搭載クリエイティブワークグラウンド", 
  zh: "AI驱动的创意工作场"
};