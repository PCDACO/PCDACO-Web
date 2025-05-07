import { GetCarContract } from "@/app/(dashboard)/(technicians)/cars/[id]/contract/action";
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
  return (
    <div
      className="max-h-[calc(100vh-90px)] overflow-y-auto"
      dangerouslySetInnerHTML={{
        __html: response.toString()
      }}
    />
  )
}

export default ContractDetailPage;
