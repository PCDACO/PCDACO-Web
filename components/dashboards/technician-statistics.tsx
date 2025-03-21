"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStatisticsQuery } from "../../hooks/statistics/use-statistics"
import { Separator } from "@/components/ui/separator"
import ActivityItem from "./activity-item"
import InspectionTaskItem from "./inspection-task-item"
export function useStatistics() {
  // Mock data that matches the expected structure
  const mockData = {
    value: {
      staffSalary: 5000000,
      totalApprovedInspectionSchedule: 24,
      totalRejectedInspectionSchedule: 8,
      ongoingInspections: [
        {
          id: "insp-001",
          address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
          ownerName: "Nguyễn Văn A",
          licensePlate: "59F-12345",
          scheduledTime: "10:30 AM - 12/04/2025",
        },
        // {
        //   id: "insp-002",
        //   address: "456 Lê Lợi, Quận 3, TP.HCM",
        //   ownerName: "Trần Thị B",
        //   licensePlate: "51G-67890",
        //   scheduledTime: "2:15 PM - 12/04/2025",
        // },
      ],
    },
  }

  return {
    listStatistics: {
      data: mockData,
      isLoading: false,
      error: null,
    },
  }
}

export default function TechnicianStatistics() {
  const { listStatistics } = useStatistics();
  const { listStatisticsQuery } = useStatisticsQuery()
  // const date = new Date()

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
                {listStatisticsQuery.data?.value?.staffSalary?.toLocaleString() ?? 0} Đồng
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
                {listStatisticsQuery.data?.value?.totalApprovedInspectionSchedule ?? 0} Cuộc Hẹn
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
                {listStatisticsQuery.data?.value?.totalRejectedInspectionSchedule ?? 0} Cuộc Hẹn
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
            {listStatistics.data?.value?.ongoingInspections?.map((inspection) => (
              <div key={inspection.id} className="mb-4">
                <InspectionTaskItem
                  id={inspection.id}
                  address={inspection.address}
                  ownerName={inspection.ownerName}
                  licensePlate={inspection.licensePlate}
                  scheduledTime={inspection.scheduledTime}
                />
              </div>
            ))}
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

