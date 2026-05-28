import Link from "next/link"
import { getMenu, STATIC_FOOTER_NAV } from "@/lib/queries/menu"
import type { MenuItem } from "@/lib/queries/menu"

/**
 * FooterNav — async Server Component.
 *
 * Fetches the footer menu from Drupal via graphql_compose_menus.
 * Falls back to STATIC_FOOTER_NAV if Drupal is unreachable.
 *
 * Renders a 6-column grid (Platforms / Services / Solutions /
 * Company / Resources / Legal) with section headings linking to
 * their hub pages.
 */
export async function FooterNav() {
  const menu = await getMenu("FOOTER")
  const columns = menu?.items?.length ? menu.items : STATIC_FOOTER_NAV

  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      {/* ── Column grid ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-screen-xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {columns.map((section) => (
            <FooterColumn key={section.id} section={section} />
          ))}
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-gray-500 sm:flex-row">
          <span>
            © {year}{" "}
            <Link href="/" className="font-medium text-gray-700 hover:text-gray-900">
              Wilkes &amp; Liberty, LLC
            </Link>
            . All rights reserved.
          </span>
          <nav aria-label="Legal links" className="flex gap-4">
            <Link href="/legal/privacy-policy"    className="hover:text-gray-700 hover:underline">Privacy</Link>
            <Link href="/legal/terms-of-service"  className="hover:text-gray-700 hover:underline">Terms</Link>
            <Link href="/legal/cookie-policy"     className="hover:text-gray-700 hover:underline">Cookies</Link>
            <Link href="/legal/accessibility-statement" className="hover:text-gray-700 hover:underline">Accessibility</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// FooterColumn — one section (heading + child links)
// ---------------------------------------------------------------------------

function FooterColumn({ section }: { section: MenuItem }) {
  return (
    <div>
      <Link
        href={section.internal ? normPath(section.url) : section.url}
        className="text-sm font-semibold text-gray-900 hover:text-gray-700"
      >
        {section.title}
      </Link>
      {section.children.length > 0 && (
        <ul className="mt-3 space-y-2">
          {section.children.map((child) => (
            <li key={child.id}>
              <Link
                href={child.internal ? normPath(child.url) : child.url}
                target={child.internal ? undefined : "_blank"}
                rel={child.internal ? undefined : "noopener noreferrer"}
                className="text-sm text-gray-500 hover:text-gray-900 hover:underline"
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strip 'internal:' prefix that Drupal adds to relative URLs. */
function normPath(url: string): string {
  return url.replace(/^internal:/, "")
}
