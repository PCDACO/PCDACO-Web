import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    LayoutDashboard,
    Car,
    HousePlus,
    Factory,
    LogOut,
} from "lucide-react"
import Link from "next/link"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Cars",
        url: "cars",
        icon: Car,
    },
    {
        title: "Amenities",
        url: "amenities",
        icon: HousePlus,
    },
    {
        title: "Manufacturers",
        url: "manufacturers",
        icon: Factory,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent className=" flex flex-col justify-between">
                <SidebarGroup>
                    <SidebarGroupLabel>PCDACO Admin Panel</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size={"lg"} >
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup >
                <SidebarFooter>
                    <SidebarGroup >
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild size={"lg"}>
                                        <Link href="/login">
                                            <LogOut />
                                            <span>Logout</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
