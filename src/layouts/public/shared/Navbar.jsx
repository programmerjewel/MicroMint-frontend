import { useState, useEffect } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useCoin from "@/hooks/useCoin";
import { CoinBadge } from "@/components/shared/CoinBadge";
import UserDropdown from "@/components/shared/UserDropdown";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Logo from "@/components/shared/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
];

// Sub-components

const JoinDeveloperButton = () => (
  <Button
    variant="secondary"
    asChild
    className="hidden md:flex text-sm font-medium"
  >
    <Link to="https://github.com/programmerjewel/MicroMint-frontend">
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
              "flex items-center justify-center w-full px-6 py-3 text-xl transition-all text-center",
              
              isActive 
                ? "text-brand-text font-bold"
                : "text-muted-foreground font-semibold hover:text-foreground"
            )
          : cn(
              "px-3 py-2 text-sm transition-colors",
              /* Desktop Active State: Replaced ghost background capsule with pure typography metrics */
              isActive
                ? "text-foreground font-semibold"
                : "text-muted-foreground font-medium hover:text-foreground"
            )
      }
    >
      {link.name}
    </NavLink>
  ));

const AuthSection = ({ user, mobile = false, onNavigate }) => {
  const { logoutUser } = useAuth();
  
  if (user) {
    const profilePath = "/profile";
    
    return mobile ? (
      <div className="flex flex-col gap-2.5 w-full">
        <Button 
          variant="outline" 
          asChild 
          className="w-full h-12 justify-center rounded-xl px-4 font-semibold text-base" 
          onClick={onNavigate}
        >
          <Link to={profilePath}>
             <User className="mr-2 h-5 w-5 text-muted-foreground" />
             View Profile
          </Link>
        </Button>

        <Button 
          variant="destructive" 
          className="w-full h-12 justify-center rounded-xl px-4 font-semibold text-base" 
          onClick={() => {
            logoutUser();
            onNavigate();
          }}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    ) : null;
  }

  return mobile ? (
    <div className="flex flex-col gap-2.5 w-full">
      <Button variant="outline" className="h-12 w-full text-base font-semibold rounded-xl" asChild onClick={onNavigate}>
        <Link to="/login">Sign In</Link>
      </Button>
      <Button className="h-12 w-full text-base font-semibold rounded-xl" asChild onClick={onNavigate}>
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


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { coins } = useCoin();
  const navigate = useNavigate();

  const close = () => setIsOpen(false);

  // Lock document body overflow scrolling when menu overlay opens
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          
          {/* DESKTOP LAYOUT */}
          <div className="hidden md:flex h-16 items-center justify-between gap-4">
            <Link to="/" className="shrink-0">
              <Logo className="h-7 w-auto" />
            </Link>

            <div className="flex items-center space-x-1">
              <NavLinks />
            </div>

            <div className="flex items-center gap-3">
              <JoinDeveloperButton />
              <ThemeToggle />
              <div className="h-6 w-px bg-border mx-1 hidden lg:block" />
              {user ? (
                <div className="flex items-center gap-3">
                  <CoinBadge coins={coins} />
                  <UserDropdown variant="public" align="end" />
                </div>
              ) : (
                <AuthSection user={user} />
              )}
            </div>
          </div>

          {/* MOBILE VIEWPORT LAYOUT */}
          <div className="grid grid-cols-3 h-16 items-center md:hidden w-full">
            
            {/* Menu Button */}
            <div className="flex justify-start">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
                className="hover:bg-accent/50 h-10 w-10 rounded-xl"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Center Column */}
            <div className="flex justify-center items-center">
              <Link to="/" onClick={close} className="shrink-0 block">
                <Logo className="h-5 w-auto" />
              </Link>
            </div>

            {/* Right Column */}
            <div className="flex justify-end items-center gap-3">
              <div className="scale-85 origin-right">
                <ThemeToggle />
              </div>
              
              {user && (
                <button
                  onClick={() => {
                    close();
                    navigate("/profile");
                  }}
                  className="focus:outline-hidden transition-all active:scale-95 shrink-0 rounded-full ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="View Profile"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "User"} 
                      className="h-7 w-7 rounded-full object-cover border-2 border-primary/80 dark:border-primary/60"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xs">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE FULL-SCREEN MENU OVERLAY */}
      <div className={cn(
          "fixed inset-0 top-16 z-40 bg-background md:hidden transition-all duration-300 ease-in-out flex flex-col justify-between p-6 pb-12",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}>
        
        {/* Core Links Navigation Menu Viewport */}
        <div className="flex flex-col items-center justify-center flex-1 space-y-5 max-w-xs mx-auto w-full">
          <NavLinks mobile onNavigate={close} />
        </div>

        {/* Action Blocks Bottom Shelf (No unaligned profile metadata) */}
        <div className="space-y-4 border-t border-border/60 pt-6 max-w-xs mx-auto w-full">
          <AuthSection user={user} mobile onNavigate={close} />
        </div>
      </div>
    </>
  );
};

export default Navbar;