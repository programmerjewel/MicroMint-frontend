import { Link } from "react-router-dom";

const DashboardFooter = () => {
  return (
    <footer className="border-t bg-background py-4 px-6 text-muted-foreground w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} MicroMint. All rights reserved.</p>
        <div className="flex gap-6 items-center">
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <span className="text-muted-foreground/60">Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;