"use client"

import { useState } from "react"
import { Link as ScrollLink } from "react-scroll"
import { useLanguage } from "@/contexts/language-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, MapPin } from "lucide-react"

interface Offer {
  id: number
  title: string
  shortDescription: string
  image?: string
  details: {
    description: string
    location?: string
    participants?: string
    duration?: string
    schedule?: string
    pricing?: string
    topics?: string[]
    examples?: string[]
    nextDate?: string
  }
}

export default function Services() {
  const { t } = useLanguage()
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

  const offers: Offer[] = [
    {
      id: 1,
      title: "Einzelsitzung Kunsttherapie",
      shortDescription:
        "Individueller kunsttherapeutischer Raum für deine persönliche Entwicklung. Begleitetes Malen nach der Methode von Bettina Egger.",
      image: undefined, // Platzhalter
      details: {
        description:
          "In der Einzelsitzung begleite ich dich durch deinen individuellen kunsttherapeutischen Prozess. Mit der Methode des Personenorientierten/Begleiteten Malens nach Bettina Egger steht nicht das fertige Bild, sondern dein persönlicher Prozess und die bewusste Erfahrung beim Malen im Mittelpunkt. Ich unterstütze dich dabei, mehr Liebe und Wertschätzung für dein Sein zu erlauben und neue Perspektiven zu entwickeln.",
        location: "Verwandlungsraum, Eberswalde",
        duration: "60 oder 90 Minuten",
        pricing: "Einzelsitzung 60 Min: 80€ | 90 Min: 95€ | Starter-Paket (90+60+60 Min): 200€",
        schedule:
          "Vorteile der Einzelsitzung:\n• Keine langen Wartezeiten\n• Freie Wahl der Therapeutin\n• Inhalt, Dauer und Rhythmus an deine Bedürfnisse angepasst\n• Keine Diagnose erforderlich\n• Diskret - keine Vermerke in Krankenakten",
        examples: [
          "Bei finanziellen Schwierigkeiten kann eine individuelle Ermäßigung vereinbart werden",
          "Termine können bis 24h vorher kostenfrei abgesagt werden",
        ],
      },
    },
    {
      id: 2,
      title: "Monatliche Kunsttherapie-Gruppe",
      shortDescription:
        "Ein geschützter Raum, in dem du über Farbe, Form und Bewegung wieder in Kontakt mit dir selbst kommst.",
      image: "/images/design-mode/ChatGPT%20Image%202.%20Okt.%202025%2C%2015_52_48.png",
      details: {
        description:
          "Ein geschützter Raum, in dem du über Farbe, Form und Bewegung wieder in Kontakt mit dir selbst kommst. Jede Session hat ein eigenes Thema, das dich durch die Jahreszeit und deinen inneren Prozess begleitet.",
        location: "Verwandlungsraum, Eberswalde",
        participants: "max. 7 Personen",
        duration: "90–120 Minuten",
        schedule:
          "Typischer Ablauf:\n• Ankommen & kurze Körperreise\n• Einführung ins Monatsthema\n• Intuitives Malen / Gestalten\n• Freiwilliger Austausch in der Gruppe\n• Kleines Abschlussritual",
        examples: ["Loslassen", "Der Hoffnung Raum geben", "Vertrauen & Träumen", "Reinigung & Erneuerung"],
        pricing:
          "Die Gruppe ist klein und persönlich – es entsteht eine warme, achtsame Atmosphäre, in der sich jede Person zeigen darf, aber nicht muss.",
      },
    },
    {
      id: 3,
      title: "Klang & Farbe – Klangreise mit intuitivem Malen",
      shortDescription: "Klangschalen führen dich in eine tiefe Entspannung. Aus dieser inneren Ruhe heraus entsteht dein intuitives Bild.",
      image: undefined, // Platzhalter
      details: {
        description:
          "Klangschalen führen dich in eine tiefe Entspannung. Aus dieser inneren Ruhe heraus entsteht dein intuitives Bild. Ein sanfter Abend für Menschen, die Sinneswahrnehmung, Stille und kreativen Ausdruck verbinden möchten.",
        nextDate: "19. Dezember",
        location: "Verwandlungsraum, Eberswalde",
        participants: "max. 7 Personen",
        pricing: "Leitung: Verwandlungsraum + Klangtherapeutin",
      },
    },
    {
      id: 4,
      title: "Breathwork & Malen",
      shortDescription: "Atemarbeit öffnet den Zugang zu inneren Bildern und Emotionen. Danach setzt du das Erlebte frei in Farbe um.",
      image: undefined, // Platzhalter
      details: {
        description:
          "Atemarbeit öffnet den Zugang zu inneren Bildern und Emotionen. Danach setzt du das Erlebte frei und spontan in Farbe um. Ein Angebot für alle, die Transformation körperlich UND kreativ erfahren möchten.",
        nextDate: "Januar 2025",
        location: "Verwandlungsraum, Eberswalde",
        participants: "max. 7 Personen",
        pricing: "Leitung: Verwandlungsraum + Breathwork-Coach",
      },
    },
    {
      id: 5,
      title: "Info-Workshop: Was ist Kunsttherapie?",
      shortDescription: "Ein verständlicher, praxisnaher Abend, der zeigt, wie Kunsttherapie wirkt – und weshalb sie nichts mit 'schön malen' zu tun hat.",
      image: "/images/design-mode/neue%20Wege.png",
      details: {
        description:
          "Ein verständlicher, praxisnaher Abend, der zeigt, wie Kunsttherapie wirkt – und weshalb sie nichts mit 'schön malen' zu tun hat. Wir sprechen über den kreativen Prozess, emotionale Resonanz und die Rolle von Farbe und Form im Selbstausdruck. Zum Abschluss gibt es eine kleine praktische Übung.",
        duration: "60–90 Minuten",
        location: "Verwandlungsraum, Eberswalde",
        participants: "max. 7 Personen",
      },
    },
  ]

  return (
    <section id="services" className="py-0">
      <div className="container mx-auto">
        <div className="max-w-6xl content-box my-0 mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4">{t("services.title")}</h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mt-4 font-serif text-left">
              {t("services.description")}
              <br />
              <br />
              {t("services.description2")}
            </p>
          </div>

          <div className="mb-8 mt-8 sm:mt-12">
            <h2 className="mb-6 text-center">{t("services.groupTitle")}</h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto mb-8 text-left">{t("services.groupDescription")}</p>

            {/* Responsive Grid mit Angeboten */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div key={offer.id} className="card flex flex-col h-full">
                  {/* Bild oder Platzhalter */}
                  <div className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center h-48">
                    {offer.image ? (
                      <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🎨</div>
                        <p className="text-sm text-muted-foreground">Bild folgt</p>
                      </div>
                    )}
                  </div>

                  {/* Titel */}
                  <h4 className="text-lg sm:text-xl mb-3 font-semibold">{offer.title}</h4>

                  {/* Kurze Beschreibung */}
                  <p className="text-sm sm:text-base mb-4 flex-grow line-clamp-3">{offer.shortDescription}</p>

                  {/* Details Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mt-auto" onClick={() => setSelectedOffer(offer)}>
                        Details anzeigen
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl mb-4">{offer.title}</DialogTitle>
                      </DialogHeader>

                      {/* Dialog Inhalt */}
                      <div className="space-y-4">
                        {/* Bild im Dialog */}
                        {offer.image && (
                          <div className="rounded-lg overflow-hidden">
                            <img src={offer.image} alt={offer.title} className="w-full h-64 object-cover" />
                          </div>
                        )}

                        {/* Beschreibung */}
                        <p className="text-base leading-relaxed">{offer.details.description}</p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                          {offer.details.location && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                              <div>
                                <p className="font-semibold text-sm">Ort</p>
                                <p className="text-sm">{offer.details.location}</p>
                              </div>
                            </div>
                          )}

                          {offer.details.participants && (
                            <div className="flex items-start gap-2">
                              <Users className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                              <div>
                                <p className="font-semibold text-sm">Teilnehmende</p>
                                <p className="text-sm">{offer.details.participants}</p>
                              </div>
                            </div>
                          )}

                          {offer.details.duration && (
                            <div className="flex items-start gap-2">
                              <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                              <div>
                                <p className="font-semibold text-sm">Dauer</p>
                                <p className="text-sm">{offer.details.duration}</p>
                              </div>
                            </div>
                          )}

                          {offer.details.nextDate && (
                            <div className="flex items-start gap-2">
                              <Calendar className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                              <div>
                                <p className="font-semibold text-sm">Nächster Termin</p>
                                <p className="text-sm">{offer.details.nextDate}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Ablauf */}
                        {offer.details.schedule && (
                          <div className="pt-2">
                            <p className="font-semibold mb-2">Typischer Ablauf:</p>
                            <div className="whitespace-pre-line text-sm">{offer.details.schedule}</div>
                          </div>
                        )}

                        {/* Beispiele für Themen */}
                        {offer.details.examples && (
                          <div className="pt-2">
                            <p className="font-semibold mb-2">Beispiele für Monatsthemen:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {offer.details.examples.map((example, idx) => (
                                <li key={idx}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Preis/Zusatzinfo */}
                        {offer.details.pricing && (
                          <div className="pt-2 border-t">
                            <p className="text-sm italic">{offer.details.pricing}</p>
                          </div>
                        )}

                        {/* Kontakt Link */}
                        <div className="pt-4 border-t">
                          <p className="text-sm">
                            Interesse?{" "}
                            <ScrollLink
                              to="contact"
                              smooth={true}
                              duration={800}
                              offset={-80}
                              className="text-primary hover:text-primary/80 underline cursor-pointer font-medium"
                            >
                              Kontaktiere mich für weitere Informationen
                            </ScrollLink>
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
