'use server'
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
} from "@/components/ui/sidebar";
import {
  Car,
  HousePlus,
  Factory,
  FuelIcon,
  AlignEndHorizontal,
  Cog,
  PersonStandingIcon,
  Calendar,
} from "lucide-react";
// import Link from "next/link"
import { LogoutButton } from "./LogoutButton";
import { cookies } from "next/headers";
import Link from "next/link";

// Menu items.
const items = [
  // ADMIN
  {
    title: "Thống Kê",
    url: "/dashboard",
    icon: AlignEndHorizontal,
    role: "Admin",
  },
  {
    title: "Xe",
    url: "/cars",
    icon: Car,
    role: "Admin",
  },
  {
    title: "Tiện Nghi",
    url: "/amenities",
    icon: HousePlus,
    role: "Admin",
  },
  {
    title: "Nhà Sản Xuất",
    url: "/manufacturers",
    icon: Factory,
    role: "Admin",
  },
  {
    title: "Loại Nhiên Liệu",
    url: "/fuel-types",
    icon: FuelIcon,
    role: "Admin",
  },
  {
    title: "Loại Truyền Động",
    url: "/transmissions",
    icon: Cog,
    role: "Admin",
  },
  {
    title: "Người Cho Thuê",
    url: "/owners",
    icon: PersonStandingIcon,
    role: "Admin",
  },
  {
    title: "Người Thuê",
    url: "/drivers",
    icon: PersonStandingIcon,
    role: "Admin",
  },
  {
    title: "Tư Vấn Viên",
    url: "/consultants",
    icon: PersonStandingIcon,
    role: "Admin",
  },
  {
    title: "Kĩ Thuật Viên",
    url: "/technicians",
    icon: PersonStandingIcon,
    role: "Admin",
  },
  // TECHNICIAN
  {
    title: "Tổng Quan",
    url: "/dashboard",
    icon: Cog,
    role: "Technician",
  },
  {
    title: "Lịch Kiểm Định",
    url: "/technician-todo",
    icon: Calendar,
    role: "Technician",
  },
  // CONSULTANT
  {
    title: "Thống Kê",
    url: "/dashboard",
    icon: AlignEndHorizontal,
    role: "Consultant",
  },
  {
    title: "Lịch Kiểm Định",
    url: "/inspection-schedules",
    icon: Calendar,
    role: "Consultant",
  },
];

export async function AppSidebar() {
  const cookieStore = await cookies();
  // const role = cookieStore.get("role");
  //   return items.filter(i => i.role === userRole.value)
  // })
  const userRole = cookieStore.get("role");
  if (!userRole)
    return (<Sidebar>
      <SidebarContent className=" flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>PCDACO Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size={"lg"}>
                    <LogoutButton />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>)
  const filteredItems = items.filter(i => i.role === userRole.value);
  return (
    <Sidebar>
      <SidebarContent className=" flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>PCDACO Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size={"lg"}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size={"lg"}>
                    <LogoutButton />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
