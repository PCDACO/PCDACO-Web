"use client";

import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { AmenityResponse } from "@/constants/models/amenity.model";
import { urlToFileList } from "@/lib/urlToFile";

export const AmenityColumns: ColumnDef<AmenityResponse>[] = [
  {
    accessorKey: "iconUrl",
    header: "Icon",
    cell: ({ row }) => {
      const icon = row.original.iconUrl;
      console.log(icon)
      return <img src={icon} alt={row.original.name} />;
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { FileList, isSuccess } = urlToFileList(row.original.iconUrl, row.original.name)
      return (
        <MenuAction
          id={row.original.id}
          payload={{
            name: row.original.name,
            description: row.original.description,
            icon: isSuccess ? FileList ?? new DataTransfer().files : new DataTransfer().files
          }}
        />
      );
    },
  },
];
