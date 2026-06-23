import { SidebarTrigger } from "@/components/ui/sidebar";
import useCoin from "@/hooks/useCoin";
import useRole from "@/hooks/useRole";
import useAuth from "@/hooks/useAuth"; 
import { LiaCoinsSolid } from "react-icons/lia";
import UserDropdown from "@/components/shared/UserDropdown";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import NotificationDropdown from "./NotificationDropdown"; 

const DashboardHeader = ({ isLoadingAuth }) => {
  const { role, loading: isRoleLoading } = useRole();
  const { coins, loading: isCoinLoading } = useCoin(); // Safely assuming it exports loading
  const { user } = useAuth(); 

  const metricsLoading = isLoadingAuth || isRoleLoading || isCoinLoading;

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 bg-background relative">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="h-4 w-px bg-border" />
        <div className="font-bold text-xl px-2">MicroMint</div>
      </div>

      <div className="flex items-center gap-4 h-full">
        {metricsLoading ? (
          <div className="hidden md:flex flex-col gap-1.5 items-end animate-pulse">
            <div className="h-4 bg-muted rounded w-12" />
            <div className="h-3 bg-muted rounded w-16" />
          </div>
        ) : (
          <div className="hidden md:flex flex-col gap-0.5 items-end text-sm h-fit">
            <div className="flex items-center gap-1 font-bold text-foreground">
              <LiaCoinsSolid className="text-amber-600" size={15} />
              {coins}
            </div>
            <span className="text-muted-foreground text-xs font-semibold capitalize">
              {role}
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          {isLoadingAuth ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : (
            <NotificationDropdown userEmail={user?.email} />
          )}
          <ThemeToggle />
          {isLoadingAuth ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : (
            <UserDropdown align="end" variant="dashboard" />
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;