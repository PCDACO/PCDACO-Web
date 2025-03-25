import { useWithdrawRequestQuery } from "@/hooks/withdraw-requests/use-withdraw-request";
import { DataTable } from "../data-table";
import SearchInput from "../input/search-input";
import { WithdrawRequestColumn } from "./column";
import PaginationTable from "../data-table/pagination";

export default function WithdrawRequestTable() {
  const { listWithdrawRequest } = useWithdrawRequestQuery({});
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              listWithdrawRequest.data?.value ?? {
                items: [],
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10,
                hasNext: false,
              }
            }
          />
        </div>
      </div>
      <DataTable
        columns={WithdrawRequestColumn}
        data={listWithdrawRequest.data?.value.items ?? []}
        isLoading={listWithdrawRequest.isLoading}
      />
    </div>
  )
}
