import { db } from "@/db";
import { TnAccount, tnAccounts } from "@/db/schema/tn-accounts";
import { eq } from "drizzle-orm";

export interface TnAccountsRepository {
  getById(id: string): Promise<TnAccount | null>;
  getAll(userId: string): Promise<TnAccount[]>;
  create(tnAccount: TnAccount): Promise<string>;
  update(tnAccount: Partial<TnAccount>): Promise<string>;
  delete(id: string): Promise<string>;
}

export class TnAccountsDrizzleRepository implements TnAccountsRepository {
  async getById(id: string): Promise<TnAccount | null> {
    if (!id) {
      throw new Error("id is required to update");
    }

    const [account] = await db
      .select()
      .from(tnAccounts)
      .where(eq(tnAccounts.id, id));

    return account ?? null;
  }

  async getAll(userId: string): Promise<TnAccount[]> {
    return await db
      .select()
      .from(tnAccounts)
      .where(eq(tnAccounts.userId, userId));
  }

  async create(tnAccount: TnAccount): Promise<string> {
    if (!tnAccount.id) {
      throw new Error("id is required to update");
    }

    const [{ id }] = await db
      .insert(tnAccounts)
      .values(tnAccount)
      .returning({ id: tnAccounts.id });

    return id;
  }

  async update(tnAccount: Partial<TnAccount>): Promise<string> {
    if (!tnAccount.id) {
      throw new Error("id is required to update");
    }

    if (!tnAccount.name) {
      throw new Error("name is required to update");
    }

    if (!tnAccount.balance) {
      throw new Error("balance is required to update");
    }

    const [{ id }] = await db
      .update(tnAccounts)
      .set({ name: tnAccount.name, balance: tnAccount.balance })
      .where(eq(tnAccounts.id, tnAccount.id))
      .returning({ id: tnAccounts.id });

    return id;
  }

  async delete(id: string): Promise<string> {
    if (!id) {
      throw new Error("id is required to delete");
    }

    const [{ id: deletedId }] = await db
      .delete(tnAccounts)
      .where(eq(tnAccounts.id, id))
      .returning({ id: tnAccounts.id });

    return deletedId;
  }
}
