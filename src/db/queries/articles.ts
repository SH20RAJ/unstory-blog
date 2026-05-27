import { eq, desc, and, or, like, not, count, sql, asc, notLike, gt } from "drizzle-orm";
import { articles, authors, categories, mediaAssets, articleSources, sources } from "../schema";

export function createArticlesQueries(db: any) {
  return {
    async getArticleCount(status = "published", categorySlug?: string) {
      let q = db.select({ value: count() }).from(articles);
      const conditions = [eq(articles.status, status)];
      
      if (categorySlug) {
        const cat = await db.select().from(categories).where(eq(categories.slug, categorySlug)).limit(1);
        if (cat[0]) {
          conditions.push(eq(articles.categoryId, cat[0].id));
        }
      }
      
      const res = await q.where(and(...conditions));
      return res[0]?.value || 0;
    },

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
          heroImageUrl: articles.heroImageUrl,
        })
        .from(articles)
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .leftJoin(authors, eq(articles.authorId, authors.id))
        .where(and(eq(articles.status, "published"), notLike(articles.slug, "%test%"), notLike(articles.title, "%Test%"), notLike(articles.slug, "%demo%"), notLike(articles.slug, "%sample%")))
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
        .where(eq(articles.slug, slug))
        .limit(1);
      
      if (!results[0]) return null;

      // Fetch sources for this article
      const articleSourcesList = await db
        .select({
          id: sources.id,
          name: sources.name,
          url: sources.url,
          sourceType: sources.sourceType,
        })
        .from(articleSources)
        .innerJoin(sources, eq(articleSources.sourceId, sources.id))
        .where(eq(articleSources.articleId, results[0].articles.id));
      
      return {
        ...results[0],
        sources: articleSourcesList
      };
    },

    async getPublicArticleBySlug(slug: string) {
      const results = await db
        .select()
        .from(articles)
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .leftJoin(authors, eq(articles.authorId, authors.id))
        .where(
          and(
            eq(articles.slug, slug),
            eq(articles.status, "published"),
            notLike(articles.slug, "%test%"),
            notLike(articles.title, "%Test%"),
            notLike(articles.slug, "%demo%"),
            notLike(articles.slug, "%sample%"),
          )
        )
        .limit(1);

      if (!results[0]) return null;

      // Fetch sources for this article
      const articleSourcesList = await db
        .select({
          id: sources.id,
          name: sources.name,
          url: sources.url,
          sourceType: sources.sourceType,
        })
        .from(articleSources)
        .innerJoin(sources, eq(articleSources.sourceId, sources.id))
        .where(eq(articleSources.articleId, results[0].articles.id));

      return {
        ...results[0],
        sources: articleSourcesList
      };
    },

    async getArticlesByCategory(categorySlug: string, limit = 10, offset = 0) {
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
          heroImageUrl: articles.heroImageUrl,
        })
        .from(articles)
        .innerJoin(categories, eq(articles.categoryId, categories.id))
        .where(
          and(
            eq(categories.slug, categorySlug),
            eq(articles.status, "published"),
            notLike(articles.slug, "%test%"),
            notLike(articles.title, "%Test%"),
            notLike(articles.slug, "%demo%"),
            notLike(articles.slug, "%sample%"),
          )
        )
        .orderBy(desc(articles.publishedAt))
        .limit(limit)
        .offset(offset);
    },

    async getRelatedArticles(currentSlug: string, categoryId: string | null, limit = 3) {
      if (!categoryId) return [];
      
      return db
        .select({
          id: articles.id,
          title: articles.title,
          slug: articles.slug,
          publishedAt: articles.publishedAt,
          heroImageUrl: articles.heroImageUrl,
          category: {
            name: categories.name,
            slug: categories.slug,
          }
        })
        .from(articles)
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .where(
          and(
            eq(articles.categoryId, categoryId),
            eq(articles.status, "published"),
            not(eq(articles.slug, currentSlug)),
            notLike(articles.slug, "%test%"),
            notLike(articles.title, "%Test%"),
            notLike(articles.slug, "%demo%"),
            notLike(articles.slug, "%sample%"),
            gt(articles.trustScore, 69),
          )
        )
        .orderBy(desc(articles.publishedAt))
        .limit(limit);
    },

    async getTrendingArticles(limit = 5) {
      return db
        .select({
          id: articles.id,
          title: articles.title,
          slug: articles.slug,
          publishedAt: articles.publishedAt,
          heroImageUrl: articles.heroImageUrl,
        })
        .from(articles)
        .where(
          and(
            eq(articles.status, "published"),
            eq(articles.isTrending, true),
            notLike(articles.slug, "%test%"),
            notLike(articles.title, "%Test%"),
          )
        )
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
            notLike(articles.slug, "%test%"),
            notLike(articles.title, "%Test%"),
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

    async getPrevNextArticles(publishedAt: Date) {
      const prev = await db
        .select({ title: articles.title, slug: articles.slug })
        .from(articles)
        .where(and(eq(articles.status, "published"), sql`${articles.publishedAt} < ${publishedAt.getTime()}`))
        .orderBy(desc(articles.publishedAt))
        .limit(1);

      const next = await db
        .select({ title: articles.title, slug: articles.slug })
        .from(articles)
        .where(and(eq(articles.status, "published"), sql`${articles.publishedAt} > ${publishedAt.getTime()}`))
        .orderBy(asc(articles.publishedAt))
        .limit(1);

      return {
        prev: prev[0] || null,
        next: next[0] || null,
      };
    },

    async deleteArticle(id: string) {
      return db.delete(articles).where(eq(articles.id, id)).returning();
    },

    async getAdminArticles(status?: string, categoryId?: string, limit = 50) {
      const conditions = [];
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
