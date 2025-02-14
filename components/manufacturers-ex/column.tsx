"use client";

import { ManufactureResponse } from "@/constants/models/manufacture.model";
import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";

export const ManufacturerColumns: ColumnDef<ManufactureResponse>[] = [
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
