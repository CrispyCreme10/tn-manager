import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return new Response(null, { status: 401 });
  }

  const reqBody = (await request.json()) as {
    accountId: string,
    tranDate: Date,
    amount: number,
    currencyCode: string,
    description: string,
    status: string,
    category: string,
    notes: string,
    isRecurring: boolean,
  }[];

  // if (
  //   !reqBody.name ||
  //   reqBody.balance === undefined ||
  //   reqBody.balance === null
  // ) {
  //   return new Response(null, { status: 400 });
  // }

  // let newId = null;
  // try {
  //   const tnAccountsRepo = new TnAccountsDrizzleRepository();
  //   newId = await tnAccountsRepo.create({
  //     id: generateUUID(),
  //     userId: session.userId,
  //     name: reqBody.name,
  //     acctType: reqBody.acctType,
  //     balance: reqBody.balance.toString(),
  //   });
  // } catch (error: any) {
  //   if (error && error.code == PostgresError.UNIQUE_VIOLATION) {
  //     return new Response(error.code, { status: 400 });
  //   }

  //   return new Response(null, { status: 500 });
  // }

  // const response = new Response(null, { status: 201 });
  // response.headers.set("Location", "/api/accounts/" + newId);
  // return response;
}
