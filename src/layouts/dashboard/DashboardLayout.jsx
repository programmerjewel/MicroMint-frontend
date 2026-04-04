import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./shared/DashboardSidebar";
import DashboardHeader from "./shared/DashboardHeader";
import DashboardFooter from "./shared/DashboardFooter";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

 
  if (loading) {
  return <Loading variant="fullscreen" text="Verifying session..." size="xl" />;
}

  // 2. Security Check
  // If no user is logged in, kick them back to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />

        <div className="flex flex-col flex-1">
          {/* You can pass user as a prop if you prefer, 
              but the Header can also just call useAuth() itself! */}
          <DashboardHeader />
          
          <main className="flex-1 p-6 bg-slate-50/50">
            <Outlet />
          </main>
          
          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;