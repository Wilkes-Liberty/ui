import type { DrupalMedia, Image } from "@/types"

// graphql_compose returns image fields as a MediaUnion. Only MediaImage
// carries a usable image; non-image variants resolve to null here.
export function mediaToImage(media?: DrupalMedia | null): Image | null {
  if (!media) return null
  if (media.__typename === "MediaImage") return media.mediaImage
  return null
}
