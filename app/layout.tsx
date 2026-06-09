import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import { ToastProvider } from '@/components/common/Toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'KORK InventReX | Coordinated IP & Patent Services Platform',
    template: '%s | KORK InventReX',
  },
  description:
    'One platform coordinating prior art searches, patent illustrations, patent filing support, trademark services, and intellectual property professionals.',
  keywords: [
    'patent illustration',
    'patent drawing',
    'prior art search',
    'patentability evaluation',
    'trademark services',
    'patent filing coordination'
  ],
  authors: [{ name: 'KORK InventReX' }],
  creator: 'KORK InventReX',
  publisher: 'KORK InventReX',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'KORK InventReX',
    title: 'KORK InventReX | Coordinated IP & Patent Services Platform',
    description:
      'One platform coordinating prior art searches, patent illustrations, patent filing support, trademark services, and intellectual property professionals.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'KORK InventReX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KORK InventReX',
    description:
      'One platform coordinating prior art searches, patent illustrations, patent filing support, trademark services, and intellectual property professionals.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <GoogleAnalytics />
        </ToastProvider>
      </body>
    </html>
  );
}
