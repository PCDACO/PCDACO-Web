"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CarResponse } from "@/constants/models/car.model";
import { Badge } from "../ui/badge";
import MenuAction from "./menu-action";

export const CarColumns: ColumnDef<CarResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "licensePlate",
    header: "Biển Số Xe",
  },
  {
    accessorKey: "modelName",
    header: "Dòng",
  },
  {
    accessorKey: "seat",
    header: "Số Ghế",
  },
  {
    accessorKey: "status",
    header: "Tình Trạng",
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case "Available": {
          return <Badge className="bg-green-500 text-white">Khả Dụng</Badge>
        }
        case "Rented": {
          return <Badge className="bg-blue-500 text-white">Đang Được Cho Thuê</Badge>
        }
        case "Pending": {
          return <Badge className="bg-yellow-500 text-white">Đang Chờ Xét Duyệt</Badge>
        }
        case "Inactive": {
          return <Badge className="bg-red-500 text-white">Vô Hiệu Hóa</Badge>
        }
      }
      return <p>{status}</p>
    }
  },
  {
    accessorKey: "ownerPhoneNumber",
    header: "SDT",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <MenuAction id={row.original.id} />
    }
  }
];
