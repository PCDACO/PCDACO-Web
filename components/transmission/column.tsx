"use client";


import { ColumnDef } from "@tanstack/react-table";
import MenuAction from "./menu-action";
import { TransmissionResponse } from "@/constants/models/transmission.model";
import { formatDate } from "@/lib/utils";

export const TransmissionColumns: ColumnDef<TransmissionResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return formatDate(row.original.createdAt.toString());
    }
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
