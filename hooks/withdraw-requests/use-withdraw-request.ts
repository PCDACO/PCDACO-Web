import { GetWithdrawRequests } from "@/app/(dashboard)/(admin)/withdraw-requests/action";
import { WithdrawRequestParams } from "@/constants/models/withdraw-request.model"
import { useQuery } from "@tanstack/react-query";

interface Props {
  params?: WithdrawRequestParams;
}
export const useWithdrawRequestQuery = ({ params }: Props) => {
  if (!params) {
    params = {
      index: 1,
      size: 10,
      keyword: ""
    };
  }
  const listWithdrawRequest = useQuery({
    queryKey: ["withdraw-requests"],
    queryFn: () => GetWithdrawRequests(params),
  });

  return { listWithdrawRequest };
}
