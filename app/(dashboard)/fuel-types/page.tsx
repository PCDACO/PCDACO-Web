import FuelTypesTable from "@/components/fuel-types/fuel-types-table";
import { columns } from "@/components/fuel-types/columns";


export default function CarPage() {
    return (
        <FuelTypesTable columns={columns} />
    )
}
