import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Seiteneinstellungen',
  type: 'document',
  groups: [
    { name: 'welcome', title: 'Willkommen' },
    { name: 'about', title: 'Über mich' },
    { name: 'kunsttherapie', title: 'Kunsttherapie' },
    { name: 'session', title: 'Rahmenbedingungen & Preise' },
  ],
  fields: [
    // ── Willkommen ──────────────────────────────────────────────────────────
    defineField({
      name: 'welcomeIntro',
      title: 'Willkommen – Einleitungstext',
      type: 'text',
      rows: 6,
      group: 'welcome',
      description: 'Der lange Einleitungstext unter "Willkommen".',
    }),
    defineField({
      name: 'welcomeImage',
      title: 'Willkommen – Bild',
      type: 'image',
      options: { hotspot: true },
      group: 'welcome',
      description: 'Das Bild mit den Händen/gelben Elementen.',
    }),

    // ── Über mich ──────────────────────────────────────────────────────────
    defineField({
      name: 'aboutParagraph1',
      title: 'Über mich – Absatz 1',
      type: 'text',
      rows: 6,
      group: 'about',
    }),
    defineField({
      name: 'aboutParagraph2',
      title: 'Über mich – Absatz 2',
      type: 'text',
      rows: 6,
      group: 'about',
    }),
    defineField({
      name: 'aboutParagraph3',
      title: 'Über mich – Absatz 3',
      type: 'text',
      rows: 6,
      group: 'about',
    }),
    defineField({
      name: 'aboutPortrait',
      title: 'Über mich – Portrait',
      type: 'image',
      options: { hotspot: true },
      group: 'about',
      description: 'Portrait-Foto für den "Über mich"-Bereich.',
    }),

    // ── Kunsttherapie ──────────────────────────────────────────────────────
    defineField({
      name: 'ktSubtitle',
      title: 'Kunsttherapie – Untertitel',
      type: 'text',
      rows: 3,
      group: 'kunsttherapie',
    }),
    defineField({
      name: 'ktHowItWorksTitle',
      title: 'Was ist Kunsttherapie? – Überschrift',
      type: 'string',
      group: 'kunsttherapie',
    }),
    defineField({
      name: 'ktHowItWorksIntro',
      title: 'Was ist Kunsttherapie? – Einführungstext',
      type: 'text',
      rows: 4,
      group: 'kunsttherapie',
    }),
    defineField({
      name: 'ktPomImage',
      title: 'POM – Bild (Portraitmal-Objekt-Methode)',
      type: 'image',
      options: { hotspot: true },
      group: 'kunsttherapie',
    }),
    defineField({
      name: 'ktPomTitle',
      title: 'POM – Methodenname',
      type: 'string',
      group: 'kunsttherapie',
    }),
    defineField({
      name: 'ktPomIntro',
      title: 'POM – Kurztext / Intro',
      type: 'text',
      rows: 3,
      group: 'kunsttherapie',
    }),
    defineField({
      name: 'ktPomDescription',
      title: 'POM – Methodenbeschreibung',
      type: 'text',
      rows: 8,
      group: 'kunsttherapie',
    }),

    // ── Rahmenbedingungen & Preise ─────────────────────────────────────────
    defineField({
      name: 'sessionDescription1',
      title: 'Rahmenbedingungen – Absatz 1',
      type: 'text',
      rows: 4,
      group: 'session',
    }),
    defineField({
      name: 'sessionDescription2',
      title: 'Rahmenbedingungen – Absatz 2',
      type: 'text',
      rows: 4,
      group: 'session',
    }),
    defineField({
      name: 'sessionDescription3',
      title: 'Rahmenbedingungen – Absatz 3',
      type: 'text',
      rows: 4,
      group: 'session',
    }),
    defineField({
      name: 'sessionDescription4',
      title: 'Rahmenbedingungen – Absatz 4',
      type: 'text',
      rows: 4,
      group: 'session',
    }),
    defineField({
      name: 'sessionDescription5',
      title: 'Rahmenbedingungen – Absatz 5',
      type: 'text',
      rows: 4,
      group: 'session',
    }),
    defineField({
      name: 'sessionRoomImage',
      title: 'Rahmenbedingungen – Raumfoto',
      type: 'image',
      options: { hotspot: true },
      group: 'session',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Seiteneinstellungen' }),
  },
})
