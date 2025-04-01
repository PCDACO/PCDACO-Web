export interface StatisticResponse {
  totalBooking: number,
  totalCompleted: number,
  totalRejected: number,
  totalExpired: number,
  totalCancelled: number,
  totalEarning: number,
  averageRating: number,
  totalCreatedInspectionSchedule: number,
  totalApprovedInspectionSchedule: number,
  totalRejectedInspectionSchedule: number,
  staffSalary: number,
}

export interface SystemStatisticResponse {
  totalRevenue: number;
  activeUsers: number;
  activeTransactions: number;
  totalRentedCars: number;
  totalBookingCancelled: number;
  cancellationLoss: number;
  revenueOverTime: ChartDetail[];
  activeUsersOverTime: ChartDetail[];
}

export interface ChartDetail {
  month: string;
  value: number;
}
