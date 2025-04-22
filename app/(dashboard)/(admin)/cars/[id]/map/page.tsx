import MapView from "@/components/cars/map";

const CarMap = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <main className="w-full flex-1 h-[calc(100vh-100px)]">
      <MapView id={id} />
    </main>
  );
};

export default CarMap;
