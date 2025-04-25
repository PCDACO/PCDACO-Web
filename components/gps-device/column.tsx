"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GPSDeviceResponse } from "@/constants/models/gps-device.model";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import MenuAction from "./menu-action";
import { GPSDeviceStatusEnum } from "@/constants/enums/gps-device-status.enum";

const GPSDeviceStatusValue = [
  {
    name: GPSDeviceStatusEnum.Available,
    value: "Khả dụng",
    color: "#C8E6C9",
  },
  {
    name: GPSDeviceStatusEnum.InUsed,
    value: "Đang sử dụng",
    color: "#FFE082",
  },
  {
    name: GPSDeviceStatusEnum.Repairing,
    value: "Đang sửa chữa",
    color: "#B39DDB",
  },
  {
    name: GPSDeviceStatusEnum.Broken,
    value: "Đang hỏng",
    color: "#FFCDD2",
  },
  {
    name: GPSDeviceStatusEnum.Removed,
    value: "Đã bỏ",
    color: "#E0E0E0",
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
      const getBadgeByStatus = (status: number) => {
        const result = GPSDeviceStatusValue.find((item) => item.name === status)
        if (!result) return <Badge variant="outline">Unknown</Badge>
        return <Badge style={{ backgroundColor: result.color, color: "black" }} >{result.value}</Badge >
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
          name: row.original.name,
          status: row.original.status,
          carId: row.original.car?.id ?? "",
        }
      } />
    }
  },
];
