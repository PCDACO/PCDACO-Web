"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import ActivityItem from "./activity-item"
import InspectionTaskItem from "./inspection-task-item"
import { format } from "date-fns"
import { InProgressInspectionScheduleResponse } from "@/constants/models/inspection-schedule.model"
import { StatisticResponse } from "@/constants/models/statistic.model"

interface Props {
  inProgressInspectionSchedule?: InProgressInspectionScheduleResponse;
  statisticData?: StatisticResponse
}

export default function TechnicianStatistics({ inProgressInspectionSchedule, statisticData }: Props) {

  return (
    <main className="flex-1 p-8 overflow-auto">
      {/* Statistics Cards */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-8">Số Liệu Tháng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lương Tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statisticData?.staffSalary?.toLocaleString() ?? 0} Đồng
              </div>
              <p className="text-xs text-gray-500"></p>
            </CardContent>
          </Card>
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Lịch Kiểm Tra Đang Diễn Ra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {inProgressInspectionSchedule && (
              <div key={inProgressInspectionSchedule.id} className="mb-4">
                <InspectionTaskItem
                  id={inProgressInspectionSchedule.id}
                  address={inProgressInspectionSchedule.address}
                  ownerName={inProgressInspectionSchedule.ownerName}
                  licensePlate={inProgressInspectionSchedule.licensePlate}
                  scheduledTime={format(inProgressInspectionSchedule.date, 'MM/dd/yyyy hh:mm a')}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity - Right side */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ActivityItem
              avatar="/placeholder.svg?height=32&width=32"
              name="Alex Johnson"
              action="commented on"
              target="Website Redesign"
              time="10 minutes ago"
            />
            <Separator />
            <ActivityItem
              avatar="/placeholder.svg?height=32&width=32"
              name="Sarah Miller"
              action="completed task"
              target="Create wireframes"
              time="1 hour ago"
            />
            <Separator />
            <ActivityItem
              avatar="/placeholder.svg?height=32&width=32"
              name="David Chen"
              action="uploaded"
              target="Q2 Financial Report"
              time="2 hours ago"
            />
            <Separator />
            <ActivityItem
              avatar="/placeholder.svg?height=32&width=32"
              name="Emily Wilson"
              action="created project"
              target="Mobile App Redesign"
              time="Yesterday at 4:30 PM"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
