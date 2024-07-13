import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const tnCategories = pgTable("tn_category", {
    id: text('id').primaryKey(),
    name: text("name"),
    color: varchar("color", { length: 6 }),
});