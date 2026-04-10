'use client';

import { useLanguage } from '@/contexts/language-context';

export default function Welcome() {
  const { t } = useLanguage();

  return (
    <section id="welcome" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto content-box text-center">
          <h2 className="mb-8">{t('welcome.title')}</h2>
          <p className="text-base sm:text-lg leading-relaxed">{t('welcome.text')}</p>
        </div>
      </div>
    </section>
  );
}
