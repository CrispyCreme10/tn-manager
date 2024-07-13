import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";

export const tnAccounts = pgTable("tn_account", {
    id: text('id').primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull().unique(),
    balance: numeric("balance", { precision: 15, scale: 2 }).notNull(),
});

export type TnAccount = typeof tnAccounts.$inferSelect;
export type NewTnAccount = typeof tnAccounts.$inferInsert;