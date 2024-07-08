import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  dbCredentials: {
    url: process.env.MIGRATION_DATABASE_URL!,
  },
  out: "./drizzle",
});
