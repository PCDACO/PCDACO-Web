"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { TransmissionColumns } from "./column";
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
import { useTransmissionQuery } from "@/hooks/transmission/use-transmission";
import { useTransmissionStore } from "./menu-action";
import TransmissionForm from "./form";
import { PlusCircleIcon } from "lucide-react";
const TransmissionTable = () => {
  const { open, setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { listTransmissionQuery } = useTransmissionQuery({
    params: value,
  });

  const { id } = useIdStore();
  const { data } = useTransmissionStore();

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
                listTransmissionQuery.data?.value ?? {
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
                <PlusCircleIcon /> Tạo
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <DataTable
          columns={TransmissionColumns}
          data={listTransmissionQuery.data?.value.items ?? []}
          isLoading={listTransmissionQuery.isLoading}
        />
      </div>
      <DialogContent>
        <TransmissionForm id={id} value={data || {
          name: "",
        }} />
      </DialogContent>
    </Dialog>
  );
};

export default TransmissionTable;
