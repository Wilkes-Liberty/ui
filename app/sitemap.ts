import type { MetadataRoute } from "next"
import { getNodeListing, type ListingBundle } from "@/lib/queries/node-listing"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://wilkesliberty.com"

const STATIC_ROUTES = [
  "/",
  "/contact",
  "/products",
  "/services",
  "/solutions",
  "/articles",
  "/case-studies",
  "/resources",
  "/events",
  "/careers",
  "/team",
]

const DYNAMIC_BUNDLES: ListingBundle[] = [
  "product",
  "service",
  "solution",
  "case_study",
  "resource",
  "event",
  "career",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }))

  // Dynamic content from Drupal (includes the new Solution nodes automatically)
  const dynamicEntries: MetadataRoute.Sitemap = []

  for (const bundle of DYNAMIC_BUNDLES) {
    try {
      const { nodes } = await getNodeListing(bundle)
      for (const node of nodes) {
        if (!node.path) continue
        const lastMod = node.changed?.timestamp
          ? new Date(node.changed.timestamp * 1000)
          : new Date()
        dynamicEntries.push({
          url: `${SITE_URL}${node.path}`,
          lastModified: lastMod,
          changeFrequency: "monthly",
          priority: bundle === "solution" ? 0.85 : 0.6,
        })
      }
    } catch (err) {
      console.error(`sitemap: failed to fetch ${bundle}`, err)
    }
  }

  return [...staticEntries, ...dynamicEntries]
}
