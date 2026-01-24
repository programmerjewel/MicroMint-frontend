import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const user = {
    name: "Mohammad Ali",
    role: "Admin",
    coins: 120,
    image: "https://i.pravatar.cc/500?u=kkk@pravatar.com",
  };

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
        <div className="flex flex-col items-end px-4 text-sm border-r h-fit">
          <span className="font-medium text-gray-700">
            Available coin |{" "}
            <span className="font-semibold text-gray-900">
              {user.coins}
            </span>
          </span>

          <span className="text-gray-500 text-xs">
            {user.role} | {user.name}
          </span>
        </div>

        {/* User Image */}
        <div className="px-4">
          <img
            src={user.image}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
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
