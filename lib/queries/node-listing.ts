import { drupal } from "@/lib/drupal"

export type ListingNode = {
  id: string
  title: string
  path: string
  summary?: { processed: string } | null
}

export type ListingResult = {
  nodes: ListingNode[]
}

// One bundle == one root GraphQL field. graphql_compose pluralizes the
// bundle name to camelCase (e.g. node `product` → `nodeProducts`).
const ROOT_FIELDS = {
  product: "nodeProducts",
  service: "nodeServices",
  solution: "nodeSolutions",
  case_study: "nodeCaseStudies",
  resource: "nodeResources",
  event: "nodeEvents",
  career: "nodeCareers",
  person: "nodePersons",
} as const

export type ListingBundle = keyof typeof ROOT_FIELDS

const PAGE_SIZE = 20

export async function getNodeListing(
  bundle: ListingBundle
): Promise<ListingResult> {
  const root = ROOT_FIELDS[bundle]
  const query = `
    query {
      ${root}(first: ${PAGE_SIZE}, sortKey: CREATED_AT, reverse: true) {
        nodes {
          id
          title
          path
          summary { processed }
        }
      }
    }
  `
  try {
    const data = await drupal.query<Record<string, { nodes: ListingNode[] }>>({
      query,
    })
    return { nodes: data?.[root]?.nodes ?? [] }
  } catch (err) {
    console.error(`getNodeListing(${bundle}) failed:`, err)
    return { nodes: [] }
  }
}
