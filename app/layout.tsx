import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { hindSiliguri } from '@/lib/fonts';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import FacebookPixelProvider from '@/components/FacebookPixelProvider';
import ClarityProvider from '@/components/ClarityProvider';
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Bangladesh's First AI Automation Course | Vibe Academy",
  description: 'Learn new skill using n8n AI tools. Purchase the course to get started.',
  icons: {
    icon: '/f.png',
  },
  openGraph: {
    title: "Bangladesh's First AI Automation Course | Vibe Academy",
    description: 'Learn new skill using n8n AI tools. Purchase the course to get started.',
    images: ['/f.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bangladesh's First AI Automation Course | Vibe Academy",
    description: 'Learn new skill using n8n AI tools. Purchase the course to get started.',
    images: ['/f.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${inter.className} ${hindSiliguri.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          <FacebookPixelProvider />
          <ClarityProvider />
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
