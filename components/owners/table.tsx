"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  useDialogStore,
  useKeywordStore,
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { useOwnerQuery } from "@/hooks/owners/use-owner";
import { OwnerColumns } from "./column";
import OwnerForm from "./form";
const OwnerTable = () => {
  const { open, setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { listOwnerQuery } = useOwnerQuery({
    params: value,
  });


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
                listOwnerQuery.data?.value ?? {
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
          columns={OwnerColumns}
          data={listOwnerQuery.data?.value.items ?? []}
          isLoading={listOwnerQuery.isLoading}
        />
      </div>
      <DialogContent>
        <OwnerForm />
      </DialogContent>
    </Dialog>
  );
};

export default OwnerTable;
