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
} from "lucide-react";
// import Link from "next/link"
import { LogoutButton } from "./LogoutButton";

// Menu items.
const items = [
  {
    title: "Thống Kê",
    url: "",
    icon: AlignEndHorizontal,
  },
  {
    title: "Xe",
    url: "cars",
    icon: Car,
  },
  {
    title: "Người Cho Thuê",
    url: "owners",
    icon: PersonStandingIcon,
  },
  {
    title: "Người Thuê",
    url: "drivers",
    icon: PersonStandingIcon,
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
  },
];

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
                  <SidebarMenuButton asChild size={"lg"}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
