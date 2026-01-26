import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./shared/DashboardSidebar";
import DashboardHeader from "./shared/DashboardHeader";
import DashboardFooter from "./shared/DashboardFooter";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Left Navigation */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          <main className="flex-1 p-6">
           <Outlet/>
          </main>
          <DashboardFooter/>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;