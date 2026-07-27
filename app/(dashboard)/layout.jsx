import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({ children }) {
  return (
    <TooltipProvider>
      <SidebarProvider className="dark">
        <AppSidebar />
        <SidebarInset>
          <DashboardTopbar />
          <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
