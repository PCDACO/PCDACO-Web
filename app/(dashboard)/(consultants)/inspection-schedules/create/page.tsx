 
import { GetTechnicians } from "@/app/(dashboard)/(admin)/technicians/action";
import CreateInspectionForm from "@/components/inspection-schedules/create-inspection-form";
import { GetCars } from "@/app/(dashboard)/(admin)/cars/action";

export default async function CreateInspectionSchedulePage({
  searchParams
}: {
  searchParams: Promise<{
    carId?: string;
    reportId?: string;
    type?: "report" | "gps-unassign"
  }>
}) {
  const { carId, reportId, type } = await searchParams;
  const carResponse = await GetCars({
    index: 1,
    size: 1000,
    keyword: "",
  });
  const technicianResponse = await GetTechnicians({
    index: 1,
    size: 1000,
    keyword: "",
  });

  const getInspectionType = (): number => {
    if (!type) {
      return 0;
    }
    switch (type) {
      case "report": {
        return 1;
      }
      case "gps-unassign": {
        return 2;
      }
      default: {
        return 0;
      }
    }
  }
  return (
    <CreateInspectionForm
      id=""
      carId={carId}
      reportId={reportId}
      value={{
        carId: carId ?? "",
        reportId: reportId ?? "",
        inspectionAddress: "",
        inspectionDate: new Date(),
        technicianId: "",
        type: getInspectionType(),
      }}
      cars={carResponse?.value?.items ?? []}
      technicians={technicianResponse?.value?.items ?? []}
    />
  );
}
