import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useRef, useMemo } from "react";
import { HiOutlineBuildingLibrary, HiOutlineUserGroup } from "react-icons/hi2";
import { LiaCoinsSolid } from "react-icons/lia";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div className="group relative flex flex-row sm:flex-col items-center sm:items-start p-5 sm:p-8 md:p-10 overflow-hidden rounded-lg border border-border/80 dark:border-white/10 bg-card hover:border-primary/30 dark:hover:border-primary/50 hover:-translate-y-1 transition-all duration-500">
      
      <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 mr-5 sm:mr-0 sm:mb-6 rounded-xl sm:rounded-2xl flex items-center justify-center ${stat.iconColor} ring-1 ring-white/5 group-hover:scale-110 transition-transform duration-500 ease-out`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      
      <div className="space-y-1 sm:space-y-3 relative z-10 text-left">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tighter text-foreground drop-shadow-sm">
          {stat.value}
        </h2>
        <div className="space-y-0.5">
          <div className="text-[11px] sm:text-sm font-semibold text-primary tracking-wide uppercase">
            {stat.label}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed">
            {stat.description}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  const axiosSecure = useAxiosSecure();
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["publicStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-stats");
      return res.data;
    },
  });

  const STATS_DATA = useMemo(() => {
    const format = (val, decimals = 0) => 
      (val ?? 0).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

    return [
      {
        value: `${format(stats?.totalWorkers)}+`,
        label: "Active Workers",
        description: "Global skilled micro-taskers",
        icon: HiOutlineUserGroup,
        iconColor: "text-blue-500 bg-blue-500/10",
      },
      {
        value: `$${format(stats?.totalPaymentsUSD, 2)}`,
        label: "Total Minted",
        description: "Paid out securely to accounts",
        icon: LiaCoinsSolid,
        iconColor: "text-amber-500 bg-amber-500/10",
      },
      {
        value: `${format(stats?.totalBuyers)}+`,
        label: "Total Buyers",
        description: "Businesses creating micro-tasks",
        icon: HiOutlineBuildingLibrary,
        iconColor: "text-emerald-500 bg-emerald-500/10",
      },
    ];
  }, [stats]);

  useEffect(() => {
    if (isLoading || !containerRef.current) return;

    /*
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const targets = containerRef.current.children;
      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
    */
  }, [isLoading]);

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 lg:space-y-16 animate-pulse">
          <div className="space-y-4 flex flex-col items-center text-center">
            <div className="h-5 w-20 bg-muted rounded-full" />
            <div className="h-10 w-3/4 max-w-lg bg-muted rounded-xl" />
            <div className="h-4 w-2/3 max-w-md bg-muted rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-5 sm:p-10 rounded-xl border border-border/40 flex flex-row sm:flex-col items-center sm:items-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-muted rounded-xl mr-4 sm:mr-0 sm:mb-6 shrink-0" />
                <div className="space-y-3 flex-1">
                  <div className="h-8 w-24 bg-muted rounded-md" />
                  <div className="h-4 w-32 bg-muted rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:space-y-16 relative z-10">
        
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Badge variant="homeSection">Platform Data</Badge>
          </div>
          <SectionHeader
            title="Our Network in Real Time"
            subtitle="See how fast our community completes tasks and how businesses scale their operations around the world."
          />
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {STATS_DATA.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;