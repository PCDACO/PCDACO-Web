"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import {
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { ConsultantColumns } from "./column";
import { Button } from "../ui/button";
import { useConsultantQuery } from "@/hooks/consultants/use-consultant";
import { useRouter } from "next/navigation";
const ConsultantTable = () => {
  const { value } = useParamStore();
  const { listConsultants } = useConsultantQuery({
    params: value,
  });
  const { replace } = useRouter();
  // do ui error
  if (listConsultants.isError) {
    return <div>Error...</div>;
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              listConsultants.data?.value ?? {
                items: [],
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10,
                hasNext: false,
              }
            }
          />
          <Button onClick={() => {
            replace("/consultants/create")
          }}>Create</Button>
        </div>
      </div>
      <DataTable
        columns={ConsultantColumns}
        data={listConsultants.data?.value.items ?? []}
        isLoading={listConsultants.isLoading}
      />
    </div>
  );
};
export default ConsultantTable;