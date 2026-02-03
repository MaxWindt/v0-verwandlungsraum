'use client';

import { useLanguage } from '@/contexts/language-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';

interface Offer {
  id: number;
  title: string;
  shortDescription: string;
  image?: string;
  hidden?: boolean;
  details?: {
    location?: string;
    participants?: string;
    duration?: string;
    nextDate?: string;
  };
}

const offers: Offer[] = [
  {
    id: 1,
    title: '1:1 Einzelsitzung',
    shortDescription:
      'Gemeinsam schauen wir, was dein Anliegen ist — individueller kunsttherapeutischer Raum.',
    image: '/images/design-mode/photo_52512509862091k84565_y.jpg',
    details: {
      location: 'Thinkfarm Eberswalde, Eisenbahnstr. 92/93, 16225 Eberswalde',
      duration: '60 oder 90 Minuten',
    },
  },
  {
    id: 2,
    title: 'Im Fluss sein – Monatliche Gruppe',
    shortDescription:
      'Monatliche Gruppe für kreativen Ausdruck und achtsames Miteinander (max. 7 Personen).',
    image: '/images/5348175586192460911.jpg',
    hidden: true, // ausgeblendet
    details: {
      location: 'Verwandlungsraum, Eberswalde',
      participants: 'max. 7 Personen',
      duration: '90–120 Minuten',
    },
  },
  {
    id: 3,
    title: 'Klang & Farbe – Klangreise mit intuitivem Malen',
    shortDescription:
      'Klangschalen führen dich in tiefe Entspannung; aus dieser inneren Ruhe entsteht dein intuitives Bild.',
    image: '/images/design-mode/photo_5251250986209184578_y.jpg',
  },
  {
    id: 4,
    title: 'Atmen und Malen',
    shortDescription:
      'Workshop für Klarheit und Vision: Atemarbeit, intuitives Malen, achtsamer Raum.',
    image: '/images/df3a897caf547c3f103abfe1c75c7689.jpg',
  },
  {
    id: 5,
    title: 'Info-Workshop: Was ist Kunsttherapie?',
    shortDescription:
      "Ein praxisnaher Abend, der zeigt, wie Kunsttherapie wirkt – mit kleiner praktischer Übung.",
    image: '/images/5348175586192460915.jpg',
  },
];

export default function Services(): JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-0">
      <div className="container mx-auto">
        <div className="max-w-6xl content-box my-0 mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4">Willkommen</h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mt-4 font-serif text-left">
              {t('services.description')}
              <br />
              <br />
              {t('services.description2')}
            </p>
          </div>

          <div className="mb-8 mt-8 sm:mt-12">
            <h2 className="mb-6 text-center">{t('services.title')}</h2>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers
                .filter((offer) => !offer.hidden)
                .map((offer) => (
                  <div key={offer.id} className="card flex flex-col h-full">
                    <div className="mb-4 rounded-lg overflow-hidden h-48">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                      {offer.title}
                    </h4>

                    <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                      {offer.shortDescription}
                    </p>

                    {offer.id === 3 ? (
                      // Klang & Farbe — nur Embed + Link + Attribution
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full mt-auto bg-transparent">
                            Details anzeigen
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl mb-4">
                              {offer.title}
                            </DialogTitle>
                          </DialogHeader>

                          <div
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: 0,
                              paddingTop: '141.4286%',
                              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                              marginTop: '1.6em',
                              marginBottom: '0.9em',
                              overflow: 'hidden',
                              borderRadius: '8px',
                              willChange: 'transform',
                            }}
                          >
                            <iframe
                              loading="lazy"
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                border: 'none',
                                padding: 0,
                                margin: 0,
                              }}
                              src="https://www.canva.com/design/DAHATjF4a2M/JYJnL8t36o_pqPDd-0c46g/view?embed"
                              allowFullScreen
                              allow="fullscreen"
                              title="Klang & Farbe Embed"
                            />
                          </div>



                          <div className="pt-4">
                            <DialogClose asChild>
                              <Button className="w-full">Schließen</Button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : offer.id === 4 ? (
                      // Atmen und Malen — nur Embed, keine Links/Attribution
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full mt-auto bg-transparent">
                            Details anzeigen
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl mb-4">
                              {offer.title}
                            </DialogTitle>
                          </DialogHeader>

                          <div
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: 0,
                              paddingTop: '141.4286%',
                              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                              marginTop: '1.6em',
                              marginBottom: '0.9em',
                              overflow: 'hidden',
                              borderRadius: '8px',
                              willChange: 'transform',
                            }}
                          >
                            <iframe
                              loading="lazy"
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                border: 'none',
                                padding: 0,
                                margin: 0,
                              }}
                              src="https://www.canva.com/design/DAHATnYCdVo/0wnTlpVzmpPiZom1GnqNNg/view?embed"
                              allowFullScreen
                              allow="fullscreen"
                              title="Atmen und Malen Embed"
                            />
                          </div>

                          <div className="pt-4">
                            <DialogClose asChild>
                              <Button className="w-full">Schließen</Button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      // Generic dialog for other offers with concise info + contact CTA
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full mt-auto bg-transparent">
                            Details anzeigen
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl mb-4">
                              {offer.title}
                            </DialogTitle>
                          </DialogHeader>

                          <div className="space-y-4">
                            {offer.details?.location && (
                              <div className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                                <div>
                                  <p className="font-semibold text-sm">Ort</p>
                                  <p className="text-sm">{offer.details.location}</p>
                                </div>
                              </div>
                            )}

                            {offer.details?.participants && (
                              <div className="flex items-start gap-2">
                                <Users className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                                <div>
                                  <p className="font-semibold text-sm">Teilnehmende</p>
                                  <p className="text-sm">{offer.details.participants}</p>
                                </div>
                              </div>
                            )}

                            {offer.details?.duration && (
                              <div className="flex items-start gap-2">
                                <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                                <div>
                                  <p className="font-semibold text-sm">Dauer</p>
                                  <p className="text-sm">{offer.details.duration}</p>
                                </div>
                              </div>
                            )}

                            <div className="pt-4 border-t">
                              <DialogClose asChild>
                                <Button
                                  className="w-full"
                                  onClick={() => {
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                      setTimeout(() => {
                                        contactSection.scrollIntoView({
                                          behavior: 'smooth',
                                          block: 'start',
                                        });
                                      }, 10);
                                    }
                                  }}
                                >
                                  Jetzt Kontakt aufnehmen
                                </Button>
                              </DialogClose>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}