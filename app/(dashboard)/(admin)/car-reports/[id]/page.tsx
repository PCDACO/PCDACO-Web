import { redirect } from "next/navigation";
import { GetCarReportDetails } from "./action";
import CarReportDetailComponent from "@/components/car-reports/detail";

const CarReportDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const response = await GetCarReportDetails(id);
  if (!response?.value) {
    redirect("/not-found");
  }
  console.log(response.value);
  return <CarReportDetailComponent report={response.value} />
}

export default CarReportDetailPage;
