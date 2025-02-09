import { columns } from "@/components/compensation-statuses/columns";
import { GetContractStatus } from "./action";
import GetContractStatusTable from "@/components/contract-statuses/contract-status-table";

export default async function ContractStatusPage() {
    const { value } = await GetContractStatus({ index: 1, size: 10, keyword: "" });
    return (
        <GetContractStatusTable columns={columns} data={value!} />
    )
}