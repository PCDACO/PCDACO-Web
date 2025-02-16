"use client";


import { ColumnDef } from "@tanstack/react-table";
import MenuAction from "./menu-action";
import { TransmissionResponse } from "@/constants/models/transmission.model";

export const TransmissionColumns: ColumnDef<TransmissionResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <MenuAction
          id={row.original.id}
          payload={{
            name: row.original.name,
          }}
        />
      );
    },
  },
];
