import { ParagraphRenderer } from "@/components/drupal/paragraphs/ParagraphRenderer"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { mediaToImage } from "@/lib/drupal-media"
import type { DrupalLandingPage } from "@/types"

/**
 * LandingPage — renders a NodeLandingPage entity.
 *
 * Rendering order:
 *   1. If `components` paragraphs exist, they are rendered in order via
 *      ParagraphRenderer. The first component is often a ParagraphPHero
 *      that replaces the standard NodeHero — the hero paragraph handles
 *      its own full-bleed layout.
 *   2. If no components exist, fall back to NodeHero + ProseBody so the
 *      page isn't blank while content is being built out.
 */
export function LandingPage({ node }: { node: DrupalLandingPage }) {
  const hasComponents = node.components && node.components.length > 0
  const firstIsHero =
    hasComponents && node.components![0].__typename === "ParagraphPHero"

  return (
    <article>
      {/* Show NodeHero only when the first component isn't already a hero paragraph */}
      {!firstIsHero && (
        <NodeHero
          title={node.title}
          summary={node.summary}
          heroImage={mediaToImage(node.heroImage)}
        />
      )}

      {hasComponents ? (
        <div className="space-y-0">
          {node.components!.map((paragraph, i) => (
            <ParagraphRenderer key={i} paragraph={paragraph} />
          ))}
        </div>
      ) : (
        <ProseBody body={node.body} />
      )}
    </article>
  )
}
