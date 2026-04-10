'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Footer() {
  const { t } = useLanguage();
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <footer className="py-12 sm:py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6">
                {t('footer.title')}
              </h3>
              <p className="leading-relaxed text-sm sm:text-base">
                {t('footer.subtitle')}
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl mb-4 sm:mb-6">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li>
                  <a
                    href="#welcome"
                    className="hover:opacity-75 transition-opacity"
                  >
                    {t('footer.start')}
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:opacity-75 transition-opacity"
                  >
                    {t('footer.services')}
                  </a>
                </li>
                <li>
                  <a
                    href="#session"
                    className="hover:opacity-75 transition-opacity"
                  >
                    {t('footer.sessionInfo')}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:opacity-75 transition-opacity"
                  >
                    {t('footer.contact')}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => { setIframeLoaded(false); setNewsletterOpen(true); }}
                    className="hover:opacity-75 transition-opacity bg-transparent border-0 text-left cursor-pointer p-0"
                  >
                    {t('footer.newsletter')}
                  </button>
                </li>
                <li>
                  <a
                    href="/datenschutz"
                    className="hover:opacity-75 transition-opacity"
                  >
                    {t('footer.privacy')}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl mb-4 sm:mb-6">
                {t('footer.imprintTitle')}
              </h3>
              <div className="space-y-1 text-sm sm:text-base">
                <p>{t('footer.name')}</p>
                <p>{t('footer.profession')}</p>
                <p>{t('footer.address1')}</p>
                <p>{t('footer.address2')}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-primary/50 text-center">
            <p className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg flex-wrap">
              {t('footer.copyright')}{' '}
              <Heart size={18} className="text-primary flex-shrink-0" />{' '}
              {t('footer.copyrightEnd').replace(
                '{year}',
                new Date().getFullYear().toString()
              )}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle>{t('footer.newsletter')}</DialogTitle>
          </DialogHeader>
          <div className="relative px-6 pb-6" style={{ height: 520 }}>
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin" />
              </div>
            )}
            <iframe
              src="https://newsletter.verwandlungsraum.de/subscription/form"
              title="Newsletter Anmeldung"
              className={`w-full h-full border-0 transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
