import InspectionDetailComponent from "@/components/inspection-schedules/inspection-schedule-details";

export default async function TechnicianTodoDetailPage(
  {
    params
  }: {
    params: Promise<{ id: string }>
  }) {
  const { id } = await params
  console.log(id);
  return <InspectionDetailComponent id={id} />
}
