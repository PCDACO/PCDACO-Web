import AmenitiesTable from "@/components/amenities/amenities-table";
import { columns } from "@/components/amenities/columns";

export default function AmenitiesPage() {
    return (
        <AmenitiesTable columns={columns} />
    )
}
