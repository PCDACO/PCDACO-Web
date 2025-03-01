"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  useDialogStore,
  useIdStore,
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { useCarQuery } from "@/hooks/cars/use-car";
import { useCarStore } from "./menu-action";
import CarForm from "./form";
import { CarColumns } from "./column";
interface CarTableProps {
  status: string;
}
const CarTable = ({ status }: CarTableProps) => {
  const { open, setOpen } = useDialogStore();
  const { value } = useParamStore();
  const { listCarQuery } = useCarQuery({
    params: {
      ...value,
      status: status,
    },
  });

  const { id } = useIdStore();
  const { data } = useCarStore();

  // do ui error
  if (listCarQuery.isError) {
    return <div>Error...</div>;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
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
      <DialogContent>
        <CarForm id={id} value={data || {
        }} />
      </DialogContent>
    </Dialog>
  );
};

export default CarTable;
