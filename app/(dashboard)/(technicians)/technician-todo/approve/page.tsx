import { GetInProgressInspectionSchedule } from "@/app/(dashboard)/(consultants)/inspection-schedules/action";
import CarInspectionForm from "@/components/car-inspections/form";

export default async function ApproveInspectionSchedulePage() {
  // This id will be car Id
  const response = await GetInProgressInspectionSchedule();
  return (
    <main className="container mx-auto py-8 px-4">
      <CarInspectionForm id={response.value.id} />
    </main>
  );
}
