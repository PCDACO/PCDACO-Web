"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GPSDeviceResponse } from "@/constants/models/gps-device.model";
import { formatDate } from "@/lib/utils";

export const GPSDeviceColumns: ColumnDef<GPSDeviceResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return formatDate(row.original.createdAt.toString());
    }
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <MenuAction
  //         id={row.original.id}
  //         payload={{
  //           name: row.original.name,
  //         }}
  //       />
  //     );
  //   },
  // },
];
