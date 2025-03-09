"use client";

import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { FuelTypeResponse } from "@/constants/models/fuelType.model";
import { formatDate } from "@/lib/utils";

export const FuelTypeColumn: ColumnDef<FuelTypeResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày Tạo",
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
