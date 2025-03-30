import ContractViewer from "@/components/contracts/contract-component";
import { GetCarContract } from "./action";
import { redirect } from "next/navigation";

export default async function CarContractPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const response = await GetCarContract(id);
  if (!response) {
    redirect("/not-found");
  }
  return (
    <ContractViewer id={id} contractHtml={response} />
  )
}
