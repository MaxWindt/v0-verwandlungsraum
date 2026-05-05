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
import { PortableText } from '@portabletext/react';

// ── helpers ───────────────────────────────────────────────────────────────────

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

/**
 * Convert a Canva design URL to its embeddable form.
 * e.g. https://www.canva.com/design/XXXXX/YYYYY/view -> ...?embed
 */
function toCanvaEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (!u.hostname.includes('canva.com')) return url;
    if (u.searchParams.has('embed')) return url;
    return `${u.origin}${u.pathname}?embed`;
  } catch {
    return url;
  }
}

// ── types ──────────────────────────────────────────────────────────────────────

export interface SanityOffer {
  _id: string;
  title: string;
  shortDescription: string;
  category?: string;
  hidden?: boolean;
  order?: number;
  cardImage?: { asset?: { _ref?: string } } | null;
  image?: { asset?: { _ref?: string } } | null;
  externalImageUrl?: string | null;
  dates?: string[] | null;
  registrationUrl?: string | null;
  location?: string | null;
  participants?: string | null;
  duration?: string | null;
  price?: string | null;
  dialogType?: 'details' | 'session' | 'canva' | 'kennenlernabend' | null;
  canvaUrl?: string | null;
  dialogContent?: unknown[] | null;
}

// ── image helpers ──────────────────────────────────────────────────────────────

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'y7ytd6po';

/** Temporary fallback: local images for seeded documents until uploaded via Studio */
const LOCAL_IMAGE_FALLBACK: Record<string, string> = {
  '201d1be2-36ee-4a00-b896-fe414388876b': '/images/photo_2026-02-02_11-16-29.webp',
  'b4c1683c-ad2d-4117-bc92-0f42fe053172': 'https://github.com/user-attachments/assets/cd4c4646-3256-4d25-8fe9-02eba9d57712',
  'cefd20c0-7a7d-4433-b510-c7b0704b3292': '/images/5348175586192460915.jpg',
  'b86d376e-b211-4307-9734-c91193daf1ea': '/images/5348175586192460911.jpg',
  'f0039819-f95a-45fc-bb79-31418cba52dd': '/images/Atmen.png',
};

function refToUrl(ref: string): string {
  const parts = ref.split('-');
  const ext = parts[parts.length - 1];
  const dims = parts[parts.length - 2];
  const id = parts.slice(1, parts.length - 2).join('-');
  return `https://cdn.sanity.io/images/${PROJECT_ID}/production/${id}-${dims}.${ext}`;
}

function resolveImageUrl(offer: SanityOffer): string {
  if (offer.cardImage?.asset?._ref) return refToUrl(offer.cardImage.asset._ref);
  if (offer.externalImageUrl) return offer.externalImageUrl;
  // Temporary fallback to local images for seeded documents without uploaded images
  if (LOCAL_IMAGE_FALLBACK[offer._id]) return LOCAL_IMAGE_FALLBACK[offer._id];
  return '';
}

function resolveDetailImageUrl(offer: SanityOffer): string {
  if (offer.image?.asset?._ref) return refToUrl(offer.image.asset._ref);
  return resolveImageUrl(offer);
}

// ── card ───────────────────────────────────────────────────────────────────────

