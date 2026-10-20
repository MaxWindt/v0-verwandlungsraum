import { Gutter, Link, Pill, SetDocumentStepNav, Table } from '@payloadcms/ui'
import { formatDate } from '@payloadcms/ui/shared'
import type { CollectionSlug, DocumentViewServerProps } from 'payload'
import { formatAdminURL } from 'payload/shared'

type Version = {
  id: number | string
  updatedAt: string
  autosave?: boolean | null
  version: { _status?: 'draft' | 'published' | null; lastSavedBy?: string | null }
}

/**
 * The "Versions" tab of offers: Payload's own table plus a "Saved by" column.
 * Angebote behalten höchstens 30 Versionen (see `maxPerDoc`), so everything fits on one screen.
 */
export const VersionsWithEditor = async ({ initPageResult }: DocumentViewServerProps) => {
  const { collectionConfig, docID, req } = initPageResult
  if (!collectionConfig || docID === undefined) return null

  const { payload, i18n, user } = req
  const adminRoute = payload.config.routes.admin
  const dateFormat = payload.config.admin.dateFormat

  const { docs } = await payload.findVersions({
    collection: collectionConfig.slug as CollectionSlug,
    where: { parent: { equals: docID } },
    sort: '-updatedAt',
    limit: 50,
    depth: 0,
    overrideAccess: false,
    user,
    req,
  })
  const versions = docs as unknown as Version[]
  const currentlyPublished = versions.find((v) => v.version._status === 'published')

  const pluralLabel =
    typeof collectionConfig.labels.plural === 'string' ? collectionConfig.labels.plural : collectionConfig.slug

  const heading = (label: string) => <span>{label}</span>
  const columns = [
    {
      accessor: 'updatedAt',
      active: true,
      field: { name: '', type: 'date' as const },
      Heading: heading('Gespeichert am'),
      renderedCells: versions.map((v) => (
        <Link
          key={v.id}
          href={formatAdminURL({
            adminRoute,
            path: `/collections/${collectionConfig.slug}/${docID}/versions/${v.id}`,
          })}
          prefetch={false}
        >
          {formatDate({ date: v.updatedAt, i18n, pattern: dateFormat })}
        </Link>
      )),
    },
    {
      accessor: 'lastSavedBy',
      active: true,
      field: { name: '', type: 'text' as const },
      Heading: heading('Gespeichert von'),
      renderedCells: versions.map((v) => <span key={v.id}>{v.version.lastSavedBy || '–'}</span>),
    },
    {
      accessor: 'id',
      active: true,
      field: { name: '', type: 'text' as const },
      Heading: heading('Versions-ID'),
      renderedCells: versions.map((v) => <span key={v.id}>{v.id}</span>),
    },
    {
      accessor: '_status',
      active: true,
      field: { name: '', type: 'text' as const },
      Heading: heading('Status'),
      renderedCells: versions.map((v) => {
        const published = v.version._status === 'published'
        return (
          <div key={v.id} style={{ display: 'flex', gap: 'calc(var(--base) / 4)', flexWrap: 'wrap' }}>
            {v.autosave && <Pill size="small">Autosave</Pill>}
            <Pill size="small" pillStyle={published && v.id === currentlyPublished?.id ? 'success' : 'light'}>
              {published ? (v.id === currentlyPublished?.id ? 'Aktuell veröffentlicht' : 'Veröffentlicht') : 'Entwurf'}
            </Pill>
          </div>
        )
      }),
    },
  ]

  return (
    <>
      <SetDocumentStepNav
        collectionSlug={collectionConfig.slug}
        id={docID}
        pluralLabel={pluralLabel}
        useAsTitle={collectionConfig.admin.useAsTitle}
        view={i18n.t('version:versions')}
      />
      <main className="versions">
        <Gutter className="versions__wrap">
          {versions.length === 0 ? (
            <div className="versions__no-versions">{i18n.t('version:noFurtherVersionsFound')}</div>
          ) : (
            <Table columns={columns} data={versions} />
          )}
        </Gutter>
      </main>
    </>
  )
}
