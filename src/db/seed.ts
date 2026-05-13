import { CATEGORIES } from "@config";
import { categories, topics, authors, articles } from "./schema";

export async function seed(db: any) {
  console.log("Seeding categories...");
  
  for (const catConfig of CATEGORIES) {
    const catId = catConfig.slug;
    await db.insert(categories).values({
      id: catId,
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
      target: categories.slug,
      set: {
        name: catConfig.name,
        description: catConfig.description,
        priority: catConfig.priority,
      }
    });

    for (const subConfig of catConfig.children) {
      await db.insert(categories).values({
        id: subConfig.slug,
        name: subConfig.name,
        slug: subConfig.slug,
        description: subConfig.description,
        parentId: catId,
        priority: subConfig.priority,
      }).onConflictDoUpdate({
        target: categories.slug,
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
  await db.insert(authors).values({
    id: authorId,
    name: "Unstory Editorial",
    slug: "unstory-editorial",
    bio: "The official editorial voice of Unstory.app, delivering premium internet intelligence.",
  }).onConflictDoNothing();

  console.log("Seeding sample topics...");
  const sampleTopics = [
    { name: "OpenAI", slug: "openai", categoryId: "ai" },
    { name: "Nvidia", slug: "nvidia", categoryId: "ai" },
    { name: "AI Regulation", slug: "ai-regulation-topic", categoryId: "ai-regulation" },
    { name: "Startup Ideas", slug: "startup-ideas", categoryId: "startups" },
    { name: "Wealth Habits", slug: "wealth-habits-topic", categoryId: "wealth-habits" },
    { name: "Cybersecurity", slug: "cybersecurity-topic", categoryId: "cybersecurity" },
    { name: "Luxury Travel", slug: "luxury-travel", categoryId: "travel" },
    { name: "High-Income Skills", slug: "high-income-skills-topic", categoryId: "high-income-skills" },
    { name: "Indian Politics", slug: "indian-politics", categoryId: "politics" },
    { name: "Global Markets", slug: "global-markets", categoryId: "investing" },
  ];

  for (const topic of sampleTopics) {
    await db.insert(topics).values({
      id: topic.slug,
      ...topic,
      isTrending: true,
      trendingScore: Math.floor(Math.random() * 100),
    }).onConflictDoNothing();
  }

  console.log("Seeding sample articles...");
  const sampleArticles = [
    {
      title: "Why AI Agents Matter More Than Chatbots",
      slug: "why-ai-agents-matter",
      subtitle: "Moving beyond conversations to autonomous execution",
      excerpt: "Chatbots were the beginning. AI agents that can actually do things are the end game. Here is why the next 12 months will be dominated by agentic workflows.",
      body: "# Why AI Agents Matter More Than Chatbots\n\nArtificial intelligence has evolved rapidly from simple pattern matching to sophisticated conversational interfaces. However, the true transformation lies in **AI Agents**...",
      categoryId: "ai-news",
      authorId: authorId,
      status: "published",
      contentType: "analysis",
      isFeatured: true,
      publishedAt: new Date(),
    },
    {
      title: "How Wealthy People Think About Insurance",
      slug: "how-wealthy-think-about-insurance",
      subtitle: "It is not just about protection, it is about leverage",
      excerpt: "For the affluent, insurance is a sophisticated financial tool used for tax planning, estate liquidity, and asset protection. Learn the strategies used by high-net-worth individuals.",
      body: "# How Wealthy People Think About Insurance\n\nTo the average person, insurance is an expense they hope never to use. To the wealthy, insurance is a strategic asset...",
      categoryId: "insurance",
      authorId: authorId,
      status: "published",
      contentType: "guide",
      publishedAt: new Date(Date.now() - 86400000),
    },
    {
      title: "The Business Behind Luxury Watches",
      slug: "business-behind-luxury-watches",
      subtitle: "Why stainless steel can cost more than gold",
      excerpt: "The luxury watch market has transformed into an alternative asset class. We break down the economics of scarcity and the brands that dominate the secondary market.",
      body: "# The Business Behind Luxury Watches\n\nThe global luxury watch market is currently valued at over $25 billion. But what drives the value of a mechanical timepiece in a digital age?",
      categoryId: "luxury",
      authorId: authorId,
      status: "published",
      contentType: "analysis",
      publishedAt: new Date(Date.now() - 172800000),
    }
  ];

  for (const article of sampleArticles) {
    await db.insert(articles).values({
      id: article.slug,
      ...article,
      seoTitle: `${article.title} — Unstory`,
      seoDescription: article.excerpt,
    }).onConflictDoNothing();
  }

  console.log("Seed complete!");
}
