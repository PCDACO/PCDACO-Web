"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { useParamStore } from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { useCarQuery } from "@/hooks/cars/use-car";
import { CarColumns } from "./column";
interface CarTableProps {
  status?: number;
}
const CarTable = ({ status }: CarTableProps) => {
  const { value } = useParamStore();
  const { listCarQuery } = useCarQuery({
    params: {
      ...value,
      status: status,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              listCarQuery.data?.value ?? {
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
        columns={CarColumns}
        data={listCarQuery.data?.value.items ?? []}
        isLoading={listCarQuery.isLoading}
      />
    </div>
  );
};

export default CarTable;
