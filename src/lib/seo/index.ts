import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export function getBaseMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    ...overrides,
    title: overrides.title 
      ? { absolute: `${overrides.title} | ${SITE_CONFIG.name}` }
      : { default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`, template: `%s | ${SITE_CONFIG.name}` },
    description: overrides.description || SITE_CONFIG.description,
  };
}

export function generateArticleSchema(article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [article.heroImageUrl],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": [{
      "@type": "Person",
      "name": article.authorName,
      "url": `${SITE_CONFIG.url}/author/${article.authorSlug}`
    }]
  };
}
