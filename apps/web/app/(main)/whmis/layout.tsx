import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free WHMIS 2015 Training Course | RenoNext',
  description:
    'Complete your WHMIS 2015 training online for free. 7 learning modules, 20-question quiz, and downloadable PDF certificate. No account required.',
  keywords: [
    'WHMIS training',
    'WHMIS 2015',
    'WHMIS online course',
    'WHMIS certificate',
    'workplace hazardous materials',
    'GHS training',
    'free WHMIS training',
    'construction safety training',
  ],
};

export default function WHMISLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
