import { GetSignedInspectionSchedule } from "@/app/(dashboard)/(consultants)/inspection-schedules/action";
import CarInspectionForm from "@/components/car-inspections/form";

export default async function ApproveInspectionSchedulePage() {
  const response = await GetSignedInspectionSchedule();
  return (
    <main className="container mx-auto py-8 px-4">
      <CarInspectionForm schedule={response.value} />
    </main>
  );
}
