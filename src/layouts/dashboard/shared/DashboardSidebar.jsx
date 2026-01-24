import {
  Home,
  Inbox,
  Send,
  BanknoteArrowDown,
  PackagePlus,
  Coins,
  CreditCard,
  Users,
  ClipboardList,
} from "lucide-react";

const menuItemsArr = {
  worker: [
    { title: "Home", url: "worker-home", icon: Home },
    { title: "Task List", url: "task-list", icon: Inbox },
    { title: "My Submissions", url: "my-submission", icon: Send },
    { title: "Withdrawals", url: "withdrawals", icon: BanknoteArrowDown },
  ],
  buyer: [
    { title: "Home", url: "buyer-home", icon: Home },
    { title: "Add New Tasks", url: "add-tasks", icon: PackagePlus },
    { title: "Purchase Coin", url: "purchase-coins", icon: Coins },
    { title: "Payment History", url: "payments", icon: CreditCard },
  ],
  admin: [
    { title: "Home", url: "admin-home", icon: Home },
    { title: "Manage Users", url: "manage-users", icon: Users },
    { title: "Manage Task", url: "manage-tasks", icon: ClipboardList },
  ],
};
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";

// 👇 dummy user data (replace later with backend/AuthContext)
const user = {
  role: "worker", // worker | buyer | admin
};

const DashboardSidebar = () => {
  const menuItems = menuItemsArr[user.role] || [];

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="px-4 py-3 font-bold text-lg">
        Dashboard
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-4 py-3 text-xs text-gray-500">
        © {new Date().getFullYear()}
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
