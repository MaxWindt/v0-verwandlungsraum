'use client';

import Image from 'next/image';
import OptimizedImage from './ui/optimized-image';
import { useLanguage } from '@/contexts/language-context';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 flex flex-col justify-center items-center relative overflow-hidden bg-white text-black"
    >
      <div className="container mx-auto px-4 sm:px-6 py-16 flex justify-center items-center relative z-20">
        <div className="text-center relative max-w-4xl w-full">
          {/* Centered logo, title and subtitle */}
          <div className="flex flex-col items-center gap-4">
            <OptimizedImage
              src="/images/Visitenkarte Logo.png"
              alt="Verwandlungsraum Logo"
              width={480}
              height={360}
              className="h-auto max-h-[8rem] sm:max-h-[10rem] md:max-h-[12rem] w-auto"
              style={{ objectFit: 'contain' }}
              priority
            />

            <h1 className="text-4xl sm:text-6xl leading-tight font-light">
              {t('hero.title')}
            </h1>

            <h2 className="max-w-xl mx-auto text-lg sm:text-2xl">
              {t('hero.subtitle')}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
