"use client";

import { ManufactureResponse } from "@/constants/models/manufacture.model";
import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

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
      return <Image width={32} height={32} src={row.original.logoUrl} alt={row.original.name} />;
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
