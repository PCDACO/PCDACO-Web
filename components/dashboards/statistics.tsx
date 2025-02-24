import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart } from "../ui/custom-chart";

export default function DashboardStatistics() {
    return (
        <main className="flex-1 p-8 overflow-auto">
            <h1 className="text-3xl font-bold mb-8">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-gray-500">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,350</div>
                        <p className="text-xs text-gray-500">+180 new users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-xs text-gray-500">+8.2% from last hour</p>
                    </CardContent>
                </Card>
                {/* EXTEND */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Rented Car</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-xs text-gray-500">+8.2% from last hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Cancelled</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-xs text-gray-500">+8.2% from last hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Cancelled</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,247</div>
                        <p className="text-xs text-gray-500">+8.2% from last hour</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChart
                            data={[
                                { name: "Jan", value: 2000 },
                                { name: "Feb", value: 3000 },
                                { name: "Mar", value: 4000 },
                                { name: "Apr", value: 3500 },
                                { name: "May", value: 5000 },
                                { name: "Jun", value: 4500 },
                            ]}
                            index="name"
                            categories={["value"]}
                            colors={["#000000"]}
                            valueFormatter={(value) => `$${value}`}
                            className="h-[200px]"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Active Users Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChart
                            data={[
                                { name: "Jan", value: 1000 },
                                { name: "Feb", value: 1500 },
                                { name: "Mar", value: 2000 },
                                { name: "Apr", value: 1800 },
                                { name: "May", value: 2200 },
                                { name: "Jun", value: 2350 },
                            ]}
                            index="name"
                            categories={["value"]}
                            colors={["#000000"]}
                            valueFormatter={(value) => `${value}`}
                            className="h-[200px]"
                        />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}