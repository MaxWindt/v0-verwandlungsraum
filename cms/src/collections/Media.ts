import fs from 'node:fs/promises'
import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { anyone } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/rebuildSite'

// Workaround for client uploads to Vercel Blob: Payload writes the converted (WebP) original to
// a temp file and leaves req.file.data empty, but the Blob adapter only uploads the buffer, so
// the original ended up as a 0-byte file. Runs after processing, before the storage plugin's upload.
const loadProcessedOriginal: CollectionBeforeChangeHook = async ({ data, req }) => {
  const file = req.file
  // Same condition the cloud-storage plugin uses to decide it has to upload the file itself.
  if (file?.tempFilePath && !file.data?.length && !file.clientUploadContext) {
    file.data = await fs.readFile(file.tempFilePath)
    file.size = file.data.length
  }
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Medium', plural: 'Medien' },
  admin: {
    group: 'Inhalte',
    hideAPIURL: true,
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: { read: anyone },
  hooks: {
    beforeChange: [loadProcessedOriginal],
    // A fresh upload isn't on the website until an offer or the site content uses it (which rebuilds anyway).
    afterChange: [(args) => (args.operation === 'update' ? rebuildAfterChange(args) : args.doc)],
    afterDelete: [rebuildAfterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternativtext',
      admin: { description: 'Beschreibt das Bild für Menschen, die einen Screenreader nutzen.' },
    },
    
  ],
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    focalPoint: true,
    // Point straight at the stored thumbnail (Vercel Blob URL). With a string value Payload builds
    // an /api/media/file/... URL, which 500s because files aren't served through Payload.
    adminThumbnail: ({ doc }) => {
      const sizes = doc.sizes as { thumbnail?: { url?: string | null } } | undefined
      return sizes?.thumbnail?.url || (typeof doc.url === 'string' ? doc.url : null)
    },
    // Keep originals web-sized and in a modern format.
    resizeOptions: { width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true },
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, formatOptions: { format: 'webp' } },
      { name: 'card', width: 800, formatOptions: { format: 'webp' }, withoutEnlargement: true },
      { name: 'large', width: 1920, formatOptions: { format: 'webp' }, withoutEnlargement: true },
    ],
  },
}
