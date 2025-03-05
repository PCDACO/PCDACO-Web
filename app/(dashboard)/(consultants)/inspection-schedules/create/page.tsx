import CreateInspectionForm from "@/components/inspection-schedules/create-inspection-form";

export default async function CreateInspectionSchedulePage() {
    return <CreateInspectionForm id="" value={{
        carId: "",
        inspectionAddress: "",
        inspectionDate: new Date(),
        technicianId: ""
    }} />
}