import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./shared/DashboardSidebar";
import DashboardHeader from "./shared/DashboardHeader"; // Import your new header
import DashboardFooter from "./shared/DashboardFooter";

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Left Navigation */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          
          <main className="flex-1 p-6">
            {/* Sections Based on Routes */}
            {children}
          </main>
          <DashboardFooter/>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;