import "../globals.css";
import ReactQueryProvider from "@/components/query-client-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

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
        <main className="container mx-auto py-4 ">
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </main>
      </SidebarProvider>
    </main>
  );
}
