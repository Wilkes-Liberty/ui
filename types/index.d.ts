// Example data types.
// Note: In a real-world app, you'll probably use a type generator to create
// these from your GraphQL schema.

export type NodesPath = {
  nodes: {
    path: string
  }[]
}

export type Image = {
  width: number
  height: number
  url: string
}

export type Author = {
  name: string
}

export type DrupalPage = {
  __typename: "NodePage"
  id: string
  status: boolean
  title: string
  path: string
  body: {
    processed: string
  }
}

export type DrupalArticle = {
  __typename: "NodeArticle"
  id: string
  status: boolean
  title: string
  path: string
  author: Author
  body: {
    processed: string
  }
  created: {
    time: string
  }
  image: Image
}

// ── Paragraph types (subset used on the homepage) ───────────────────────────

export type ParagraphHero = {
  __typename: "ParagraphPHero"
  heroTitle: string | null
  subtitle: { processed: string } | null
}

export type ParagraphTextBlock = {
  __typename: "ParagraphPTextBlock"
  body: { processed: string } | null
}

export type ParagraphNotice = {
  __typename: "ParagraphPNotice"
  noticeTitle: string
  noticeTone: "success" | "warning" | "info" | "danger"
}

export type ParagraphCtaBanner = {
  __typename: "ParagraphPCtaBanner"
  ctaLinks: Array<{ url: string; title: string | null }> | null
}

export type DrupalParagraph =
  | ParagraphHero
  | ParagraphTextBlock
  | ParagraphNotice
  | ParagraphCtaBanner

export type DrupalLandingPage = {
  __typename: "NodeLandingPage"
  id: string
  title: string
  components: DrupalParagraph[]
}
