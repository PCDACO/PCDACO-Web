"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ManufacturerForm from "./form";
import {
  useDialogStore,
  useIdStore,
  useKeywordStore,
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { useModelStore } from "./menu-action";
import { ModelColumns } from "./column";
import { useModelQuery } from "@/hooks/models/use-model";

interface ModelTableProps {
  manufacturerId: string;
}

const ModelTable = ({ manufacturerId }: ModelTableProps) => {
  const { open, setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { listModelQuery } = useModelQuery({
    manufacturerId,
    params: value
  });

  const { id } = useIdStore();
  const { data } = useModelStore();

  if (listModelQuery.isError) {
    return <div>Error...</div>;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setKeyword("create");
      }}
    >
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
            <DialogTrigger asChild>
              <Button>Create</Button>
            </DialogTrigger>
          </div>
        </div>

        <DataTable
          columns={ModelColumns}
          data={listModelQuery.data?.value?.items ?? []}
          isLoading={listModelQuery.isLoading}
        />
      </div>
      <DialogContent>
        <ManufacturerForm id={id} value={data || { name: "" }} />
      </DialogContent>
    </Dialog>
  );
};

export default ModelTable;