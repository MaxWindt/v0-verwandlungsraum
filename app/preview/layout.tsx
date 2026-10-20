import type { Metadata } from 'next'
import type { ReactNode } from 'react'

// The editor preview is only meant for the CMS (it is shown inside the admin's Live Preview panel).
export const metadata: Metadata = {
  title: 'Vorschau | Verwandlungsraum',
  robots: { index: false, follow: false },
}

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children
}
