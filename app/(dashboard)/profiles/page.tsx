import { GetCurrentUser } from "@/app/actions/shared/action";
import ProfileComponent from "@/components/profiles/profile";

export default async function ProfilePage() {
  const response = await GetCurrentUser();
  return <ProfileComponent user={response.value} />
}
