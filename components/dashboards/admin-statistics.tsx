'use client'
import { SystemStatisticResponse } from "@/constants/models/statistic.model";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart } from "../ui/custom-chart";

interface Props {
  statistics: SystemStatisticResponse;
}
export default function AdminStatistics({ statistics }: Props) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }
  return (
    <main className="flex-1 p-8 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(statistics.totalRevenue)}</div>
            {/* <p className="text-xs text-gray-500">+20.1% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Người dùng đang hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.activeUsers} người</div>
            {/* <p className="text-xs text-gray-500">+180 new users</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giao dịch đang lưu hành</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.activeTransactions} giao dịch</div>
            {/* <p className="text-xs text-gray-500">+8.2% from last hour</p> */}
          </CardContent>
        </Card>
        {/* EXTEND */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số xe đã được thuê</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalRentedCars} xe</div>
            {/* <p className="text-xs text-gray-500">+8.2% from last hour</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số lần hủy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalBookingCancelled}</div>
            {/* <p className="text-xs text-gray-500">+8.2% from last hour</p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu qua thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={statistics.revenueOverTime}
              index="month"
              categories={["value"]}
              colors={["#000000"]}
              valueFormatter={(value) => formatCurrency(value)}
              className="h-[200px]"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lưu lượng người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={statistics.activeUsersOverTime}
              index="month"
              categories={["value"]}
              colors={["#000000"]}
              valueFormatter={(value) => `${value}`}
              className="h-[200px]"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
