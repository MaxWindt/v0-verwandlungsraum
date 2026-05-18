import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure'
import { presentationTool, defineDocuments, defineLocations } from 'sanity/presentation'
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
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Inhalte')
          .items([
            S.listItem()
              .title('Seiteneinstellungen')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('be017460-24c5-4a73-90f1-e6ba5f94c94f')
              ),
            S.divider(),
            S.listItem()
              .title('Angebote')
              .schemaType('offer')
              .child(
                S.documentList()
                  .title('Angebote')
                  .schemaType('offer')
                  .filter('_type == "offer"')
              ),
          ]),
    }),
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "siteSettings"`,
          },
        ]),
        locations: {
          siteSettings: defineLocations({
            select: {},
            resolve: () => ({
              locations: [{ title: 'Startseite', href: '/' }],
            }),
          }),
          offer: defineLocations({
            select: { title: 'title' },
            resolve: (doc) => ({
              locations: [{ title: doc?.title ?? 'Angebot', href: '/' }],
            }),
          }),
        },
      },
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
