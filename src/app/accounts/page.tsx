import { DataTable } from "@/app/accounts/data-table";
import { columns } from "@/app/accounts/table-column";
import { Button } from "@/components/ui/button";
import { TnAccount } from "@/db/schema/tn-accounts";
import AddEditDialog from "./add-edit-dialog";
import { TnAccountsDrizzleRepository } from "@/db/repositories/tn-accounts-repository";

async function getAllTnAccountsForUser(): Promise<TnAccount[]> {
  const tnAccountsRepo = new TnAccountsDrizzleRepository();
  return await tnAccountsRepo.getAll();
}

export default async function AccountsList() {
  const data = await getAllTnAccountsForUser();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-6/12">
        <AddEditDialog triggerJsx={<Button>Add Account</Button>} />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
