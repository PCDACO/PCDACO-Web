"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { AmenityColumns } from "./column";
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
import { useAmenityQuery } from "@/hooks/amenities/use-amenities";
import { useAmenityStore } from "./menu-action";
import AmenityForm from "./form";
const AmenityTable = () => {
  const { open, setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { value } = useParamStore();
  const { listAmenityQuery } = useAmenityQuery({
    params: value,
  });
  const { id, setId } = useIdStore();
  const { data } = useAmenityStore();

  // do ui error
  if (listAmenityQuery.isError) {
    return <div>Error...</div>;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setId("");
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
                listAmenityQuery.data?.value ?? {
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
          columns={AmenityColumns}
          data={listAmenityQuery.data?.value.items ?? []}
          isLoading={listAmenityQuery.isLoading}
        />
      </div>
      <DialogContent>
        <AmenityForm id={id} value={data || {
          name: "",
          description: "",
          icon: undefined
        }} />
      </DialogContent>
    </Dialog>
  );
};

export default AmenityTable;
