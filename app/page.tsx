import Header from '@/components/header';
import Hero from '@/components/hero';
import ServicesServer from '@/components/services-server';
import Session from '@/components/session';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServicesServer />
      <Session />
      <Contact />
      <Footer />
    </main>
  );
}
