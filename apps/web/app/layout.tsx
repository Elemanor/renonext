import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/providers';
import './globals.css';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://renonext.com'),
  title: {
    default: 'RenoNext — Your renovation shouldn\'t feel like a gamble',
    template: '%s | RenoNext',
  },
  description:
    'Bank-held escrow. GPS-verified proof. Fair market pricing. From permit to final inspection — protected by a system, not a handshake.',
  keywords: [
    'renovation Toronto',
    'construction escrow',
    'verified contractors',
    'home renovation',
    'contractor verification',
    'renovation payment protection',
    'HouseFax',
    'renovation cost check',
  ],
  openGraph: {
    title: 'RenoNext — Your renovation shouldn\'t feel like a gamble',
    description:
      'Bank-held escrow. GPS-verified proof. Fair market pricing. Protected by a system, not a handshake.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://renonext.com',
    siteName: 'RenoNext',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'RenoNext — Your renovation shouldn\'t feel like a gamble',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RenoNext — Your renovation shouldn\'t feel like a gamble',
    description:
      'Bank-held escrow. GPS-verified proof. Fair market pricing. Protected by a system, not a handshake.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={workSans.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-50R3L19GZV"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-50R3L19GZV');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-[#f6f8f8] font-body antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
