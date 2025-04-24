"use client";
import { ColumnDef } from "@tanstack/react-table";
import MenuAction from "./menu-action";
import { ModelResponse } from "@/constants/models/model.model";
import { formatDate } from "@/lib/utils";

export const ModelColumns: ColumnDef<ModelResponse>[] = [
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
    header: "Sản xuất tại",
    cell: ({ row }) => {
      const createdAt = row.original.releaseDate;
      return formatDate(createdAt.toString());
    }
  },
  {
    header: "NSX",
    cell: ({ row }) => {
      const manufacturer = row.original.manufacturer;
      return manufacturer.name;
    }
  },
  {
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
            manufacturerId: row.original.manufacturer.id,
            releaseDate: row.original.releaseDate
          }}
        />
      );
    },
  },
];
