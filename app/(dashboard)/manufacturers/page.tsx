import { columns } from "@/components/manufacturers/columns";
import ManufacturersTable from "@/components/manufacturers/manufacturers-table";
import { GetManufacturers } from "./action";

export default async function ManufacturerPage() {
    const { value } = await GetManufacturers({ index: 1, size: 10, keyword: "" });
    return (<ManufacturersTable columns={columns} data={value} />)
}
