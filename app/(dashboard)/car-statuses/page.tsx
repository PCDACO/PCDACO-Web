import CarStatusesTable from "@/components/car-statuses/car-statuses-table";
import { GetCarStatuses } from "./action";
import { columns } from "@/components/car-statuses/columns";

export default async function CarStatusPage() {
    const { value } = await GetCarStatuses({ index: 1, size: 10, keyword: "" });
    return <CarStatusesTable columns={columns } data={value} />
}