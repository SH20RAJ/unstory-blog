import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { eq, desc, and, or, like, asc } from "drizzle-orm";
import {
  articles, authors, categories, topics, tags, entities, sources, mediaAssets,
  articleTopics, articleTags, articleEntities, articleSources,
} from "@/db/schema";

// ─── Auth ───────────────────────────────────────────────────────────
function authenticate(req: NextRequest): boolean {
  const auth = req.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  const password = (process.env as any).ADMIN_PASSWORD || "";
  return token === password && password.length > 0;
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// ─── MCP JSON-RPC Handler ───────────────────────────────────────────
// Implements a subset of the MCP (Model Context Protocol) spec over HTTP.
// POST /api/mcp with JSON-RPC 2.0 body. Auth via Authorization: Bearer <ADMIN_PASSWORD>.

// Tool definitions
const TOOLS = [
  // Articles
  { name: "list_articles", description: "List articles with optional filters", inputSchema: { type: "object", properties: { status: { type: "string" }, category_slug: { type: "string" }, limit: { type: "number" }, offset: { type: "number" }, search: { type: "string" } } } },
  { name: "get_article", description: "Get article by ID or slug", inputSchema: { type: "object", properties: { id: { type: "string" }, slug: { type: "string" } }, required: [] } },
  { name: "create_article", description: "Create a new article with all fields", inputSchema: { type: "object", properties: { title: { type: "string" }, slug: { type: "string" }, subtitle: { type: "string" }, excerpt: { type: "string" }, body: { type: "string" }, status: { type: "string", enum: ["draft","published","scheduled","archived"] }, content_type: { type: "string", enum: ["news","analysis","explainer","opinion","roundup","guide","interview","review","fact_check"] }, category_id: { type: "string" }, author_id: { type: "string" }, hero_image_url: { type: "string" }, canonical_url: { type: "string" }, source_url: { type: "string" }, language: { type: "string" }, region: { type: "string" }, is_breaking: { type: "boolean" }, is_featured: { type: "boolean" }, is_trending: { type: "boolean" }, trust_score: { type: "number" }, fact_check_status: { type: "string" }, ai_summary: { type: "string" }, seo_title: { type: "string" }, seo_description: { type: "string" }, published_at: { type: "string" }, scheduled_at: { type: "string" }, tag_ids: { type: "array", items: { type: "string" } }, topic_ids: { type: "array", items: { type: "string" } }, entity_ids: { type: "array", items: { type: "string" } }, source_ids: { type: "array", items: { type: "string" } } }, required: ["title","body"] } },
  { name: "update_article", description: "Update an existing article by ID", inputSchema: { type: "object", properties: { id: { type: "string" }, title: { type: "string" }, slug: { type: "string" }, subtitle: { type: "string" }, excerpt: { type: "string" }, body: { type: "string" }, status: { type: "string" }, content_type: { type: "string" }, category_id: { type: "string" }, author_id: { type: "string" }, hero_image_url: { type: "string" }, canonical_url: { type: "string" }, source_url: { type: "string" }, is_breaking: { type: "boolean" }, is_featured: { type: "boolean" }, is_trending: { type: "boolean" }, trust_score: { type: "number" }, ai_summary: { type: "string" }, seo_title: { type: "string" }, seo_description: { type: "string" }, published_at: { type: "string" }, tag_ids: { type: "array", items: { type: "string" } }, topic_ids: { type: "array", items: { type: "string" } } }, required: ["id"] } },
  { name: "delete_article", description: "Delete an article by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  // Categories
  { name: "list_categories", description: "List all categories", inputSchema: { type: "object", properties: {} } },
  { name: "create_category", description: "Create a category", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, slug: { type: "string" }, description: { type: "string" }, parent_id: { type: "string" }, priority: { type: "number" }, nav_label: { type: "string" }, color: { type: "string" }, icon: { type: "string" }, seo_title: { type: "string" }, seo_description: { type: "string" }, is_active: { type: "boolean" } }, required: ["name"] } },
  { name: "update_category", description: "Update a category by ID", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, slug: { type: "string" }, description: { type: "string" }, priority: { type: "number" }, nav_label: { type: "string" }, color: { type: "string" }, seo_title: { type: "string" }, seo_description: { type: "string" }, is_active: { type: "boolean" } }, required: ["id"] } },
  { name: "delete_category", description: "Delete a category by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  // Authors
  { name: "list_authors", description: "List all authors", inputSchema: { type: "object", properties: {} } },
  { name: "create_author", description: "Create an author", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, slug: { type: "string" }, bio: { type: "string" }, avatar_url: { type: "string" }, twitter_url: { type: "string" }, linkedin_url: { type: "string" }, website_url: { type: "string" } }, required: ["name"] } },
  { name: "update_author", description: "Update an author by ID", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, bio: { type: "string" }, avatar_url: { type: "string" }, twitter_url: { type: "string" }, linkedin_url: { type: "string" }, website_url: { type: "string" } }, required: ["id"] } },
  { name: "delete_author", description: "Delete an author by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  // Topics
  { name: "list_topics", description: "List all topics", inputSchema: { type: "object", properties: {} } },
  { name: "create_topic", description: "Create a topic", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, slug: { type: "string" }, description: { type: "string" }, category_id: { type: "string" }, trending_score: { type: "number" }, is_trending: { type: "boolean" } }, required: ["name"] } },
  { name: "update_topic", description: "Update a topic by ID", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, description: { type: "string" }, trending_score: { type: "number" }, is_trending: { type: "boolean" } }, required: ["id"] } },
  { name: "delete_topic", description: "Delete a topic by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  // Tags
  { name: "list_tags", description: "List all tags", inputSchema: { type: "object", properties: {} } },
  { name: "create_tag", description: "Create a tag", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, slug: { type: "string" } }, required: ["name"] } },
  { name: "delete_tag", description: "Delete a tag by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  // Entities
  { name: "list_entities", description: "List all entities (people, companies, products)", inputSchema: { type: "object", properties: {} } },
  { name: "create_entity", description: "Create an entity", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, slug: { type: "string" }, type: { type: "string" }, description: { type: "string" }, official_url: { type: "string" } }, required: ["name","type"] } },
  { name: "delete_entity", description: "Delete an entity by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  // Sources
  { name: "list_sources", description: "List all sources", inputSchema: { type: "object", properties: {} } },
  { name: "create_source", description: "Create a source", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, url: { type: "string" }, source_type: { type: "string" }, reliability_rating: { type: "number" }, country: { type: "string" }, notes: { type: "string" } }, required: ["name"] } },
  { name: "delete_source", description: "Delete a source by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  // Stats
  { name: "get_stats", description: "Get site statistics (article count, category count, etc.)", inputSchema: { type: "object", properties: {} } },
];

