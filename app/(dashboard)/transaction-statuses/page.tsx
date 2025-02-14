import BookingStatusesTable from "@/components/booking-statuses/booking-statuses-table";
import { columns } from "@/components/booking-statuses/columns";
import { GetTransactionStatuses } from "./action";

export const dynamic = "force-dynamic";
export default async function TransactionStatusPage() {
    const { value } = await GetTransactionStatuses({ index: 1, size: 10, keyword: "" });
    return (
        <BookingStatusesTable columns={columns} data={value!} />
    )
}