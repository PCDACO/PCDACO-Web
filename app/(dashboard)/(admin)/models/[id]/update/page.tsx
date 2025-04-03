import ModelForm from "@/components/models/form";
import { redirect } from "next/navigation";
import { GetModel } from "../../../manufacturers/[id]/models/action";
import { GetManufacturers } from "../../../manufacturers/action";

export default async function UpdateModelPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const model = await GetModel(id);
  if (!model?.value) redirect("/manufacturers");
  const manufactures = await GetManufacturers({
    index: 1,
    size: 1000,
    keyword: ""
  });
  return <ModelForm id={id} value={{
    manufacturerId: model?.value?.manufacturer.id ?? "",
    name: model?.value?.name ?? "",
    releaseDate: model?.value?.releaseDate ?? ""
  }} manufacturers={manufactures?.value?.items ?? []} />
}
