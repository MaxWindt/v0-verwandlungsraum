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

const COACHING_ROOM_IMAGE = 'https://github.com/user-attachments/assets/37d743e0-64c4-4316-bf93-2767af4fce2e';
const COACHING_ART_IMAGE = 'https://github.com/user-attachments/assets/404880e5-c8a2-4823-8fda-e0a1a946a4d3';

const offers: Offer[] = [
  {
    id: 1,
    title: '1:1 Einzelsitzung',
    shortDescription:
      'Gemeinsam schauen wir, was dein Anliegen ist — individueller kunsttherapeutischer Raum.',
    image: '/images/Einzeltherapie raum.jpg',
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
    title: 'Kennenlernabend – Ein Abend mit Farbe',
    shortDescription:
      'Ein Abend, an dem du mich und meine Arbeit als Kunsttherapeutin sowie die Methode des Personenorientierten Malens kennenlernen kannst.',
    image: 'https://github.com/user-attachments/assets/33b6be4b-dc9c-41b4-a8a6-b14bd2fc56c1',
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
      {offer.id === 1 ? (
        <div className="mb-4 rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 gap-2 h-64">
            <OptimizedImage
              src={offer.image || ''}
              alt={offer.title}
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
            <OptimizedImage
              src={COACHING_ROOM_IMAGE}
              alt="Coachingraum für Einzelsitzungen"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      ) : (
        <div
          className={`mb-4 rounded-lg overflow-hidden h-48 ${isCenterPreview ? 'flex items-center justify-center' : ''}`}
        >
          <OptimizedImage
            src={offer.image || ''}
            alt={offer.title}
            width={600}
            height={360}
            className={`w-full h-full ${isCenterPreview ? 'object-contain p-2 rounded-lg' : 'object-cover rounded-lg'}`}
          />
        </div>
      )}

      <h4 className="text-lg sm:text-xl mb-3 font-semibold">{offer.title}</h4>

      <p className="text-sm sm:text-base mb-3 flex-grow">
        {offer.shortDescription}
      </p>

      {/* Klang & Farbe and Kennenlernabend: show dates + mehr Details link */}
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
          /* Klang & Farbe / Kennenlernabend: "Anmelden" as main button, "mehr Details" as text link */
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
              <div className="grid grid-cols-2 gap-3">
                <OptimizedImage
                  src={offer.image || ''}
                  alt={offer.title}
                  width={600}
                  height={400}
                  className="w-full rounded-lg object-cover h-48"
                />
                <OptimizedImage
                  src={COACHING_ROOM_IMAGE}
                  alt="Coachingraum für Einzelsitzungen"
                  width={600}
                  height={400}
                  className="w-full rounded-lg object-cover h-48"
                />
              </div>
              <OptimizedImage
                src={COACHING_ART_IMAGE}
                alt="Kunstwerk aus einer Sitzung"
                width={1200}
                height={600}
                className="w-full rounded-lg object-cover"
                style={{ maxHeight: 260 }}
              />

              <div className="prose max-w-none text-sm sm:text-base">
                <p>{t('session.description1')}</p>
                <p>{t('session.description2')}</p>
                <p>
                  In unseren Sitzungen können wir konkrete Themen und Anliegen anschauen und bearbeiten.
                </p>
                <p>{t('session.description3')}</p>
                <p>{t('session.description4')}</p>
                <p>{t('session.description5')}</p>
              </div>

              {/* Calendly Mockup – später durch eingebetteten Calendly-Kalender ersetzen */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 bg-gray-50">
                <p className="text-sm font-semibold mb-1 text-gray-700">📅 Terminanfrage</p>
                <p className="text-xs text-gray-500 mb-3">Verfügbare Zeiten:</p>
                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  <p>Mo, Di, Do: 9–12 Uhr</p>
                  <p>Mi, Fr: 12–15 Uhr</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-xs text-gray-400 italic text-center min-h-[80px] flex items-center justify-center">
                  [Calendly-Kalender wird hier eingebettet]
                </div>
                <Button className="w-full mt-3" onClick={handleContactClick}>
                  Jetzt Termin anfragen
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                * {t('session.disclaimerTitle')}: {t('session.disclaimerText')}
              </p>
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
                    An diesem Abend lade ich dich ein, mich und meine Arbeit als Kunsttherapeutin
                    sowie die Methode des Personenorientierten Malens kennenzulernen. Nach einem
                    kurzen theoretischen Input und einer Erzählung über mich öffne ich einen etwa
                    30-minütigen Erfahrungsraum, in dem du selbst Farbe aufs Blatt bringen darfst
                    und Erfahrung mit der Methode sammeln kannst.
                  </p>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Wann</p>
                      <p>28. April 2026, 17:00–18:30 Uhr</p>
                      <p className="text-muted-foreground text-xs">Bitte 10 Minuten früher kommen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Wo</p>
                      <p>Café des Bürgerbildungszentrum Amadeu Antonio BBZ</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 mt-0.5 text-primary flex-shrink-0 text-center font-bold">€</span>
                    <div>
                      <p className="font-semibold">Beitrag</p>
                      <p>Spendenbasis (Spendenempfehlung 5–15 Euro für Raum- und Materialkosten)</p>
                    </div>
                  </div>
                  <p className="italic">
                    Ich freue mich sehr darauf, meine Arbeit mit euch zu teilen und einen Raum für
                    Begegnung, Erfahrung und Farbe zu öffnen.
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
              <p className="text-base sm:text-lg max-w-4xl mx-auto mt-6 font-serif text-left">
                {t('services.description')}
                <br />
                <br />
                {t('services.description2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mb-8 mt-8 sm:mt-12">
        <h2 className="mb-6 text-center">{t('services.title')}</h2>

        {/* Render individual offers first */}
        {individualOffers.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-6">
              {individualOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
    </>
  );
}
