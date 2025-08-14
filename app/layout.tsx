import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
// import ParticleBackground from '@/components/ParticleBackground';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Portfolio - Dark Academia',
  description: 'A sophisticated portfolio with a dark academia aesthetic.',
  keywords: ['portfolio', 'developer', 'designer', 'dark academia', 'elegant'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Portfolio - Dark Academia',
    description: 'A sophisticated portfolio with a dark academia aesthetic.',
    url: 'https://your-portfolio-url.com',
    siteName: 'Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-academia-gradient text-text font-sans relative">
        {/* <ParticleBackground /> */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <SmoothScroll />
          {children}
        </div>
      </body>
    </html>
  );
}
