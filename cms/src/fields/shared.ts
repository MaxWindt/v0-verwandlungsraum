import type { TextField } from 'payload'

/**
 * Name of the editor who made this save (draft, autosave or publish). It is stored on every version,
 * so the version history shows who changed what. Only visible to signed-in editors.
 */
export const lastSavedByField: TextField = {
  name: 'lastSavedBy',
  type: 'text',
  label: 'Zuletzt gespeichert von',
  access: { read: ({ req }) => Boolean(req.user) },
  admin: {
    position: 'sidebar',
    readOnly: true,
    description: 'Wird bei jedem Speichern automatisch gesetzt.',
  },
  hooks: {
    // Saves from scripts (no signed-in user) keep the previous value.
    beforeChange: [
      ({ req, value }) => {
        const user = req.user as { name?: string | null; email?: string } | null
        return user ? user.name || user.email : value
      },
    ],
  },
}

/** Admin components that show who saved a document: in the top row of the edit page and in the Versions tab. */
export const editComponents = {
  edit: { beforeDocumentControls: ['@/components/LastSavedBy#LastSavedBy'] },
  views: { edit: { versions: { Component: '@/components/VersionsWithEditor#VersionsWithEditor' } } },
}
