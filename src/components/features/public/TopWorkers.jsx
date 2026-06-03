import Loading from "@/components/shared/Loading";
import SectionHeader from "@/components/ui/section-header";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { LiaCoinsSolid } from "react-icons/lia";

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

  const getRankBadgeColor = (index) => {
    switch (index) {
      case 0:
        return "bg-brand-accent text-black";
      case 1:
        return "bg-brand-primary/15 text-brand-primary";
      case 2:
        return "bg-brand-secondary/15 text-brand-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getGlowColor = (index) => {
    switch (index) {
      case 0:
        return "bg-brand-accent";
      case 1:
        return "bg-brand-primary";
      case 2:
        return "bg-brand-secondary";
      default:
        return "bg-brand-primary";
    }
  };

  const getCardBorder = (index) => {
    switch (index) {
      case 0:
        return "border-brand-accent/40";
      case 1:
        return "border-brand-primary/30";
      case 2:
        return "border-brand-secondary/30";
      default:
        return "border-border";
    }
  };

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  if (isError) {
    return (
      <section className="py-24 px-4 bg-background">
        <div className="max-w-xl mx-auto rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h3 className="text-xl font-bold text-red-500">
            Something went wrong!
          </h3>
          <p className="mt-2 text-muted-foreground">
            {error?.message || "Failed to fetch top workers data"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <SectionHeader
        title="Top Performers" 
        subtitle="Meet the highest earning workers on the platform. These top performers have consistently completed tasks and earned the most coins."/>

        {/* Empty State */}
        {workers.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-brand-text">
              No workers found
            </h3>
            <p className="mt-2 text-brand-text-muted">
              Check back later when rankings are available.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workers.map((worker, index) => (
              <div
                key={worker._id}
                className={`
                  relative overflow-hidden
                  rounded-xl
                  border
                  ${getCardBorder(index)}
                  bg-card/80
                  backdrop-blur-xl
                  shadow-sm
                  p-6
                  group
                `}
              >
                

                {/* Rank Badge */}
                <div
                  className={`
                    absolute top-5 left-5
                    w-8 h-8
                    rounded-full
                    flex items-center justify-center
                    text-sm font-semibold
                    shadow-md
                    ${getRankBadgeColor(index)}
                  `}
                >
                  #{index + 1}
                </div>

                {/* Avatar */}
                <div className="relative flex justify-center mt-6">
                  <div
                    className={`
                      absolute w-32 h-32 rounded-full blur-3xl opacity-20
                      ${getGlowColor(index)}
                    `}
                  />

                  <img
                    src={
                      worker.image ||
                      `https://ui-avatars.com/api/?name=${worker.name}`
                    }
                    alt={worker.name}
                    className="
                      relative
                      w-28 h-28
                      rounded-full
                      object-cover
                      border-4
                      border-background
                      shadow-md
                    "
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${worker.name}`;
                    }}
                  />
                </div>

                {/* Worker Info */}
                <div className="text-center my-6">
                  <h3 className="text-2xl font-bold text-brand-text line-clamp-1">
                    {worker.name}
                  </h3>
                </div>

                {/* Coins */}
                  <div className="w-30 mx-auto px-2 py-3 flex items-center justify-center gap-1.5 rounded-md font-extrabold text-sm
                  bg-amber-200 text-amber-700 border border-amber-200 shadow-sm
                  dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50">
                    <LiaCoinsSolid className="text-xl text-amber-600" />
                    <span className="font-semibold">{worker.coins?.toLocaleString() || 0} coins</span>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopWorkers;