import { columns } from "@/components/manufacturers/columns";
import ManufacturersTable from "@/components/manufacturers/manufacturers-table";

export default function ManufacturerPage() {
    return (<ManufacturersTable columns={columns} />)
}
