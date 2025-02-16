"use client";


import { ColumnDef } from "@tanstack/react-table";
import MenuAction from "./menu-action";
import { CarResponse } from "@/constants/models/car.model";
import { object } from "zod";

export const CarColumns: ColumnDef<CarResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <MenuAction
          id={row.original.id}
          payload={object}
        />
      );
    },
  },
];
