"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TnAccount } from "@/db/schema/tn-accounts"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import AddEditDialog from "@/app/accounts/add-edit-dialog"

export const columns: ColumnDef<TnAccount>[] = [
  {
    accessorKey: "name",
    header: "Account name",
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
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <AddEditDialog triggerJsx={
              <DropdownMenuItem  onSelect={(e) => e.preventDefault()}>Edit Profile</DropdownMenuItem>
            } tnAccount={tnAccount} />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
