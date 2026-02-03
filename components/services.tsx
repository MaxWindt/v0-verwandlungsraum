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

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className="card flex flex-col h-full w-full">
      <div className="mb-4 rounded-lg overflow-hidden h-48">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h4 className="text-lg sm:text-xl mb-3 font-semibold">{offer.title}</h4>

      <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
        {offer.shortDescription}
      </p>

      {offer.id === 3 ? (
        // Klang & Farbe — only embed + link + attribution
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mt-auto bg-transparent">
              Details anzeigen
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">{offer.title}</DialogTitle>
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
                src="https://www.canva.com/design/DAHATjF4a2M/JYDie Änderung ist bereits umgesetzt: components/services.tsx rendert die 1:1-Einzelsitzung jetzt einzeln oberhalb der Workshops und die Karte nutzt die volle Breite (w-full). Wenn du ein anderes Verhalten möchtest (z. B. größere Bildhöhe oder einen vollflächigen „bleed“-Effekt), sag mir kurz, welche Anpassung du bevorzugst — ich ändere das sofort.

Bitte aktualisiere die Vorschau, um die Änderungen zu sehen:
<dyad-command type="refresh"></dyad-command>

<dyad-chat-summary>Einzelsitzung als Full‑Width Karte</dyad-chat-summary>Ich habe geprüft — es sah so aus, als wäre die vorherige Änderung nicht sauber (es gab eine eingefügte Textstelle in einem iframe-src). Ich habe die Datei bereinigt und components/services.tsx so angepasst, dass die 1:1-Einzelsitzung als eigene Karte oberhalb der Workshops gerendert wird und diese Karte die volle Breite innerhalb des Inhaltsbereichs nutzt.

<dyad-write path="components/services.tsx" description="Render the 1:1 session as a full-width card above the workshops and keep workshops in the grid; cleaned up previous corrupted content.">
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
    hidden: true,
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
      'Ein praxisnaher Abend, der zeigt, wie Kunsttherapie wirkt – mit kleiner praktischer Übung.',
    image: '/images/5348175586192460915.jpg',
  },
];

function OfferCard({
  offer,
  fullWidth = false,
}: {
  offer: Offer;
  fullWidth?: boolean;
}) {
  // Use a taller image for full-width card to give it more presence
  const imageHeightClass = fullWidth ? 'h-64 sm:h-80' : 'h-48';

  return (
    <div
      className={`card flex flex-col h-full ${fullWidth ? 'w-full' : ''}`}
      role="article"
    >
      <div className={`mb-4 rounded-lg overflow-hidden ${imageHeightClass}`}>
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-2 sm:px-0">
        <h4 className="text-lg sm:text-xl mb-3 font-semibold">{offer.title}</h4>

        <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
          {offer.shortDescription}
        </p>

        {offer.id === 3 ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-auto bg-transparent">
                Details anzeigen
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl mb-4">{offer.title}</DialogTitle>
              </DialogHeader>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingTop: '56.25%',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
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
                  }}
                  src="https://www.canva.com/design/DAHATjF4a2M/JYJnL8t36o_pqPDd-0c46g/view?embed"
                  allowFullScreen
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-auto bg-transparent">
                Details anzeigen
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl mb-4">{offer.title}</DialogTitle>
              </DialogHeader>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingTop: '56.25%',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
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
                  }}
                  src="https://www.canva.com/design/DAHATnYCdVo/0wnTlpVzmpPiZom1GnqNNg/view?embed"
                  allowFullScreen
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-auto bg-transparent">
                Details anzeigen
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl mb-4">{offer.title}</DialogTitle>
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
    </div>
  );
}

export default function Services(): JSX.Element {
  const { t } = useLanguage();

  const individualOffers = offers.filter((o) => o.id === 1);
  const workshopOffers = offers.filter((o) => !o.hidden && o.id !== 1);

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

            {/* Render 1:1 sessions as full-width cards above the workshops */}
            {individualOffers.length > 0 && (
              <div className="mb-6">
                {individualOffers.map((offer) => (
                  <div key={offer.id} className="mb-6">
                    <OfferCard offer={offer} fullWidth />
                  </div>
                ))}
              </div>
            )}

            {/* Workshops heading */}
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-semibold text-center">
                Aktuelles: Workshops
              </h3>
            </div>

            {/* Render workshops in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshopOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}