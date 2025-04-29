import CarDetailsComponent from "@/components/cars/detail";
import { GetCarDetail } from "./action";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CarPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const carDetailResponse = await GetCarDetail(id);
  if (!carDetailResponse.value) {
    redirect("/not-found");
  }
  const role = cookieStore.get("role");
  if (!role?.value) {
    redirect("/not-found");
  }
  return <CarDetailsComponent car={carDetailResponse.value} role={role.value} />
}
