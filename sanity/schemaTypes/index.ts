import { type SchemaTypeDefinition } from 'sanity'
import { offerType } from './offer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [offerType],
}
