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
import { useDriverQuery } from "@/hooks/drivers/use-driver";
import DriverForm from "./form";
import { DriverColumns } from "./column";
const DriverTable = () => {
  const { open, setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { listDriverQuery } = useDriverQuery({
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
                listDriverQuery.data?.value ?? {
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
          columns={DriverColumns}
          data={listDriverQuery.data?.value.items ?? []}
          isLoading={listDriverQuery.isLoading}
        />
      </div>
      <DialogContent>
        <DriverForm />
      </DialogContent>
    </Dialog>
  );
};

export default DriverTable;
