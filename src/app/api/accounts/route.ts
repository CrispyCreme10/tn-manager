import { db } from "@/db";
import { NewTnAccount, tnAccounts } from "@/db/schema/tn-accounts";

export async function GET(request: Request) {
    
}

export async function POST(request: Request) {
    const reqBody = await request.json() as { name: string, balance: string };

    try {
        await db.insert(tnAccounts).values({
            name: reqBody.name,
            balance: reqBody.balance,
        } as NewTnAccount);
    } catch (error) {
        return new Response(null, { status: 500 });
    }

    const response = new Response(null, { status: 201 });
    response.headers.set("Location", "/api/accounts");
    return response;
}