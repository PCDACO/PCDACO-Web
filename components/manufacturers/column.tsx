"use client";

import { ManufactureResponse } from "@/constants/models/manufacture.model";
import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export const ManufacturerColumns: ColumnDef<ManufactureResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ row }) => {
      const logo = row.original.logoUrl;
      return logo !== "" ?
        (<Image width={32} height={32} src={row.original.logoUrl} alt={row.original.name} />) : <ImageIcon />
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
          }}
        />
      );
    },
  },
];
