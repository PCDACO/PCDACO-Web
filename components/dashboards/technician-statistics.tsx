'use client'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useStatisticsQuery } from "@/hooks/statistics/use-statistics";

export default function TechnicianStatistics() {
  const { listStatisticsQuery } = useStatisticsQuery();
  const date = new Date();
  return (
    <main className="flex-1 p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-8">Số Liệu Tháng</h1>
      <h3 className="text-1xl mb-8">Hôm nay: {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lương Tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {listStatisticsQuery.data?.value?.staffSalary ?? 0} Đồng
            </div>
            <p className="text-xs text-gray-500">
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã Duyệt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {listStatisticsQuery.data?.value?.totalApprovedInspectionSchedule ?? 0} Cuộc Hẹn
            </div>
            <p className="text-xs text-gray-500">
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã Từ Chối</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {listStatisticsQuery.data?.value?.totalRejectedInspectionSchedule ?? 0} Cuộc Hẹn
            </div>
            <p className="text-xs text-gray-500">
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
