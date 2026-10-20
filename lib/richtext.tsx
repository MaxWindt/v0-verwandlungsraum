import { createElement, Fragment, type ReactNode } from 'react'

import type { LexicalNode, RichTextData } from '@/lib/content-types'

// Lexical text format bit flags.
const BOLD = 1
const ITALIC = 2
const STRIKE = 4
const UNDERLINE = 8
const CODE = 16

const HEADINGS = new Set(['h2', 'h3', 'h4', 'h5', 'h6'])

/** Only plain web links: relative paths, anchors, http(s), mailto and tel. Anything else (javascript:, data:) is dropped. */
function safeHref(url: string | undefined): string | undefined {
  if (!url) return undefined
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url.trim()) ? url.trim() : undefined
}

function renderText(node: LexicalNode, key: number): ReactNode {
  let out: ReactNode = node.text ?? ''
  const format = typeof node.format === 'number' ? node.format : 0
  if (format & CODE) out = <code>{out}</code>
  if (format & STRIKE) out = <s>{out}</s>
  if (format & UNDERLINE) out = <u>{out}</u>
  if (format & ITALIC) out = <em>{out}</em>
  if (format & BOLD) out = <strong>{out}</strong>
  return <Fragment key={key}>{out}</Fragment>
}

type ListClasses = { bullet?: string; number?: string }

function renderNode(node: LexicalNode, key: number, lists?: ListClasses): ReactNode {
  const children = () => (node.children ?? []).map((child, i) => renderNode(child, i, lists))

  switch (node.type) {
    case 'text':
      return renderText(node, key)
    case 'linebreak':
      return <br key={key} />
    case 'paragraph':
      // An empty paragraph is a deliberate blank line in the editor.
      return <p key={key}>{node.children?.length ? children() : <br />}</p>
    case 'heading': {
      const tag = node.tag && HEADINGS.has(node.tag) ? node.tag : 'h3'
      return createElement(tag, { key }, children())
    }
    case 'quote':
      return <blockquote key={key}>{children()}</blockquote>
    case 'list': {
      const ordered = node.listType === 'number'
      const className = (ordered ? lists?.number : lists?.bullet) || undefined
      return createElement(ordered ? 'ol' : 'ul', { key, className }, children())
    }
    case 'listitem':
      return <li key={key}>{children()}</li>
    case 'link':
    case 'autolink': {
      const href = safeHref(node.fields?.url)
      if (!href) return <Fragment key={key}>{children()}</Fragment>
      const external = /^https?:\/\//i.test(href)
      const newTab = node.fields?.newTab ?? external
      return (
        <a key={key} href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
          {children()}
        </a>
      )
    }
    default:
      // Unknown node types (none are enabled in the editors) render their text content only.
      return node.children ? <Fragment key={key}>{children()}</Fragment> : null
  }
}

/** Renders the rich text of the CMS (Lexical JSON). Plain HTML elements, styled by the surrounding `prose` classes. */
export function RichText({ data, lists }: { data: RichTextData | null | undefined; lists?: ListClasses }) {
  const children = data?.root?.children
  if (!children?.length) return null
  return <>{children.map((node, i) => renderNode(node, i, lists))}</>
}

export function hasRichText(data: RichTextData | null | undefined): data is RichTextData {
  return Boolean(data?.root?.children?.length)
}
