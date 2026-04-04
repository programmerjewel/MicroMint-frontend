import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Loading = ({ 
  className, 
  size = "md", 
  variant = "default", 
  text = "Loading..." 
}) => {
  // Size mapping
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  // Variant mapping
  const variants = {
    // Standard inline loader
    default: "flex flex-col items-center justify-center p-4",
    
    // Full screen for initial app loads or auth checks
    fullscreen: "fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-3",
    
    // Overlay for specific containers (requires 'relative' on parent)
    overlay: "absolute inset-0 z-50 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2",
  };

  return (
    <div className={cn(variants[variant], className)} aria-live="polite" aria-busy="true">
      <Loader2 
        className={cn(
          "animate-spin text-primary", 
          sizeClasses[size]
        )} 
      />
      {text && (
        <span className={cn(
          "font-medium text-muted-foreground animate-pulse",
          size === "sm" ? "text-xs" : "text-sm"
        )}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Loading;