import { eq, desc, and, or, like, sql } from "drizzle-orm";
import { articles, authors, categories, mediaAssets, articleTopics, topics } from "../schema";

export function createArticlesQueries(db: any) {
  return {
    async getPublishedArticles(limit = 10, offset = 0) {
      return db
        .select({
          id: articles.id,
          title: articles.title,
          slug: articles.slug,
          excerpt: articles.excerpt,
          status: articles.status,
          contentType: articles.contentType,
          publishedAt: articles.publishedAt,
          category: {
            name: categories.name,
            slug: categories.slug,
          },
          author: {
            name: authors.name,
            avatarUrl: authors.avatarUrl,
          },
          heroImage: {
            publicUrl: mediaAssets.publicUrl,
            altText: mediaAssets.altText,
          },
        })
        .from(articles)
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .leftJoin(authors, eq(articles.authorId, authors.id))
        .leftJoin(mediaAssets, eq(articles.heroImageId, mediaAssets.id))
        .where(eq(articles.status, "published"))
        .orderBy(desc(articles.publishedAt))
        .limit(limit)
        .offset(offset);
    },

    async getArticleBySlug(slug: string) {
      const results = await db
        .select()
        .from(articles)
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .leftJoin(authors, eq(articles.authorId, authors.id))
        .leftJoin(mediaAssets, eq(articles.heroImageId, mediaAssets.id))
        .where(eq(articles.slug, slug))
        .limit(1);
      
      return results[0] || null;
    },

    async getArticlesByCategory(categorySlug: string, limit = 10) {
      return db
        .select()
        .from(articles)
        .innerJoin(categories, eq(articles.categoryId, categories.id))
        .where(and(eq(categories.slug, categorySlug), eq(articles.status, "published")))
        .orderBy(desc(articles.publishedAt))
        .limit(limit);
    },

    async getTrendingArticles(limit = 5) {
      return db
        .select()
        .from(articles)
        .where(and(eq(articles.status, "published"), eq(articles.isTrending, true)))
        .orderBy(desc(articles.publishedAt))
        .limit(limit);
    },

    async searchArticles(query: string, limit = 20) {
      const searchPattern = `%${query}%`;
      return db
        .select()
        .from(articles)
        .where(
          and(
            eq(articles.status, "published"),
            or(
              like(articles.title, searchPattern),
              like(articles.excerpt, searchPattern),
              like(articles.body, searchPattern)
            )
          )
        )
        .orderBy(desc(articles.publishedAt))
        .limit(limit);
    },

    async createArticle(data: any) {
      return db.insert(articles).values(data).returning();
    },

    async updateArticle(id: string, data: any) {
      return db.update(articles).set({ ...data, updatedAt: new Date() }).where(eq(articles.id, id)).returning();
    },

    async deleteArticle(id: string) {
      return db.delete(articles).where(eq(articles.id, id)).returning();
    },

    async getAdminArticles(status?: string, categoryId?: string, limit = 50) {
      let conditions = [];
      if (status) conditions.push(eq(articles.status, status));
      if (categoryId) conditions.push(eq(articles.categoryId, categoryId));
      
      const query = db.select().from(articles).orderBy(desc(articles.createdAt)).limit(limit);
      if (conditions.length > 0) {
        query.where(and(...conditions));
      }
      return query;
    }
  };
}
