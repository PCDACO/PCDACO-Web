"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CurrentUserResponse } from "@/constants/models/user.model";
import { LogoutButton } from "../ui/LogoutButton";
import { SidebarTrigger } from "../ui/sidebar";

interface BreadcrumbItemType {
  label: string;
  href: string;
}

const routeMap: { [key: string]: string } = {
  statistics: "Thống kê",
  cars: "Xe",
  contract: "Hợp đồng",
  amenities: "Tiện nghi",
  manufacturers: "Nhà sản xuất",
  models: "Dòng xe",
  "fuel-types": "Nhiên liệu",
  transmissions: "Hộp số",
  bookings: "Đặt xe",
  "car-reports": "Báo cáo xe",
  consultants: "Tư vấn viên",
  drivers: "Tài xế",
  "gps-devices": "Thiết bị GPS",
  owners: "Chủ xe",
  "pending-approval": "Chờ phê duyệt",
  technicians: "Kỹ thuật viên",
  transactions: "Giao dịch",
  users: "Người dùng",
  "withdraw-requests": "Yêu cầu rút tiền",
  "inspection-schedules": "Lịch kiểm định",
  "pending-cars": "Xe chờ duyệt",
  reports: "Báo cáo",
  "personal-schedules": "Lịch cá nhân",
  "techhnician-todo": "Việc cần làm (KT)",
  profiles: "Hồ sơ",
  create: "Tạo",
  approve: "Phê duyệt",
  "contract-detail": "Hợp đồng",
  "technician-todo": "Việc cần làm",
  "checkout": "Hoàn tất thanh toán",
  "details": "Chi tiết",
};

const generateBreadcrumbs = (pathname: string): BreadcrumbItemType[] => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItemType[] = [];

  let href = "";
  breadcrumbs.push({ label: "Trang chủ", href: "/statistics" });
  pathSegments.forEach((segment) => {
    href += `/${segment}`;
    const label = routeMap[segment] || segment; // Use mapping or segment itself
    breadcrumbs.push({ label: label, href: href });
  });

  return breadcrumbs;
};

interface Props {
  currentUser: CurrentUserResponse;
}
const Breadcrumbs = ({ currentUser }: Props) => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);
  const { push } = useRouter();
  const handleNavigateToProfiles = () => {
    push("/profiles");
  }
  return (
    <header className="flex h-16 justify-between items-center gap-2 border-b px-4 shadow-md shadow-cyan-300/10 ">
      <div className="flex justify-start items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem key={index}>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="shadow-cyan-300 shadow-md" asChild>
          <Button variant="outline" className="relative h-8 w-8  rounded-full border border-gray-300 mx-8 my-auto">
            <Avatar className="h-8 w-8" >
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{Array.from(currentUser.name)[0].toUpperCase()}</AvatarFallback>
            </Avatar >
          </Button >
        </DropdownMenuTrigger >
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{currentUser.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNavigateToProfiles} className="w-full h-8 text-start hover:cursor-pointer" asChild>
            <Button variant="ghost" className="w-full h-8 justify-start items-center" >
              <UserIcon className="m-2 h-8 w-4" />
              <span>Hồ sơ</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu >
    </header >
  );
};

export default Breadcrumbs;

