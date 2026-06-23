import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { RiUserLine } from "react-icons/ri";
import { LiaCoinsSolid } from "react-icons/lia";
import { HiOutlineSparkles, HiLockClosed } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const LiveTasksSection = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  // fetch tasks data
  const { data: tasks = [], isLoading: isTasksLoading } = useQuery({
    queryKey: ["homepageLiveTasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/homepage-live-tasks");
      return res.data;
    },
  });

  const isLoading = isTasksLoading || authLoading;
  const isLoggedOut = !user;

  // GSAP animation
  useEffect(() => {
    if (isLoading || tasks.length === 0) return;

    const ctx = gsap.context(() => {
      // set initial states to prevent flash of content
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 0, y: 30 });
      if (gridRef.current?.children?.length) gsap.set(gridRef.current.children, { opacity: 0, y: 40 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, scale: 0.9 });

      // animate header
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // animate grid cards with stagger
      if (gridRef.current?.children?.length) {
        gsap.to(gridRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // animate CTA
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, tasks.length]);

  const handleCardNavigation = () => {
    navigate(isLoggedOut ? "/register" : "/dashboard");
  };

  // loadind skeleton
  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 lg:space-y-16 animate-pulse">
          <div className="space-y-4 flex flex-col items-center text-center">
            <div className="h-5 w-24 bg-muted rounded-full" />
            <div className="h-10 w-3/4 max-w-lg bg-muted rounded-xl" />
            <div className="h-4 w-2/3 max-w-md bg-muted rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 sm:h-64 border border-border/40 rounded-xl p-5 space-y-4">
                <div className="h-5 w-3/4 bg-muted rounded-lg" />
                <div className="h-4 w-full bg-muted rounded-lg" />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="h-12 bg-muted rounded-xl" />
                  <div className="h-12 bg-muted rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    
    <section ref={sectionRef} className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 lg:space-y-16 relative z-10">
        
        {/* section header*/}
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Badge variant="homeSection">Live Work Pool</Badge>
          </div>
          <SectionHeader
            title="Explore Open Tasks Right Now"
            subtitle="Instantly view and claim micro-jobs posted by verified global buyers. Select an option below to gain direct entry."
          />
        </div>

        {/* tasks grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              onClick={handleCardNavigation}
              className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-border hover:border-border/80 hover:-translate-y-1 transition-all duration-500 cursor-pointer"
            >
              {/* card body */}
              <div className="p-5 sm:p-6 space-y-3 sm:space-y-5">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug line-clamp-1 sm:line-clamp-2">
                    {task.task_title}
                  </h3>
                  <p className="text-xs text-brand-text-muted line-clamp-1 sm:line-clamp-2 leading-relaxed">
                    {task.description || "Review metrics guidelines and safely log valid completion actions to get verified."}
                  </p>
                  <p className={`text-[11px] sm:text-sm font-semibold text-brand-primary/80 pt-0.5 sm:pt-1 ${isLoggedOut ? "blur-[2px] select-none" : ""}`}>
                    Posted by {task.buyer?.name || "Verified Enterprise"}
                  </p>
                </div>

                {/* stats grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                  {/* Spots Open */}
                  <div className="p-2 sm:p-3 space-y-0.5 sm:space-y-1">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">Spots Open</span>
                    <div className="flex items-center gap-1 sm:gap-1.5 text-sm sm:text-base font-semibold text-foreground">
                      <RiUserLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                      <span>{task.required_workers}</span>
                      <span className="text-[10px] sm:text-xs font-normal text-muted-foreground">left</span>
                    </div>
                  </div>

                  <div className="p-2 sm:p-3 space-y-0.5 sm:space-y-1">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">Coin Reward</span>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-sm sm:text-base font-semibold text-amber-600/90 dark:text-amber-600">
                      <LiaCoinsSolid className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{task.payable_amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 sm:py-4 bg-muted/40 dark:bg-muted/15 group-hover:bg-primary/5 dark:group-hover:bg-primary/10 flex items-center justify-end border-t border-border/60 transition-colors duration-500 mt-auto z-10">
                <div className="w-full flex items-center justify-between">
                  {isLoggedOut ? (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <HiLockClosed className="w-3.5 h-3.5 text-primary/80 animate-pulse shrink-0" />
                      <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">Login to Apply</span>
                    </div>
                  ) : (
                    <div />
                  )}
                  <div className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary gap-0.5">
                    See Details <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* empty state*/}
        {tasks.length === 0 && (
          <div className="text-center py-16 sm:py-20 border border-dashed border-border/60 rounded-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground mb-4">
              <HiLockClosed className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">No Operational Tasks Available</h3>
            <p className="text-xs text-muted-foreground">Check back shortly to claim open work pools.</p>
          </div>
        )}

        {/* CTA banner for guests */}
        {isLoggedOut && tasks.length > 0 && (
          <div ref={ctaRef} className="mt-8 sm:mt-16 text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-border/40 shadow-sm transition-all duration-300">
              <HiOutlineSparkles className="w-4 h-4 text-primary animate-pulse hidden sm:inline" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Ready to secure coin allocations?
                <button
                  onClick={() => navigate("/register")}
                  className="ml-1.5 font-bold text-primary hover:underline transition-all cursor-pointer"
                >
                  Join MicroMint now →
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveTasksSection;