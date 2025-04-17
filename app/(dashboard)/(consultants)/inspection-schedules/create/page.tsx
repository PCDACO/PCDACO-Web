import { GetTechnicians } from "@/app/(dashboard)/(admin)/technicians/action";
import CreateInspectionForm from "@/components/inspection-schedules/create-inspection-form";
import { GetCars } from "@/app/(dashboard)/(admin)/cars/action";

export default async function CreateInspectionSchedulePage() {
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
  return (
    <CreateInspectionForm
      id=""
      value={{
        carId: "",
        inspectionAddress: "",
        inspectionDate: new Date(),
        technicianId: "",
        inspectionType: 0,
      }}
      cars={carResponse?.value?.items ?? []}
      technicians={technicianResponse?.value?.items ?? []}
    />
  );
}
