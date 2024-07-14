import { auth } from "@/auth";
import { db } from "@/db";
import { TnAccountsDrizzleRepository } from "@/db/repositories/tn-accounts-repository";
import { tnAccounts } from "@/db/schema/tn-accounts";
import { generateUUID } from "@/utils/uuid";
import { PostgresError } from 'pg-error-enum' 

export async function GET(request: Request) {
  const accounts = await db.select().from(tnAccounts);

  return new Response(JSON.stringify(accounts), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return new Response(null, { status: 401 });
  }

  const reqBody = (await request.json()) as { name: string; balance: number };

  if (
    !reqBody.name ||
    reqBody.balance === undefined ||
    reqBody.balance === null
  ) {
    return new Response(null, { status: 400 });
  }

  let newId = null;
  try {
    const tnAccountsRepo = new TnAccountsDrizzleRepository();
    newId = await tnAccountsRepo.create({
      id: generateUUID(),
      userId: session.userId,
      name: reqBody.name,
      balance: reqBody.balance.toString(),
    });
  } catch (error: any) {
    if (error && error.code == PostgresError.UNIQUE_VIOLATION) {
      return new Response(error.code, { status: 400 });
    }

    return new Response(null, { status: 500 });
  }

  const response = new Response(null, { status: 201 });
  response.headers.set("Location", "/api/accounts/" + newId);
  return response;
}

export async function PUT(request: Request) {
  const reqBody = (await request.json()) as {
    id: string;
    name: string;
    balance: number;
  };

  console.log("put body:", reqBody);

  if (
    reqBody.name === "" ||
    reqBody.balance === undefined ||
    reqBody.balance === null
  ) {
    return new Response(null, { status: 400 });
  }

  try {
    const tnAccountsRepo = new TnAccountsDrizzleRepository();
    tnAccountsRepo.update({
      id: reqBody.id,
      name: reqBody.name,
      balance: reqBody.balance.toString(),
    });
  } catch (error) {
    console.log("error:", error);
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 204 });
}