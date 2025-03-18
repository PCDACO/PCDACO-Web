"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import {
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { useTechnicianQuery } from "@/hooks/technicians/use-technician";
import { TechnicianColumns } from "./column";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
const TechnicianTable = () => {
  const { value } = useParamStore();
  const { listTechnicians } = useTechnicianQuery({
    params: value,
  });

  const { replace } = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              listTechnicians.data?.value ?? {
                items: [],
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10,
                hasNext: false,
              }
            }
          />
          <Button onClick={() => {
            replace("/technicians/create")
          }}>
            <PlusCircleIcon />Tạo
          </Button>
        </div>
      </div>
      <DataTable
        columns={TechnicianColumns}
        data={listTechnicians.data?.value.items ?? []}
        isLoading={listTechnicians.isLoading}
      />
    </div>
  );
};

export default TechnicianTable;
