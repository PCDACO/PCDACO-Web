import TransmissionTable from "@/components/transmissions/transmissions-table";
import { columns } from "@/components/transmissions/columns";
import { GetTransmissions } from "./action";

export default async function TransmissionPage() {
    const { value } = await GetTransmissions({ index: 1, size: 10, keyword: "" });
    return (
        <TransmissionTable data={value!} columns={columns} />
    )
}
