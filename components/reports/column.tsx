"use client";

import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { ReportResponse } from "@/constants/models/report.model";
import { Badge } from "../ui/badge";

export const ReportColumns: ColumnDef<ReportResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "reporterName",
    header: "Người Tố Cáo",
  },
  {
    accessorKey: "title",
    header: "Nội dung",
  },
  {
    accessorKey: "reportType",
    header: "Loại",
    cell: ({ row }) => {
      const type = row.original.reportType;
      switch (type) {
        case 0:
          return (
            <Badge className="bg-yellow-400 text-black">
              Tranh chấp
            </Badge>
          );
        case 1:
          return (
            <Badge className="bg-red-500 text-white">
              Tai nạn
            </Badge>
          );
        case 2:
          return (
            <Badge className="bg-blue-500 text-white">
              Giấy báo phạt
            </Badge>
          );
        case 3:
          return (
            <Badge className="bg-gray-500 text-white">
              Hư hỏng xe
            </Badge>
          );
        case 4:
          return (
            <Badge className="bg-indigo-500 text-white">
              Bảo dưỡng
            </Badge>
          );
        case 5:
          return (
            <Badge className="bg-gray-700 text-white">
              Khác
            </Badge>
          );
        default:
          return null;
      }
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <MenuAction id={row.original.id} />
      );
    },
  },
];
