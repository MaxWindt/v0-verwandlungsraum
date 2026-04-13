'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import OptimizedImage from './ui/optimized-image';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';

function IframeWithSpinner({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin" />
        </div>
      )}
      <iframe
        loading="lazy"
        className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        src={src}
        allowFullScreen
        allow="fullscreen"
        title={title}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

interface Offer {
  id: number;
  title: string;
  shortDescription: string;
  image?: string;
  cardImage?: string;
  hidden?: boolean;
  dates?: string[];
  registrationUrl?: string;
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
    image: '/images/Einzeltherapie raum.jpg',
    cardImage: '/images/photo_2026-02-02_11-16-29.webp',
    details: {
      location: 'Thinkfarm Eberswalde, Eisenbahnstr. 92/93, 16225 Eberswalde',
      duration: '60 oder 90 Minuten'
    }
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
      duration: '90–120 Minuten'
    }
  },
  {
    id: 3,
    title: 'Klang & Farbe – Klangreise mit intuitivem Malen',
    shortDescription:
      'Klangschalen führen dich in tiefe Entspannung; aus dieser inneren Ruhe entsteht dein intuitives Bild.',
    image: 'https://github.com/user-attachments/assets/cd4c4646-3256-4d25-8fe9-02eba9d57712',
    dates: [
      'Fr, 24.04.2026 – Erde',
      'Fr, 22.05.2026 – Feuer',
      'Fr, 03.07.2026 – Luft'
    ]
  },
  {
    id: 4,
    title: 'Atmen und Malen',
    shortDescription:
      'Workshop für Klarheit und Vision: Atemarbeit, intuitives Malen, achtsamer Raum.',
    image: '/images/Atmen.png',
    hidden: true, // ausgeblendet
  },
  {
    id: 5,
    title: 'Ein Abend mit Farbe',
    shortDescription:
      'Ein geschützter Raum, in dem du zur Ruhe kommen, dich ausdrücken und neue Zugänge zu dir entdecken kannst. Kreatives Arbeiten mit Farbe kann unterstützen, innere Spannungen zu lösen und wieder mehr Leichtigkeit zu spüren.',
    image: '/images/5348175586192460915.jpg',
    dates: ['Di, 28. April 2026, 17:00–18:30 Uhr'],
    details: {
      location: 'Café des Bürgerbildungszentrum Amadeu Antonio BBZ',
    }
  }
];

