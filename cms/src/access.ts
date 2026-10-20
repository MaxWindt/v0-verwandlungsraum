import type { Access } from 'payload'

export const anyone: Access = () => true

/** Logged-in editors see drafts; the public (and the website build) only sees published docs. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
