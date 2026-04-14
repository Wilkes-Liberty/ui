import type { ParagraphCtaBanner } from "@/types"

/**
 * CTA banner paragraph — used on the landing page for the contact email link.
 * Renders all CTA links inline within the .landing-contact wrapper.
 */
export function CtaBannerParagraph({ data }: { data: ParagraphCtaBanner }) {
  const links = data.ctaLinks ?? []
  if (links.length === 0) return null
  return (
    <div className="landing-contact">
      {links.map((link, i) => (
        <a key={i} href={link.url}>
          {link.title || link.url}
        </a>
      ))}
    </div>
  )
}
