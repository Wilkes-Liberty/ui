// Drupal GraphQL data shapes.
// Note: In a real-world app, you'll probably use a type generator to create
// these from your GraphQL schema. Field-level nullability matches what
// graphql_compose returns when a field is missing or not yet enabled.

export type NodesPath = {
  nodes: {
    path: string
  }[]
}

export type Image = {
  width: number
  height: number
  url: string
  alt?: string | null
}

export type Author = {
  name: string
}

export type Link = {
  url: string
  title: string | null
}

export type ProcessedText = {
  processed: string
}

export type TaxonomyTermRef = {
  __typename?: string
  name: string
}

export type RelatedNode = {
  __typename?: string
  title?: string | null
  path?: string | null
  summary?: ProcessedText | null
}

// ── Node types — existing ───────────────────────────────────────────────────

export type DrupalPage = {
  __typename: "NodePage"
  id: string
  status: boolean
  title: string
  path: string
  body?: ProcessedText | null
  metaDescription?: string | null
  seoTitle?: string | null
}

export type DrupalArticle = {
  __typename: "NodeArticle"
  id: string
  status: boolean
  title: string
  path: string
  author?: Author | null
  body?: ProcessedText | null
  created: {
    time: string
  }
  image?: Image | null
  summary?: ProcessedText | null
  metaDescription?: string | null
  seoTitle?: string | null
}

// ── Node types — new (8 unwired) ────────────────────────────────────────────

export type NodeCommonFields = {
  id: string
  status: boolean
  title: string
  path: string
  body?: ProcessedText | null
  summary?: ProcessedText | null
  heroImage?: Image | null
  socialImage?: Image | null
  metaDescription?: string | null
  seoTitle?: string | null
  primaryCta?: Link | null
  secondaryCta?: Link | null
  breadcrumbLabel?: string | null
  industries?: TaxonomyTermRef[] | null
  personas?: TaxonomyTermRef[] | null
  targetSectors?: TaxonomyTermRef[] | null
}

export type DrupalProduct = NodeCommonFields & {
  __typename: "NodeProduct"
  missionImpact?: ProcessedText | null
  defenseRelevance?: ProcessedText | null
  sovereigntyFeatures?: ProcessedText | null
  deploymentOptions?: string[] | null
  keyCapabilities?: DrupalParagraph[] | null
  related?: RelatedNode[] | null
}

export type DrupalService = NodeCommonFields & {
  __typename: "NodeService"
  missionImpact?: ProcessedText | null
  defenseRelevance?: ProcessedText | null
  keyCapabilities?: DrupalParagraph[] | null
  related?: RelatedNode[] | null
}

export type DrupalSolution = NodeCommonFields & {
  __typename: "NodeSolution"
  missionImpact?: ProcessedText | null
  keyCapabilities?: DrupalParagraph[] | null
  outcomes?: DrupalParagraph[] | null
  related?: RelatedNode[] | null
}

export type DrupalCaseStudy = NodeCommonFields & {
  __typename: "NodeCaseStudy"
  outcomes?: DrupalParagraph[] | null
  related?: RelatedNode[] | null
}

export type DrupalResource = NodeCommonFields & {
  __typename: "NodeResource"
  resourceType?: TaxonomyTermRef | string | null
}

export type SmartDate = {
  value?: string | null
  endValue?: string | null
  timezone?: string | null
  rrule?: number | null
}

export type DrupalEvent = NodeCommonFields & {
  __typename: "NodeEvent"
  eventDate?: SmartDate | null
  eventType?: TaxonomyTermRef | string | null
}

export type DrupalCareer = NodeCommonFields & {
  __typename: "NodeCareer"
  applyUrl?: Link | null
  jobLocation?: string | null
  jobType?: string | null
  department?: TaxonomyTermRef | null
  seniority?: TaxonomyTermRef | null
  remotePolicy?: string | null
  clearanceLevel?: string | null
  veteranFriendly?: boolean | null
}

