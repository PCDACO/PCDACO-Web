import { Card, CardContent } from "@/components/ui/card"
import { UnderReviewResponse } from "@/constants/models/report.model";
import { User } from "lucide-react";
import { useRouter } from "next/navigation"
import { ReportStatusEnum } from "@/constants/enums/report-status.enum";
import { ReportTypeEnum } from "@/constants/enums/report-type.enum";
import { Badge } from "../ui/badge";

interface InspectionTaskItemProps {
  report: UnderReviewResponse
}

const ReportStatuses = [
  {
    label: "Đang chờ",
    value: ReportStatusEnum.Pending,
    color: "#FFCDD2",
  },
  {
    label: "Đã giải quyết",
    value: ReportStatusEnum.Resolved,
    color: "#C8E6C9",
  },
  {
    label: "Đang xem xét",
    value: ReportStatusEnum.UnderReview,
    color: "#FFE082",
  },
  {
    label: "Từ chối",
    value: ReportStatusEnum.Rejected,
    color: "#FFAB91",
  },
];

const ReportTypes = [
  {
    label: "Tai nạn",
    value: ReportTypeEnum.Accident,
    color: "#FFCDD2",
  },
  {
    label: "Khác",
    value: ReportTypeEnum.Other,
    color: "#E0E0E0",
  },
  {
    label: "Phạt giao thông",
    value: ReportTypeEnum.FineNotice,
    color: "#FFE082",
  },
  {
    label: "Bảo dưỡng",
    value: ReportTypeEnum.Maintenance,
    color: "#C8E6C9",
  },
  {
    label: "Xung đột",
    value: ReportTypeEnum.Conflict,
    color: "#FFAB91",
  },
  {
    label: "Hư hại",
    value: ReportTypeEnum.Damage,
    color: "#B39DDB",
  },
];

export default function UnderReviewReportItem({
  report
}: InspectionTaskItemProps) {
  const { push } = useRouter();
  const handleBtnClick = () => push(`/reports/${report.id}`)

  const getTypeBadge = (reportType: number): JSX.Element => {
    const found = ReportTypes.find((item) => item.value === reportType);
    if (!found) {
      return <Badge variant="destructive">Unknown</Badge>;
    }
    return <Badge style={{ backgroundColor: found.color, color: "black" }}>{found.label}</Badge>;
  }

  const getStatusBadge = (reportType: number): JSX.Element => {
    const found = ReportStatuses.find((item) => item.value === reportType);
    if (!found) {
      return <Badge variant="destructive">Unknown</Badge>;
    }
    return <Badge style={{ backgroundColor: found.color, color: "black" }}>{found.label}</Badge>;
  }

  return (
    <Card onClick={handleBtnClick} className="border-l-4 border-l-yellow-400 hover:cursor-pointer hover:shadow-lg hover:animate-pulse">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <p className="text-sm">{report.id}</p>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm font-medium">{report.reportedByName}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* <Car className="h-4 w-4 text-muted-foreground flex-shrink-0" /> */}
            <p className="text-sm font-medium">{report.title}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" /> */}
            <p className="text-sm text-muted-foreground">{report.description}</p>
          </div>


          <div className="flex items-center gap-2">
            {/* <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" /> */}
            {getTypeBadge(report.reportType)}
          </div>

          <div className="flex items-center gap-2">
            {/* <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" /> */}
            {getStatusBadge(report.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

