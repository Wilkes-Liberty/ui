import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { Link } from "@/components/navigation/Link"
import type { DrupalResource } from "@/types"

function resourceTypeLabel(value: DrupalResource["resourceType"]): string | null {
  if (!value) return null
  if (typeof value === "string") return value
  return value.name ?? null
}

export function Resource({ node }: { node: DrupalResource }) {
  const resourceTypeText = resourceTypeLabel(node.resourceType)
  return (
    <article>
      <NodeHero
        eyebrow={resourceTypeText ?? "Resource"}
        title={node.title}
        summary={node.summary}
        heroImage={node.heroImage}
      />

      <ProseBody body={node.body} />

      {node.externalUrl?.url ? (
        <div className="my-6">
          <Link
            href={node.externalUrl.url}
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 no-underline"
          >
            {node.externalUrl.title || "Download resource"}
          </Link>
        </div>
      ) : null}

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
