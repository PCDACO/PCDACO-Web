"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GPSDeviceResponse } from "@/constants/models/gps-device.model";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

const GPSDeviceStatusValue = [
  {
    name: "Khả dụng",
    value: "Available",
    color: "#26FC46"
  },
  {
    name: "Đang sử dụng",
    value: "InUsed",
    color: "#FCDF26"
  },
  {
    name: "Đang sửa chữa",
    value: "Repairing",
    color: "#264AFC"
  },
  {
    name: "Đang hỏng",
    value: "Broken",
    color: "#9126FC"
  },
  {
    name: "Đã bỏ",
    value: "Removed",
    color: "#FC264D"
  },
]

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
    header: "Tên",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const getBadgeByStatus = (status: string) => {
        const result = GPSDeviceStatusValue.find((item) => item.value === status)
        if (!result) return <Badge variant="outline">Unknown</Badge>
        return <Badge className={`bg-${result?.color} text-black`} >{result.name}</Badge >
      }
      return getBadgeByStatus(row.original.status);
    }
  },
  {
    accessorKey: "createdAt",
    header: "Tạo lúc",
    cell: ({ row }) => {
      return formatDate(row.original.createdAt.toString());
    }
  },
];
