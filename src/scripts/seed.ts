import { drizzle } from "drizzle-orm/d1";
import { CATEGORIES } from "../config";
import * as schema from "../db/schema";
import { getPlatformProxy } from "wrangler";

async function main() {
  console.log("Starting seed...");
  
  // Get local D1 proxy
  const proxy = await getPlatformProxy();
  const d1 = proxy.env.D1 as unknown as D1Database;

  if (!d1) {
    throw new Error("Could not find D1 database binding.");
  }

  const db = drizzle(d1, { schema });
  
  console.log("Seeding categories...");
  for (const catConfig of CATEGORIES) {
    await db.insert(schema.categories).values({
      id: catConfig.slug,
      name: catConfig.name,
      slug: catConfig.slug,
      description: catConfig.description,
      navLabel: catConfig.navLabel,
      color: catConfig.color,
      icon: catConfig.icon,
      priority: catConfig.priority,
      seoTitle: catConfig.seoTitle,
      seoDescription: catConfig.seoDescription,
    }).onConflictDoUpdate({
      target: schema.categories.slug,
      set: {
        name: catConfig.name,
        description: catConfig.description,
        priority: catConfig.priority,
      }
    });

    for (const subConfig of catConfig.children) {
      await db.insert(schema.categories).values({
        id: subConfig.slug,
        name: subConfig.name,
        slug: subConfig.slug,
        description: subConfig.description,
        parentId: catConfig.slug,
        priority: subConfig.priority,
      }).onConflictDoUpdate({
        target: schema.categories.slug,
        set: {
          name: subConfig.name,
          description: subConfig.description,
          priority: subConfig.priority,
        }
      });
    }
  }

  console.log("Seeding author...");
  const authorId = "unstory-editorial";
  await db.insert(schema.authors).values({
    id: authorId,
    name: "Unstory Editorial",
    slug: "unstory-editorial",
    bio: "The official editorial voice of Unstory.app, delivering premium internet intelligence.",
  }).onConflictDoNothing();

  console.log("Seed complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
