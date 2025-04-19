import "../globals.css";
import ReactQueryProvider from "@/components/query-client-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import Breadcrumbs from "@/components/layouts/breadcrump";
import { GetCurrentUser } from "../actions/shared/action";

export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await GetCurrentUser();
  const userRole = currentUser?.value?.role;
  return (
    <main>
      <SidebarProvider>
        <AppSidebar userRole={userRole} />
        <SidebarInset>
          <Breadcrumbs currentUser={currentUser.value} />
          <main className="w-full py-2 px-8 ">
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Toaster />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </main >
  );
}
