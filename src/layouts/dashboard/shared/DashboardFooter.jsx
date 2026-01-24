

const DashboardFooter = () => {
  return (
    <footer className="border-t py-4 px-6 bg-white/50 text-muted-foreground">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} MicroMint. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="" className="hover:underline">Privacy Policy</a>
          <a href="" className="hover:underline">Terms of Service</a>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;