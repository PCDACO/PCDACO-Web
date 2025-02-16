"use client";
import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { ModelResponse } from "@/constants/models/model.model.ts";

export const ModelColumns: ColumnDef<ModelResponse>[] = [
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
            manufacturerId: row.original.manufacturerId,
            releaseDate: row.original.releaseDate
          }}
        />
      );
    },
  },
];
