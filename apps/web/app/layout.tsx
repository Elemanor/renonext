import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
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
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-white font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
