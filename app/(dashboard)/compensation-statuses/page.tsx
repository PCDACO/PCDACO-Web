import { columns } from "@/components/compensation-statuses/columns";
import CompensationStatusesTable from "@/components/compensation-statuses/compensation-statuses-table";
import { GetCompensationStatuses } from "./action";

export const dynamic = "force-dynamic";
export default async function CompensationStatusPage() {
    const { value } = await GetCompensationStatuses({ index: 1, size: 10, keyword: "" });
    return (
        <CompensationStatusesTable columns={columns} data={value!} />
    )
}