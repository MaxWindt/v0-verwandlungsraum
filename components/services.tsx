'use client';

import { useLanguage } from '@/contexts/language-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';

interface Offer {
  id: number;
  title: string;
  shortDescription: string;
  image?: string;
  details: {
    description: string;
    location?: string;
    participants?: string;
    duration?: string;
    schedule?: string;
    pricing?: string;
    topics?: string[];
    examples?: string[];
    nextDate?: string;
  };
}

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-0">
      <div className="container mx-auto">
        <div className="max-w-6xl content-box my-0 mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4">{t('services.title')}</h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mt-4 font-serif text-left">
              {t('services.description')}
              <br />
              <br />
              {t('services.description2')}
            </p>
          </div>

          <div className="mb-8 mt-8 sm:mt-12">
            <h2 className="mb-6 text-center">{t('services.groupTitle')}</h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto mb-8 text-left">
              {t('services.groupDescription')}
            </p>

            {/* Responsive Grid mit Angeboten */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Angebot 1: Einzelsitzung Kunsttherapie */}
              <div className="card flex flex-col h-full">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src="/images/design-mode/photo_52512509862091k84565_y.jpg"
                    alt="Einzelsitzung Kunsttherapie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                  Einzelsitzung Kunsttherapie
                </h4>
                <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                  Individueller kunsttherapeutischer Raum für deine persönliche
                  Entwicklung. Begleitetes Malen nach der Methode von Bettina
                  Egger.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto">
                      Details anzeigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4">
                        Einzelsitzung Kunsttherapie
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        In der Einzelsitzung begleite ich dich durch deinen
                        individuellen kunsttherapeutischen Prozess. Mit der
                        Methode des Personenorientierten/Begleiteten Malens nach
                        Bettina Egger steht nicht das fertige Bild, sondern dein
                        persönlicher Prozess und die bewusste Erfahrung beim
                        Malen im Mittelpunkt. Ich unterstütze dich dabei, mehr
                        Liebe und Wertschätzung für dein Sein zu erlauben und
                        neue Perspektiven zu entwickeln.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Ort</p>
                            <p className="text-sm">
                              Verwandlungsraum, Eberswalde
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Dauer</p>
                            <p className="text-sm">60 oder 90 Minuten</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="font-semibold mb-2">
                          Vorteile der Einzelsitzung:
                        </p>
                        <div className="whitespace-pre-line text-sm">
                          • Keine langen Wartezeiten{'\n'}• Freie Wahl der
                          Therapeutin{'\n'}• Inhalt, Dauer und Rhythmus an deine
                          Bedürfnisse angepasst{'\n'}• Keine Diagnose
                          erforderlich{'\n'}• Diskret - keine Vermerke in
                          Krankenakten
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm italic">
                          Einzelsitzung 60 Min: 80€ | 90 Min: 95€ |
                          Starter-Paket (90+60+60 Min): 200€
                        </p>
                        <p className="text-sm italic mt-2">
                          Bei finanziellen Schwierigkeiten kann eine
                          individuelle Ermäßigung vereinbart werden
                        </p>
                      </div>
                      <div className="pt-4 border-t">
                        <DialogClose asChild>
                          <Button
                            className="w-full"
                            onClick={() => {
                              const contactSection =
                                document.getElementById('contact');
                              if (contactSection) {
                                setTimeout(() => {
                                  contactSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
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
              </div>

              {/* Angebot 2: Monatliche Kunsttherapie-Gruppe */}
              <div className="card flex flex-col h-full">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5348175586192460911-OckkD41v0OqyIn6TDYhGZfQCnxLCyM.jpg"
                    alt="Monatliche Kunsttherapie-Gruppe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                  Monatliche Kunsttherapie-Gruppe
                </h4>
                <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                  Ein geschützter Raum, in dem du über Farbe, Form und Bewegung
                  wieder in Kontakt mit dir selbst kommst.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto">
                      Details anzeigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4">
                        Monatliche Kunsttherapie-Gruppe
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        Ein geschützter Raum, in dem du über Farbe, Form und
                        Bewegung wieder in Kontakt mit dir selbst kommst. Jede
                        Session hat ein eigenes Thema, das dich durch die
                        Jahreszeit und deinen inneren Prozess begleitet.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Ort</p>
                            <p className="text-sm">
                              Verwandlungsraum, Eberswalde
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">
                              Teilnehmende
                            </p>
                            <p className="text-sm">max. 7 Personen</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Dauer</p>
                            <p className="text-sm">90–120 Minuten</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-blue-700">
                          Online
                        </p>
                      </div>
                      <div className="pt-2">
                        <p className="font-semibold mb-2">Typischer Ablauf:</p>
                        <div className="whitespace-pre-line text-sm">
                          • Ankommen & kurze Körperreise{'\n'}• Einführung ins
                          Monatsthema{'\n'}• Intuitives Malen / Gestalten{'\n'}•
                          Freiwilliger Austausch in der Gruppe{'\n'}• Kleines
                          Abschlussritual
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="font-semibold mb-2">
                          Beispiele für Monatsthemen:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Loslassen</li>
                          <li>Der Hoffnung Raum geben</li>
                          <li>Vertrauen & Träumen</li>
                          <li>Reinigung & Erneuerung</li>
                        </ul>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm italic">
                          Die Gruppe ist klein und persönlich – es entsteht eine
                          warme, achtsame Atmosphäre, in der sich jede Person
                          zeigen darf, aber nicht muss.
                        </p>
                      </div>
                      <div className="pt-4 border-t">
                        <DialogClose asChild>
                          <Button
                            className="w-full"
                            onClick={() => {
                              const contactSection =
                                document.getElementById('contact');
                              if (contactSection) {
                                setTimeout(() => {
                                  contactSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
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
              </div>

              {/* Angebot 3: Klang & Farbe */}
              <div className="card flex flex-col h-full">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src="/images/design-mode/photo_5251250986209184578_y.jpg"
                    alt="Klang & Farbe – Klangreise mit intuitivem Malen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                  Klang & Farbe – Klangreise mit intuitivem Malen
                </h4>
                <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                  Klangschalen führen dich in eine tiefe Entspannung. Aus dieser
                  inneren Ruhe heraus entsteht dein intuitives Bild.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto">
                      Details anzeigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4">
                        Klang & Farbe – Klangreise mit intuitivem Malen
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        Klangschalen führen dich in eine tiefe Entspannung. Aus
                        dieser inneren Ruhe heraus entsteht dein intuitives
                        Bild. Ein sanfter Abend für Menschen, die
                        Sinneswahrnehmung, Stille und kreativen Ausdruck
                        verbinden möchten.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">
                              Nächster Termin
                            </p>
                            <p className="text-sm">in Planung</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Ort</p>
                            <p className="text-sm">
                              Verwandlungsraum, Eberswalde
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">
                              Teilnehmende
                            </p>
                            <p className="text-sm">max. 7 Personen</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm italic">
                          Leitung: Rebecca + Kathi
                        </p>
                      </div>
                      <div className="pt-4 border-t">
                        <DialogClose asChild>
                          <Button
                            className="w-full"
                            onClick={() => {
                              const contactSection =
                                document.getElementById('contact');
                              if (contactSection) {
                                setTimeout(() => {
                                  contactSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
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
              </div>

              {/* Angebot 4: Breathwork & Malen */}
              <div className="card flex flex-col h-full">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/df3a897caf547c3f103abfe1c75c7689-JRksrnjs6KKCvo9HYwQsTNjJRasmCE.jpg"
                    alt="Breathwork & Malen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                  Breathwork & Malen
                </h4>
                <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                  Atemarbeit öffnet den Zugang zu inneren Bildern und Emotionen.
                  Danach setzt du das Erlebte frei in Farbe um.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto">
                      Details anzeigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4">
                        Breathwork & Malen
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        Atemarbeit öffnet den Zugang zu inneren Bildern und
                        Emotionen. Danach setzt du das Erlebte frei und spontan
                        in Farbe um. Ein Angebot für alle, die Transformation
                        körperlich UND kreativ erfahren möchten.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">
                              Nächster Termin
                            </p>
                            <p className="text-sm">1. Februar 2026</p>
                            <p className="text-sm">Uhrzeit: 9:30-12:30 Uhr</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Ort</p>
                            <p className="text-sm">
                              Verwandlungsraum, Eberswalde
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">
                              Teilnehmende
                            </p>
                            <p className="text-sm">max. 7 Personen</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm italic">
                          Leitung: Verwandlungsraum + Breathwork-Coach
                        </p>
                      </div>
                      <div className="pt-4 border-t">
                        <DialogClose asChild>
                          <Button
                            className="w-full"
                            onClick={() => {
                              const contactSection =
                                document.getElementById('contact');
                              if (contactSection) {
                                setTimeout(() => {
                                  contactSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
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
              </div>

              {/* Angebot 5: Info-Workshop */}
              <div className="card flex flex-col h-full">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5348175586192460915-1PB938G8jtaEHOA1JduWGdtgLynR6O.jpg"
                    alt="Info-Workshop: Was ist Kunsttherapie?"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                  Info-Workshop: Was ist Kunsttherapie?
                </h4>
                <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                  Ein verständlicher, praxisnaher Abend, der zeigt, wie
                  Kunsttherapie wirkt – und weshalb sie nichts mit 'schön malen'
                  zu tun hat.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto">
                      Details anzeigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4">
                        Info-Workshop: Was ist Kunsttherapie?
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        Der Info-Workshop gibt einen Einblick in Kunsttherapie
                        und das personenorientierte Malen (POM). Es geht darum,
                        innere Prozesse kreativ sichtbar zu machen – unabhängig
                        vom Ergebnis. Am Ende gibt es eine kleine praktische
                        Übung (bitte Blatt und Stifte bereithalten). Die
                        Teilnahme ist kostenlos und online.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-start gap-2">
                          <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Dauer</p>
                            <p className="text-sm">60 Minuten</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">
                              Nächster Termin
                            </p>
                            <p className="text-sm">20. Januar, 18 Uhr</p>
                            <p className="text-sm font-semibold text-green-700">
                              Kostenlos
                            </p>
                            <p className="text-sm">Online</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <DialogClose asChild>
                          <Button
                            className="w-full"
                            onClick={() => {
                              const contactSection =
                                document.getElementById('contact');
                              if (contactSection) {
                                setTimeout(() => {
                                  contactSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
