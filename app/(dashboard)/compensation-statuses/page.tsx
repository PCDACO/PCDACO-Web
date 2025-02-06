import { columns } from "@/components/compensation-statuses/columns";
import CompensationStatusesTable from "@/components/compensation-statuses/compensation-statuses-table";

export default function CompensationStatusPage() {
    return (
        <CompensationStatusesTable columns={columns} />
    )
}