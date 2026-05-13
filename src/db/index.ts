import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { createQueries } from "./queries";

export * from "./schema";
export * from "./queries";

export function createDb(d1: D1Database) {
  const db = drizzle(d1, { schema });
  const queries = createQueries(db);
  
  return {
    db,
    queries,
    schema,
  };
}

export type UnstoryDb = ReturnType<typeof createDb>;
