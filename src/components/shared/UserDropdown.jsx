import { Link } from "react-router-dom";
import { LogOut, User, LayoutDashboard} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCoin from "@/hooks/useCoin";
import useRole from "@/hooks/useRole";

const UserDropdown = ({ align = "end", variant = "public" }) => {
  const { user, logoutUser } = useAuth();
  const { coins } = useCoin();
  const { role } = useRole();

  if (!user) return null;

  const initials = (user.displayName || user.email || "U").charAt(0).toUpperCase();
  const profilePath = variant === "dashboard" ? "/dashboard/profile" : "/profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 outline-none hover:bg-accent/50 rounded-full p-0.5 transition-all focus-visible:ring-2 focus-visible:ring-ring">
          {user?.photoURL ? (
            <img
              src={user?.photoURL}
              alt="Avatar"
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full object-cover border border-border shadow-sm"
            />
          ) : (
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary flex items-center justify-center shrink-0 border border-border shadow-sm">
              <span className="text-[10px] font-bold text-primary-foreground">
                {initials}
              </span>
            </div>
          )}
          </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-56 mt-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user?.email}
            </p>
            <div className="md:hidden mt-2 pt-2 border-t border-border flex gap-4 text-xs">
              <div className="flex items-center gap-1 font-medium text-foreground">
                <span>Coins: {coins}</span>
              </div>
              <div className="text-muted-foreground font-medium capitalize">
                Role: <span className="text-foreground">{role}</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to={profilePath} className="cursor-pointer w-full flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        {/* Dashboard link only on public layout */}
        {variant === "public" && (
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="cursor-pointer w-full flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
          onClick={logoutUser}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;