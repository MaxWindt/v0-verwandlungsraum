'use client';

import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Image from 'next/image';
import OptimizedImage from './ui/optimized-image';
import type { StaticImageData } from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import LanguageSwitcher from './language-switcher';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Throttle scroll handling with requestAnimationFrame and use a passive listener
    let ticking = false;

    const handleScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setScrolled((prev) => {
            const next = y > 50;
            return prev === next ? prev : next;
          });
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: t('navigation.start'), to: 'welcome' },
    { name: t('navigation.services'), to: 'services' },
    { name: t('navigation.sessionInfo'), to: 'session' },
    { name: t('navigation.contact'), to: 'contact' }
  ];

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-cover bg-center bg-no-repeat ${
        scrolled ? 'bg-white/90 border-b border-border' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-6 flex justify-between leading-7 tracking-widest items-center text-base w-full">
        <ScrollLink
          to="hero"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="flex-1 min-w-0 flex items-center cursor-pointer"
        >
          <OptimizedImage
            src="/images/Visitenkarte Logo.png"
            alt="Verwandlungsraum Logo"
            width={120}
            height={48}
            className="h-auto max-h-[2.2rem] sm:max-h-[2.6rem] md:max-h-[3rem] w-auto mr-3 drop-shadow-lg"
            style={{ objectFit: 'contain' }}
          />
          <div className="flex flex-col">
            <div
              className="text-xl sm:text-2xl tracking-tight drop-shadow-lg font-extralight"
              style={{ color: '#f46000', fontFamily: 'Montserrat, sans-serif' }}
            >
              Rebecca Schwindt
            </div>
            <div
              className="font-medium tracking-wide uppercase text-xs sm:text-sm drop-shadow-md"
              style={{ color: '#f46000', fontFamily: 'Montserrat, sans-serif' }}
            >
              Kunsttherapie Eberswalde
            </div>
          </div>
        </ScrollLink>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex space-x-8 items-center flex-shrink-0">
          {menuItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="font-medium hover:text-primary cursor-pointer transition-colors duration-300 relative group transform hover:scale-105 font-serif text-right drop-shadow-md  whitespace-nowrap"
              style={{ color: '#f46000', fontFamily: 'Montserrat, sans-serif' }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full rounded-full drop-shadow-sm"></span>
            </ScrollLink>
          ))}
          <button
            onClick={() => { setIframeLoaded(false); setNewsletterOpen(true); }}
            className="font-medium cursor-pointer transition-colors duration-300 transform hover:scale-105 font-serif whitespace-nowrap px-3 py-1 rounded-full border border-current drop-shadow-md hover:opacity-80 bg-transparent"
            style={{ color: '#f46000', fontFamily: 'Montserrat, sans-serif' }}
          >
            {t('navigation.newsletter')}
          </button>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button and Language Switcher */}
        <div className="xl:hidden flex items-center gap-3 flex-shrink-0 ml-4">
          <LanguageSwitcher />
          <button
            className="text-foreground hover:text-primary transition-colors drop-shadow-md"
            onClick={toggleMenu}
            aria-label={
              isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')
            }
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="xl:hidden bg-card/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2 cursor-pointer transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </ScrollLink>
            ))}
            <button
              onClick={() => { setIsMenuOpen(false); setIframeLoaded(false); setNewsletterOpen(true); }}
              className="text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors bg-transparent border-0 text-left"
            >
              {t('navigation.newsletter')}
            </button>
          </div>
        </div>
      )}
    </header>

    <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{t('navigation.newsletter')}</DialogTitle>
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
    </>
  );
}
