import ModelsTable from "@/components/models/models-table";
import { columns } from "@/components/models/columns";


export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <ModelsTable columns={columns} id={id} />
    )
}
