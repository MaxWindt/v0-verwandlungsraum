import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Redakteur:in', plural: 'Redakteur:innen' },
  admin: {
    group: 'Einstellungen',
    hideAPIURL: true,
    useAsTitle: 'email',
  },
  // Standard Payload login with email and password. The first user is created on the admin's
  // "create first user" screen, further editors are added here.
  auth: true,
  fields: [{ name: 'name', type: 'text', label: 'Name' }],
}
