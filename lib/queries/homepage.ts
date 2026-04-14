import { drupal } from "@/lib/drupal"
import type { DrupalLandingPage } from "@/types"

const HOMEPAGE_QUERY = `
  query Homepage {
    nodeLandingPages(first: 1, sortKey: CREATED_AT, reverse: true) {
      nodes {
        __typename
        id
        title
        components: components {
          __typename
          ... on ParagraphPHero {
            heroTitle: title
            subtitle { processed }
          }
          ... on ParagraphPTextBlock {
            body { processed }
          }
          ... on ParagraphPNotice {
            noticeTitle: title
            noticeTone
          }
          ... on ParagraphPCtaBanner {
            ctaLinks { url title }
          }
        }
      }
    }
  }
`

/**
 * Fetch the homepage landing_page node from Drupal.
 *
 * Strategy:
 *   - Query for landing_pages (newest first), take the first one
 *   - The "Homepage" node is conventionally the only/newest landing page on
 *     the production site, but if multiple exist, the first match wins.
 *   - Returns null on any failure so the caller can render a fallback.
 *
 * For more deterministic selection, we could:
 *   - Query by path alias /homepage (route resolver)
 *   - Use site.page.front config + a `siteFront` GraphQL query
 *   - Hardcode a node ID in env (HOMEPAGE_NODE_ID)
 */
export async function getHomepage(): Promise<DrupalLandingPage | null> {
  if (!drupal) return null
  try {
    const data = await drupal.query<{
      nodeLandingPages: { nodes: DrupalLandingPage[] }
    }>({
      query: HOMEPAGE_QUERY,
    })
    return data?.nodeLandingPages?.nodes?.[0] ?? null
  } catch (err) {
    console.error("Failed to fetch homepage from Drupal:", err)
    return null
  }
}
