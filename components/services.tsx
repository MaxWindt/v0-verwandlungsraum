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
            {/* Responsive Grid mit Angeboten */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Angebot 1: 1:1 Einzelsitzung */}
              <div className="card flex flex-col h-full">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src="/images/design-mode/photo_52512509862091k84565_y.jpg"
                    alt="1:1 Einzelsitzung Kunsttherapie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                  1:1 Einzelsitzung
                </h4>
                <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                  Gemeinsam schauen wir was dein Anliegen ist. Wo? Thinkfarm Eberswalde, Eisenbahnstr. 92/93, 16225 Eberswalde.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto bg-transparent">
                      Details anzeigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4">
                        1:1 Einzelsitzung
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        Gemeinsam schauen wir, was dein Anliegen ist und wie ich dich begleiten kann. Die Sitzung findet in der Thinkfarm Eberswalde, Eisenbahnstr. 92/93, 16225 Eberswalde statt. Du erhältst einen individuellen kunsttherapeutischen Raum für deine persönliche Entwicklung.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Ort</p>
                            <p className="text-sm">
                              Thinkfarm Eberswalde<br />
                              Eisenbahnstr. 92/93<br />
                              16225 Eberswalde
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

              {/* Angebot 2: Monatliche Gruppe - Im Fluss sein */}
              <div className="card flex flex-col h-full">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src="/images/5348175586192460911.jpg"
                    alt="Monatliche Gruppe: Im Fluss sein"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                  Im Fluss sein
                </h4>
                <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                  Monatliche Gruppe für kreativen Ausdruck und achtsames Miteinander. Gemeinsam im Fluss sein und sich selbst neu erleben.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto bg-transparent">
                      Details anzeigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4">
                        Im Fluss sein – Monatliche Gruppe
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        In der monatlichen Gruppe "Im Fluss sein" tauchen wir gemeinsam in kreative Prozesse ein. Über Farbe, Form und Bewegung kommst du wieder in Kontakt mit dir selbst. Jede Session hat ein eigenes Thema, das dich durch die Jahreszeit und deinen inneren Prozess begleitet.
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
                    <Button variant="outline" className="w-full mt-auto bg-transparent">
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

              {/* Angebot 4: Workshop Atmen und Malen */}
              <div className="card flex flex-col h-full">
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <img
                    src="/images/df3a897caf547c3f103abfe1c75c7689.jpg"
                    alt="Workshop Atmen und Malen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl mb-3 font-semibold">
                  Atmen und Malen
                </h4>
                <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                  Workshop für Klarheit und Vision: Atemarbeit, intuitives Malen, achtsamer Raum, Gruppenreflexion, Tee & Snacks.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto bg-transparent">
                      Details anzeigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4">
                        Atmen und Malen – Workshop für Klarheit und Vision
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        In diesem Workshop laden wir dich dazu ein, dein Leben ganz klar in die Hand zu nehmen. Spüre: Was möchtest du in dein Leben einladen? Wie möchtest du dein Leben gestalten?
                      </p>
                      <p className="text-base leading-relaxed">
                        Der Atem lädt dich ein, Schwung in Festgesetztes zu bringen und gleichzeitig fest verankert bei dir zu sein. Du gestaltest deine Atmung und dein Leben.
                      </p>
                      <p className="text-base leading-relaxed">
                        Anschließend kann das Malen das Erlebte auf die materielle Ebene bringen, und das was dich bewegt sichtbar werden lassen. Das Malen hat eine erdende Kraft und weckt die Gestaltungskraft in dir.
                      </p>
                      <div className="pt-2">
                        <p className="font-semibold mb-2">Was erwartet dich:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Atemarbeit</li>
                          <li>Intuitives Malen</li>
                          <li>Ein achtsamer Raum</li>
                          <li>Warmer Tee und gesunde Snacks</li>
                          <li>Gruppenreflexion</li>
                        </ul>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Termin</p>
                            <p className="text-sm">Sonntag, 22. Februar</p>
                            <p className="text-sm">11:00–14:00 Uhr</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">Ort</p>
                            <p className="text-sm">Lebensraum, Spechthausen 45, 16225 Eberswalde</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="font-semibold text-sm mb-2">Leitung:</p>
                        <div className="space-y-2">
                          <p className="text-sm">Rebecca Schwegel</p>
                          <p className="text-sm italic">Begleiterin für Atemarbeit, B.Sc. Psychologie</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm font-semibold">Energieausgleich: 33–55 €</p>
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
                            Anmeldung
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
                    src="/images/5348175586192460915.jpg"
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
                    <Button variant="outline" className="w-full mt-auto bg-transparent">
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
                            <p className="text-sm">Februar, Details folgen</p>
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