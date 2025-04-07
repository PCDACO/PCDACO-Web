import UserDetailsComponent from "@/components/users/detail";
import { GetUserDetail } from "./action";

export default async function UserDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const userResponse = await GetUserDetail(id);
  return <UserDetailsComponent user={userResponse.value} />
}
