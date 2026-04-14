import type { DrupalLandingPage } from "@/types"

const HOMEPAGE_QUERY = `
  query Homepage {
    nodeLandingPages(first: 1, sortKey: CREATED_AT, reverse: true) {
      nodes {
        __typename
        id
        title
        components {
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
 * We do a direct unauthenticated POST to /graphql rather than going through
 * the NextDrupalGraphQL OAuth client because:
 *   1. The Homepage is public, anonymous-readable content
 *   2. OAuth credentials may not be set during build/SSG (NextDrupalBase
 *      throws if base URL is missing, OAuth client requires creds)
 *   3. This keeps the landing page's resilience guarantee — it should
 *      render even if OAuth setup is incomplete
 *
 * Returns null on any failure so the caller renders the hardcoded fallback.
 */
export async function getHomepage(): Promise<DrupalLandingPage | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? process.env.DRUPAL_BASE_URL
  if (!baseUrl) return null

  try {
    const res = await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: HOMEPAGE_QUERY }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    const json = (await res.json()) as {
      data?: { nodeLandingPages?: { nodes?: DrupalLandingPage[] } }
      errors?: unknown
    }
    if (json.errors) {
      console.error("Homepage GraphQL errors:", json.errors)
      return null
    }
    return json.data?.nodeLandingPages?.nodes?.[0] ?? null
  } catch (err) {
    console.error("Failed to fetch homepage from Drupal:", err)
    return null
  }
}
