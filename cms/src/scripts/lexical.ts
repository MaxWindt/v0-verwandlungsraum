/**
 * Converts Sanity Portable Text (what the old Sanity Studio stored) into Lexical editor state,
 * which is what Payload stores. Used by the one-off Sanity → Payload migration.
 */
import crypto from 'crypto'

type Node = Record<string, unknown>

const FORMAT = { bold: 1, italic: 2, underline: 8 }

export const text = (value: string, format = 0): Node => ({
  type: 'text',
  text: value,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const element = (type: string, children: Node[], extra: Node = {}): Node => ({
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...extra,
})

export const paragraph = (children: Node[]) => element('paragraph', children, { textFormat: 0, textStyle: '' })

export type EditorState = {
  root: {
    type: string
    children: { type: string; version: number; [k: string]: unknown }[]
    direction: 'ltr' | 'rtl' | null
    format: ''
    indent: number
    version: number
  }
}

export const root = (children: Node[]) => ({ root: element('root', children) }) as unknown as EditorState

const link = (url: string, children: Node[]): Node =>
  element('link', children, {
    id: crypto.randomBytes(12).toString('hex'),
    version: 3,
    fields: { url, newTab: /^https?:\/\//.test(url), linkType: 'custom' },
  })

type PTSpan = { _type: string; text?: string; marks?: string[] }
type PTMarkDef = { _key: string; _type: string; href?: string }
type PTBlock = {
  _type: string
  style?: string
  listItem?: 'bullet' | 'number'
  level?: number
  children?: PTSpan[]
  markDefs?: PTMarkDef[]
  [key: string]: unknown
}

/** Portable Text spans → Lexical inline nodes (text, links, line breaks). */
function spansToNodes(block: PTBlock): Node[] {
  const out: Node[] = []
  for (const span of block.children || []) {
    if (span._type !== 'span' || !span.text) continue
    const marks = span.marks || []
    let format = 0
    if (marks.includes('strong')) format |= FORMAT.bold
    if (marks.includes('em')) format |= FORMAT.italic
    if (marks.includes('underline')) format |= FORMAT.underline

    let href: string | undefined
    for (const key of marks) {
      const def = (block.markDefs || []).find((m) => m._key === key)
      if (def?._type === 'link' && def.href) href = def.href
    }

    const nodes: Node[] = []
    span.text.split('\n').forEach((part, i) => {
      if (i > 0) nodes.push({ type: 'linebreak', version: 1 })
      if (part) nodes.push(text(part, format))
    })

    if (!href) {
      out.push(...nodes)
      continue
    }
    // Merge adjacent spans that share the same link into one link node.
    const last = out[out.length - 1]
    if (last?.type === 'link' && (last.fields as { url: string }).url === href) {
      ;(last.children as Node[]).push(...nodes)
    } else {
      out.push(link(href, nodes))
    }
  }
  return out
}

function listFromRun(run: PTBlock[]): Node {
  const baseLevel = run[0].level || 1
  const listType = run[0].listItem === 'number' ? 'number' : 'bullet'
  const items: Node[] = []
  let i = 0
  while (i < run.length) {
    if ((run[i].level || 1) > baseLevel) {
      const nested: PTBlock[] = []
      while (i < run.length && (run[i].level || 1) > baseLevel) nested.push(run[i++])
      items.push(element('listitem', [listFromRun(nested)], { value: items.length + 1 }))
      continue
    }
    items.push(element('listitem', spansToNodes(run[i]), { value: items.length + 1 }))
    i++
  }
  return element('list', items, { listType, tag: listType === 'number' ? 'ol' : 'ul', start: 1 })
}

// The editors here offer h3 and h4 only; anything bigger in the old content becomes h3.
const HEADING_TAGS: Record<string, string> = { h1: 'h3', h2: 'h3', h3: 'h3', h4: 'h4', h5: 'h4', h6: 'h4' }

/** Converts a whole Portable Text array to a Lexical editor state. Returns null for empty content. */
export function portableTextToLexical(blocks: PTBlock[] | undefined | null) {
  if (!Array.isArray(blocks)) return null
  const out: Node[] = []

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]

    if (b._type === 'block' && b.listItem) {
      const run: PTBlock[] = []
      while (i < blocks.length && blocks[i]._type === 'block' && blocks[i].listItem) run.push(blocks[i++])
      i--
      out.push(listFromRun(run))
      continue
    }

    if (b._type === 'block') {
      const children = spansToNodes(b)
      const style = b.style || 'normal'
      if (HEADING_TAGS[style]) out.push(element('heading', children, { tag: HEADING_TAGS[style] }))
      else if (style === 'blockquote') out.push(paragraph(children))
      else out.push(paragraph(children))
      continue
    }

    console.warn(`[lexical] Skipping unsupported Portable Text block "${b._type}"`)
  }

  // The old content used empty paragraphs as spacing. Paragraphs are spaced by the page's styling already,
  // and the website renders an empty paragraph as a visible blank line, so drop them.
  const content = out.filter((n) => !(n.type === 'paragraph' && (n.children as Node[]).length === 0))

  return content.length ? root(content) : null
}
