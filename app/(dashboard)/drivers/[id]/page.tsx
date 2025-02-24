import DriverProfile from "@/components/drivers/profile"
export default async function ProfilePage({ params }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;
    return (
        <DriverProfile id={id} />
    )
}

