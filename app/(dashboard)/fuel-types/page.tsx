import FuelTypesTable from "@/components/fuel-types/fuel-types-table";
import { columns } from "@/components/fuel-types/columns";
import { GetFuelTypes } from "./action";


export default async function FuelTypePage() {
    const { value } = await GetFuelTypes({ index: 1, size: 10, keyword: "" });
    return (
        <FuelTypesTable columns={columns} data={value!} />
    )
}
