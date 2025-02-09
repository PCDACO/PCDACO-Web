import ModelsTable from "@/components/models/models-table";
import { columns } from "@/components/models/columns";
import { GetModels } from "./action";


export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const { value } = await GetModels({ index: 1, size: 10, keyword: "", manufacturerId: id });
    return (
        <ModelsTable columns={columns} id={id} data={value!} />
    )
}
