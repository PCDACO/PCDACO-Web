import { GetTransactions } from "@/app/(dashboard)/(admin)/transactions/action";
import { TransactionParams } from "@/constants/models/transaction.model";
import { useQuery } from "@tanstack/react-query"
interface Props {
  params?: TransactionParams;
}
export const useTransactionQuery = ({ params }: Props) => {
  if (params === undefined) {
    params = {
      index: 1,
      size: 10,
      transactionType: "",
      keyword: ""
    }
  }

  const listTransactions = useQuery({
    queryKey: ["transactions"],
    queryFn: () => GetTransactions(params),
  });

  return {
    listTransactions
  }
}
