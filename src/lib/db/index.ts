import { createDb } from "@db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Get the database instance based on the current environment.
 * In production, it uses the Cloudflare D1 binding.
 * In development, it uses the Miniflare/Wrangler local D1 state.
 */
export async function getDb() {
  const context = await getCloudflareContext({ async: true });
  const d1 = context.env.D1 as D1Database;
  
  if (!d1) {
    throw new Error("D1 Database binding 'D1' not found in Cloudflare context.");
  }

  return createDb(d1);
}
