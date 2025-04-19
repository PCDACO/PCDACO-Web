"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { useParamStore, } from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { CarReportColumns } from "./column";
import { useCarReportQuery } from "@/hooks/car-reports/use-car-reports";

const CarReportTable = () => {
  const { value } = useParamStore();
  const { listCarReport } = useCarReportQuery({
    params: value,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              listCarReport.data?.value ?? {
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
        columns={CarReportColumns}
        data={listCarReport.data?.value?.items ?? []}
        isLoading={listCarReport.isLoading}
      />
    </div>
  );
};

export default CarReportTable;
