import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { mediaToImage } from "@/lib/drupal-media"
import type { DrupalPage } from "@/types"

export function BasicPage({ node }: { node: DrupalPage }) {
  return (
    <article>
      <NodeHero
        title={node.title}
        summary={node.summary}
        heroImage={mediaToImage(node.heroImage)}
      />

      <ProseBody body={node.body} />

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
