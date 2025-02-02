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
    Car,
    HousePlus,
    Factory,
    LogOut,
    FuelIcon,
    AlignEndHorizontal,
    Cog,
} from "lucide-react"
import Link from "next/link"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "dashboard",
        icon: AlignEndHorizontal,
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
    },
    {
        title: "Fuel Types",
        url: "fuel-types",
        icon: FuelIcon,
    },
    {
        title: "Transmissions",
        url: "transmissions",
        icon: Cog,
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
