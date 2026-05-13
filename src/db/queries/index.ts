import { createArticlesQueries } from "./articles";
import { createCategoriesQueries } from "./categories";
import { createTopicsQueries } from "./topics";

export function createQueries(db: any) {
  return {
    articles: createArticlesQueries(db),
    categories: createCategoriesQueries(db),
    topics: createTopicsQueries(db),
  };
}
