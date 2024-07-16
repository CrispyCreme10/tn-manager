import { TnAccount } from "@/db/schema/tn-accounts";
import { TnTransaction } from "@/db/schema/tn-transactions";
import { createContext } from "react";

export interface AddTransactionContextProps {
  tnAccounts: TnAccount[];
  tnTransactions: TnTransaction[];
  addTransaction: (transaction: TnTransaction) => void;
  updateTransaction: (index: number, transaction: TnTransaction) => void;
  deleteTransaction: (index: number) => void;
}

export const AddTransactionContext = createContext<AddTransactionContextProps | undefined>(undefined);