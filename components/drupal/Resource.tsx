import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import type { DrupalResource } from "@/types"

function resourceTypeLabel(value: DrupalResource["resourceType"]): string | null {
  if (!value) return null
  if (typeof value === "string") return value
  return value.name ?? null
}

// Note: the resource bundle has no external/download URL field in webcms.
// Use primaryCta/secondaryCta for any download links.
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

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