function genId() { return crypto.randomUUID().split("-")[0]; }

async function resolveId(db: any, table: any, value: string | undefined | null): Promise<string | null> {
  if (!value) return null;
  // Try finding by ID or Slug (most tables have both)
  const r = await db.select().from(table)
    .where(or(eq(table.id, value), eq(table.slug, value)))
    .limit(1);
  return r[0]?.id || null;
}

async function executeTool(name: string, args: any, db: any): Promise<any> {
  switch (name) {
    // ──── Articles ────
    case "list_articles": {
      const limit = args.limit || 50;
      const offset = args.offset || 0;
      let q = db.select().from(articles).orderBy(desc(articles.createdAt)).limit(limit).offset(offset);
      const conditions: any[] = [];
      if (args.status) conditions.push(eq(articles.status, args.status));
      if (args.category_slug) {
        const categoryId = await resolveId(db, categories, args.category_slug);
        if (categoryId) conditions.push(eq(articles.categoryId, categoryId));
      }
      if (args.search) conditions.push(like(articles.title, `%${args.search}%`));
      if (conditions.length) q = q.where(and(...conditions));
      return await q;
    }
    case "get_article": {
      if (args.id) {
        const r = await db.select().from(articles).where(eq(articles.id, args.id)).limit(1);
        return r[0] || null;
      }
      if (args.slug) {
        const r = await db.select().from(articles).where(eq(articles.slug, args.slug)).limit(1);
        return r[0] || null;
      }
      return null;
    }
    case "create_article": {
      const id = args.id || genId();
      const slug = args.slug || slugify(args.title);
      const now = new Date();
      
      const categoryId = await resolveId(db, categories, args.category_id);
      const authorId = await resolveId(db, authors, args.author_id);

      const publishedAt = args.status === "published" 
        ? (args.published_at ? new Date(args.published_at) : now) 
        : (args.published_at ? new Date(args.published_at) : null);
      
      const row = {
        id, title: args.title, slug,
        subtitle: args.subtitle || null, excerpt: args.excerpt || null, body: args.body,
        status: args.status || "draft", contentType: args.content_type || "news",
        categoryId, authorId,
        heroImageUrl: args.hero_image_url || null,
        canonicalUrl: args.canonical_url || null, sourceUrl: args.source_url || null,
        language: args.language || "en", region: args.region || null,
        isBreaking: args.is_breaking || false, isFeatured: args.is_featured || false, isTrending: args.is_trending || false,
        trustScore: Math.round((args.trust_score ?? 1) * (args.trust_score <= 1 ? 100 : 1)), 
        factCheckStatus: args.fact_check_status || "unverified",
        aiSummary: args.ai_summary || null,
        seoTitle: args.seo_title || args.title, seoDescription: args.seo_description || args.excerpt || null,
        publishedAt, scheduledAt: args.scheduled_at ? new Date(args.scheduled_at) : null,
        createdAt: now, updatedAt: now,
      };
      const result = await db.insert(articles).values(row).returning();
      
      // Junction tables with resolution
      if (args.tag_ids?.length) {
        const resolved = [];
        for (const val of args.tag_ids) {
          const rid = await resolveId(db, tags, val);
          if (rid) resolved.push({ articleId: id, tagId: rid });
        }
        if (resolved.length) await db.insert(articleTags).values(resolved);
      }
      if (args.topic_ids?.length) {
        const resolved = [];
        for (const val of args.topic_ids) {
          const rid = await resolveId(db, topics, val);
          if (rid) resolved.push({ articleId: id, topicId: rid });
        }
        if (resolved.length) await db.insert(articleTopics).values(resolved);
      }
      if (args.entity_ids?.length) {
        const resolved = [];
        for (const val of args.entity_ids) {
          const rid = await resolveId(db, entities, val);
          if (rid) resolved.push({ articleId: id, entityId: rid });
        }
        if (resolved.length) await db.insert(articleEntities).values(resolved);
      }
      if (args.source_ids?.length) {
        const resolved = [];
        for (const val of args.source_ids) {
          // Sources only have id, no slug in schema
          const r = await db.select().from(sources).where(eq(sources.id, val)).limit(1);
          if (r[0]) resolved.push({ articleId: id, sourceId: r[0].id });
        }
        if (resolved.length) await db.insert(articleSources).values(resolved);
      }
      return result[0];
    }
    case "update_article": {
      const data: any = { updatedAt: new Date() };
      const fieldMap: Record<string, string> = {
        title: "title", slug: "slug", subtitle: "subtitle", excerpt: "excerpt", body: "body",
        status: "status", content_type: "contentType",
        hero_image_url: "heroImageUrl", canonical_url: "canonicalUrl", source_url: "sourceUrl",
        is_breaking: "isBreaking", is_featured: "isFeatured", is_trending: "isTrending",
        trust_score: "trustScore", ai_summary: "aiSummary",
        seo_title: "seoTitle", seo_description: "seoDescription",
      };
      for (const [k, v] of Object.entries(fieldMap)) {
        if (args[k] !== undefined) data[v] = args[k];
      }
      
      if (args.category_id) data.categoryId = await resolveId(db, categories, args.category_id);
      if (args.author_id) data.authorId = await resolveId(db, authors, args.author_id);

      if (args.published_at) data.publishedAt = new Date(args.published_at);
      if (args.status === "published" && !data.publishedAt) data.publishedAt = new Date();
      
      const result = await db.update(articles).set(data).where(eq(articles.id, args.id)).returning();
      
      // Update junction tables if provided
      if (args.tag_ids) {
        await db.delete(articleTags).where(eq(articleTags.articleId, args.id));
        const resolved = [];
        for (const val of args.tag_ids) {
          const rid = await resolveId(db, tags, val);
          if (rid) resolved.push({ articleId: args.id, tagId: rid });
        }
        if (resolved.length) await db.insert(articleTags).values(resolved);
      }
      if (args.topic_ids) {
        await db.delete(articleTopics).where(eq(articleTopics.articleId, args.id));
        const resolved = [];
        for (const val of args.topic_ids) {
          const rid = await resolveId(db, topics, val);
          if (rid) resolved.push({ articleId: args.id, topicId: rid });
        }
        if (resolved.length) await db.insert(articleTopics).values(resolved);
      }
      
      return result[0] || null;
    }
    case "delete_article": {
      const result = await db.delete(articles).where(eq(articles.id, args.id)).returning();
      return { deleted: result.length > 0 };
    }
    // ──── Categories ────
    case "list_categories": {
      return await db.select().from(categories).orderBy(asc(categories.priority));
    }
    case "create_category": {
      const id = args.id || slugify(args.name);
      const slug = args.slug || slugify(args.name);
      const row = { id, name: args.name, slug, description: args.description || null, parentId: await resolveId(db, categories, args.parent_id), priority: args.priority ?? 0, navLabel: args.nav_label || args.name, color: args.color || null, icon: args.icon || null, seoTitle: args.seo_title || null, seoDescription: args.seo_description || null, isActive: args.is_active !== false, createdAt: new Date(), updatedAt: new Date() };
      const result = await db.insert(categories).values(row).returning();
      return result[0];
    }
    case "update_category": {
      const data: any = { updatedAt: new Date() };
      for (const k of ["name","slug","description","priority","navLabel","color","seoTitle","seoDescription","isActive"]) {
        const snakeKey = k.replace(/[A-Z]/g, l => "_" + l.toLowerCase());
        if (args[snakeKey] !== undefined) data[k] = args[snakeKey];
        if (args[k] !== undefined) data[k] = args[k];
      }
      if (args.parent_id) data.parentId = await resolveId(db, categories, args.parent_id);
      const result = await db.update(categories).set(data).where(eq(categories.id, args.id)).returning();
      return result[0] || null;
    }
    case "delete_category": {
      const result = await db.delete(categories).where(eq(categories.id, args.id)).returning();
      return { deleted: result.length > 0 };
    }
    // ──── Authors ────
    case "list_authors": {
      return await db.select().from(authors).orderBy(authors.name);
    }
    case "create_author": {
      const id = args.id || genId();
      const slug = args.slug || slugify(args.name);
      const row = { id, name: args.name, slug, bio: args.bio || null, avatarUrl: args.avatar_url || null, twitterUrl: args.twitter_url || null, linkedinUrl: args.linkedin_url || null, websiteUrl: args.website_url || null, createdAt: new Date(), updatedAt: new Date() };
      const result = await db.insert(authors).values(row).returning();
      return result[0];
    }
    case "update_author": {
      const data: any = { updatedAt: new Date() };
      for (const [k, v] of Object.entries({ name: "name", bio: "bio", avatar_url: "avatarUrl", twitter_url: "twitterUrl", linkedin_url: "linkedinUrl", website_url: "websiteUrl" })) {
        if (args[k] !== undefined) data[v] = args[k];
      }
      const result = await db.update(authors).set(data).where(eq(authors.id, args.id)).returning();
      return result[0] || null;
    }
    case "delete_author": {
      const result = await db.delete(authors).where(eq(authors.id, args.id)).returning();
      return { deleted: result.length > 0 };
    }
    // ──── Topics ────
    case "list_topics": {
      return await db.select().from(topics).orderBy(topics.name);
    }
    case "create_topic": {
      const id = args.id || genId();
      const slug = args.slug || slugify(args.name);
      const categoryId = await resolveId(db, categories, args.category_id);
      const row = { id, name: args.name, slug, description: args.description || null, categoryId, trendingScore: args.trending_score ?? 0, isTrending: args.is_trending || false, createdAt: new Date(), updatedAt: new Date() };
      const result = await db.insert(topics).values(row).returning();
      return result[0];
    }
    case "update_topic": {
      const data: any = { updatedAt: new Date() };
      for (const [k, v] of Object.entries({ name: "name", description: "description", trending_score: "trendingScore", is_trending: "isTrending" })) {
        if (args[k] !== undefined) data[v] = args[k];
      }
      const result = await db.update(topics).set(data).where(eq(topics.id, args.id)).returning();
      return result[0] || null;
    }
    case "delete_topic": {
      const result = await db.delete(topics).where(eq(topics.id, args.id)).returning();
      return { deleted: result.length > 0 };
    }
    // ──── Tags ────
    case "list_tags": {
      return await db.select().from(tags).orderBy(tags.name);
    }
    case "create_tag": {
      const id = args.id || genId();
      const slug = args.slug || slugify(args.name);
      const result = await db.insert(tags).values({ id, name: args.name, slug, createdAt: new Date(), updatedAt: new Date() }).returning();
      return result[0];
    }
    case "delete_tag": {
      const result = await db.delete(tags).where(eq(tags.id, args.id)).returning();
      return { deleted: result.length > 0 };
    }
    // ──── Entities ────
    case "list_entities": {
      return await db.select().from(entities).orderBy(entities.name);
    }
    case "create_entity": {
      const id = args.id || genId();
      const slug = args.slug || slugify(args.name);
      const result = await db.insert(entities).values({ id, name: args.name, slug, type: args.type, description: args.description || null, officialUrl: args.official_url || null, createdAt: new Date(), updatedAt: new Date() }).returning();
      return result[0];
    }
    case "delete_entity": {
      const result = await db.delete(entities).where(eq(entities.id, args.id)).returning();
      return { deleted: result.length > 0 };
    }
    // ──── Sources ────
    case "list_sources": {
      return await db.select().from(sources).orderBy(sources.name);
    }
    case "create_source": {
      const id = args.id || genId();
      const result = await db.insert(sources).values({ id, name: args.name, url: args.url || null, sourceType: args.source_type || null, reliabilityRating: args.reliability_rating ?? null, country: args.country || null, notes: args.notes || null, createdAt: new Date(), updatedAt: new Date() }).returning();
      return result[0];
    }
    case "delete_source": {
      const result = await db.delete(sources).where(eq(sources.id, args.id)).returning();
      return { deleted: result.length > 0 };
    }
    // ──── Stats ────
    case "get_stats": {
      const [artCount, catCount, authCount, topCount, tagCount] = await Promise.all([
        db.select().from(articles),
        db.select().from(categories),
        db.select().from(authors),
        db.select().from(topics),
        db.select().from(tags),
      ]);
      return {
        articles: artCount.length,
        published: artCount.filter((a: any) => a.status === "published").length,
        categories: catCount.length,
        authors: authCount.length,
        topics: topCount.length,
        tags: tagCount.length,
      };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ─── HTTP Handlers ──────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // SSE endpoint for MCP protocol discovery
  if (!authenticate(req)) return unauthorized();

  return NextResponse.json({
    jsonrpc: "2.0",
    result: {
      protocolVersion: "2024-11-05",
      serverInfo: { name: "unstory-mcp", version: "1.0.0" },
      capabilities: { tools: { listChanged: false } },
    },
  });
}

export async function POST(req: NextRequest) {
  if (!authenticate(req)) return unauthorized();

  try {
    const body: any = await req.json();
    const { method, params, id: reqId } = body;

    // MCP initialization
    if (method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0", id: reqId,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: { name: "unstory-mcp", version: "1.0.0" },
          capabilities: { tools: { listChanged: false } },
        },
      });
    }

    if (method === "notifications/initialized") {
      return NextResponse.json({ jsonrpc: "2.0", id: reqId, result: {} });
    }

    // List tools
    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0", id: reqId,
        result: { tools: TOOLS },
      });
    }

    // Call tool
    if (method === "tools/call") {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};

      const { db } = await getDb();
      const result = await executeTool(toolName, toolArgs, db);

      return NextResponse.json({
        jsonrpc: "2.0", id: reqId,
        result: {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        },
      });
    }

    return NextResponse.json({
      jsonrpc: "2.0", id: reqId,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  } catch (err: any) {
    return NextResponse.json({
      jsonrpc: "2.0", id: null,
      error: { code: -32603, message: err.message || "Internal error" },
    }, { status: 500 });
  }
}
