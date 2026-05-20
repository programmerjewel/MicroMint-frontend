import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCoin from "@/hooks/useCoin";
import useRole from "@/hooks/useRole";
import { LiaCoinsSolid } from "react-icons/lia";
import UserDropdown from "@/components/shared/UserDropdown";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const DashboardHeader = () => {
  const { role } = useRole();
  const { coins } = useCoin();

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 bg-background">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="h-4 w-px bg-border"></div>
        <div className="font-bold text-xl px-2">MicroMint</div>
      </div>

      {/* Right Side */}
      <div className="flex items-center h-full">
        <div className="hidden md:flex flex-col gap-1.5 items-end px-4 text-sm border-r h-fit">
          <div className="flex gap-1 font-bold text-foreground">
            <LiaCoinsSolid className="text-amber-600" size={20}/>
            {coins} | Coin
          </div>
          <span className="text-muted-foreground text-sm font-medium capitalize">
            {role} | Role
          </span>
        </div>
        <div className="pl-2 pr-2">
           <UserDropdown align="end" variant="dashboard" />
        </div>
        <div className="fixed bottom-6 right-6 z-50 md:static md:bottom-auto md:right-auto md:z-auto md: mr-2 drop-shadow-md md:drop-shadow-none">
          <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-0 h-full px-6 rounded-none border-l"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;