import ModelForm from "@/components/models/form";
import { GetManufacturers } from "../../../../action";
import { GetModel } from "../../action";
import { redirect } from "next/navigation";

export default async function UpdateModelPage({
  params
}: {
  params: Promise<{ modelId: string }>
}) {
  const { modelId } = await params;
  const model = await GetModel(modelId);
  if (!model?.value) redirect("/manufacturers");
  const manufactures = await GetManufacturers({
    index: 1,
    size: 1000,
    keyword: ""
  });
  return <ModelForm id={modelId} value={{
    manufacturerId: model?.value?.manufacturerId ?? "",
    name: model?.value?.name ?? "",
    releaseDate: model?.value?.releaseDate ?? ""
  }} manufacturers={manufactures?.value?.items ?? []} />
}
