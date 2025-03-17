import DriverTable from "@/components/drivers/table";

export const dynamic = "force-dynamic";
export default async function PendingCarsPage() {
  return (
    <main className="container">
      <h1>Driver Manage</h1>
      <DriverTable />
    </main>
  );
}
