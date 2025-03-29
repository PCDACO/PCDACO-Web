import InspectionDetailComponent from "@/components/inspection-schedules/inspection-schedule-details";
import { GetInspectionScheduleDetail } from "./action";
import { GetCar } from "@/app/(dashboard)/(admin)/cars/action";
import { redirect } from "next/navigation";

export default async function TechnicianTodoDetailPage(
  {
    params
  }: {
    params: Promise<{ id: string }>
  }) {
  const { id } = await params
  const inspectionScheduleResponse = await GetInspectionScheduleDetail(id);
  let carResponse
  if (!inspectionScheduleResponse.value) {
    carResponse = null!;
    redirect("/not-found");
  }
  carResponse = await GetCar(inspectionScheduleResponse.value.car.id);
  return <InspectionDetailComponent id={id} data={inspectionScheduleResponse.value} car={carResponse.value} />
}
