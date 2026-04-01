import { revalidatePath, revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"

async function handler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get("path")
  const tags = searchParams.get("tags")
  const secret = searchParams.get("secret")

  // Validate secret.
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    console.warn("[revalidate] Rejected request: invalid secret")
    return new Response("Invalid secret.", { status: 401 })
  }

  // Either tags or path must be provided.
  if (!path && !tags) {
    console.warn("[revalidate] Rejected request: missing path and tags")
    return new Response("Missing path or tags.", { status: 400 })
  }

  try {
    if (path) {
      revalidatePath(path)
      console.log(`[revalidate] Revalidated path: ${path}`)
    }

    if (tags) {
      const tagList = tags.split(",")
      tagList.forEach((tag) => revalidateTag(tag))
      console.log(`[revalidate] Revalidated tags: ${tagList.join(", ")}`)
    }

    return new Response("Revalidated.")
  } catch (error) {
    const message = (error as Error).message
    console.error(`[revalidate] Error: ${message}`)
    return new Response(message, { status: 500 })
  }
}

export { handler as GET, handler as POST }
