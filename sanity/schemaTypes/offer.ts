import { defineField, defineType } from 'sanity'

export const offerType = defineType({
  name: 'offer',
  title: 'Angebot',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (Deutsch)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Titel (Englisch)',
      type: 'string',
      description: 'Wird angezeigt, wenn die Sprache auf Englisch gestellt ist.',
    }),
    defineField({
      name: 'titleEs',
      title: 'Titel (Spanisch)',
      type: 'string',
      description: 'Wird angezeigt, wenn die Sprache auf Spanisch gestellt ist.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kurzbeschreibung (Deutsch)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescriptionEn',
      title: 'Kurzbeschreibung (Englisch)',
      type: 'text',
      rows: 3,
      description: 'Wird angezeigt, wenn die Sprache auf Englisch gestellt ist.',
    }),
    defineField({
      name: 'shortDescriptionEs',
      title: 'Kurzbeschreibung (Spanisch)',
      type: 'text',
      rows: 3,
      description: 'Wird angezeigt, wenn die Sprache auf Spanisch gestellt ist.',
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          { title: 'Einzelangebot', value: 'individual' },
          { title: 'Workshop / Gruppe', value: 'workshop' },
        ],
      },
      initialValue: 'workshop',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hidden',
      title: 'Versteckt (nicht auf Website anzeigen)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Niedrigere Zahl = wird zuerst angezeigt',
    }),
    defineField({
      name: 'cardImage',
      title: 'Kartenbild (für Überblickskarte)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'image',
      title: 'Detailbild (für Dialog)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'Externes Bild-URL oder Pfad',
      type: 'string',
      description: 'Nur wenn kein Sanity-Bild verwendet wird. Kann ein relativer Pfad (/images/...) oder eine externe URL sein.',
    }),
    defineField({
      name: 'dates',
      title: 'Termine',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Anmelde-URL',
      type: 'url',
    }),
    defineField({
      name: 'location',
      title: 'Ort',
      type: 'string',
    }),
    defineField({
      name: 'participants',
      title: 'Teilnehmende',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Dauer',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Preis / Kostenbeitrag',
      type: 'string',
    }),
    defineField({
      name: 'dialogType',
      title: 'Dialog-Typ',
      type: 'string',
      description: 'Bestimmt den Inhalt des Detaildialogs',
      options: {
        list: [
          { title: 'Standard (Details)', value: 'details' },
          { title: 'Einzelsitzung (langer Text)', value: 'session' },
          { title: 'Canva Embed', value: 'canva' },
          { title: 'Kennenlernabend', value: 'kennenlernabend' },
        ],
      },
      initialValue: 'details',
    }),
    defineField({
      name: 'canvaUrl',
      title: 'Canva Link',
      type: 'url',
      description:
        'Füge hier den Canva-Link ein (z.B. https://www.canva.com/design/xxx/yyy/view). Er wird automatisch als eingebettetes iframe angezeigt.',
    }),
    defineField({
      name: 'dialogContent',
      title: 'Dialog-Inhalt (Freitext)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optionaler Fliesstext für den Detaildialog (Portable Text)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      hidden: 'hidden',
      media: 'cardImage',
    },
    prepare({ title, category, hidden, media }) {
      return {
        title: `${hidden ? '🙈 ' : ''}${title}`,
        subtitle: category === 'individual' ? 'Einzelangebot' : 'Workshop / Gruppe',
        media,
      }
    },
  },
})
