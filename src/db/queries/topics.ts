import { eq, desc, or, like, count } from "drizzle-orm";
import { topics } from "../schema";

export function createTopicsQueries(db: any) {
  return {
    async getTopicCount() {
      const res = await db.select({ value: count() }).from(topics);
      return res[0]?.value || 0;
    },

    async getAllTopics() {
      return db.select().from(topics).orderBy(topics.name);
    },

    async getTopicBySlug(slug: string) {
      const results = await db
        .select()
        .from(topics)
        .where(eq(topics.slug, slug))
        .limit(1);
      return results[0] || null;
    },

    async getTrendingTopics(limit = 10) {
      return db
        .select()
        .from(topics)
        .where(eq(topics.isTrending, true))
        .orderBy(desc(topics.trendingScore))
        .limit(limit);
    },

    async getTopicsByCategory(categoryId: string) {
      return db
        .select()
        .from(topics)
        .where(eq(topics.categoryId, categoryId))
        .orderBy(desc(topics.trendingScore));
    },

    async createTopic(data: any) {
      return db.insert(topics).values(data).returning();
    },

    async updateTopic(id: string, data: any) {
      return db.update(topics).set({ ...data, updatedAt: new Date() }).where(eq(topics.id, id)).returning();
    }
  };
}
