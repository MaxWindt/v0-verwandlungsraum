import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const toolbars = () => [FixedToolbarFeature(), InlineToolbarFeature()]

// Links inside texts point to any URL (the website has a single page, so there are no internal targets).
const link = () => LinkFeature({ enabledCollections: [] })

/** Short texts without lists: titles, intros, disclaimers. */
export const simpleEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    link(),
    ...toolbars(),
  ],
})

/** Body texts of the page and the offer dialogs: formatting, links, lists and sub-headings. */
export const contentEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    link(),
    UnorderedListFeature(),
    OrderedListFeature(),
    ...toolbars(),
  ],
})
