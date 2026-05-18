import Header from '@/components/header';
import Hero from '@/components/hero';
import ServicesServer from '@/components/services-server';
import SessionServer from '@/components/session-server';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServicesServer />
      <SessionServer />
      <Contact />
      <Footer />
    </main>
  );
}
