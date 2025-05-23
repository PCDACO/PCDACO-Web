"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { StatisticResponse } from "@/constants/models/statistic.model";
import { UnderReviewResponse } from "@/constants/models/report.model";
import UnderReviewReportItem from "./underreview-report-item";
import { ConsultantRecentActivityResponse } from "@/constants/models/recent-activity.model";
import CustomActivityItem from "../ui/custom-activity-item";
import { getTimeAgo } from "@/lib/getTimeAgo";

interface Props {
  statisticData: StatisticResponse;
  underReviewReport: UnderReviewResponse[];
  consultantRecentActivity: ConsultantRecentActivityResponse;
}
export default function ConsultantStatistics({
  statisticData,
  underReviewReport,
  consultantRecentActivity,
}: Props) {
  return (
    <main className="flex-1 p-8 overflow-auto">
      {/* Statistics Cards */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lương Tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statisticData?.staffSalary?.toLocaleString() ?? 0} Đồng
              </div>
              <p className="text-xs text-gray-500"></p>
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã Duyệt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statisticData?.totalApprovedInspectionSchedule ?? 0} Cuộc Hẹn
              </div>
              <p className="text-xs text-gray-500"></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã Từ Chối</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statisticData?.totalRejectedInspectionSchedule ?? 0} Cuộc Hẹn
              </div>
              <p className="text-xs text-gray-500"></p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity Cards - Rearranged with Recent Activity on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ongoing Inspection Schedule Tasks - Left side */}
        <Card className="min-h-[150]">
          <CardHeader className="pb-3">
            <CardTitle>Đang Diễn Ra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {underReviewReport &&
              underReviewReport.map((item) => (
                <div key={item.id} className="mb-4">
                  <UnderReviewReportItem report={item} />
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Recent Activity - Right side */}
        <Card className="h-50vh">
          <CardHeader className="pb-3">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {consultantRecentActivity &&
              consultantRecentActivity?.activities.map((item, index) => (
                <div key={index}>
                  <CustomActivityItem
                    name={item.name}
                    avatar={item.avatarUrl}
                    content={item.content}
                    time={getTimeAgo(item.happenedAt)}
                  />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
