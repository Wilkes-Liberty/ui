import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { NodeRenderer } from "@/components/drupal/NodeRenderer"
import { getNodeByPath } from "@/lib/queries/node-by-path"
import { drupal } from "@/lib/drupal"
import type { Metadata, ResolvingMetadata } from "next"
import type { DrupalNode, NodesPath } from "@/types"

// All slugs are rendered on-demand — generateStaticParams returns [] at build
// time since Drupal is not available, and dynamicParams defaults to true.
export const dynamic = "force-dynamic"

type NodePageParams = {
  slug: string[]
}
type NodePageProps = {
  params: Promise<NodePageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function metaDescriptionFor(node: DrupalNode): string | undefined {
  if ("metaDescription" in node && node.metaDescription) {
    return node.metaDescription
  }
  if ("summary" in node && node.summary?.processed) {
    // Strip tags for a meta-description-safe string.
    return node.summary.processed.replace(/<[^>]+>/g, "").trim().slice(0, 300)
  }
  return undefined
}

function titleFor(node: DrupalNode): string {
  if ("seoTitle" in node && node.seoTitle) return node.seoTitle
  return node.title
}

export async function generateMetadata(
  { params }: NodePageProps,
  _: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const node = await getNodeByPath(slug)
  if (!node) return {}
  return {
    title: titleFor(node),
    description: metaDescriptionFor(node),
  }
}

export async function generateStaticParams(): Promise<NodePageParams[]> {
  // Fetch the paths for the first 50 articles.
  // We'll fall back to on-demand generation for the rest.
  // During Docker builds Drupal is not running, so we catch and return []
  // — all paths are rendered on-demand at runtime instead.
  // TODO(webcms): the basic_page bundle is not exposed by
  // graphql_compose, so basic-page paths are not pre-rendered here.
  try {
    const data = await drupal.query<{
      nodeArticles: NodesPath
    }>({
      query: `query {
        nodeArticles(first: 50) { nodes { path } }
      }`,
    })

    return (data?.nodeArticles?.nodes as { path: string }[])
      .map(({ path }) => ({ slug: path.split("/").filter(Boolean) }))
  } catch {
    return []
  }
}

export default async function Page({ params }: NodePageProps) {
  const { slug } = await params
  const draft = await draftMode()
  const isDraftMode = draft.isEnabled

  const node = await getNodeByPath(slug)
  if (!node) {
    notFound()
  }

  // If we're not in draft mode and the resource is not published, return a 404.
  if (!isDraftMode && node.status === false) {
    notFound()
  }

  return <NodeRenderer node={node} />
}
