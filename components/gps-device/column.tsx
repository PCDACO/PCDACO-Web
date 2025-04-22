"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GPSDeviceResponse } from "@/constants/models/gps-device.model";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import MenuAction from "./menu-action";

const GPSDeviceStatusValue = [
  {
    name: "Khả dụng",
    value: "Available",
    color: "#C8E6C9", // same as "Đã giải quyết" / "Bảo dưỡng"
  },
  {
    name: "Đang sử dụng",
    value: "InUsed",
    color: "#FFE082", // similar to "Đang xem xét"/"Phạt giao thông"
  },
  {
    name: "Đang sửa chữa",
    value: "Repairing",
    color: "#B39DDB", // taken from "Hư hại"
  },
  {
    name: "Đang hỏng",
    value: "Broken",
    color: "#FFCDD2", // taken from "Đang chờ"/"Tai nạn"
  },
  {
    name: "Đã bỏ",
    value: "Removed",
    color: "#E0E0E0", // taken from ReportTypes "Khác"
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
        return <Badge style={{ backgroundColor: result.color, color: "black" }} >{result.name}</Badge >
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
  {
    id: "actions",
    cell: ({ row }) => {
      return <MenuAction id={row.original.id} payload={
        {
          name: row.original.name
          status: row.original.status,
        }
      } />
    }
  },
];
