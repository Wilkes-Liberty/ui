import { drupal } from "@/lib/drupal"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MenuItem = {
  id: string
  title: string
  description?: string | null
  url: string
  internal: boolean
  expanded: boolean
  children: MenuItem[]
}

export type MenuResult = {
  name: string
  items: MenuItem[]
}

// ---------------------------------------------------------------------------
// GraphQL query — three levels deep covers all nav structures
// ---------------------------------------------------------------------------

const MENU_FIELDS = `
  id
  title
  description
  url
  internal
  expanded
`

const MENU_QUERY = (name: "MAIN" | "FOOTER") => `
  query {
    menu(name: ${name}) {
      name
      items {
        ${MENU_FIELDS}
        children {
          ${MENU_FIELDS}
          children {
            ${MENU_FIELDS}
          }
        }
      }
    }
  }
`

export async function getMenu(
  name: "MAIN" | "FOOTER"
): Promise<MenuResult | null> {
  try {
    const data = await drupal.query<{ menu: MenuResult }>({
      query: MENU_QUERY(name),
    })
    return data?.menu ?? null
  } catch (err) {
    console.error(`getMenu(${name}) failed:`, err)
    return null
  }
}

// ---------------------------------------------------------------------------
// Static fallback — matches seed_menu.php exactly.
// Used when Drupal is unavailable (e.g. during Docker build or cold boot).
// ---------------------------------------------------------------------------

export const STATIC_MAIN_NAV: MenuItem[] = [
  {
    id: "static-solutions",
    title: "Solutions",
    url: "/solutions",
    internal: true,
    expanded: true,
    children: [
      {
        id: "static-dotedu",
        title: "DotEDU — Higher Education",
        url: "/solutions/dotedu",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-accord",
        title: "Accord — Nonprofit",
        url: "/solutions/accord",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-palisade",
        title: "Palisade — Privacy SaaS",
        url: "/solutions/palisade",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-bulkhead",
        title: "Bulkhead — Regulated Industries",
        url: "/solutions/bulkhead",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-dotgov",
        title: "DotGov — Federal Civilian",
        url: "/solutions/dotgov",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-gazette",
        title: "Gazette — IG Platforms",
        url: "/solutions/gazette",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-outpost",
        title: "Outpost — Defense Tech",
        url: "/solutions/outpost",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-software-factory",
        title: "Software Factory",
        url: "/solutions/software-factory",
        internal: true,
        expanded: false,
        children: [],
      },
    ],
  },
  {
    id: "static-platforms",
    title: "Platforms",
    url: "/platforms",
    internal: true,
    expanded: true,
    children: [
      {
        id: "static-sabal",
        title: "Sabal Infrastructure Platform",
        url: "/platforms/sabal",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-keel",
        title: "Keel CMS Platform",
        url: "/platforms/keel",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-alidade",
        title: "Alidade Search Platform",
        url: "/platforms/alidade",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-squawk",
        title: "Squawk Zero-Trust Identity Platform",
        url: "/platforms/squawk",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-manifest",
        title: "Manifest Data Platform",
        url: "/platforms/manifest",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-lighthouse",
        title: "Lighthouse Observability Platform",
        url: "/platforms/lighthouse",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-coquina",
        title: "Coquina Software Factory Platform",
        url: "/platforms/coquina",
        internal: true,
        expanded: false,
        children: [],
      },
    ],
  },
  {
    id: "static-services",
    title: "Services",
    url: "/services",
    internal: true,
    expanded: true,
    children: [
      {
        id: "static-infra-eng",
        title: "Private Infrastructure Engineering",
        url: "/services/private-infrastructure-engineering",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-zero-trust",
        title: "Zero-Trust Identity Consulting",
        url: "/services/zero-trust-identity-consulting",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-defense-tech",
        title: "Defense Technology Integration",
        url: "/services/defense-technology-integration",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-cms-impl",
        title: "Headless CMS Implementation",
        url: "/services/headless-cms-implementation",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-search-arch",
        title: "Enterprise Search Architecture",
        url: "/services/enterprise-search-architecture",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-ai",
        title: "AI Integration",
        url: "/services/ai-integration",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-digital-mod",
        title: "Digital Modernization",
        url: "/services/digital-modernization",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-custom-sw",
        title: "Custom Software Development",
        url: "/services/custom-software-development",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-integration-eng",
        title: "Integration Engineering",
        url: "/services/integration-engineering",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-digital-assets",
        title: "Digital Asset Solutions",
        url: "/services/digital-asset-solutions",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-intelligence",
        title: "Intelligence & Actionable Insights",
        url: "/services/intelligence-actionable-insights",
        internal: true,
        expanded: false,
        children: [],
      },
    ],
  },
  {
    id: "static-resources",
    title: "Resources",
    url: "/resources",
    internal: true,
    expanded: true,
    children: [
      {
        id: "static-case-studies",
        title: "Case Studies",
        url: "/case-studies",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-articles",
        title: "Articles & Insights",
        url: "/articles",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-downloads",
        title: "Downloads & Guides",
        url: "/resources",
        internal: true,
        expanded: false,
        children: [],
      },
      {
        id: "static-press",
        title: "Press",
        url: "/press",
        internal: true,
        expanded: false,
        children: [],
      },
    ],
  },
  {
    id: "static-about",
    title: "About",
    url: "/about",
    internal: true,
    expanded: false,
    children: [],
  },
  {
    id: "static-federal",
    title: "Federal",
    url: "/federal",
    internal: true,
    expanded: false,
    children: [],
  },
  {
    id: "static-contact",
    title: "Contact",
    url: "/contact",
    internal: true,
    expanded: false,
    children: [],
  },
]

