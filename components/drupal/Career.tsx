import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { Section } from "@/components/drupal/shared/Section"
import { Link } from "@/components/navigation/Link"
import type { DrupalCareer } from "@/types"

interface MetaRow {
  label: string
  value: string | null | undefined
}

function CareerMeta({ rows }: { rows: MetaRow[] }) {
  const visible = rows.filter((r) => r.value)
  if (!visible.length) return null
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 my-6">
      {visible.map((r) => (
        <div key={r.label}>
          <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {r.label}
          </dt>
          <dd className="mt-1 text-gray-900">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Career({ node }: { node: DrupalCareer }) {
  return (
    <article>
      <NodeHero
        eyebrow={node.department?.name ?? "Careers"}
        title={node.title}
        summary={node.summary}
      />

      <CareerMeta
        rows={[
          { label: "Location", value: node.jobLocation },
          { label: "Type", value: node.jobType },
          { label: "Seniority", value: node.seniority?.name },
          { label: "Department", value: node.department?.name },
          { label: "Remote policy", value: node.remotePolicy },
          { label: "Clearance", value: node.clearanceLevel },
          {
            label: "Veteran friendly",
            value: node.veteranFriendly ? "Yes" : null,
          },
        ]}
      />

      <ProseBody body={node.body} />

      {node.applyUrl?.url ? (
        <Section>
          <Link
            href={node.applyUrl.url}
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 no-underline"
          >
            {node.applyUrl.title || "Apply for this role"}
          </Link>
        </Section>
      ) : null}

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
