import Image from "next/image"
import { Link } from "@/components/navigation/Link"
import { MetadataChips } from "@/components/drupal/shared/MetadataChips"
import { RawHtml } from "@/components/drupal/shared/RawHtml"
import { Section } from "@/components/drupal/shared/Section"
import type { DrupalPerson } from "@/types"

export function Person({ node }: { node: DrupalPerson }) {
  return (
    <article className="grid gap-8 md:grid-cols-[240px_1fr] items-start">
      {node.photo?.url ? (
        <Image
          src={node.photo.url}
          width={node.photo.width || 480}
          height={node.photo.height || 480}
          alt={node.photo.alt ?? node.title}
          className="rounded-lg"
          priority
        />
      ) : null}
      <div>
        <h1 className="mb-1 text-4xl md:text-5xl font-black">{node.title}</h1>
        {node.jobTitle ? (
          <div className="text-lg text-gray-700">{node.jobTitle}</div>
        ) : null}
        {node.department?.name ? (
          <div className="text-sm text-gray-500">{node.department.name}</div>
        ) : null}

        <MetadataChips label="Expertise" terms={node.expertise} />

        {node.bio?.processed ? (
          <Section title="Bio">
            <RawHtml
              html={node.bio.processed}
              className="prose max-w-none"
            />
          </Section>
        ) : null}

        {(node.linkedin?.url || node.github?.url || node.website?.url) && (
          <div className="flex gap-4 mt-6 text-sm">
            {node.linkedin?.url ? (
              <Link href={node.linkedin.url} className="underline">
                LinkedIn
              </Link>
            ) : null}
            {node.github?.url ? (
              <Link href={node.github.url} className="underline">
                GitHub
              </Link>
            ) : null}
            {node.website?.url ? (
              <Link href={node.website.url} className="underline">
                Website
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </article>
  )
}
