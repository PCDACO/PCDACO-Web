import MapView from "@/components/cars/map";

const CarMap = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  console.log(id);
  return (
    <main className="w-full h-screen">
      <MapView id={id} />
    </main>
  )
}

export default CarMap;
