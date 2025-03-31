import AdminStatistics from "@/components/dashboards/admin-statistics";
import ConsultantStatistics from "@/components/dashboards/consultant-statistics";
import TechnicianStatistics from "@/components/dashboards/technician-statistics";
import { cookies } from "next/headers";
import Link from "next/link";
import { GetInProgressInspectionSchedule } from "../(consultants)/inspection-schedules/action";
import { GetStatistics, GetSystemStatistics } from "./action";
import { GetUnderReviewReports } from "../(consultants)/reports/action";

export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const statisticRepsonse = await GetStatistics();
  const cookieStore = await cookies();
  const role = cookieStore.get("role");
  switch (role?.value) {
    case "Admin": {
      const response = await GetSystemStatistics();
      return <AdminStatistics statistics={response.value} />
    };
    case "Technician": {
      const inProgressInspectionScheduleResponse = await GetInProgressInspectionSchedule();
      return <TechnicianStatistics statisticData={statisticRepsonse.value} inProgressInspectionSchedule={inProgressInspectionScheduleResponse.value} />
    };
    case "Consultant": {
      const underReviewReportScheduleResponse = await GetUnderReviewReports();
      return <ConsultantStatistics statisticData={statisticRepsonse.value} underReviewReport={underReviewReportScheduleResponse.value ?? []} />
    };
    default: {
      return (<div>
        <ul>
          <li><Link href={"/home"}>Home</Link></li>
          <li><Link href={"/blog"}>Blog</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>)
    }
  }
}