export type DrupalPerson = {
  __typename: "NodePerson"
  id: string
  status: boolean
  title: string
  path: string
  bio?: ProcessedText | null
  jobTitle?: string | null
  photo?: Image | null
  department?: TaxonomyTermRef | null
  expertise?: TaxonomyTermRef[] | null
  linkedin?: Link | null
  github?: Link | null
  website?: Link | null
  showInDirectory?: boolean | null
  metaDescription?: string | null
  seoTitle?: string | null
  socialImage?: Image | null
  summary?: ProcessedText | null
}

export type DrupalNode =
  | DrupalPage
  | DrupalArticle
  | DrupalProduct
  | DrupalService
  | DrupalSolution
  | DrupalCaseStudy
  | DrupalResource
  | DrupalEvent
  | DrupalCareer
  | DrupalPerson

// ── Paragraph types ─────────────────────────────────────────────────────────

export type ParagraphHero = {
  __typename: "ParagraphPHero"
  heroTitle: string | null
  subtitle: ProcessedText | null
}

export type ParagraphTextBlock = {
  __typename: "ParagraphPTextBlock"
  body: ProcessedText | null
}

export type ParagraphNotice = {
  __typename: "ParagraphPNotice"
  noticeTitle: string
  noticeTone: "success" | "warning" | "info" | "danger"
}

export type ParagraphCtaBanner = {
  __typename: "ParagraphPCtaBanner"
  ctaLinks: Link[] | null
}

export type ParagraphCapability = {
  __typename: "ParagraphCapability"
  capabilityTitle?: string | null
  capabilityDescription?: ProcessedText | null
  missionBenefit?: string | null
  icon?: Image | null
}

export type ParagraphUseCase = {
  __typename: "ParagraphUseCase"
  useCaseTitle?: string | null
  sector?: TaxonomyTermRef | null
  challenge?: ProcessedText | null
  solution?: ProcessedText | null
  results?: ProcessedText | null
}

export type ParagraphOutcome = {
  __typename: "ParagraphOutcome"
  metricValue?: string | null
  metricLabel?: string | null
  missionBenefit?: string | null
}

export type ParagraphFeature = {
  __typename: "ParagraphPFeature"
  title?: string | null
  body?: ProcessedText | null
  icon?: Image | null
}

export type ParagraphStat = {
  __typename: "ParagraphPStat"
  title?: string | null
  value?: string | null
  suffix?: string | null
}

export type ParagraphTestimonial = {
  __typename: "ParagraphPTestimonial"
  quote?: ProcessedText | null
  attribution?: string | null
}

export type ParagraphTextImage = {
  __typename: "ParagraphPTextImage"
  title?: string | null
  body?: ProcessedText | null
  media?: Image | null
}

export type ParagraphImageGallery = {
  __typename: "ParagraphPImageGallery"
  title?: string | null
  galleryImages?: Image[] | null
}

export type ParagraphLogoWall = {
  __typename: "ParagraphPLogoWall"
  logos?: Image[] | null
}

export type ParagraphFaqItem = {
  __typename: "ParagraphPFaqItem"
  title?: string | null
  body?: ProcessedText | null
}

export type ParagraphFaqGroup = {
  __typename: "ParagraphPFaqGroup"
  title?: string | null
  items?: ParagraphFaqItem[] | null
}

export type DrupalParagraph =
  | ParagraphHero
  | ParagraphTextBlock
  | ParagraphNotice
  | ParagraphCtaBanner
  | ParagraphCapability
  | ParagraphUseCase
  | ParagraphOutcome
  | ParagraphFeature
  | ParagraphStat
  | ParagraphTestimonial
  | ParagraphTextImage
  | ParagraphImageGallery
  | ParagraphLogoWall
  | ParagraphFaqGroup
  | ParagraphFaqItem

export type DrupalLandingPage = {
  __typename: "NodeLandingPage"
  id: string
  title: string
  components: DrupalParagraph[]
}
