import { type SchemaTypeDefinition } from 'sanity'
import { offerType } from './offer'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [offerType, siteSettingsType],
}
