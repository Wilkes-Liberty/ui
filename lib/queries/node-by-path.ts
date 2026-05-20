import { drupal } from "@/lib/drupal"
import type { DrupalNode } from "@/types"

// Field selections reused across the new node bundles.
const PARAGRAPH_FRAGMENTS = `
  __typename
  ... on ParagraphPHero { heroTitle: title subtitle { processed } }
  ... on ParagraphPTextBlock { body { processed } }
  ... on ParagraphPNotice { noticeTitle: title noticeTone }
  ... on ParagraphPCtaBanner { ctaLinks { url title } }
  ... on ParagraphCapability {
    capabilityTitle
    capabilityDescription { processed }
    missionBenefit
    icon { url width height alt }
  }
  ... on ParagraphUseCase {
    useCaseTitle
    sector { name }
    challenge { processed }
    solution { processed }
    results { processed }
  }
  ... on ParagraphOutcome {
    metricValue
    metricLabel
    missionBenefit
  }
  ... on ParagraphPFeature {
    title
    body { processed }
    icon { url width height alt }
  }
  ... on ParagraphPStat { title value suffix }
  ... on ParagraphPTestimonial {
    quote { processed }
    attribution
  }
  ... on ParagraphPTextImage {
    title
    body { processed }
    media { url width height alt }
  }
  ... on ParagraphPImageGallery {
    title
    galleryImages { url width height alt }
  }
  ... on ParagraphPLogoWall {
    logos { url width height alt }
  }
  ... on ParagraphPFaqGroup {
    title
    items {
      __typename
      ... on ParagraphPFaqItem { title body { processed } }
    }
  }
`

const COMMON_NODE_FIELDS = `
  id
  status
  title
  path
  body { processed }
  summary { processed }
  metaDescription
  seoTitle
  breadcrumbLabel
  heroImage { url width height alt }
  socialImage { url width height alt }
  primaryCta { url title }
  secondaryCta { url title }
  industries { name }
  personas { name }
`

const NODE_BY_PATH_QUERY = `
  query NodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          __typename
          ... on NodeArticle {
            id
            status
            title
            path
            author { name }
            body { processed }
            created { time }
            image { url width height alt }
            summary { processed }
            metaDescription
            seoTitle
          }
          ... on NodePage {
            id
            status
            title
            path
            body { processed }
            metaDescription
            seoTitle
          }
          ... on NodeProduct {
            ${COMMON_NODE_FIELDS}
            missionImpact { processed }
            defenseRelevance { processed }
            sovereigntyFeatures { processed }
            deploymentOptions
            targetSectors { name }
            keyCapabilities { ${PARAGRAPH_FRAGMENTS} }
          }
          ... on NodeService {
            ${COMMON_NODE_FIELDS}
            missionImpact { processed }
            defenseRelevance { processed }
            keyCapabilities { ${PARAGRAPH_FRAGMENTS} }
          }
          ... on NodeSolution {
            ${COMMON_NODE_FIELDS}
            missionImpact { processed }
            keyCapabilities { ${PARAGRAPH_FRAGMENTS} }
            outcomes { ${PARAGRAPH_FRAGMENTS} }
          }
          ... on NodeCaseStudy {
            ${COMMON_NODE_FIELDS}
            targetSectors { name }
            outcomes { ${PARAGRAPH_FRAGMENTS} }
          }
          ... on NodeResource {
            ${COMMON_NODE_FIELDS}
            resourceType { name }
            externalUrl { url title }
          }
          ... on NodeEvent {
            ${COMMON_NODE_FIELDS}
            eventDate { value endValue timezone }
            eventType { name }
          }
          ... on NodeCareer {
            id
            status
            title
            path
            body { processed }
            summary { processed }
            metaDescription
            seoTitle
            heroImage { url width height alt }
            primaryCta { url title }
            secondaryCta { url title }
            applyUrl { url title }
            jobLocation
            jobType
            department { name }
            seniority { name }
            remotePolicy
            clearanceLevel
            veteranFriendly
          }
          ... on NodePerson {
            id
            status
            title
            path
            bio { processed }
            jobTitle
            photo { url width height alt }
            department { name }
            expertise { name }
            linkedin { url title }
            github { url title }
            website { url title }
            showInDirectory
            metaDescription
            seoTitle
            socialImage { url width height alt }
            summary { processed }
          }
        }
      }
    }
  }
`

export async function getNodeByPath(
  slug: string[]
): Promise<DrupalNode | null> {
  const path = `/${slug.join("/")}`
  try {
    const data = await drupal.query<{ route: { entity: DrupalNode } | null }>({
      query: NODE_BY_PATH_QUERY,
      variables: { path },
    })
    return data?.route?.entity ?? null
  } catch (err) {
    console.error(`getNodeByPath(${path}) failed:`, err)
    return null
  }
}
