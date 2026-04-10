'use client';

import { useEffect } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Welcome from '@/components/welcome';
import About from '@/components/about';
import Services from '@/components/services';
import Session from '@/components/session';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Welcome />
      <About />
      <Services />
      <Session />
      <Contact />
      <Footer />
    </main>
  );
}
