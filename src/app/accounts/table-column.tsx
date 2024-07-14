"use client"

import { TnAccount } from "@/db/schema/tn-accounts"
import { ColumnDef } from "@tanstack/react-table"
import RowActionMenu from "./row-action-menu"

export const columns: ColumnDef<TnAccount>[] = [
  {
    accessorKey: "name",
    header: "Account name",
  },
  {
    accessorKey: "acctType",
    header: "Account type",
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
        const balance = parseFloat(row.getValue("balance"))
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(balance)
    
        return <div className="font-medium">{formatted}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tnAccount = row.original as TnAccount;
      return <RowActionMenu tnAccount={tnAccount} />
    },
  },
]
