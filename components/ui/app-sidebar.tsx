
'use server';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Car,
  HousePlus,
  Factory,
  FuelIcon,
  AlignEndHorizontal,
  Cog,
  PersonStandingIcon,
  Calendar,
  CarIcon,
  LucideProps,
  LucideIdCard,
  LocateIcon,
  SquareUserRoundIcon,
  BadgeDollarSign,
  Newspaper,
  ChevronDown,
  NewspaperIcon,
} from 'lucide-react';
// import Link from "next/link"
import { LogoutButton } from './LogoutButton';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { GetCurrentUser } from '@/app/actions/shared/action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import Image from 'next/image';

interface SideBarItem {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  role: string;
  group: string;
}
const items: SideBarItem[] = [
  // ADMIN
  {
    title: 'Thống Kê',
    url: '/statistics',
    icon: AlignEndHorizontal,
    role: 'Admin',
    group: 'Thống Kê',
  },
  {
    title: 'Giao Dịch',
    url: '/transactions',
    icon: BadgeDollarSign,
    role: 'Admin',
    group: 'Thống Kê',
  },
  {
    title: 'Xe',
    url: '/cars',
    icon: Car,
    role: 'Admin',
    group: 'Quản Lí Nền Tảng',
  },
  {
    title: 'Bookings',
    url: '/bookings',
    icon: NewspaperIcon,
    role: 'Admin',
    group: 'Quản Lí Nền Tảng',
  },
  {
    title: 'Lệnh Rút Tiền',
    url: '/withdraw-requests',
    icon: BadgeDollarSign,
    role: 'Admin',
    group: 'Quản Lí Nền Tảng',
  },
  {
    title: 'Tiện Nghi',
    url: '/amenities',
    icon: HousePlus,
    role: 'Admin',
    group: 'Quản Lí Hệ Thống',
  },
  {
    title: 'Nhà Sản Xuất',
    url: '/manufacturers',
    icon: Factory,
    role: 'Admin',
    group: 'Quản Lí Hệ Thống',
  },
  {
    title: 'Loại Nhiên Liệu',
    url: '/fuel-types',
    icon: FuelIcon,
    role: 'Admin',
    group: 'Quản Lí Hệ Thống',
  },
  {
    title: 'Loại Truyền Động',
    url: '/transmissions',
    icon: Cog,
    role: 'Admin',
    group: 'Quản Lí Hệ Thống',
  },
  {
    title: 'Thiết bị GPS',
    url: '/gps-devices',
    icon: LocateIcon,
    role: 'Admin',
    group: 'Quản Lí Hệ Thống',
  },
  {
    title: 'Xét Duyệt',
    url: '/pending-approval',
    icon: LucideIdCard,
    role: 'Admin',
    group: 'Quản Lí Người Dùng',
  },
  {
    title: 'Chủ Xe',
    url: '/owners',
    icon: PersonStandingIcon,
    role: 'Admin',
    group: 'Quản Lí Người Dùng',
  },
  {
    title: 'Người Thuê',
    url: '/drivers',
    icon: PersonStandingIcon,
    role: 'Admin',
    group: 'Quản Lí Người Dùng',
  },
  {
    title: 'Tư Vấn Viên',
    url: '/consultants',
    icon: PersonStandingIcon,
    role: 'Admin',
    group: 'Quản Lí Người Dùng',
  },
  {
    title: 'Kĩ Thuật Viên',
    url: '/technicians',
    icon: PersonStandingIcon,
    role: 'Admin',
    group: 'Quản Lí Người Dùng',
  },
  // TECHNICIAN
  {
    title: 'Tổng Quan',
    url: '/statistics',
    icon: Cog,
    role: 'Technician',
    group: 'Thống Kê',
  },
  {
    title: 'Lịch Xác Minh',
    url: '/technician-todo',
    icon: Calendar,
    role: 'Technician',
    group: 'Lịch',
  },
  {
    title: 'Lịch Xác Minh Theo Tháng',
    url: '/technician-todo',
    icon: Calendar,
    role: 'Technician',
    group: 'Lịch',
  },
  // CONSULTANT
  {
    title: 'Thống Kê',
    url: '/statistics',
    icon: AlignEndHorizontal,
    role: 'Consultant',
    group: 'Thống Kê',
  },
  {
    title: 'Lịch Kiểm Định',
    url: '/inspection-schedules',
    icon: Calendar,
    role: 'Consultant',
    group: 'Lịch',
  },
  {
    title: 'Xe Mới Tạo',
    url: '/pending-cars',
    icon: CarIcon,
    role: 'Consultant',
    group: 'Quản Lí Nền Tảng',
  },
  {
    title: 'Báo Cáo',
    url: '/reports',
    icon: Newspaper,
    role: 'Consultant',
    group: 'Quản Lí Nền Tảng',
  },
];

export async function AppSidebar() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('role');
  const currentUser = await GetCurrentUser();
  if (!userRole)
    return (
      <Sidebar>
        <SidebarContent className="flex flex-col justify-between">
          <SidebarGroup>
            <SidebarGroupLabel>PCDACO Admin Panel</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu></SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarFooter>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild size={'lg'}>
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
  const filteredItems = items.filter((i) => i.role === userRole.value);
  // Group items by group
  const groupedItems: { [key: string]: SideBarItem[] } = filteredItems.reduce(
    (acc: { [key: string]: SideBarItem[] }, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }
      acc[item.group].push(item);
      return acc;
    },
    {}
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Image
                    className="mr-1"
                    alt="avatarUrl"
                    src={
                      currentUser.value?.avatarUrl !== ''
                        ? currentUser.value?.avatarUrl ?? "/dummy-avatar.webp"
                        : '/dummy-avatar.webp'
                    }
                    width={24}
                    height={24}
                  />{' '}
                  {currentUser?.value?.name ?? ""}
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link href={"/profiles"} className='flex w-full' >
                    <SquareUserRoundIcon className="ml-4 h-4 w-4 text-primary mr-2" />
                    <span>Tài Khoản</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-start">
        <SidebarMenu>
          {Object.entries(groupedItems).map(([group, items]) => (
            <SidebarGroup key={group}>
              <SidebarGroupLabel asChild>
                <SidebarMenuButton className="flex items-center justify-start font-bold w-full text-primary">
                  {group}
                </SidebarMenuButton>
              </SidebarGroupLabel>
              <SidebarMenuSub>
                {items.map((item) => (
                  <SidebarMenuSubItem className="mt-1" key={item.title}>
                    <SidebarMenuSubButton asChild size={'md'}>
                      <Link href={item.url}>
                        <item.icon className="mr-2 h-4 w-4 text-primary" />
                        <span className=''>{item.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
