import type { GlobalConfig, RichTextField, TextField } from 'payload'

import { anyone } from '../access'
import { contentEditor, simpleEditor } from '../fields/richText'
import { rebuildAfterGlobalChange } from '../hooks/rebuildSite'

// Left empty, the website shows its built-in heading in the visitor's language (de/en/es).
const text = (name: string, label: string, placeholder: string): TextField => ({
  name,
  type: 'text',
  label,
  admin: { placeholder },
})

const rich = (name: string, label: string, description?: string): RichTextField => ({
  name,
  type: 'richText',
  label,
  editor: contentEditor,
  admin: { description },
})

export const SiteContent: GlobalConfig = {
  slug: 'site-content',
  label: 'Seiteninhalte',
  admin: {
    group: 'Inhalte',
    hideAPIURL: true,
    description:
      'Texte und Bilder der Startseite. Felder, die du leer lässt, zeigen den bisherigen Standardtext in der gewählten Sprache.',
  },
  access: { read: anyone },
  // Version history (restore older texts). Saving publishes, so there are no drafts here.
  versions: { max: 30 },
  hooks: { afterChange: [rebuildAfterGlobalChange] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Willkommen',
          fields: [
            rich('welcomeIntro', 'Begrüßungstext', 'Der Einleitungstext unter „Willkommen“.'),
            {
              name: 'welcomeImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Willkommen – Bild',
              admin: { description: 'Das Bild mit den Händen/gelben Elementen.' },
            },
          ],
        },
        {
          label: 'Über mich',
          fields: [
            rich('aboutParagraph1', 'Einleitung & Kindheit', 'Kindheit, Argentinien, Ecuador, Psychologiestudium.'),
            rich('aboutParagraph2', 'Reise nach Indien & Schlüsselmoment', 'Indienreise und Weg zur Kunsttherapie.'),
            rich('aboutParagraph3', 'Ausbildung & heutige Arbeit', 'Berlin, Ausbildung, Sterbebegleitung, Vision.'),
            {
              name: 'aboutPortrait',
              type: 'upload',
              relationTo: 'media',
              label: 'Über mich – Portrait',
              admin: { description: 'Portrait-Foto für den „Über mich“-Bereich.' },
            },
          ],
        },
        {
          label: 'Einzelsitzung',
          fields: [
            rich('sessionDescription1', 'Ort & Setting', 'Wo finden die Sitzungen statt? (Thinkfarm, Coachingraum, …)'),
            rich('sessionDescription2', 'Rahmen & Materialien', 'Beschreibung des geschützten Rahmens und der Materialien.'),
            rich('sessionDescription3', 'Prozessdauer & Verlauf', 'Wie lange dauert ein Prozess? Wie wird der Umfang abgestimmt?'),
            rich('sessionDescription4', 'Erstgespräch & Ablauf', 'Wie läuft das erste Kennenlernen ab? Dauer, Ablauf, Fragen.'),
            rich('sessionDescription5', 'Sitzungsdauer wählen', 'Entscheidung nach der ersten Sitzung: 60 oder 90 Minuten.'),
            { name: 'sessionRoomImage', type: 'upload', relationTo: 'media', label: 'Rahmenbedingungen – Raumfoto' },
          ],
        },
        {
          label: 'Rahmenbedingungen & Preise',
          fields: [
            text('sessionPricesTitle', 'Preise – Abschnittsüberschrift', 'Preise'),
            rich('sessionPricesContent', 'Preise – Inhalt', 'Einzelsitzung 60/90 Min., Starterpaket, Hinweis auf Ermäßigung.'),
            text('sessionBillingTitle', 'Abrechnung – Abschnittsüberschrift', 'Abrechnung und Kostenübernahme'),
            rich('sessionBillingContent', 'Abrechnung – Inhalt', 'Privat, gesetzliche Kassen, private Zusatzversicherungen.'),
            text(
              'sessionAdvantagesTitle',
              'Vorteile – Abschnittsüberschrift',
              'Was sind die Vorteile einer selbst bezahlten Therapie?',
            ),
            rich('sessionAdvantagesContent', 'Vorteile – Inhalt (Aufzählung)', 'Am besten als Aufzählung formatieren.'),
            text('sessionCancellationTitle', 'Absage – Abschnittsüberschrift', 'Absage'),
            rich('sessionCancellationContent', 'Absage – Inhalt', 'Stornierungsfristen und Bedingungen.'),
            text('sessionDisclaimerTitle', 'Hinweis – Überschrift', 'Hinweis zur Therapie / Haftungsausschluss'),
            {
              name: 'sessionDisclaimerContent',
              type: 'richText',
              label: 'Hinweis – Text',
              editor: simpleEditor,
              admin: { description: 'Kleiner Haftungsausschluss am Ende des Abschnitts.' },
            },
          ],
        },
      ],
    },
  ],
}
