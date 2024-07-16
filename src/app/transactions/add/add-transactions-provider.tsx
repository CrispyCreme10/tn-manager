"use client";

import { TnAccount } from "@/db/schema/tn-accounts";
import { TnTransaction } from "@/db/schema/tn-transactions";
import { addTransactionsColumnsDef } from "./add-transactions-columns";
import { AddTransactionContext } from "./add-transactions-context";
import { AddTransactionsTable } from "./add-transactions-table";
import usePersistantState from "@/hooks/use-persistent-state";

export default function AddTransactionsProvider({ tnAccounts }: { tnAccounts: TnAccount[] }) {
  const [tnTransactions, setTransactions] = usePersistantState<TnTransaction[]>("add-transactions", []);

  function addTransaction(transaction: TnTransaction) {
    setTransactions([...tnTransactions, transaction]);
  }

  function updateTransaction(index: number, transaction: TnTransaction) {
    const newTransactions = [...tnTransactions];
    newTransactions[index] = transaction;
    setTransactions(newTransactions);
  }

  function deleteTransaction(index: number) {
    const newTransactions = [...tnTransactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  }

  return (
    <AddTransactionContext.Provider value={{
      tnAccounts,
      tnTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction
    }}>
      <AddTransactionsTable
        columns={addTransactionsColumnsDef}
        data={tnTransactions ?? []}
      />
    </AddTransactionContext.Provider>
  );
}