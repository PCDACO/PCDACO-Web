import OwnerTable from "@/components/owners/table";

export const dynamic = "force-dynamic";
export default async function OwnerPage() {
  return (
    <main className="container">
      <h1>Owner Manage</h1>
      <OwnerTable />
    </main>
  );
}
