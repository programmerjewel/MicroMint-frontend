import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  const toggleTheme = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md border"
      title={`Current mode: ${mode}`}
    >
      {/* Sun Icon: Visible in light mode, rotates out in dark */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      
      {/* Moon Icon: Hidden in light mode, rotates in when .dark class is present */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}