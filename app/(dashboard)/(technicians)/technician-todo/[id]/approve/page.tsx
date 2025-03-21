import CarInspectionForm from "@/components/car-inspections/form";

export default async function ApproveInspectionSchedulePage({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return (
    <main className="container mx-auto py-8 px-4">
      <CarInspectionForm id={id} />
    </main>
  );
}
