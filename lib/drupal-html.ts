// Helper that returns the React-required object for inlining HTML that
// came from Drupal's text format pipeline (already sanitized).
//
// Centralizing this lets the security-review hook flag a single trust boundary
// instead of every render site, and documents why we're rendering server HTML
// directly: Drupal's "Headless Clean", "Headless Plain AI", and "Plain Text"
// text formats strip/escape unsafe markup before returning `processed`.
export function drupalHtml(processed: string | null | undefined) {
  if (!processed) return null
  return { __html: processed }
}
