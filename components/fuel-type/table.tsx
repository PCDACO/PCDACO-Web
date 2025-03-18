"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  useDialogStore,
  useIdStore,
  useKeywordStore,
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { useFuelTypeStore } from "./menu-action";
import FuelTypeForm from "./form";
import { useFuelTypeQuery } from "@/hooks/fuel-type/use-fuel-type";
import { FuelTypeColumn } from "./column";
import { PlusCircleIcon } from "lucide-react";
const FuelTypeTable = () => {
  const { open, setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { listFuelTypeQuery } = useFuelTypeQuery({
    params: value,
  });

  const { id } = useIdStore();
  const { data } = useFuelTypeStore();

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
                listFuelTypeQuery.data?.value ?? {
                  items: [],
                  totalItems: 0,
                  pageNumber: 1,
                  pageSize: 10,
                  hasNext: false,
                }
              }
            />
            <DialogTrigger asChild>
              <Button>
                <PlusCircleIcon />Tạo
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <DataTable
          columns={FuelTypeColumn}
          data={listFuelTypeQuery.data?.value.items ?? []}
          isLoading={listFuelTypeQuery.isLoading}
        />
      </div>
      <DialogContent>
        <FuelTypeForm id={id} value={data || {
          name: "",
        }} />
      </DialogContent>
    </Dialog>
  );
};

export default FuelTypeTable;
