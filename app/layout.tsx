import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';

import { LanguageProvider } from '@/contexts/language-context';
import CookieBanner from '@/components/cookie-banner';
import { SanityLive } from '@/sanity/lib/live';

import { Forum, Montserrat } from 'next/font/google';

const forum = Forum({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-forum',
  weight: ['400'],
  fallback: ['Georgia', 'serif']
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
  fallback: ['Arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: 'Verwandlungsraum | Kunsttherapie',
  description:
    'Kunsttherapie dein Raum, indem transformation und tiefe Prozesse stattfindne können.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' }
    ]
  }};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${forum.variable} ${montserrat.variable}`}>
      <body>
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
        <Script src="https://js.hcaptcha.com/1/api.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
