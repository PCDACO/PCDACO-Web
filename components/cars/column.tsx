"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CarResponse } from "@/constants/models/car.model";

export const CarColumns: ColumnDef<CarResponse>[] = [
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
      let status = row.original.status;
      switch (status) {
        case "Available": {
          status = "Khả Dụng";
          break;
        }
        case "Rented": {
          status = "Đang Được Cho Thuê";
          break;
        }
        case "Pending": {
          status = "Đang Chờ Xét Duyệt";
          break;
        }
        case "Inactive": {
          status = "Vô Hiệu Hóa";
          break;
        }
      }
      return <p>{status}</p>
    }
  },
];
