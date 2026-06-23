import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";

// Social Links Data
const socialLinks = [
  { name: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61586501746131" },
  { name: "Twitter/X", icon: FaXTwitter, href: "https://x.com/AlaminJewel10" },
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/noob.c0der/" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://www.linkedin.com/in/alaminjewel" },
  { name: "GitHub", icon: FaGithub, href: "https://github.com/programmerjewel" },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background text-muted-foreground w-full">
      <div className="container mx-auto px-4 py-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b">
          
          {/* Left: Brand Identity */}
          <div className="space-y-2 max-w-sm">
            <Link to="/" className="flex items-center space-x-2" aria-label="MicroMint Home">
              <Logo className="h-6 w-auto text-foreground" />
            </Link>
            <p className="text-xs leading-relaxed">
              Simplify your micro-task workflow and secure earnings inside a clean, modern workspace dashboard.
            </p>
          </div>

          {/* Right: Site Navigation Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact Support</Link>
          </div>
        </div>

        {/* Bottom Section: Compliance & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs">
          
          {/* Left: Copyright & Legal Policies */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} MicroMint. All rights reserved.</p>
            <div className="hidden sm:block text-muted-foreground/30">|</div>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Right: Social Platforms */}
          <div className="flex items-center space-x-1">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;