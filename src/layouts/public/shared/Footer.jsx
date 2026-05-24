import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";

// Social Links Data
const socialLinks = [
  { name: "Facebook", icon: FaFacebook, href: "https://facebook.com" },
  { name: "Twitter/X", icon: FaXTwitter, href: "https://x.com" },
  { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com" },
  { name: "GitHub", icon: FaGithub, href: "https://github.com" },
];


const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo Brand Link */}
          <Link to="/" className="flex items-center space-x-2" aria-label="MicroMint Home">
            <Logo className="h-6 w-auto" />
          </Link>

          {/* Social Links */}
          <div className="flex items-center space-x-1">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
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
        <p className="my-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MicroMint. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;