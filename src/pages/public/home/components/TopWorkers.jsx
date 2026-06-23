import Loading from "@/components/shared/Loading";
import SectionHeader from "@/components/ui/section-header";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { LiaCoinsSolid } from "react-icons/lia";

// constants with theme-aware colors
const RANK_COLORS = {
  0: { 
    bg: "bg-brand-accent", 
    text: "text-black dark:text-black", 
    glow: "bg-brand-accent" 
  },
  1: { 
    bg: "bg-brand-primary dark:bg-brand-primary/80", 
    text: "text-white dark:text-white", 
    glow: "bg-brand-primary" 
  },
  2: { 
    bg: "bg-brand-secondary/80 dark:bg-brand-secondary/80", 
    text: "text-white dark:text-white", 
    glow: "bg-brand-secondary" 
  },
  default: { 
    bg: "bg-muted", 
    text: "text-muted-foreground", 
    glow: "bg-muted" 
  }
};

// utility function
const getRankColors = (index) => RANK_COLORS[index] || RANK_COLORS.default;

// coin badge component - theme aware with responsive design (no repetition)
const CoinBadge = ({ coins, className = "" }) => {
  return (
    <div
      className={`
        flex items-center justify-center font-bold 
        bg-amber-200 text-amber-800 border border-amber-300/30 
        dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50 
        py-0.5 px-2 text-[10px] gap-1 rounded-sm
        md:py-2 md:px-4 md:text-sm md:gap-1.5 md:rounded-md 
        md:w-full md:max-w-35 md:mx-auto md:mt-2
        shrink-0 ${className}
      `}>
      <LiaCoinsSolid className="text-sm md:text-lg text-amber-600 dark:text-amber-500 shrink-0" />
      <span>{coins || 0}</span>
    </div>
  );
};

// avatar component with rank badge at bottom right corner - theme aware
const WorkerAvatar = ({ worker, rankGlowColor, rank, rankColorClass, rankTextClass }) => (
  <div className="relative shrink-0">
    {/* Avatar Image Container */}
    <div className="relative p-0.5 rounded-full ring-2 ring-border/50">
      <div className={`absolute inset-0 rounded-full blur-xl opacity-15 ${rankGlowColor}`} />
      <img
        src={worker.image || `https://ui-avatars.com/api/?name=${worker.name}&background=random`}
        alt={worker.name}
        className="relative w-12 h-12 md:w-24 md:h-24 rounded-full object-cover border border-border bg-background"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${worker.name}&background=random`;
        }}
        loading="lazy"
      />
    </div>
    <div 
      className={`absolute bottom-0 right-0 w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border border-background ${rankColorClass} ${rankTextClass}`}>
      {rank}
    </div>
  </div>
);

// worker card component - Mobile: horizontal layout, Desktop: vertical layout
const WorkerCard = ({ worker, rank, colors }) => (
  <div
    className={`
      relative overflow-hidden rounded-md border transition-all duration-300 
      bg-card/80 backdrop-blur-xl ${colors.border} p-3 md:p-6 md:pt-8 
      md:w-65 shrink-0
    `}>
    
    {/* Mobile: Horizontal flex row with justify-between for equal spacing, Desktop: Vertical flex col */}
    <div className="flex flex-row items-center justify-around gap-4 md:flex-col md:justify-center md:text-center md:gap-6">
      
      {/* Avatar with Rank Badge at Bottom Right */}
      <WorkerAvatar 
        worker={worker} 
        rankGlowColor={colors.glow}
        rank={rank + 1}
        rankColorClass={colors.bg}
        rankTextClass={colors.text}
      />
      
      {/* Worker Name */}
      <h3 className="text-base md:text-lg font-semibold tracking-tight truncate text-brand-text">
        {worker.name}
      </h3>
      
      {/* Responsive Coin Badge */}
      <CoinBadge coins={worker.coins} />
    </div>
  </div>
);

// error state component - theme aware
const ErrorState = ({ error }) => (
  <section className="py-16 bg-background">
    <div className="max-w-xl mx-auto rounded-md border border-red-500/20 bg-red-500/5 p-6 text-center">
      <h3 className="text-lg font-bold text-red-500">Something went wrong!</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {error?.message || "Failed to fetch top workers data"}
      </p>
    </div>
  </section>
);

// empty state component - theme aware
const EmptyState = () => (
  <div className="text-center py-20">
    <h3 className="text-xl font-semibold text-brand-text">No workers found</h3>
    <p className="mt-2 text-brand-text-muted">
      Check back later when rankings are available.
    </p>
  </div>
);

// main component
const TopWorkers = () => {
  const {
    data: workers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["top-workers"],
    queryFn: async () => {
      const response = await axiosSecure.get("/top-workers");
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} />;

  return (
    <section className="w-10/12 mx-auto py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeader
          title="Top Performers"
          subtitle="Meet the top performers those have consistently completed tasks and earned the most coins."
        />

        {workers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center md:gap-6">
            {workers.map((worker, index) => (
              <WorkerCard 
                key={worker._id} 
                worker={worker} 
                rank={index} 
                colors={getRankColors(index)} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopWorkers;