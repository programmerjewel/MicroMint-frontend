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
  ChevronUp,
  LogOut,
  HelpCircle,
  Boxes,
  ArrowLeft,
  User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";

const menuItemsArr = {
  worker: [
    { title: "Home", url: "worker-home", icon: Home },
    { title: "Task List", url: "task-list", icon: Inbox },
    { title: "My Submissions", url: "my-submissions", icon: Send },
    { title: "Withdrawals", url: "withdrawals", icon: BanknoteArrowDown },
  ],
  buyer: [
    { title: "Home", url: "buyer-home", icon: Home },
    { title: "Add New Task", url: "add-task", icon: PackagePlus },
    { title: "All Tasks", url: "tasks", icon: Boxes },
    { title: "Purchase Coin", url: "purchase-coins", icon: Coins },
    { title: "Payment History", url: "payments", icon: CreditCard },
  ],
  admin: [
    { title: "Home", url: "admin-home", icon: Home },
    { title: "Manage Users", url: "manage-users", icon: Users },
    { title: "Manage Tasks", url: "manage-tasks", icon: ClipboardList },
  ],
};

const DashboardSidebar = ({ isLoadingAuth }) => {
  const { user, logoutUser } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  const menuItems = menuItemsArr[role] || [];
  const { setOpenMobile } = useSidebar();

  const handleLogout = async () => {
    try {
      setOpenMobile(false);
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <h3 className="font-bold text-lg">Dashboard</h3>
        <SidebarMenuButton asChild className="bg-muted/50 hover:bg-muted text-muted-foreground">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpenMobile(false)}>
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Main Site</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {isLoadingAuth ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SidebarMenuItem key={i} className="px-2 py-1.5 animate-pulse flex items-center gap-3">
                  <div className="h-4 w-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-24" />
                </SidebarMenuItem>
              ))
            ) : (
              menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center gap-3" onClick={() => setOpenMobile(false)}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            {isLoadingAuth ? (
              <div className="flex items-center gap-3 p-2 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 bg-muted rounded w-20" />
                  <div className="h-2 bg-muted rounded w-32" />
                </div>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="w-full justify-between hover:bg-accent">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={user?.photoURL} alt={user?.displayName} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {user?.displayName?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-left truncate">
                        <span className="text-sm font-medium truncate w-full">{user?.displayName}</span>
                        <span className="text-xs text-muted-foreground truncate w-full">{user?.email}</span>
                      </div>
                    </div>
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-[--radix-dropdown-menu-trigger-width] min-w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.displayName}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer" onClick={() => setOpenMobile(false)}>
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="flex items-center gap-2 cursor-pointer">
                      <HelpCircle className="h-4 w-4" />
                      <span>Help & Support</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;