import UserDetailsComponent from "@/components/users/detail";
import { GetUserDetail } from "./action";
import { redirect } from "next/navigation";

export default async function UserDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const userResponse = await GetUserDetail(id);
  if (!userResponse.value) {
    redirect("/not-found");
  }
  return <UserDetailsComponent user={userResponse.value} />
}
