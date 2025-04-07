import CarDetailsComponent from "@/components/cars/detail";
import { GetCarDetail } from "./action";
import { redirect } from "next/navigation";

export default async function CarPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const carDetailResponse = await GetCarDetail(id);
  console.log(carDetailResponse);
  if (!carDetailResponse.value) {
    redirect("/not-found");
  }
  return <CarDetailsComponent car={carDetailResponse.value} />
}
