import { Logout } from "@/app/(auth)/login/action";

export const GET = async () => {
  await Logout();
};
