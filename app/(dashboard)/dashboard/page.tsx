import DashboardStatistics from "@/components/dashboards/statistics";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function DashboardPage() {
    const cookieStore = await cookies();
    const role = cookieStore.get("role");
    switch (role?.value) {
        case "Admin": {
            return <DashboardStatistics />
        };
        case "Technician": {
            return <DashboardStatistics />
        };
        case "Consultant": {
            return <DashboardStatistics />
        };
        default: {
            return (<div>
                <h1>Oops! You seem to be lost.</h1>
                <p>Here are some helpful links:</p>
                <ul>
                    <li><Link href={"/home"}>Home</Link></li>
                    <li><Link href={"/blog"}>Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </div>)
        }
    }
}