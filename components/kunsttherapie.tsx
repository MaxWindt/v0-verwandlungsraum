'use client';

import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import OptimizedImage from './ui/optimized-image';

export default function Kunsttherapie() {
  const { t } = useLanguage();

  return (
    <section id="kunsttherapie" className="py-0">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto content-box my-px py-0">
          <div className="mb-12 sm:mb-20">
            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed">
              <div className="mb-8 sm:mb-12">
                <h4 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center">
                  {t('kunsttherapie.howItWorks')}
                </h4>
                <p className="mb-4 text-center">
                  {t('kunsttherapie.howItWorksIntro')}
                </p>
                <ul className="space-y-3 max-w-3xl mx-auto"></ul>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="rounded-2xl shadow-lg max-w-2xl w-full sm:w-10/12 md:w-8/12 lg:w-5/12 overflow-hidden">
                <OptimizedImage
                  src="/images/POM_header.jpg"
                  alt="Personenorientiertes Malen - Kunsttherapie"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-6">
                {t('kunsttherapie.pomTitle')}
              </h3>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-card/80 rounded-2xl"></div>
              <div className="relative z-10 my-0 p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="mb-4 text-base sm:text-lg">
                  <p className="mb-4">{t('kunsttherapie.whyMethodIntro')}</p>
                </div>
                <div className="text-base sm:text-lg">
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('kunsttherapie.methodDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
