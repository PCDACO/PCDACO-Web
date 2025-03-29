import ReportDetails from "@/components/reports/detail";
import { GetReport } from "./action";

export default async function ReportDetailPage({
  params
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);
  const reportResponse = await GetReport(id);
  return <ReportDetails report={reportResponse.value} />
}
