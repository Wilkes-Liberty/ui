import Image from "next/image"
import { drupalHtml } from "@/lib/drupal-html"
import type { Image as DrupalImage, ProcessedText } from "@/types"

interface NodeHeroProps {
  title: string
  eyebrow?: string | null
  summary?: ProcessedText | string | null
  heroImage?: DrupalImage | null
}

export function NodeHero({ title, eyebrow, summary, heroImage }: NodeHeroProps) {
  const summaryHtml =
    typeof summary === "string" ? summary : summary?.processed ?? null
  const html = drupalHtml(summaryHtml)

  return (
    <header className="mb-10">
      {eyebrow ? (
        <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="mb-4 text-5xl md:text-6xl font-black leading-tight">
        {title}
      </h1>
      {html ? (
        <div
          className="mt-4 text-xl text-gray-700 leading-relaxed prose"
          dangerouslySetInnerHTML={html}
        />
      ) : null}
      {heroImage?.url ? (
        <figure className="mt-8">
          <Image
            src={heroImage.url}
            width={heroImage.width || 1280}
            height={heroImage.height || 720}
            alt={heroImage.alt ?? ""}
            priority
            className="rounded-lg"
          />
        </figure>
      ) : null}
    </header>
  )
}
