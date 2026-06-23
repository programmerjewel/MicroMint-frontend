import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./shared/DashboardSidebar";
import DashboardHeader from "./shared/DashboardHeader";
import DashboardFooter from "./shared/DashboardFooter";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import Loading from "@/components/shared/Loading";

const DashboardLayout = () => {
  const { user, loading: isAuthLoading } = useAuth();
  const { loading: isRoleLoading } = useRole();

  const systemLoading = isAuthLoading || isRoleLoading;

  if (!isAuthLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative">
        <DashboardSidebar isLoadingAuth={systemLoading} />
        
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <DashboardHeader isLoadingAuth={systemLoading} />
          
          <main className="flex-1 p-6 relative flex flex-col min-h-100">
            {systemLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-[1px] z-10">
                <Loading variant="default" text="Validating dashboard environment..." size="lg" />
              </div>
            ) : (
              <Outlet />
            )}
          </main>
          
          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;