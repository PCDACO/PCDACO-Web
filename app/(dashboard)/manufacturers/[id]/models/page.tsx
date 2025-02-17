import ModelTable from "@/components/models/table";

export const dynamic = "force-dynamic";
export default async function ModelsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ModelTable manufacturerId={id} />
}
