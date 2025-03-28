import ContractViewer from "@/components/contracts/contract-component";
import { GetCarContract } from "./action";

export default async function CarContractPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const response = await GetCarContract(id);
  return (
    <ContractViewer id={id} contractHtml={response} />
  )
}
