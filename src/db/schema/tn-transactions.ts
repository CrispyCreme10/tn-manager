import { boolean, char, numeric, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { tnAccounts } from "@/db/schema/tn-accounts";
import { tnCategories } from "@/db/schema/tn-category";

export const transactionStatus = pgEnum("transaction_status", ["pending", "completed", "failed"]);

export const tnTransactions = pgTable("tn_transaction", {
    id: text("id").notNull().primaryKey(),
    accountId: text("accountId").notNull().references(() => tnAccounts.id, { onDelete: "cascade" }),
    tranDate: timestamp("tranDate").notNull(),
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    currencyCode: char("currency_code", { length: 3 }).notNull(),
    description: text("description"),
    status: transactionStatus("status").notNull().default("completed"),
    category: text("category").references(() => tnCategories.id, { onDelete: "set null" }),
    isRecurring: boolean("is_recurring"),
});