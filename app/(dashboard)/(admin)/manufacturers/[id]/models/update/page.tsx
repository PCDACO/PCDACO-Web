import ModelForm from "@/components/models/form";
import { GetManufacturers } from "../../../action";

export default async function CreateModelPage() {
  const manufactures = await GetManufacturers({
    index: 1,
    size: 1000,
    keyword: ""
  });
  return <ModelForm id={""} value={{
    name: "",
    manufacturerId: "",
    releaseDate: new Date(),
  }} manufacturers={manufactures?.value?.items ?? []} />
}
