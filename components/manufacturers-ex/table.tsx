"use client";

import { useManuFactureQuery } from "@/hooks/manufacture/use-manufacture";
import React from "react";
import { DataTable } from "@/components/data-table";
import { ManufacturerColumns } from "./column";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ManufacturerForm from "./form";
import { useDialogStore, useIdStore, useKeywordStore } from "@/stores/store";
import { useManuFactureStore } from "./menu-action";

const ManufacturerTable = () => {
  const { open, setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { listManuFactureQuery } = useManuFactureQuery({
    params: { index: 1, size: 10 },
  });
  const { id } = useIdStore();
  const { data } = useManuFactureStore();

  if (listManuFactureQuery.isError) {
    return <div>Error...</div>;
  }

  if (!listManuFactureQuery.data) {
    return <div>No data</div>;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setKeyword("create");
      }}
    >
      <div className="flex justify-end items-center w-full">
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
      </div>
      <DataTable
        columns={ManufacturerColumns}
        data={listManuFactureQuery.data.value.items}
        isLoading={listManuFactureQuery.isLoading}
      />
      <DialogContent>
        <ManufacturerForm id={id} value={data || { name: "" }} />
      </DialogContent>
    </Dialog>
  );
};

export default ManufacturerTable;
