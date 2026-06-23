import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/ui/section-header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { period: "Phase 1: Foundation", title: "Platform Core Launch", description: "Successfully deployed MicroMint tokenized system, allowing Buyers and Workers to match live tasks instantly." },
  { period: "Phase 2: Growth", title: "10K+ Tasks Approved", description: "Expanded internal validation engines to safely parse thousands of submissions with zero transaction failures." },
  { period: "Phase 3: Integration", title: "Localized Wallet Sync", description: "Deployed direct API paths providing instantaneous earnings cashouts natively via bKash, Rocket, and Nagad." },
];

const Milestones = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 0, y: 30 });
      gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });

      elementsRef.current.forEach((el) => {
        if (!el) return;
        const side = el.dataset.side;
        gsap.fromTo(el,
          { opacity: 0, x: side === "left" ? -40 : 40 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 80%" } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 lg:py-28 relative overflow-hidden bg-muted/40 dark:bg-muted/15 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Badge variant="homeSection">Our Journey</Badge>
          </div>
          <SectionHeader
            title="Milestones & Ecosystem Traction"
            subtitle="Take a look at the operational growth benchmarks achieved across our platform roadmap timelines."
          />
        </div>

        {/* Dynamic Center Timeline Wrapper */}
        <div className="relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-px before:bg-border/80 before:h-full">
          <div className="space-y-12">
            {milestones.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={index}
                  data-side={isLeft ? "left" : "right"}
                  ref={(el) => (elementsRef.current[index] = el)}
                  className={`relative flex flex-col md:flex-row items-start ${isLeft ? "md:flex-row-reverse" : ""} justify-between md:w-full pl-8 md:pl-0`}
                >
                  {/* Anchor Point Tracker Indicator */}
                  <span className="absolute left-2.75 md:left-1/2 md:-ml-1.5 top-1.5 flex h-3 w-3 rounded-full bg-brand-primary ring-4 ring-background z-20" />
                  
                  {/* Box Content Block (Takes exactly half width on desktop) */}
                  <div className="w-full md:w-[45%] space-y-2 bg-card border border-border p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-brand-primary bg-brand-primary/5 px-2.5 py-0.5 rounded-full mb-1">
                      {item.period}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Empty space matching width parameters on desktop layout */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Milestones;