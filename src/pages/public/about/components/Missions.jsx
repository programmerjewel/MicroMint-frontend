import { useEffect, useRef } from "react";
import { ShieldCheck, Handshake, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: "Financial Empowerment",
    description: "We are committed to helping individuals globally turn their spare time into impactful, localized currency.",
  },
  {
    icon: ShieldCheck,
    title: "Fairness First",
    description: "Built on transparent platform margins, manual audit tools, and bulletproof security layers.",
  },
  {
    icon: Handshake,
    title: "Community Trust",
    description: "Creating a reliable bridge where task creators find real value and earners secure precise payouts.",
  },
];

const Missions = () => {
  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftSideRef.current, 
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(itemsRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 lg:py-28 relative overflow-hidden bg-background border-y border-border/50">
      {/* Decorative Blur Background Radial Patch */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Sticky/Anchor Info Side */}
          <div ref={leftSideRef} className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <Badge variant="homeSection">Our Vision</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-brand-text leading-tight">
              Redefining the Global Micro-Task Economy
            </h2>
            <p className="text-sm text-brand-text-muted leading-relaxed">
              MicroMint aggregates small human efforts into significant rewards. We eliminate structural roadblocks and foster a workspace where transparency is programmed directly into our ledgers.
            </p>
          </div>

          {/* Right Linear List (No Cards, Minimal Lines Instead) */}
          <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6 border-l-0 lg:border-l border-border/60">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  ref={(el) => (itemsRef.current[index] = el)}
                  className="flex gap-4 sm:gap-6 group"
                >
                  <div className="p-3 rounded-xl bg-brand-primary/5 text-brand-primary border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-primary-foreground transition-all duration-300 h-fit shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5 pb-6 border-b border-border/60 w-full last:border-0">
                    <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-brand-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Missions;