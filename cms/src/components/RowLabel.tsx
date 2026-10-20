'use client'

import { useRowLabel } from '@payloadcms/ui'

type Row = { label?: string; name?: string; heading?: string; from?: string; to?: string }

/** Shows an array row's label/name/heading instead of "Row 01". */
export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<Row>()
  return <span>{data?.label || data?.name || data?.heading || `Item ${(rowNumber ?? 0) + 1}`}</span>
}

export const RedirectRowLabel = () => {
  const { data, rowNumber } = useRowLabel<Row>()
  if (!data?.from) return <span>{`Redirect ${(rowNumber ?? 0) + 1}`}</span>
  return <span>{`${data.from} → ${data.to || '…'}`}</span>
}
