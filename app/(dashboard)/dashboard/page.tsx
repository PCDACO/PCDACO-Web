import AdminStatistics from "@/components/dashboards/admin-statistics";
import ConsultantStatistics from "@/components/dashboards/consultant-statistics";
import TechnicianStatistics from "@/components/dashboards/technician-statistics";
import { cookies } from "next/headers";
import Link from "next/link";
import { GetInProgressInspectionSchedule } from "../(consultants)/inspection-schedules/action";
import { GetStatistics } from "./action";

export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const statisticRepsonse = await GetStatistics();
  const cookieStore = await cookies();
  const role = cookieStore.get("role");
  switch (role?.value) {
    case "Admin": {
      return <AdminStatistics />
    };
    case "Technician": {
      const inProgressInspectionScheduleResponse = await GetInProgressInspectionSchedule();
      return <TechnicianStatistics statisticData={statisticRepsonse.value} inProgressInspectionSchedule={inProgressInspectionScheduleResponse.value} />
    };
    case "Consultant": {
      return <ConsultantStatistics />
    };
    default: {
      return (<div>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <ul>
          <li><Link href={"/home"}>Home</Link></li>
          <li><Link href={"/blog"}>Blog</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>)
    }
  }
}
