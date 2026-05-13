import { eq, asc } from "drizzle-orm";
import { categories } from "../schema";

export function createCategoriesQueries(db: any) {
  return {
    async getAllCategories() {
      return db.select().from(categories).orderBy(asc(categories.priority));
    },

    async getCategoryBySlug(slug: string) {
      const results = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, slug))
        .limit(1);
      return results[0] || null;
    },

    async getCategoryWithChildren(slug: string) {
      const parent = await this.getCategoryBySlug(slug);
      if (!parent) return null;

      const children = await db
        .select()
        .from(categories)
        .where(eq(categories.parentId, parent.id))
        .orderBy(asc(categories.priority));

      return { ...parent, children };
    },

    async createCategory(data: any) {
      return db.insert(categories).values(data).returning();
    },

    async updateCategory(id: string, data: any) {
      return db.update(categories).set({ ...data, updatedAt: new Date() }).where(eq(categories.id, id)).returning();
    }
  };
}