function OfferCard({ offer }: { offer: Offer }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const isCenterPreview = offer.id === 3 || offer.id === 4;

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactClick = () => {
    // Close dialog then scroll after a small delay to let dialog close animation finish
    setOpen(false);
    setTimeout(scrollToContact, 450);
  };

  return (
    <div className="card flex flex-col h-full">
      <div className="mb-4 rounded-lg overflow-hidden h-52 lg:h-72 xl:h-80 flex items-center justify-center">
        <OptimizedImage
          src={offer.cardImage || offer.image || ''}
          alt={offer.title}
          width={600}
          height={360}
          className={`w-full h-full ${isCenterPreview ? 'object-contain p-2 rounded-lg' : 'object-cover rounded-lg object-top'}`}
        />
      </div>

      <h4 className="text-lg sm:text-xl mb-3 font-semibold">{offer.title}</h4>

      <p className="text-sm sm:text-base mb-3 flex-grow">
        {offer.shortDescription}
      </p>

      {/* Klang & Farbe and Ein Abend mit Farbe: show dates + mehr Details link */}
      {(offer.id === 3 || offer.id === 5) && offer.dates && offer.dates.length > 0 && (
        <div className="mb-3 text-sm">
          <p className="font-semibold mb-1">Termin{offer.dates.length > 1 ? 'e' : ''}:</p>
          {offer.dates.map((date) => (
            <p key={date}>{date}</p>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        {offer.id === 3 || offer.id === 5 ? (
      {/* Klang & Farbe / Ein Abend mit Farbe: "Anmelden" as main button, "mehr Details" as text link */}
          <div className="mt-auto space-y-2">
            <Button
              className="w-full"
              onClick={handleContactClick}
            >
              Anmelden
            </Button>
            <div className="text-center">
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors bg-transparent border-0 cursor-pointer p-0">
                  mehr Details
                </button>
              </DialogTrigger>
            </div>
          </div>
        ) : (
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mt-auto bg-transparent">
              Details anzeigen
            </Button>
          </DialogTrigger>
        )}

        {offer.id === 1 ? (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">{offer.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <OptimizedImage
                src={offer.image || ''}
                alt={offer.title}
                width={1200}
                height={720}
                className="w-full rounded-lg object-cover"
                style={{ maxHeight: 360 }}
              />

              <div className="prose max-w-none text-sm sm:text-base">
                <p>{t('session.description1')}</p>
                <p>{t('session.description2')}</p>
                <p>{t('session.description3')}</p>
                <p>{t('session.description4')}</p>
                <p>{t('session.description5')}</p>

                <p className="text-sm italic mt-4">
                  {t('session.disclaimerNote')}
                </p>
              </div>

              <div className="pt-4">
                <Button className="w-full" onClick={handleContactClick}>
                  Jetzt Kontakt aufnehmen
                </Button>
              </div>
            </div>
          </DialogContent>
        ) : offer.id === 3 ? (
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
                borderRadius: '8px'
              }}
            >
              <IframeWithSpinner
                src="https://www.canva.com/design/DAHC4blyFwk/qVyzuQCbOgBq-lduaEGEdw/view?embed"
                title="Klang & Farbe Embed"
              />
            </div>

            <div className="pt-4">
              <Button className="w-full" onClick={handleContactClick}>
                Jetzt anmelden
              </Button>
            </div>
          </DialogContent>
        ) : offer.id === 4 ? (
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
                borderRadius: '8px'
              }}
            >
              <IframeWithSpinner
                src="https://www.canva.com/design/DAHATnYCdVo/0wnTlpVzmpPiZom1GnqNNg/view?embed"
                title="Atmen und Malen Embed"
              />
            </div>

            <div className="pt-4">
              <Button className="w-full" onClick={handleContactClick}>
                Jetzt Kontakt aufnehmen
              </Button>
            </div>
          </DialogContent>
        ) : (
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

              {offer.id === 5 && (
                <div className="space-y-3 text-sm sm:text-base">
                  <p>
                    Kennst du das Gefühl, innerlich festzustecken – und nicht genau zu wissen, wie
                    du wieder in deinen Fluss kommst? An diesem Abend lade ich dich ein, über Farbe
                    und kreativen Ausdruck einen sanften Zugang zu dir selbst zu finden.
                  </p>
                  <p>Ohne Druck, ohne Bewertung – dafür mit Raum für das, was sich zeigen möchte.</p>
                  <div>
                    <p className="font-semibold">✨ Was möglich werden kann:</p>
                    <ul className="list-none mt-1 space-y-0.5 pl-1">
                      <li>– innere Spannungen wahrnehmen und kreativ ausdrücken</li>
                      <li>– Abstand zu kreisenden Gedanken gewinnen</li>
                      <li>– neue Perspektiven entdecken</li>
                      <li>– wieder mehr Leichtigkeit &amp; Lebensfreude spüren</li>
                      <li>– dich selbst auf eine intuitive Weise erleben</li>
                    </ul>
                  </div>
                  <p>
                    Die Methoden des personenzentrierten und lösungsorientierten Malens können dabei
                    unterstützen, Blockaden zu lockern und eigene Ressourcen bewusster wahrzunehmen.
                  </p>
                  <p>
                    <span className="font-semibold">Wichtig: </span>
                    Es geht nicht darum, „schön" zu malen – sondern darum, in Kontakt zu kommen:
                    mit dir, deiner Kreativität und deinem inneren Erleben.
                  </p>
                  <div>
                    <p className="font-semibold">Rahmen:</p>
                    <ul className="list-none mt-1 space-y-0.5 pl-1">
                      <li>– freies Malen &amp; achtsame Begleitung</li>
                      <li>– kurzer Einblick in meine Arbeitsweise</li>
                      <li>– Tee, Snacks &amp; eine warme, gemütliche Atmosphäre</li>
                    </ul>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Wann</p>
                      <p>Dienstag, 28. April 2026, 17:00–18:30 Uhr</p>
                      <p className="text-muted-foreground text-xs">Dauer: ca. 90 Minuten</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Ort</p>
                      <p>Café im BBZ – 1. OG</p>
                      <p>Puschkinstraße 13, Eberswalde</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 mt-0.5 text-primary flex-shrink-0 text-center font-bold">€</span>
                    <div>
                      <p className="font-semibold">Kosten</p>
                      <p>
                        Auf Spendenbasis, um Raumkosten und Materialien zu decken
                        (Spendenempfehlung 5–15 €)
                      </p>
                    </div>
                  </div>
                  <p>🎨 Keine Vorkenntnisse nötig</p>
                  <p className="italic text-xs text-muted-foreground">
                    Dieser Abend kann dir Impulse für dein Wohlbefinden geben und wird von vielen
                    Menschen als entspannend, klärend und stärkend erlebt. Er ersetzt jedoch keine
                    Therapie oder medizinische Behandlung.
                  </p>
                  <p>
                    Wenn du spürst, dass dich das ruft, freue ich mich sehr auf dich 💛 Schreib mir
                    gerne für Infos oder Anmeldung.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button className="w-full" onClick={handleContactClick}>
                  Jetzt Kontakt aufnehmen
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default function Services(): JSX.Element {
  const { t } = useLanguage();

  const individualOffers = offers.filter((o) => o.id === 1);
  const workshopOffers = offers.filter((o) => !o.hidden && o.id !== 1);

  return (
    <>
      <section id="welcome" className="py-0">
        <div className="container mx-auto">
          <div className="max-w-6xl content-box my-0 mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="mb-4">Willkommen</h2>
              <p className="text-base sm:text-lg max-w-4xl mx-auto mt-4 font-serif text-left">
                {t('about.intro')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Über mich Section */}
      <section id="about" className="py-12 sm:py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto content-box">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="mb-4">{t('about.title')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start text-base sm:text-lg">
              <div className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden hover-lift">
                <OptimizedImage
                  src="/images/ueber-mich-portrait.jpeg"
                  alt={t('about.alt')}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="space-y-4 sm:space-y-6 text-left">
                <p className="leading-relaxed">{t('about.paragraph1')}</p>
                <p className="leading-relaxed">{t('about.paragraph2')}</p>
                <p className="leading-relaxed">{t('about.paragraph3')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mb-8 mt-8 sm:mt-12">
        <h2 className="mb-6 text-center">{t('services.title')}</h2>



        {/* Render individual offers first */}
        {individualOffers.length > 0 && (
          <div className="mb-6 flex justify-center">
            <div className="w-full sm:w-3/4 md:w-2/3">
              <div className="grid grid-cols-1 gap-6">
                {individualOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workshops heading */}
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center">
            Aktuelle Workshops
          </h3>
        </div>

        {/* Render workshops (visible ones) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {workshopOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
    </>
  );
}
