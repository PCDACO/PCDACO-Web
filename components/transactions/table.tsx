"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { useTransactionParamsStore, } from "@/stores/store";
import PaginationTable from "../data-table/pagination";
import { TransactionColumns } from "./column";
import { useTransactionQuery } from "@/hooks/transactions/use-transaction";
import TransactionSearchInput from "./transaction-search";

const TransactionTable = () => {
  const { value } = useTransactionParamsStore();
  const { listTransactions } = useTransactionQuery({
    params: value,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <TransactionSearchInput keyValue="transaction" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              listTransactions.data?.value ?? {
                items: [],
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10,
                hasNext: false,
              }
            }
          />
        </div>
      </div>
      <DataTable
        columns={TransactionColumns}
        data={listTransactions.data?.value?.items ?? []}
        isLoading={listTransactions.isLoading}
      />
    </div>
  );
};

export default TransactionTable;
