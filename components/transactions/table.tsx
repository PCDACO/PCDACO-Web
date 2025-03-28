"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import {
  useTransactionParamsStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { TransactionColumns } from "./column";
import { useTransactionQuery } from "@/hooks/transactions/use-transaction";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

const TransactionTable = () => {
  const { value, setValue } = useTransactionParamsStore();
  const { listTransactions } = useTransactionQuery({
    params: value,
  });

  const handleValueChange = (statusValue: string) => {
    setValue({
      ...value,
      transactionType: statusValue
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Trạng thái</SelectLabel>
                <SelectItem value="Pending">Đang thực hiện</SelectItem>
                <SelectItem value="Completed">Hoàn tất</SelectItem>
                <SelectItem value="Failed">Thất bại</SelectItem>
                <SelectItem value="Cancelled">Hủy</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