function OfferCard({ offer }: { offer: SanityOffer }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const isEventWithDates = (offer.dates ?? []).length > 0;
  const isCanva = offer.dialogType === 'canva';
  const isSession = offer.dialogType === 'session';
  const isKennenlernabend = offer.dialogType === 'kennenlernabend';
  const isEventCard = isEventWithDates && !isSession;

  const cardImageUrl = resolveImageUrl(offer);
  const detailImageUrl = resolveDetailImageUrl(offer);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleContactClick = () => {
    setOpen(false);
    setTimeout(scrollToContact, 450);
  };

  return (
    <div className="card flex flex-col h-full">
      {cardImageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden h-52 lg:h-72 xl:h-80 flex items-center justify-center">
          <OptimizedImage
            src={cardImageUrl}
            alt={offer.title}
            width={600}
            height={360}
            className={`w-full h-full ${isCanva ? 'object-contain p-2 rounded-lg' : 'object-cover rounded-lg object-top'}`}
          />
        </div>
      )}

      <h4 className="text-lg sm:text-xl mb-3 font-semibold">{offer.title}</h4>
      <p className="text-sm sm:text-base mb-3 flex-grow">{offer.shortDescription}</p>

      {isEventCard && (offer.dates ?? []).length > 0 && (
        <div className="mb-3 text-sm">
          <p className="font-semibold mb-1">Termin{(offer.dates?.length ?? 0) > 1 ? 'e' : ''}:</p>
          {offer.dates!.map((date) => (
            <p key={date}>{date}</p>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        {isEventCard ? (
          <div className="mt-auto space-y-2">
            <Button className="w-full" onClick={handleContactClick}>Anmelden</Button>
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
            <Button variant="outline" className="w-full mt-auto bg-transparent">Details anzeigen</Button>
          </DialogTrigger>
        )}

        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-4">{offer.title}</DialogTitle>
          </DialogHeader>

          {/* Canva embed */}
          {isCanva && offer.canvaUrl && (
            <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '141.4286%', boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '8px' }}>
              <IframeWithSpinner src={toCanvaEmbedUrl(offer.canvaUrl)} title={offer.title} />
            </div>
          )}

          {/* Einzelsitzung */}
          {isSession && (
            <div className="space-y-4">
              {detailImageUrl && (
                <OptimizedImage src={detailImageUrl} alt={offer.title} width={1200} height={720} className="w-full rounded-lg object-cover" style={{ maxHeight: 360 }} />
              )}
              <div className="prose max-w-none text-sm sm:text-base">
                <p>{t('session.description1')}</p>
                <p>{t('session.description2')}</p>
                <p>{t('session.description3')}</p>
                <p>{t('session.description4')}</p>
                <p>{t('session.description5')}</p>
                <p className="text-sm italic mt-4">{t('session.disclaimerNote')}</p>
              </div>
            </div>
          )}

          {/* Kennenlernabend */}
          {isKennenlernabend && (
            <div className="space-y-3 text-sm sm:text-base">
              {offer.dialogContent && (offer.dialogContent as unknown[]).length > 0 ? (
                <div className="prose max-w-none">
                  <PortableText value={offer.dialogContent as Parameters<typeof PortableText>[0]['value']} />
                </div>
              ) : <p>{offer.shortDescription}</p>}
              {offer.dates?.map((d) => (
                <div key={d} className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                  <div><p className="font-semibold">Wann</p><p>{d}</p></div>
                </div>
              ))}
              {offer.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                  <div><p className="font-semibold">Wo</p><p>{offer.location}</p></div>
                </div>
              )}
              {offer.price && (
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 mt-0.5 text-primary flex-shrink-0 text-center font-bold">€</span>
                  <div><p className="font-semibold">Beitrag</p><p>{offer.price}</p></div>
                </div>
              )}
            </div>
          )}

          {/* Default */}
          {!isCanva && !isSession && !isKennenlernabend && (
            <div className="space-y-4">
              {offer.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                  <div><p className="font-semibold text-sm">Ort</p><p className="text-sm">{offer.location}</p></div>
                </div>
              )}
              {offer.participants && (
                <div className="flex items-start gap-2">
                  <Users className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                  <div><p className="font-semibold text-sm">Teilnehmende</p><p className="text-sm">{offer.participants}</p></div>
                </div>
              )}
              {offer.duration && (
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                  <div><p className="font-semibold text-sm">Dauer</p><p className="text-sm">{offer.duration}</p></div>
                </div>
              )}
              {offer.dialogContent && (offer.dialogContent as unknown[]).length > 0 && (
                <div className="prose max-w-none text-sm sm:text-base">
                  <PortableText value={offer.dialogContent as Parameters<typeof PortableText>[0]['value']} />
                </div>
              )}
            </div>
          )}

          <div className="pt-4 border-t">
            <Button className="w-full" onClick={handleContactClick}>
              {isEventCard ? 'Jetzt anmelden' : 'Jetzt Kontakt aufnehmen'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── main export ─────────────────────────────────────────────────────────────────

export default function Services({ offers }: { offers: SanityOffer[] }) {
  const { t } = useLanguage();
  const individualOffers = offers.filter((o) => o.category === 'individual');
  const workshopOffers = offers.filter((o) => o.category !== 'individual');

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
              <OptimizedImage
                src="/images/photo_5427296683445393000_y.webp"
                alt="Hands with yellow element"
                width={800}
                height={600}
                className="h-auto max-h-[28rem] sm:max-h-[32rem] md:max-h-[36rem] w-auto mt-8 rounded-3xl overflow-hidden"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 sm:py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto content-box">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="mb-4">{t('about.title')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start text-base sm:text-lg">
              <div className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden hover-lift">
                <OptimizedImage src="/images/ueber-mich-portrait.jpeg" alt={t('about.alt')} fill className="object-cover object-center" />
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

        {individualOffers.length > 0 && (
          <div className="mb-6 flex justify-center">
            <div className="w-full sm:w-3/4 md:w-2/3">
              <div className="grid grid-cols-1 gap-6">
                {individualOffers.map((offer) => (
                  <OfferCard key={offer._id} offer={offer} />
                ))}
              </div>
            </div>
          </div>
        )}

        {workshopOffers.length > 0 && (
          <>
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-semibold text-center">Aktuelle Workshops</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {workshopOffers.map((offer) => (
                <OfferCard key={offer._id} offer={offer} />
              ))}
            </div>
          </>
        )}

        {offers.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Aktuell keine Angebote verfügbar.</p>
        )}
      </section>
    </>
  );
}
