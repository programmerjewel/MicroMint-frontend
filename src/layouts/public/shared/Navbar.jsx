import { useState } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useCoin from "@/hooks/useCoin";
import { CoinBadge } from "@/components/shared/CoinBadge";
import UserDropdown from "@/components/shared/UserDropdown";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
];

//Sub-components 

const JoinDeveloperButton = ({ isMobile = false, onClick }) => (
  <Button
    variant="secondary"
    asChild
    className={cn(isMobile ? "w-full" : "hidden lg:flex text-sm font-medium") }
    onClick={onClick}
  >
    <Link to="https://github.com/programmerjewel/MicroMint-frontend">
      <FaGithub className="h-4 w-4" />
      Join As Developer
    </Link>
  </Button>
);

const NavLinks = ({ mobile = false, onNavigate }) =>
  navLinks.map((link) => (
    <NavLink
      key={link.name}
      to={link.href}
      onClick={onNavigate}
      className={({ isActive }) =>
        mobile
          ? cn(
              "flex items-center w-full px-4 py-2 text-xl font-bold tracking-tight transition-all rounded-xl",
              isActive 
                ? "bg-accent/50 text-foreground"
                : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
            )
          : cn(
              "px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-accent",
              isActive
                ? "text-foreground bg-accent/50"
                : "text-muted-foreground hover:text-foreground"
            )
      }
    >
      {link.name}
    </NavLink>
  ));

const AuthSection = ({ user, coins, mobile = false, onNavigate }) => {
  const { logoutUser } = useAuth();
  if (user) {
    const profilePath = "/dashboard/profile";
    
    return mobile ? (
      <div className="space-y-4">
        {/* User Status Card */}
        <div className="flex items-center justify-between p-5 bg-linear-to-br from-accent/50 to-background rounded-2xl border shadow-sm">
          <div className="flex flex-col overflow-hidden">
            <span className="font-extrabold text-lg truncate leading-none mb-1">
              {user.displayName || "User"}
            </span>
            <span className="text-xs text-muted-foreground truncate italic">
              {user.email}
            </span>
          </div>
          <CoinBadge coins={coins} />
        </div>
        
        {/* Mobile Action Links */}
        <div className="grid grid-cols-1 gap-2">
          <Button 
            variant="outline" 
            asChild 
            className="w-full h-12 justify-start rounded-xl px-4 font-semibold" 
            onClick={onNavigate}
          >
            <Link to={profilePath}>
               <User className="mr-3 h-5 w-5 text-muted-foreground" />
               Profile
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className="w-full h-12 justify-start rounded-xl px-4 font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive" 
            onClick={() => {
              logoutUser();
              onNavigate();
            }}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-3">
        <CoinBadge coins={coins} />
        <UserDropdown variant="public" align="end" />
      </div>
    );
  }

  return mobile ? (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="h-12" asChild onClick={onNavigate}>
        <Link to="/login">Sign In</Link>
      </Button>
      <Button className="h-12" asChild onClick={onNavigate}>
        <Link to="/register">Register</Link>
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild size="sm">
        <Link to="/login">Sign In</Link>
      </Button>
      <Button asChild size="sm">
        <Link to="/register">Register</Link>
      </Button>
    </div>
  );
};

//Main Component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { coins } = useCoin();

  const close = () => setIsOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">

            <Link to="/" className="shrink-0">
              <img src="/MicromintLogo.svg" alt="Logo" className="h-6 w-auto" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLinks />
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <JoinDeveloperButton />
              <div className="h-6 w-px bg-border mx-1 hidden lg:block" />
              <AuthSection user={user} coins={coins} />
            </div>

            {/* Mobile Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div className={cn(
          "fixed inset-0 z-40 bg-background md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}>
        <div className="flex flex-col p-6 pt-24 space-y-6 h-full">
          <div className="flex flex-col space-y-3">
            <NavLinks mobile onNavigate={close} />
          </div>

          <div className="mt-auto space-y-4 pb-10 border-t pt-6">
            <JoinDeveloperButton isMobile onClick={close} />
            <AuthSection user={user} coins={coins} mobile onNavigate={close} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;