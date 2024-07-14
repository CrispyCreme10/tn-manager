import { TnAccountsDrizzleRepository } from "@/db/repositories/tn-accounts-repository";
import { TnAccount } from "@/db/schema/tn-accounts";

async function fetchAccount(id: string): Promise<TnAccount | null> {
  const tnAccountsRepo = new TnAccountsDrizzleRepository();
  return await tnAccountsRepo.getById(id);
}

export default async function AccountPage({ params }: { params: { id: string } }) {
  const tnAccount = await fetchAccount(params.id);

  return (
    <div>
      <h1>{tnAccount?.name}</h1>
      <p>{tnAccount?.acctType}</p>
      <p>{tnAccount?.balance}</p>
    </div>
  );
}
