import ManufacturerTable from "@/components/manufacturers-ex/table";
// import ManufacturersTable from "@/components/manufacturers/manufacturers-table";
// import { GetManufacturers } from "./action";
// import { columns } from "@/components/manufacturers/columns";

// export const dynamic = "force-dynamic";
export default async function ManufacturerPage() {
  // const { value } = await GetManufacturers({ index: 1, size: 10, keyword: "" });
  // return <ManufacturersTable columns={columns} data={value!} />;

  return (
    <main className="container">
      <h1>Manufacturer Manage</h1>

      <ManufacturerTable />
    </main>
  );
}
