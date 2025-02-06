import CarTable from "@/components/cars/cars-table";
import { columns } from "@/components/cars/columns";


export default function CarPage() {
    return (
        <CarTable columns={columns} />
    )
}
