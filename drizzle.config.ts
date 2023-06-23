import type { Config } from "drizzle-kit";

export default {
  schema: "./src/**/schema.ts",
  out: "./drizzle",
  breakpoints: true,
} satisfies Config;
