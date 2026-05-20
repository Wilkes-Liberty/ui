import { Link } from "@/components/navigation/Link"
import type { Link as DrupalLink } from "@/types"

interface CtaLinksProps {
  primary?: DrupalLink | null
  secondary?: DrupalLink | null
  className?: string
}

export function CtaLinks({ primary, secondary, className }: CtaLinksProps) {
  if (!primary?.url && !secondary?.url) return null
  return (
    <div className={`flex flex-wrap gap-3 my-8 ${className ?? ""}`.trim()}>
      {primary?.url && (
        <Link
          href={primary.url}
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 no-underline"
        >
          {primary.title || primary.url}
        </Link>
      )}
      {secondary?.url && (
        <Link
          href={secondary.url}
          className="inline-flex items-center px-6 py-3 border border-gray-600 rounded-full hover:bg-gray-100 no-underline"
        >
          {secondary.title || secondary.url}
        </Link>
      )}
    </div>
  )
}
