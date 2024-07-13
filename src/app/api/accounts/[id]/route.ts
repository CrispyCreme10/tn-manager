import { db } from "@/db";
import { TnAccountsDrizzleRepository } from "@/db/repositories/tn-accounts-repository";
import { tnAccounts } from "@/db/schema/tn-accounts";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tnAccountsRepo = new TnAccountsDrizzleRepository();
  const account = await tnAccountsRepo.getById(params.id);

  if (!account) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(account), {
    headers: { "content-type": "application/json" },
  });
}
