import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./shared/DashboardSidebar";
import DashboardHeader from "./shared/DashboardHeader";
import DashboardFooter from "./shared/DashboardFooter";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";

const DashboardLayout = () => {
  const { user} = useAuth();

   

    if (!user) {
      return <Navigate to="/login" replace />;
    }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;