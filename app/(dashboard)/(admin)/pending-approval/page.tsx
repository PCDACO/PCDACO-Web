import PendingOwnerTable from "@/components/owners/pending-table";

export default async function PendingApprovalPage() {
  return (
    <main className="h-[calc(100vh-120px)]">
      <PendingOwnerTable />
    </main>
  );
}
