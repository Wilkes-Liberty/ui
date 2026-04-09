import { NextDrupalGraphQL } from "./next-drupal-graphql"

const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string
const clientId = process.env.DRUPAL_CLIENT_ID
const clientSecret = process.env.DRUPAL_CLIENT_SECRET

// Only pass auth when credentials are present — at Docker build time the
// runtime secrets (DRUPAL_CLIENT_ID / DRUPAL_CLIENT_SECRET) are not injected,
// so omitting them prevents NextDrupalBase from throwing during module init.
// At runtime, docker-compose injects the env vars and auth works normally.
export const drupal = new NextDrupalGraphQL(baseUrl, {
  ...(clientId && clientSecret
    ? { auth: { clientId, clientSecret } }
    : {}),
  // debug: true,
})
