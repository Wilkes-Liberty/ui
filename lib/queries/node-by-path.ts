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
    icon {
      __typename
      ... on MediaImage { mediaImage { url width height alt } }
    }
  }
  ... on ParagraphUseCase {
    useCaseTitle
    sector { ... on TermInterface { name } }
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
    icon {
      __typename
      ... on MediaImage { mediaImage { url width height alt } }
    }
  }
  ... on ParagraphPStat { title value suffix }
  ... on ParagraphPTestimonial {
    quote { processed }
    attribution
  }
  ... on ParagraphPTextImage {
    title
    body { processed }
    media {
      __typename
      ... on MediaImage { mediaImage { url width height alt } }
    }
  }
  ... on ParagraphPImageGallery {
    title
    galleryImages {
      __typename
      ... on MediaImage { mediaImage { url width height alt } }
    }
  }
  ... on ParagraphPLogoWall {
    logos {
      __typename
      ... on MediaImage { mediaImage { url width height alt } }
    }
  }
  ... on ParagraphPFaqGroup {
    title
    items {
      __typename
      ... on ParagraphPFaqItem { title body { processed } }
    }
  }
`

// NodeCaseStudy lacks `personas` in graphql_compose, so personas is added
// per-bundle below rather than baked into COMMON_NODE_FIELDS.
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
  heroImage {
    __typename
    ... on MediaImage { mediaImage { url width height alt } }
  }
  socialImage {
    __typename
    ... on MediaImage { mediaImage { url width height alt } }
  }
  primaryCta { url title }
  secondaryCta { url title }
  industries { ... on TermInterface { name } }
`

const PERSONAS_FIELD = `personas { ... on TermInterface { name } }`

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
            # TODO(webcms): NodeArticle does not expose summary,
            # metaDescription, or seoTitle via graphql_compose. Restore
            # selections once the schema gap is closed.
          }
          # TODO(webcms): basic_page (NodeBasicPage) is not exposed by
          # graphql_compose, so we cannot render basic pages here.
          ... on NodeProduct {
            ${COMMON_NODE_FIELDS}
            ${PERSONAS_FIELD}
            missionImpact { processed }
            defenseRelevance { processed }
            sovereigntyFeatures { processed }
            deploymentOptions
            targetSectors { ... on TermInterface { name } }
            # TODO(webcms): NodeProduct.keyCapabilities is [ParagraphUnion!]!
            # but Service/Solution have [ParagraphUnion!]. Aliased here to
            # avoid the field-merge conflict until the bundles agree.
            productCapabilities: keyCapabilities { ${PARAGRAPH_FRAGMENTS} }
          }
          ... on NodeService {
            ${COMMON_NODE_FIELDS}
            ${PERSONAS_FIELD}
            # TODO(webcms): missionImpact is declared NON_NULL in the
            # schema but the DB allows null, causing the resolver to
            # throw Internal server error. Drop until the schema or data
            # is reconciled.
            defenseRelevance { processed }
            keyCapabilities { ${PARAGRAPH_FRAGMENTS} }
          }
          ... on NodeSolution {
            ${COMMON_NODE_FIELDS}
            ${PERSONAS_FIELD}
            # TODO(webcms): see NodeService missionImpact note above.
            keyCapabilities { ${PARAGRAPH_FRAGMENTS} }
            outcomes { ${PARAGRAPH_FRAGMENTS} }
          }
          ... on NodeCaseStudy {
            ${COMMON_NODE_FIELDS}
            targetSectors { ... on TermInterface { name } }
            outcomes { ${PARAGRAPH_FRAGMENTS} }
          }
          ... on NodeResource {
            ${COMMON_NODE_FIELDS}
            ${PERSONAS_FIELD}
            resourceType { ... on TermInterface { name } }
          }
          ... on NodeEvent {
            ${COMMON_NODE_FIELDS}
            ${PERSONAS_FIELD}
            # TODO(webcms): expose the smart_date field on NodeEvent via
            # graphql_compose. The schema currently has no eventDate field.
            eventType { ... on TermInterface { name } }
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
            heroImage {
              __typename
              ... on MediaImage { mediaImage { url width height alt } }
            }
            primaryCta { url title }
            secondaryCta { url title }
            applyUrl { url title }
            jobLocation
            jobType
            department { ... on TermInterface { name } }
            seniority { ... on TermInterface { name } }
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
            department { ... on TermInterface { name } }
            expertise { ... on TermInterface { name } }
            linkedin { url title }
            github { url title }
            website { url title }
            showInDirectory
            metaDescription
            seoTitle
            socialImage {
              __typename
              ... on MediaImage { mediaImage { url width height alt } }
            }
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
