import CarTable from "@/components/cars/cars-table";
import { columns } from "@/components/cars/columns";
import { GetCars } from "./action";


export default async function CarPage() {
    const { value } = await GetCars({ index: 1, size: 10, keyword: "" });
    return (
        <CarTable columns={columns} data={value} />
    )
}
