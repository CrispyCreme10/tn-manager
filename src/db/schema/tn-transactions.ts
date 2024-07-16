import { boolean, char, numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { tnAccounts } from "@/db/schema/tn-accounts";
import { tnCategories } from "@/db/schema/tn-categories";

export const transactionStatus = pgEnum("transaction_status", ["pending", "completed", "failed"]);

export const tnTransactions = pgTable("tn_transaction", {
    id: text('id').primaryKey(),
    accountId: text("accountId").notNull().references(() => tnAccounts.id, { onDelete: "cascade" }),
    tranDate: timestamp("tranDate").notNull(),
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    currencyCode: char("currency_code", { length: 3 }).notNull().default("USD"),
    description: text("description"),
    status: transactionStatus("status").notNull().default("completed"),
    category: text("category").references(() => tnCategories.id, { onDelete: "set null" }),
    notes: text("notes"),
    isRecurring: boolean("is_recurring").default(false),
});

export type TnTransaction = typeof tnTransactions.$inferSelect;

export function createDefaultTransaction(): TnTransaction {
    return {
        id: "",
        accountId: "",
        tranDate: new Date(),
        amount: "0",
        currencyCode: "USD",
        description: "",
        status: "completed",
        category: null,
        notes: "",
        isRecurring: false,
    };
}