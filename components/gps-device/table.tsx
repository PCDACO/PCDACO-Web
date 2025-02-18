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
import { useGPSDeviceStore } from "./menu-action";
import { useGPSDeviceQuery } from "@/hooks/gps-device/use-gps-device";
import { GPSDeviceColumns } from "./column";

const GPSDeviceTable = () => {
  const { open, setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { listGPSDeviceQuery } = useGPSDeviceQuery({
    params: value,
  });

  const { id } = useIdStore();
  const { data } = useGPSDeviceStore();

  // do ui error
  if (listGPSDeviceQuery.isError) {
    return <div>Error...</div>;
  }

  // do ui skeleton
  // if (!listManuFactureQuery.data) {
  //   return <div>No data</div>;
  // }

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
                listGPSDeviceQuery.data?.value ?? {
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
          columns={GPSDeviceColumns}
          data={listGPSDeviceQuery.data?.value?.items ?? []}
          isLoading={listGPSDeviceQuery.isLoading}
        />
      </div>
      <DialogContent>
        <ManufacturerForm id={id} value={data || { name: "" }} />
      </DialogContent>
    </Dialog>
  );
};

export default GPSDeviceTable;