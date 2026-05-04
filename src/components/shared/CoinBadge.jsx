import { cn } from "@/lib/utils";
import { LiaCoinsSolid } from "react-icons/lia";



export const CoinBadge = ({ coins, className }) => (
  <div
    className={cn(
      "flex items-center gap-1.5 px-2 py-1 rounded-md font-extrabold text-sm",
      "bg-amber-100 text-amber-700 border border-amber-50 shadow-sm",
      "dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
      className
    )}
  >
    <LiaCoinsSolid className="h-5 w-5 text-amber-600" />
    <span>{coins ?? 0}</span>
  </div>
);