'use client'

import { Button } from '@payloadcms/ui'
import { useState } from 'react'

/**
 * Dashboard panel explaining how publishing works, with a manual
 * "rebuild" button for when something didn't show up on the website.
 */
export const RebuildWebsite = () => {
  const [status, setStatus] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')

  const rebuild = async () => {
    setStatus('busy')
    try {
      const res = await fetch('/api/rebuild', { method: 'POST', credentials: 'include' })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 'var(--style-radius-m)',
        padding: 'calc(var(--base) * 1.2)',
        marginBottom: 'calc(var(--base) * 1.5)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Willkommen! So funktioniert das Veröffentlichen</h3>
      <p>
        Deine Änderungen an <strong>Angeboten</strong> werden automatisch als <strong>Entwurf</strong> gespeichert. Die
        Vorschau (Augen-Symbol) zeigt den Entwurf so, wie er auf der Website aussehen wird. Erst mit{' '}
        <strong>Veröffentlichen</strong> ändert sich die öffentliche Website – etwa 1–2 Minuten später. Änderungen an den{' '}
        <strong>Seiteninhalten</strong> gehen mit <strong>Speichern</strong> direkt online.
      </p>
      <p>
        <strong>Verstecken:</strong> Hake bei einem Angebot „Auf der Website verstecken“ an und veröffentliche es erneut –
        das Angebot bleibt gespeichert, ist aber nicht mehr sichtbar. <strong>Event-Datum:</strong> Mit einem Datum
        verschwindet ein Angebot am Tag danach um Mitternacht von selbst.
      </p>
      <p style={{ marginBottom: 'calc(var(--base) * 0.8)' }}>
        Änderung nach ein paar Minuten nicht sichtbar? Dann kannst du die Website manuell neu aufbauen:
      </p>
      <Button buttonStyle="secondary" disabled={status === 'busy'} onClick={rebuild} size="small">
        {status === 'busy' ? 'Wird gestartet …' : 'Website jetzt neu aufbauen'}
      </Button>
      {status === 'done' && <p>Neuaufbau gestartet. Die Website ist in 1–2 Minuten aktualisiert.</p>}
      {status === 'error' && <p style={{ color: 'var(--theme-error-500)' }}>Der Neuaufbau konnte nicht gestartet werden.</p>}
    </div>
  )
}
