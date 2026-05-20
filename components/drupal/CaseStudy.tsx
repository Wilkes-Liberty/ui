import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { MetadataChips } from "@/components/drupal/shared/MetadataChips"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { Section } from "@/components/drupal/shared/Section"
import { OutcomeParagraph } from "@/components/drupal/paragraphs/OutcomeParagraph"
import type { DrupalCaseStudy, ParagraphOutcome } from "@/types"

export function CaseStudy({ node }: { node: DrupalCaseStudy }) {
  return (
    <article>
      <NodeHero
        eyebrow="Case study"
        title={node.title}
        summary={node.summary}
        heroImage={node.heroImage}
      />
      <MetadataChips label="Industries" terms={node.industries} />
      <MetadataChips label="Target sectors" terms={node.targetSectors} />

      {node.outcomes?.length ? (
        <Section title="Outcomes">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {node.outcomes.map((p, i) =>
              p.__typename === "ParagraphOutcome" ? (
                <OutcomeParagraph key={i} data={p as ParagraphOutcome} />
              ) : null
            )}
          </div>
        </Section>
      ) : null}

      <ProseBody body={node.body} />

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
