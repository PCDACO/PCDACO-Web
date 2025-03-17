"use client";
import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { ModelResponse } from "@/constants/models/model.model.ts";
import { formatDate } from "@/lib/utils";

export const ModelColumns: ColumnDef<ModelResponse>[] = [
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "createdAt",
    header: "Tạo Lúc",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return formatDate(createdAt.toString());
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
            manufacturerId: row.original.manufacturerId,
            releaseDate: row.original.releaseDate
          }}
        />
      );
    },
  },
];
