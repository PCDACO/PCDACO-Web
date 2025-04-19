"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

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
  "contract-detail": "contract-detail",
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

const Breadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
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
  );
};

export default Breadcrumbs;

