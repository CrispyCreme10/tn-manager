"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import AddEditDialog from "./add-edit-dialog";
import { TnAccount } from "@/db/schema/tn-accounts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function RowActionMenu({ tnAccount }: { tnAccount: TnAccount }) {
  const router = useRouter();
  const { toast } = useToast();

  function handleView() {
    router.push("/accounts/" + tnAccount.id);
  }

  async function handleDelete() {
    const res = await fetch("/api/accounts/" + tnAccount.id, { method: "DELETE" });

    console.log(res);
    if (res.status === 204) {
      toast({
        description: "Account deleted successfully."
      })

      router.refresh();
    } else {
      toast({
        variant: "destructive",
        description: "Unable to delete account."
      })
    }

    // show(
    //   "Are you sure you want to delete this account?",
    //   () => {
    //     console.log("Delete account");
    //   },
    //   () => {
    //     console.log("Cancel delete");
    //   }
    // );
  }

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
        <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
        <AddEditDialog
          triggerJsx={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          }
          tnAccount={tnAccount}
        />
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
