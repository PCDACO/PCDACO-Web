import InspectionDetailComponent from "@/components/inspection-schedules/inspection-schedule-details";
import { GetInspectionScheduleDetail } from "./action";

export default async function TechnicianTodoDetailPage(
  {
    params
  }: {
    params: Promise<{ id: string }>
  }) {
  const { id } = await params
  const data = await GetInspectionScheduleDetail(id);
  return <InspectionDetailComponent id={id} data={data.value} />
}
