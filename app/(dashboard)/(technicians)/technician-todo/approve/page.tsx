import { GetSignedOrInProgressInspectionSchedule } from "@/app/(dashboard)/(consultants)/inspection-schedules/action";
import CarInspectionForm from "@/components/car-inspections/form";
import { redirect } from "next/navigation";

export default async function ApproveInspectionSchedulePage() {
  const response = await GetSignedOrInProgressInspectionSchedule();
  if (!response?.value) {
    redirect("/not-found");
  }
  return (
    <main className="container mx-auto py-8 px-4">
      <CarInspectionForm schedule={response.value} />
    </main>
  );
}
