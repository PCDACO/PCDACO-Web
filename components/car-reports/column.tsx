import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { CarReportResponse } from "@/constants/models/car-report.model";
import MenuAction from "./menu-action";
import { CarReportTypeEnum } from "@/constants/enums/car-report-type.enum";
import { CarReportStatus } from "@/constants/enums/car-report-status.enum";

const carReportTypes = [
  {
    name: CarReportTypeEnum.ChangeGPS,
    value: (
      <Badge className="bg-yellow-400 text-black">
        Thay Thiết Bị
      </Badge>
    ),
  },
  {
    name: CarReportTypeEnum.DeactivateCar,
    value: (
      <Badge className="bg-red-400 text-black">
        Rời Hệ Thống
      </Badge>
    ),
  },
  {
    name: CarReportTypeEnum.Other,
    value: (
      <Badge className="bg-green-400 text-black">
        Khác
      </Badge>
    ),
  },
]

const carReportStatuses = [
  {
    name: CarReportStatus.UnderReview,
    value: (
      <Badge className="bg-yellow-400 text-black">
        Đang thực hiện
      </Badge>
    ),
  },
  {
    name: CarReportStatus.Pending,
    value: (
      <Badge className="bg-yellow-400 text-black">
        Đang chờ
      </Badge>
    ),
  },
  {
    name: CarReportStatus.Resolved,
    value: (
      <Badge className="bg-green-400 text-black">
        Đã giải quyết
      </Badge>
    ),
  },
  {
    name: CarReportStatus.Rejected,
    value: (
      <Badge className="bg-red-400 text-black">
        Đã từ chối
      </Badge>
    ),
  },
]

export const CarReportColumns: ColumnDef<CarReportResponse>[] = [
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
      const getBadge = (type: number) => {
        const result = carReportTypes.find(item => item.name === type);
        if (!result) {
          return <Badge variant="outline"></Badge>
        }
        return result.value;
      }
      return getBadge(row.original.reportType);
    }
  },
  {
    header: "Trạng thái",
    cell: ({ row }) => {
      const getBadge = (type: number) => {
        const result = carReportStatuses.find(item => item.name === type);
        if (!result) {
          return <Badge variant="outline"></Badge>
        }
        return result.value;
      }
      return getBadge(row.original.status);
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
