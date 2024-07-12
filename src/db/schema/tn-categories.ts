import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const tnCategories = pgTable("tn_category", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    color: varchar("color", { length: 6 }),
});