import { GetUserRoles } from "@/app/actions/shared/action";
import { UserRoleParams } from "@/constants/models/user-role.model";
import { useQuery } from "@tanstack/react-query";

export const useUserRoleQuery = ({ params }: { params: UserRoleParams }) => {
  const listUserRoles = useQuery({
    queryKey: ["userRoles"],
    queryFn: () => GetUserRoles(params),
  });
  return { listUserRoles };
};
