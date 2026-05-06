
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCoin from "@/hooks/useCoin";
import useRole from "@/hooks/useRole";
import { LiaCoinsSolid } from "react-icons/lia";
import UserDropdown from "@/components/shared/UserDropdown";


const DashboardHeader = () => {
  const { role } = useRole();
  const { coins } = useCoin();

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 bg-white">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        {/* Vertical divider */}
        <div className="h-4 w-px bg-gray-600"></div>
        <div className="font-bold text-xl px-2">MicroMint</div>
      </div>

      {/* Right Side */}
      <div className="flex items-center h-full">
        <div className="flex flex-col gap-1.5 items-end px-4 text-sm border-r h-fit">
          <div className="flex gap-1 font-bold text-gray-800">
            <LiaCoinsSolid className="text-amber-600" size={20}/>
            {coins} | Coin
          </div>

          <span className="text-gray-500 text-sm font-medium capitalize">
            {role} | Role
          </span>
        </div>

        {/* User Image */}
        <div className="pl-2">
           <UserDropdown align="end" variant="dashboard" />
        </div>

        <Button
          variant="ghost"
          className="flex flex-col items-center gap-0 h-full px-6 rounded-none"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
