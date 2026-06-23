import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCheckCircle, FiTrendingUp, FiLayers, FiActivity } from "react-icons/fi";
import { RiBriefcaseLine, RiTerminalBoxLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const TrafficSegmentation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth inward slide-in stagger animation for the two user pathways
      gsap.fromTo(
        leftCardRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rightCardRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleWorkerNavigation = () => {
    navigate(user ? "/dashboard" : "/register");
  };

  const handleBuyerNavigation = () => {
    navigate(user ? "/dashboard" : "/login");
  };

  return (
    <section 
      ref={containerRef} 
      className="py-16 bg-background overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* --- LEFT CARD: FOR WORKERS --- */}
        <div
          ref={leftCardRef}
          className="group relative rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-card p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/3 hover:-translate-y-1"
        >
          {/* Subtle Corner Background Glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />

          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 dark:text-blue-400">
              <RiBriefcaseLine className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase">
                For Operators
              </span>
              <h3 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
                Earn Consistently
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Monetize your spare time by handling optimized digital operational tasks with guaranteed immediate micro-payout vectors.
              </p>
            </div>

            {/* List Array Map */}
            <ul className="space-y-3 pt-2">
              {[
                { title: "Instant coin conversion", desc: "No holding patterns; withdraw immediately to local channels." },
                { title: "Flexible micro-jobs", desc: "Work fields tailor dynamically directly to your device layout orientation." },
                { title: "Verified payments", desc: "Automated transaction ledgers log every action securely." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs">
                  <FiCheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">{item.title}</span>
                    <span className="text-neutral-400 dark:text-neutral-500 block">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={handleWorkerNavigation}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-blue-500/20 transition-all duration-200 cursor-pointer"
            >
              Start Earning Now <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        {/* --- RIGHT CARD: FOR BUYERS --- */}
        <div
          ref={rightCardRef}
          className="group relative rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-card p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/3 hover:-translate-y-1"
        >
          {/* Subtle Corner Background Glow */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />

          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
              <RiTerminalBoxLine className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold tracking-widest text-emerald-500 dark:text-emerald-400 uppercase">
                For Enterprises
              </span>
              <h3 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
                Scale Operational Tasks
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Deploy high-density micro-jobs to thousands of pre-vetted operators instantly with precise criteria control blocks.
              </p>
            </div>

            {/* List Array Map */}
            <ul className="space-y-3 pt-2">
              {[
                { title: "99.9% Validation accuracy", desc: "Redundant consensus matrices eliminate false submissions entirely." },
                { title: "Automated proof verification", desc: "Our platform validates task metrics securely using custom engine patterns." },
                { title: "Custom crowd routing", desc: "Target explicit target user groups or scale to macro global channels." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs">
                  <FiCheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">{item.title}</span>
                    <span className="text-neutral-400 dark:text-neutral-500 block">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={handleBuyerNavigation}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-emerald-500/20 transition-all duration-200 cursor-pointer"
            >
              Post a Task <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrafficSegmentation;