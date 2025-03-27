"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  useKeywordStore,
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { ModelColumns } from "./column";
import { useModelQuery } from "@/hooks/models/use-model";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ModelTableProps {
  manufacturerId: string;
}

const ModelTable = ({ manufacturerId }: ModelTableProps) => {
  const { replace } = useRouter();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { listModelQuery } = useModelQuery({
    manufacturerId,
    params: value
  });

  const handleClick = () => {
    setKeyword("create");
    replace(`/manufacturers/${manufacturerId}/models/create`);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              listModelQuery.data?.value ?? {
                items: [],
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10,
                hasNext: false,
              }
            }
          />
          <Button onClick={handleClick}>
            <PlusCircleIcon />Tạo
          </Button>
        </div>
      </div>

      <DataTable
        columns={ModelColumns}
        data={listModelQuery.data?.value?.items ?? []}
        isLoading={listModelQuery.isLoading}
      />
    </div>
  );
};

export default ModelTable;
