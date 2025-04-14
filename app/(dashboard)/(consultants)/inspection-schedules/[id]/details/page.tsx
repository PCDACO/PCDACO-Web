import { GetCar } from "@/app/(dashboard)/(admin)/cars/action";
import { GetInspectionScheduleDetail } from "@/app/(dashboard)/(technicians)/technician-todo/[id]/action";
import InspectionDetailComponent from "@/components/inspection-schedules/details";
import { redirect } from "next/navigation";

const InspectionScheduleDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
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

export default InspectionScheduleDetailPage;
