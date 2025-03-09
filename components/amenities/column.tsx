"use client";

import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { AmenityResponse } from "@/constants/models/amenity.model";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export const AmenityColumns: ColumnDef<AmenityResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "iconUrl",
    header: "Icon",
    cell: ({ row }) => {
      const icon = row.original.iconUrl;
      return <Image width={32} height={32} src={icon} alt={row.original.name} />;
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
            description: row.original.description,
            icon: undefined
          }}
        />
      );
    },
  },
];
