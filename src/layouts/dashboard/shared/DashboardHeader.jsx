import { SidebarTrigger } from "@/components/ui/sidebar";
import useCoin from "@/hooks/useCoin";
import useRole from "@/hooks/useRole";
import useAuth from "@/hooks/useAuth"; 
import { LiaCoinsSolid } from "react-icons/lia";
import UserDropdown from "@/components/shared/UserDropdown";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import NotificationDropdown from "./NotificationDropdown"; 

const DashboardHeader = () => {
  const { role } = useRole();
  const { coins } = useCoin();
  const { user } = useAuth(); 

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 bg-background relative">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="h-4 w-px bg-border" />
        <div className="font-bold text-xl px-2">MicroMint</div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 h-full">
        {/* User Stats Info Block */}
        <div className="hidden md:flex flex-col gap-0.5 items-end text-sm h-fit">
          <div className="flex items-center gap-1 font-bold text-foreground">
            <LiaCoinsSolid className="text-amber-600" size={15} />
            {coins}
          </div>
          <span className="text-muted-foreground text-xs font-semibold capitalize">
            {role}
          </span>
        </div>
        
        {/* Global Utilities Group */}
        <div className="flex items-center gap-3">
          <NotificationDropdown userEmail={user?.email} />
          <ThemeToggle />
          <UserDropdown align="end" variant="dashboard" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;