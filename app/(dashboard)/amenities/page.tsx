import AmenitiesTable from "@/components/amenities/amenities-table";
import { columns } from "@/components/amenities/columns";
import { GetAmenities } from "./action";

export default async function AmenitiesPage() {
    const { value } = await GetAmenities({ index: 1, size: 10, keyword: "" });
    return (
        <AmenitiesTable data={value} columns={columns} />
    )
}
