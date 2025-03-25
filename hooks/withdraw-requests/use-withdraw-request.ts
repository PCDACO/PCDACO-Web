import { GetWithdrawRequests } from "@/app/(dashboard)/(admin)/withdraw-requests/action";
import { WithdrawRequestParams } from "@/constants/models/withdraw-request.model"
import { useQuery } from "@tanstack/react-query";

interface Props {
  params?: WithdrawRequestParams;
}
export const useWithdrawRequestQuery = ({ params }: Props) => {
  if (!params) {
    params = {
      fromDate: new Date("0001-01-01T00:00:00Z"),
      toDate: new Date("3000-12-30T00:00:00Z"),
      limit: 10,
      status: 0,
      searchTerm: "",
    };
  }
  const listWithdrawRequest = useQuery({
    queryKey: ["withdraw-requests"],
    queryFn: () => GetWithdrawRequests(params),
  });

  return { listWithdrawRequest };
}