// ---------------------------------------------------------------------------
// Static footer fallback — matches seed_menu.php footer definition exactly.
// ---------------------------------------------------------------------------

export const STATIC_FOOTER_NAV: MenuItem[] = [
  {
    id: "sf-platforms",
    title: "Platforms",
    url: "/platforms",
    internal: true,
    expanded: true,
    children: [
      { id: "sf-sabal",      title: "Sabal Infrastructure Platform",       url: "/platforms/sabal",      internal: true, expanded: false, children: [] },
      { id: "sf-keel",       title: "Keel CMS Platform",                   url: "/platforms/keel",       internal: true, expanded: false, children: [] },
      { id: "sf-alidade",    title: "Alidade Search Platform",             url: "/platforms/alidade",    internal: true, expanded: false, children: [] },
      { id: "sf-squawk",     title: "Squawk Zero-Trust Identity Platform", url: "/platforms/squawk",     internal: true, expanded: false, children: [] },
      { id: "sf-manifest",   title: "Manifest Data Platform",              url: "/platforms/manifest",   internal: true, expanded: false, children: [] },
      { id: "sf-lighthouse", title: "Lighthouse Observability Platform",   url: "/platforms/lighthouse", internal: true, expanded: false, children: [] },
      { id: "sf-coquina",    title: "Coquina Software Factory Platform",   url: "/platforms/coquina",    internal: true, expanded: false, children: [] },
    ],
  },
  {
    id: "sf-services",
    title: "Services",
    url: "/services",
    internal: true,
    expanded: true,
    children: [
      { id: "sf-infra-eng",     title: "Private Infrastructure Engineering", url: "/services/private-infrastructure-engineering", internal: true, expanded: false, children: [] },
      { id: "sf-zero-trust",    title: "Zero-Trust Identity Consulting",     url: "/services/zero-trust-identity-consulting",     internal: true, expanded: false, children: [] },
      { id: "sf-defense-tech",  title: "Defense Technology Integration",     url: "/services/defense-technology-integration",     internal: true, expanded: false, children: [] },
      { id: "sf-cms",           title: "Headless CMS Implementation",        url: "/services/headless-cms-implementation",        internal: true, expanded: false, children: [] },
      { id: "sf-search",        title: "Enterprise Search Architecture",     url: "/services/enterprise-search-architecture",     internal: true, expanded: false, children: [] },
      { id: "sf-ai",            title: "AI Integration",                     url: "/services/ai-integration",                     internal: true, expanded: false, children: [] },
      { id: "sf-digital-mod",   title: "Digital Modernization",              url: "/services/digital-modernization",              internal: true, expanded: false, children: [] },
      { id: "sf-custom-sw",     title: "Custom Software Development",        url: "/services/custom-software-development",        internal: true, expanded: false, children: [] },
      { id: "sf-integration",   title: "Integration Engineering",            url: "/services/integration-engineering",            internal: true, expanded: false, children: [] },
      { id: "sf-assets",        title: "Digital Asset Solutions",            url: "/services/digital-asset-solutions",            internal: true, expanded: false, children: [] },
      { id: "sf-intelligence",  title: "Intelligence & Actionable Insights", url: "/services/intelligence-actionable-insights",   internal: true, expanded: false, children: [] },
    ],
  },
  {
    id: "sf-solutions",
    title: "Solutions",
    url: "/solutions",
    internal: true,
    expanded: true,
    children: [
      { id: "sf-dotedu",    title: "DotEDU — Higher Education",       url: "/solutions/dotedu",           internal: true, expanded: false, children: [] },
      { id: "sf-accord",    title: "Accord — Nonprofit",              url: "/solutions/accord",           internal: true, expanded: false, children: [] },
      { id: "sf-palisade",  title: "Palisade — Privacy SaaS",         url: "/solutions/palisade",         internal: true, expanded: false, children: [] },
      { id: "sf-bulkhead",  title: "Bulkhead — Regulated Industries", url: "/solutions/bulkhead",         internal: true, expanded: false, children: [] },
      { id: "sf-dotgov",    title: "DotGov — Federal Civilian",       url: "/solutions/dotgov",           internal: true, expanded: false, children: [] },
      { id: "sf-gazette",   title: "Gazette — IG Platforms",          url: "/solutions/gazette",          internal: true, expanded: false, children: [] },
      { id: "sf-outpost",   title: "Outpost — Defense Tech",          url: "/solutions/outpost",          internal: true, expanded: false, children: [] },
      { id: "sf-swfactory", title: "Software Factory",                url: "/solutions/software-factory", internal: true, expanded: false, children: [] },
    ],
  },
  {
    id: "sf-company",
    title: "Company",
    url: "/about",
    internal: true,
    expanded: true,
    children: [
      { id: "sf-about",    title: "About",    url: "/about",    internal: true, expanded: false, children: [] },
      { id: "sf-contact",  title: "Contact",  url: "/contact",  internal: true, expanded: false, children: [] },
      { id: "sf-federal",  title: "Federal",  url: "/federal",  internal: true, expanded: false, children: [] },
      { id: "sf-partners", title: "Partners", url: "/partners", internal: true, expanded: false, children: [] },
    ],
  },
  {
    id: "sf-resources",
    title: "Resources",
    url: "/resources",
    internal: true,
    expanded: true,
    children: [
      { id: "sf-articles",   title: "Articles & Insights", url: "/articles",                   internal: true, expanded: false, children: [] },
      { id: "sf-cases",      title: "Case Studies",        url: "/case-studies",               internal: true, expanded: false, children: [] },
      { id: "sf-downloads",  title: "Downloads & Guides",  url: "/resources/downloads-guides", internal: true, expanded: false, children: [] },
      { id: "sf-press",      title: "Press",               url: "/press",                      internal: true, expanded: false, children: [] },
    ],
  },
  {
    id: "sf-legal",
    title: "Legal",
    url: "/legal/privacy-policy",
    internal: true,
    expanded: true,
    children: [
      { id: "sf-privacy",       title: "Privacy Policy",          url: "/legal/privacy-policy",          internal: true, expanded: false, children: [] },
      { id: "sf-terms",         title: "Terms of Service",        url: "/legal/terms-of-service",        internal: true, expanded: false, children: [] },
      { id: "sf-cookies",       title: "Cookie Policy",           url: "/legal/cookie-policy",           internal: true, expanded: false, children: [] },
      { id: "sf-accessibility", title: "Accessibility Statement", url: "/legal/accessibility-statement", internal: true, expanded: false, children: [] },
    ],
  },
]
