import { DataTable } from "@/app/accounts/data-table";
import { columns } from "@/app/accounts/table-column";
import { Button } from "@/components/ui/button";
import { TnAccount } from "@/db/schema/tn-accounts";
import AddEditDialog from "./add-edit-dialog";

async function getData(): Promise<TnAccount[]> {
  return [
    {
      id: "1",
      userId: "1",
      name: "Checking",
      balance: "1000",
    },
    {
      id: "2",
      userId: "1",
      name: "Savings",
      balance: "5000",
    },
  ];
}

export default async function AccountsList() {
  const data = await getData();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-6/12">
        <AddEditDialog triggerJsx={<Button>Add Account</Button>} />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
