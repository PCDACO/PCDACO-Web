import "../globals.css";
import ReactQueryProvider from "@/components/query-client-provider";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import Breadcrumbs from "@/components/layouts/breadcrump";

export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 shadow-md shadow-cyan-300/20 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </header>
          <main style={{ textShadow: "-1px 1px 0px rgba(63,107,169, 0.1)" }} className="w-full py-4 px-8 ">
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Toaster />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
