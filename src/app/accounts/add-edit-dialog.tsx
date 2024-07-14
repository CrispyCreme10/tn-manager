"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TnAccount } from "@/db/schema/tn-accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { PostgresError } from "pg-error-enum";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Account name cannot be empty.")
    .max(50, "Account name cannot exceed 50 characters."),
  balance: z.number().safe(),
});

export default function AddEditDialog({
  triggerJsx,
  tnAccount = null,
}: {
  triggerJsx: JSX.Element;
  tnAccount?: TnAccount | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tnAccount?.name ?? "",
      balance: parseFloat(tnAccount?.balance ?? "0") ?? 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let isSuccesful = false;
    if (tnAccount) {
      isSuccesful = await handlePUT(values);
    } else {
      isSuccesful = await handlePOST(values);
    }

    if (isSuccesful) {
      handleDialogOpenChange(false);
      router.refresh();
    }
  }

  async function handlePOST(values: z.infer<typeof formSchema>): Promise<boolean> {
    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 201) {
      toast({ description: "Account added successfully." });
      return true;
    } else {
      const resBody = await res.json();
      console.log(resBody);
      if (resBody == PostgresError.UNIQUE_VIOLATION) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "An account with that name already exists.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to add account.",
        });
      }
      return false;
    }
  }

  async function handlePUT(values: z.infer<typeof formSchema>): Promise<boolean> {
    const res = await fetch("/api/accounts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        id: tnAccount?.id,
      }),
    });

    if (res.status === 204) {
      toast({ description: "Account updated successfully." });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to update account.",
      });
      return false;
    }
  }

  function handleDialogOpenChange(open: boolean) {
    setOpen(open);
    if (!open) {
      setTimeout(() => form.reset(), 200); // use set timeout to avoid flicker
    }
  }

  999_999_999_999_999.99

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange} >
      <DialogTrigger asChild>{triggerJsx}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{tnAccount ? "Edit Account" : "Add Account"}</DialogTitle>
          <DialogDescription>
            Make changes to your account here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Account Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your account's name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      pattern="([0-9]{1,3}).([0-9]{1,3})"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your account's balance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {tnAccount ? "Save changes" : "Add account"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
