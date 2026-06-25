import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import { ToastProvider } from '@/components/common/Toast';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'KORK InventRex | Patent Services, Patent Drawings & IP Filing Support',
    template: '%s | KORK InventRex',
  },
  description:
    'KORK InventRex helps inventors protect their ideas with patent illustrations, patent search coordination, filing support, IP portfolio management, and access to trusted patent professionals.',
  keywords: [
    'Patent Services',
    'Patent Filing Support',
    'Patent Illustrations',
    'Patent Drawings',
    'Intellectual Property Services',
    'USPTO Patent Drawings',
    'Patent Search Services',
    'Patent Application Support',
    'Inventor Services',
    'IP Portfolio Management',
    'Utility Patent Drawings',
    'Design Patent Drawings',
    'Patent Attorney Network',
    'Patent Prosecution Support',
    'Invention Documentation',
    'Patent Readiness Assessment',
    'Trademark Illustration Services',
    'Innovation Protection Services',
    'patent services',
    'patent filing support',
    'patent illustrations',
    'patent drawings',
    'intellectual property services',
    'inventor services',
    'USPTO patent drawings',
    'patent search',
    'patent application support',
    'IP management',
    'innovation protection',
    'trademark illustrations',
  ],
  authors: [{ name: 'KORK InventRex' }],
  creator: 'KORK InventRex',
  publisher: 'KORK InventRex',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.korkinventrex.tech/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.korkinventrex.tech/',
    siteName: 'KORK InventRex',
    title: 'KORK InventRex | From Idea to Intellectual Property™',
    description:
      'Patent illustrations, filing support, inventor services, and intellectual property solutions designed to help innovators protect their ideas.',
    images: [
      {
        url: 'https://www.korkinventrex.tech/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KORK InventRex | From Idea to Intellectual Property™',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KORK InventRex | Patent Services & Intellectual Property Support',
    description:
      'Transform your invention into protected intellectual property with patent drawings, filing support, and expert guidance.',
    images: ['https://www.korkinventrex.tech/twitter-image.jpg'],
  },
  metadataBase: new URL('https://www.korkinventrex.tech'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/new_fevi.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="language" content="English" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "KORK InventRex",
              "url": "https://www.korkinventrex.tech",
              "logo": "https://www.korkinventrex.tech/logo.png",
              "description": "Patent illustrations, patent filing support, inventor services, intellectual property management and innovation protection solutions.",
              "telephone": "+1-330-353-9850",
              "email": "contact@korkinventrex.com",
              "serviceType": [
                "Patent Illustrations",
                "Patent Filing Support",
                "Patent Search Services",
                "Inventor Services",
                "IP Portfolio Management"
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />

          <GoogleAnalytics />
        </ToastProvider>
      </body>
    </html>
  );
}
