import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";

export const tnAccounts = pgTable("tn_account", {
    id: text("id").notNull().primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name"),
});