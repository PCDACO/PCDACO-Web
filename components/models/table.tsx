"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  useDialogStore,
  useIdStore,
  useKeywordStore,
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { ModelColumns } from "./column";
import { useModelQuery } from "@/hooks/models/use-model";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import DialogModelForm from "./form-dialog";

interface ModelTableProps {
  manufacturerId: string;
}

const ModelTable = ({ manufacturerId }: ModelTableProps) => {
  const { push } = useRouter();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { id } = useIdStore();
  const { listModelQuery } = useModelQuery({
    manufacturerId,
    params: value
  });
  const { open, setOpen } = useDialogStore();

  const handleClick = () => {
    setKeyword("create");
    push(`/manufacturers/${manufacturerId}/models/create`);
  }

  return (
    <>
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
      <DialogModelForm id={id} isOpen={open} onOpenChange={() => setOpen(!open)} />
    </>
  );
};

export default ModelTable;
