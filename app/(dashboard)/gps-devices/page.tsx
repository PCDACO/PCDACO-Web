import GPSDeviceTable from "@/components/gps-device/table";
export default async function GPSDevicePage() {

  return (
    <main className="container">
      <h1>GPS Devices Manage</h1>
      <GPSDeviceTable />
    </main>
  );
}