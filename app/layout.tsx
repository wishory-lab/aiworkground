import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIWorkground - Where AI Meets Creativity",
  description: "Professional AI-powered content generation platform supporting multiple languages and advanced AI capabilities.",
  keywords: "AI, content generation, GPT-4, multilingual, blog writing, marketing copy, code generation",
  authors: [{ name: "AIWorkground Team" }],
  openGraph: {
    title: "AIWorkground - Where AI Meets Creativity",
    description: "Professional AI-powered content generation platform",
    url: "https://aiworkground.com",
    siteName: "AIWorkground",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIWorkground - Where AI Meets Creativity",
    description: "Professional AI-powered content generation platform",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // Check if Clerk key is valid (not placeholder)
  const isClerkKeyValid = clerkPublishableKey && 
    !clerkPublishableKey.includes('your_clerk') && 
    !clerkPublishableKey.includes('placeholder') &&
    (clerkPublishableKey.startsWith('pk_test_') || clerkPublishableKey.startsWith('pk_live_'));

  const bodyContent = (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen`}>
        {!isClerkKeyValid && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p className="font-bold">Clerk Configuration Required</p>
            <p>Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local file.</p>
            <p className="text-sm mt-2">Get your key at: <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer" className="underline">https://dashboard.clerk.com</a></p>
          </div>
        )}
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );

  // Only wrap with ClerkProvider if key is valid
  if (isClerkKeyValid) {
    return <ClerkProvider publishableKey={clerkPublishableKey}>{bodyContent}</ClerkProvider>;
  }

  // Return without ClerkProvider if key is invalid
  return bodyContent;
}