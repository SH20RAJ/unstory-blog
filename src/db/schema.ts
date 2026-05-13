import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, index, uniqueIndex, primaryKey, type AnySQLiteTable } from "drizzle-orm/sqlite-core";

// ============================================
// Authors
// ============================================
export const authors = sqliteTable("authors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  twitterUrl: text("twitter_url"),
  linkedinUrl: text("linkedin_url"),
  websiteUrl: text("website_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// ============================================
// Categories
// ============================================
export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  parentId: text("parent_id").references((): AnySQLiteTable => categories.id),
  priority: integer("priority").default(0),
  navLabel: text("nav_label"),
  color: text("color"),
  icon: text("icon"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// ============================================
// Topics
// ============================================
export const topics = sqliteTable("topics", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  categoryId: text("category_id").references(() => categories.id),
  trendingScore: integer("trending_score").default(0),
  isTrending: integer("is_trending", { mode: "boolean" }).default(false),
  aliases: text("aliases"), // Comma separated
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// ============================================
// Tags
// ============================================
export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// ============================================
// Entities
// ============================================
export const entities = sqliteTable("entities", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(), // person, company, product, etc.
  description: text("description"),
  imageId: text("image_id"),
  officialUrl: text("official_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// ============================================
// Sources
// ============================================
export const sources = sqliteTable("sources", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url"),
  sourceType: text("source_type"),
  reliabilityRating: integer("reliability_rating"),
  country: text("country"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// ============================================
// Media Assets
// ============================================
export const mediaAssets = sqliteTable("media_assets", {
  id: text("id").primaryKey(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  r2Key: text("r2_key").notNull(),
  publicUrl: text("public_url").notNull(),
  altText: text("alt_text"),
  credit: text("credit"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// ============================================
// Articles
// ============================================
export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  subtitle: text("subtitle"),
  excerpt: text("excerpt"),
  body: text("body").notNull(), // Markdown
  status: text("status").notNull().default("draft"), // idea, draft, needs_review, fact_checking, seo_review, ready, scheduled, published, archived, rejected
  contentType: text("content_type").notNull().default("news"), // news, analysis, explainer, opinion, roundup, fact_check, interview, review, guide
  categoryId: text("category_id").references(() => categories.id),
  authorId: text("author_id").references(() => authors.id),
  heroImageId: text("hero_image_id").references(() => mediaAssets.id),
  canonicalUrl: text("canonical_url"),
  sourceUrl: text("source_url"),
  language: text("language").default("en"),
  region: text("region"),
  isBreaking: integer("is_breaking", { mode: "boolean" }).default(false),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  isTrending: integer("is_trending", { mode: "boolean" }).default(false),
  trustScore: integer("trust_score").default(100),
  factCheckStatus: text("fact_check_status").default("unverified"),
  aiSummary: text("ai_summary"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => {
  return {
    slugIndex: uniqueIndex("articles_slug_idx").on(table.slug),
    statusIndex: index("articles_status_idx").on(table.status),
    categoryIndex: index("articles_category_idx").on(table.categoryId),
    authorIndex: index("articles_author_idx").on(table.authorId),
    publishedAtIndex: index("articles_published_at_idx").on(table.publishedAt),
  }
});

// ============================================
// Junction Tables (Many-to-Many)
// ============================================

export const articleTopics = sqliteTable("article_topics", {
  articleId: text("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  topicId: text("topic_id").notNull().references(() => topics.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.topicId] }),
}));

export const articleTags = sqliteTable("article_tags", {
  articleId: text("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.tagId] }),
}));

export const articleEntities = sqliteTable("article_entities", {
  articleId: text("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  entityId: text("entity_id").notNull().references(() => entities.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.entityId] }),
}));

export const articleSources = sqliteTable("article_sources", {
  articleId: text("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  sourceId: text("source_id").notNull().references(() => sources.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.sourceId] }),
}));

// End of schema
