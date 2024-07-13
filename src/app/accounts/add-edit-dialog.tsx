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

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Account name cannot be empty.")
    .max(50, "Account name cannot exceed 50 characters."),
  balance: z.number(),
});

export default function AddEditDialog({
  triggerJsx,
  tnAccount = null,
}: {
  triggerJsx: JSX.Element;
  tnAccount?: TnAccount | null;
}) {
  const session = useSession()
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tnAccount?.name ?? "",
      balance: parseFloat(tnAccount?.balance ?? "0") ?? 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (tnAccount) {
      handlePUT(values);
    } else {
      handlePOST(values);
    }
  }

  async function handlePOST(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 201) {
      toast({ description: "Account added successfully." });
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
    }
  }

  async function handlePUT(values: z.infer<typeof formSchema>) {
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

    if (res.status === 200) {
      toast({ description: "Account updated successfully." });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to update account.",
      });
    }
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open) {
      setTimeout(() => form.reset(), 200); // use set timeout to avoid flicker
    }
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>{triggerJsx}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
                      placeholder="Balance"
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
