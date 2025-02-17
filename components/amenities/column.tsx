"use client";

import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { AmenityResponse } from "@/constants/models/amenity.model";

export const AmenityColumns: ColumnDef<AmenityResponse>[] = [
  {
    accessorKey: "iconUrl",
    header: "Icon",
    cell: ({ row }) => {
      const icon = row.original.iconUrl;
      // eslint-disable-next-line @next/next/no-img-element
      return <img className="w-32" src={icon} alt={row.original.name} />;
    }
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "description",
    header: "Mô Tả",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày Tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <MenuAction
          id={row.original.id}
          payload={{
            name: row.original.name,
            description: row.original.description,
            icon: undefined
          }}
        />
      );
    },
  },
];
