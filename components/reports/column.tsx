"use client";

import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import { ReportResponse } from "@/constants/models/report.model";
import { Badge } from "../ui/badge";
import { ReportTypeEnum } from "@/constants/enums/report-type.enum";

const reportTypeBadges = [
  {
    name: ReportTypeEnum.Conflict,
    value: (
      <Badge className="bg-yellow-400 text-black">
        Tranh chấp
      </Badge>
    ),
  },
  {
    name: ReportTypeEnum.Accident,
    value: (
      <Badge className="bg-red-500 text-white">
        Tai nạn
      </Badge>
    )
  },
  {
    name: ReportTypeEnum.FineNotice,
    value: (
      <Badge className="bg-blue-500 text-white">
        Giấy báo phạt
      </Badge>
    )
  },
  {
    name: ReportTypeEnum.Damage,
    value: (
      <Badge className="bg-gray-500 text-white">
        Hư hỏng xe
      </Badge>
    )
  },
  {
    name: ReportTypeEnum.Maintenance,
    value: (
      <Badge className="bg-indigo-500 text-white">
        Bảo dưỡng
      </Badge>
    )
  },
  {
    name: ReportTypeEnum.Damage,
    value: (
      <Badge className="bg-gray-700 text-white">
        Khác
      </Badge>
    )
  }
];

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
      const mapReportTypeBadge = (type: number) => {
        const result = reportTypeBadges.find(item => item.name === type);
        if (!result) {
          return <Badge> </Badge>
        }
        return result.value;
      }
      return mapReportTypeBadge(row.original.reportType);
    },
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
