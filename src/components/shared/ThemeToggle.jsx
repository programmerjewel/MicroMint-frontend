
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { IoMoon, IoSunnySharp } from "react-icons/io5";

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
      className={`
        relative transition-all duration-300 ease-in-out

        /* Mobile */
        h-8 w-8 rounded-full border border-input border-solid bg-transparent
        text-foreground hover:bg-accent active:scale-95
        
        /* Desktop */
        md:rounded-md 

      `}
      title={`Current mode: ${mode}`}
    >
      {/* Sun Icon: Filled Gold (--brand-accent) on mobile, normal text color on desktop */}
      <IoSunnySharp 
        className=" h-7 w-7 md:h-[1.2rem] md:w-[1.2rem] text-amber-500 md:text-amber-500  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
      />
      
      {/* Moon Icon: Filled Mint Green (--brand-secondary) on mobile, normal text color on desktop */}
      <IoMoon 
        className="absolute h-5 w-5 md:h-[1.1rem] md:w-[1.1rem] text-white md:text-current rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
      />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}