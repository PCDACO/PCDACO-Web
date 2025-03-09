"use client";

import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { FuelTypeResponse } from "@/constants/models/fuelType.model";
import { formatDate } from "@/lib/utils";

export const FuelTypeColumn: ColumnDef<FuelTypeResponse>[] = [
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
