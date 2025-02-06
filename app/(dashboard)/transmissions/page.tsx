import TransmissionTable from "@/components/transmissions/transmissions-table";
import { columns } from "@/components/transmissions/columns";

export default function TransmissionPage() {
    return (
        <TransmissionTable columns={columns} />
    )
}
