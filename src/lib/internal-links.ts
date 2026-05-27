import { getDb } from "./db";
import { articles } from "@/db/schema";
import { eq, and, desc, notLike, not } from "drizzle-orm";

/**
 * Get related articles for internal linking.
 * Excludes current article, test articles, and low-trust content.
 */
export async function getRelatedArticlesForLinking(
  currentSlug: string,
  categoryId: string | null,
  limit = 3
) {
  const { db } = await getDb();

  const conditions = [
    eq(articles.status, "published"),
    not(eq(articles.slug, currentSlug)),
    notLike(articles.slug, "%test%"),
    notLike(articles.title, "%Test%"),
  ];

  if (categoryId) {
    conditions.push(eq(articles.categoryId, categoryId));
  }

  return db
    .select({
      title: articles.title,
      slug: articles.slug,
      excerpt: articles.excerpt,
      heroImageUrl: articles.heroImageUrl,
    })
    .from(articles)
    .where(and(...conditions))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

/**
 * Get editorial policy links for trust signals
 */
export function getEditorialLinks() {
  return [
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Fact-Checking Policy", href: "/fact-checking-policy" },
    { label: "Corrections Policy", href: "/corrections-policy" },
    { label: "Methodology", href: "/methodology" },
  ];
}
