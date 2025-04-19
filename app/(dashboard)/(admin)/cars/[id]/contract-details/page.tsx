import { GetCarContract } from "@/app/(dashboard)/(technicians)/cars/[id]/contract/action";
import { redirect } from "next/navigation";

const ContractDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const response = await GetCarContract(id);
  console.log(response);
  if (!response) {
    redirect("/not-found");
  }
  return (
    <div>
      <div
        className="max-h-[85vh] overflow-y-auto"
        dangerouslySetInnerHTML={{
          __html: response.toString()
        }}
      />
    </div>
  )
}

export default ContractDetailPage;
