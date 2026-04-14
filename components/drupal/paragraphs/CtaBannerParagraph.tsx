import Link from "next/link"
import type { ParagraphCtaBanner } from "@/types"

/**
 * CTA banner paragraph — used on the landing page for contact links.
 * Internal links (starting with /) use Next.js Link for client-side nav;
 * external/mailto links use a plain anchor.
 */
export function CtaBannerParagraph({ data }: { data: ParagraphCtaBanner }) {
  const links = data.ctaLinks ?? []
  if (links.length === 0) return null
  return (
    <div className="landing-contact">
      {links.map((link, i) => {
        const label = link.title || link.url
        const isInternal = link.url.startsWith("/") && !link.url.startsWith("//")
        if (isInternal) {
          return (
            <Link key={i} href={link.url}>
              {label}
            </Link>
          )
        }
        return (
          <a key={i} href={link.url}>
            {label}
          </a>
        )
      })}
    </div>
  )
}
