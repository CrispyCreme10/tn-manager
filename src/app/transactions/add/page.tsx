import { TnAccount } from "@/db/schema/tn-accounts";
import AddTransactionsProvider from "./add-transactions-provider";
import { TnAccountsDrizzleRepository } from "@/db/repositories/tn-accounts-repository";
import { auth } from "@/auth";

async function fetchTnAccounts(): Promise<TnAccount[]> {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  
  const tnAccountsRepo = new TnAccountsDrizzleRepository();
  return await tnAccountsRepo.getAll(session.userId);
}

export default async function AddTransactionsPage() {
  const tnAccounts = await fetchTnAccounts();

  return (
    <AddTransactionsProvider tnAccounts={tnAccounts} />
  );
}
