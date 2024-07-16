import { TnTransaction } from "@/db/schema/tn-transactions";
import { ColumnDef } from "@tanstack/react-table";

export const addTransactionsColumnsDef: ColumnDef<TnTransaction>[] = [
  {
    accessorKey: "index",
    header: "#",
  },
  {
    accessorKey: "acctName",
    header: "Account",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Transaction Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];