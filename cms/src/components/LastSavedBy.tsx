'use client'

import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Adds "Last saved by: <editor>" to the Status / Last Modified / Created row at the top of the edit page.
 * Payload has no slot for that row, so this (rendered next to the document controls) inserts one list item into it.
 */
export const LastSavedBy = () => {
  const anchor = useRef<HTMLSpanElement>(null)
  const [meta, setMeta] = useState<Element | null>(null)
  const { savedDocumentData } = useDocumentInfo()
  const formValue = useFormFields(([fields]) => fields?.lastSavedBy?.value)
  // savedDocumentData follows every save, including autosaves; the form value is the fallback while it is empty.
  const name = (savedDocumentData?.lastSavedBy as string | undefined) || (formValue as string | undefined)

  useEffect(() => {
    setMeta(anchor.current?.closest('.doc-controls')?.querySelector('.doc-controls__meta') ?? null)
  }, [])

  return (
    <>
      <span ref={anchor} hidden />
      {meta && name
        ? createPortal(
            <li className="doc-controls__list-item doc-controls__value-wrap">
              <p className="doc-controls__label">Zuletzt gespeichert von:&nbsp;</p>
              <p className="doc-controls__value">{name}</p>
            </li>,
            meta,
          )
        : null}
    </>
  )
}
