import { getMenu, STATIC_MAIN_NAV } from "@/lib/queries/menu"
import { NavBar } from "@/components/navigation/NavBar"

/**
 * HeaderNav — async Server Component.
 *
 * Fetches the main navigation menu from Drupal via graphql_compose_menus.
 * Falls back to STATIC_MAIN_NAV if Drupal is unreachable (e.g. cold boot or
 * Docker build time when runtime secrets are not yet injected).
 */
export async function HeaderNav() {
  const menu = await getMenu("MAIN")
  const items = menu?.items?.length ? menu.items : STATIC_MAIN_NAV

  return (
    <header>
      <NavBar items={items} />
    </header>
  )
}
