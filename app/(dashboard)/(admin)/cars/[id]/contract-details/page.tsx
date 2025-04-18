import { GetCarContract } from "@/app/(dashboard)/(technicians)/cars/[id]/contract/action";
import ContractDetailComponent from "@/components/cars/contract-detail";
import { redirect } from "next/navigation";

const ContractDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const response = await GetCarContract(id);
  if (!response) {
    redirect("/not-found");
  }
  return <ContractDetailComponent contractHtml={response} id={id} />
}

export default ContractDetailPage;
