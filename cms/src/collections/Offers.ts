import type { CollectionConfig } from 'payload'

import { publishedOrLoggedIn } from '../access'
import { contentEditor } from '../fields/richText'
import { editComponents, lastSavedByField } from '../fields/shared'
import { makeRebuildAfterChange, makeRebuildAfterDelete } from '../hooks/rebuildSite'
import { expiresAtFor, visibilityLabels, visibilityOf } from '../lib/expiry'
import { syncExpirySchedule } from '../lib/schedule'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: { singular: 'Angebot', plural: 'Angebote' },
  admin: {
    hideAPIURL: true,
    components: editComponents,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'visibility', 'eventDate', 'order'],
    listSearchableFields: ['title', 'titleEn', 'titleEs'],
    group: 'Inhalte',
    description:
      'Einzelangebote und Workshops. Mit „Auf der Website verstecken“ blendest du ein Angebot aus, ohne es zu löschen. Mit einem Event-Datum verschwindet es nach dem Termin automatisch.',
  },
  defaultSort: 'order',
  access: { read: publishedOrLoggedIn },
  // Changes autosave as a draft until "Veröffentlichen".
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 30 },
  hooks: {
    afterChange: [makeRebuildAfterChange(syncExpirySchedule)],
    afterDelete: [makeRebuildAfterDelete(syncExpirySchedule)],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Inhalt',
          fields: [
            { name: 'title', type: 'text', label: 'Titel (Deutsch)', required: true },
            {
              name: 'titleEn',
              type: 'text',
              label: 'Titel (Englisch)',
              admin: { description: 'Wird angezeigt, wenn die Sprache auf Englisch gestellt ist.' },
            },
            {
              name: 'titleEs',
              type: 'text',
              label: 'Titel (Spanisch)',
              admin: { description: 'Wird angezeigt, wenn die Sprache auf Spanisch gestellt ist.' },
            },
            { name: 'shortDescription', type: 'textarea', label: 'Kurzbeschreibung (Deutsch)', required: true },
            {
              name: 'shortDescriptionEn',
              type: 'textarea',
              label: 'Kurzbeschreibung (Englisch)',
              admin: { description: 'Wird angezeigt, wenn die Sprache auf Englisch gestellt ist.' },
            },
            {
              name: 'shortDescriptionEs',
              type: 'textarea',
              label: 'Kurzbeschreibung (Spanisch)',
              admin: { description: 'Wird angezeigt, wenn die Sprache auf Spanisch gestellt ist.' },
            },
          ],
        },
        {
          label: 'Bilder',
          fields: [
            { name: 'cardImage', type: 'upload', relationTo: 'media', label: 'Kartenbild (für die Überblickskarte)' },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Detailbild (für den Dialog)' },
            {
              name: 'externalImageUrl',
              type: 'text',
              label: 'Externe Bild-URL oder Pfad',
              admin: {
                description:
                  'Nur wenn kein Kartenbild hochgeladen ist. Ein Pfad auf der Website (/images/…) oder eine externe URL.',
              },
            },
          ],
        },
        {
          label: 'Termin & Details',
          fields: [
            {
              name: 'dates',
              type: 'array',
              label: 'Termine (Anzeigetext)',
              labels: { singular: 'Termin', plural: 'Termine' },
              admin: {
                description:
                  'So wie die Termine auf der Karte stehen sollen, z. B. „Sa, 30. Mai 2026, 14:30–18:30 Uhr“. Das automatische Ausblenden steuerst du in der Seitenleiste mit „Event-Datum“.',
                components: { RowLabel: '@/components/RowLabel#RowLabel' },
              },
              fields: [{ name: 'label', type: 'text', label: 'Termin', required: true }],
            },
            { name: 'registrationUrl', type: 'text', label: 'Anmelde-URL' },
            { name: 'location', type: 'text', label: 'Ort' },
            { name: 'participants', type: 'text', label: 'Teilnehmende' },
            { name: 'duration', type: 'text', label: 'Dauer' },
            { name: 'price', type: 'text', label: 'Preis / Kostenbeitrag' },
          ],
        },
        {
          label: 'Dialog',
          fields: [
            {
              name: 'dialogType',
              type: 'select',
              label: 'Dialog-Typ',
              defaultValue: 'details',
              options: [
                { label: 'Standard (Details)', value: 'details' },
                { label: 'Einzelsitzung (langer Text)', value: 'session' },
                { label: 'Canva Embed', value: 'canva' },
                { label: 'Kennenlernabend', value: 'kennenlernabend' },
              ],
              admin: { description: 'Bestimmt den Inhalt des Detaildialogs.' },
            },
            {
              name: 'canvaUrl',
              type: 'text',
              label: 'Canva-Link',
              admin: {
                description:
                  'Canva-Link einfügen (z. B. https://www.canva.com/design/xxx/yyy/view). Er wird automatisch als eingebettetes Fenster angezeigt.',
              },
            },
            {
              name: 'dialogContent',
              type: 'richText',
              label: 'Dialog-Inhalt (Freitext)',
              editor: contentEditor,
              admin: { description: 'Optionaler Fließtext für den Detaildialog.' },
            },
          ],
        },
      ],
    },

    // ── Sidebar: what is on the website, and when it disappears ──────────────────────────────
    {
      name: 'hidden',
      type: 'checkbox',
      label: 'Auf der Website verstecken',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Angehakt = das Angebot erscheint nicht auf der Website, bleibt aber hier gespeichert. Zum Einblenden wieder abhaken.',
      },
    },
    {
      name: 'eventDate',
      type: 'date',
      label: 'Event-Datum (automatisch ausblenden)',
      index: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
        description:
          'Optional. Bei mehreren Terminen: das letzte Datum. Das Angebot verschwindet automatisch um Mitternacht nach diesem Tag. Leer lassen für Angebote ohne Ende, z. B. Einzelsitzungen.',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      required: true,
      defaultValue: 'workshop',
      options: [
        { label: 'Einzelangebot', value: 'individual' },
        { label: 'Workshop / Gruppe', value: 'workshop' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Reihenfolge',
      index: true,
      admin: { position: 'sidebar', description: 'Niedrigere Zahl = wird zuerst angezeigt.' },
    },

    // ── Computed on read, never stored ───────────────────────────────────────────────────────
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Wird ausgeblendet ab',
      virtual: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm' },
        condition: (data) => Boolean(data?.eventDate),
        description: 'Wird aus dem Event-Datum berechnet (Mitternacht, Zeitzone Berlin).',
      },
      hooks: {
        afterRead: [({ siblingData }) => expiresAtFor((siblingData as { eventDate?: string }).eventDate)],
      },
    },
    {
      name: 'visibility',
      type: 'text',
      label: 'Auf der Website',
      virtual: true,
      admin: { position: 'sidebar', readOnly: true },
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            const doc = siblingData as { _status?: string; hidden?: boolean; eventDate?: string }
            return visibilityLabels[visibilityOf({ ...doc, expiresAt: expiresAtFor(doc.eventDate) })]
          },
        ],
      },
    },
    lastSavedByField,
  ],
}
