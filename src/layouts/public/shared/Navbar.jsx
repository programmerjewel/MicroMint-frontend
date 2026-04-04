import { useState } from "react";
import { Menu, X, LogOut} from "lucide-react";
import { FaGithub } from "react-icons/fa6"; 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
];

// --- 1. MOVE SUB-COMPONENTS OUTSIDE ---

const JoinDeveloperButton = ({ isMobile = false, onClick }) => (
  <Button 
    variant="secondary" 
    asChild 
    className={cn(isMobile ? "w-full" : "hidden lg:flex")}
    onClick={onClick}
  >
    <Link to="/join-developer">
      <FaGithub className="mr-2 h-4 w-4" />
      Join As Developer
    </Link>
  </Button>
);

const UserAvatar = ({ user, className }) => {
  const initials = (user?.displayName || user?.email || "U").charAt(0).toUpperCase();
  return user?.photoURL ? (
    <img
      src={user.photoURL}
      alt="Avatar"
      referrerPolicy="no-referrer"
      className={cn("h-8 w-8 rounded-full object-cover border", className)}
    />
  ) : (
    <div className={cn("h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0", className)}>
      <span className="text-xs font-semibold text-primary-foreground">{initials}</span>
    </div>
  );
};

// --- 2. MAIN COMPONENT ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            
            <Link to="/" className="shrink-0">
              <img src="/MicromintLogo.svg" alt="Logo" className="h-6 w-auto" />
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href} 
                  className={({ isActive }) => cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-accent",
                    isActive ? "text-foreground bg-accent/50" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Works perfectly now! */}
              <JoinDeveloperButton />

              <div className="h-6 w-px bg-border mx-1 hidden lg:block" />

              {user ? (
                <div className="flex items-center">
                   <UserAvatar user={user} />
                   <Button variant="ghost" size="sm" onClick={logoutUser}>
                     Sign Out
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
              )}
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
          "fixed inset-0 z-40 bg-background md:hidden transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
        <div className="flex flex-col p-6 pt-24 space-y-6">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium text-muted-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="space-y-4 pt-6 border-t">
            {/* Passing setIsOpen to close menu on click */}
            <JoinDeveloperButton isMobile onClick={() => setIsOpen(false)} />

            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <UserAvatar user={user} className="h-10 w-10" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium truncate">{user.displayName || "User"}</span>
                    <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => { logoutUser(); setIsOpen(false); }}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;