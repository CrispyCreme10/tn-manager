import { numeric, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";
import { AccountType } from "@/models/accounts/account";

export const tnAccounts = pgTable("tn_account", {
    id: text('id').primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull().unique(),
    acctType: text("acctType").notNull().default(AccountType.Checking),
    balance: numeric("balance", { precision: 15, scale: 2 }).notNull(),
});

export type TnAccount = typeof tnAccounts.$inferSelect;
export type NewTnAccount = typeof tnAccounts.$inferInsert;