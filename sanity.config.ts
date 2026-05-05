import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schema } from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'verwandlungsraum',
  title: 'Verwandlungsraum',
  projectId,
  dataset,
  basePath: '/studio',
  schema,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2025-01-01' }),
    presentationTool({
      previewUrl: {
        origin:
          typeof location !== 'undefined'
            ? location.origin
            : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000',
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
})
