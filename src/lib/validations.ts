import { z } from "zod";
import { ARTICLE_STATUS_VALUES, CONTENT_TYPE_VALUES, FACT_CHECK_VALUES } from "@config";

export const articleSchema = z.object({
  title: z.string().min(5).max(120),
  slug: z.string().min(5),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  body: z.string().min(200),
  status: z.enum(ARTICLE_STATUS_VALUES as [string, ...string[]]),
  contentType: z.enum(CONTENT_TYPE_VALUES as [string, ...string[]]),
  categoryId: z.string().uuid().or(z.string().min(1)), // UUID or slug-like ID
  authorId: z.string().min(1),
  heroImageId: z.string().optional(),
  seoTitle: z.string().max(120).optional(),
  seoDescription: z.string().max(160).optional(),
  isFeatured: z.boolean().default(false),
  isBreaking: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  factCheckStatus: z.enum(FACT_CHECK_VALUES as [string, ...string[]]).default("unverified"),
});

export type ArticleInput = z.infer<typeof articleSchema>;

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  parentId: z.string().optional(),
  priority: z.number().default(0),
  navLabel: z.string().optional(),
});

export const topicSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  categoryId: z.string().optional(),
});
