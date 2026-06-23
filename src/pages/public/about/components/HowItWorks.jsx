import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { FaLandmark } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import SectionHeader from "@/components/ui/section-header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Define the card data structure
const CARDS_DATA = [
  {
    id: "buyers",
    phase: "Phase 01",
    title: "Buyers",
    description: "Buyers buy packages to launch custom crowd-source campaigns, app testing, or social engagement metrics instantly.",
    imageSrc: "/illustrations/Saving-money.svg",
    imageAlt: "Saving Money",
    // Unique styling classes per card
    hoverBorderClass: "hover:border-brand-primary/40",
    bgWrapperClass: "bg-brand-primary/5",
    phaseTextClass: "text-brand-primary"
  },
  {
    id: "platform",
    phase: "Processing",
    title: "Platform",
    description: "This subtle operating buffer explicitly covers server infrastructure, automated verification tools, and secure ledger maintenance costs.",
    imageSrc: "/illustrations/Currency.svg",
    imageAlt: "Currency System",
    hoverBorderClass: "hover:border-indigo-500/40",
    bgWrapperClass: "bg-indigo-500/5",
    phaseTextClass: "text-indigo-500 dark:text-indigo-400"
  },
  {
    id: "workers",
    phase: "Phase 02",
    title: "Workers",
    description: "Workers safely claim tasks, harvest digital coins onto their balances, and execute instant localized payout sequences.",
    imageSrc: "/illustrations/Finance-leaders.svg",
    imageAlt: "Finance Leaders",
    hoverBorderClass: "hover:border-brand-secondary/40",
    bgWrapperClass: "bg-brand-secondary/5",
    phaseTextClass: "text-brand-secondary"
  }
];

const HowItWorks = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states to avoid text or grid flashes
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 0, y: 30 });
      if (gridRef.current?.children?.length) gsap.set(gridRef.current.children, { opacity: 0, y: 40 });
      if (bannerRef.current) gsap.set(bannerRef.current, { opacity: 0, scale: 0.96, y: 20 });

      // Header slide down/fade in
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

      // 3-Column structural card stagger animation
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

      // Bottom banner pop/fade animation
      if (bannerRef.current) {
        gsap.to(bannerRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 lg:py-28 relative overflow-hidden bg-background text-foreground transition-colors duration-300 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 lg:space-y-16 relative z-10">
        
        {/* section header */}
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Badge variant="homeSection">Tokenomics</Badge>
          </div>
          <SectionHeader
            title="How Our Coin System Works"
            subtitle="A transparent look inside the MicroMint economy. Here is how value flows between task creators, our infrastructure, and earners."/>
        </div>

        {/* Dynamic Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6">
          {CARDS_DATA.map((card) => (
            <div 
              key={card.id} 
              className={`group relative p-5 sm:p-6 rounded-2xl border border-border bg-card/40 dark:bg-card/20 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:bg-card shadow-none ${card.hoverBorderClass}`}
            >
              <div className="space-y-4">
                {/* Illustration Wrapper */}
                <div className={`flex items-center justify-center p-2 rounded-2xl group-hover:scale-105 transition-transform duration-300 ${card.bgWrapperClass}`}>
                  <img 
                    src={card.imageSrc} 
                    alt={card.imageAlt} 
                    className="w-full object-contain max-h-40"
                  />
                </div>
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold uppercase tracking-widest block ${card.phaseTextClass}`}>
                    {card.phase}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-brand-text transition-colors">
                    {card.title}
                  </h3>
                </div>
                <p className="space-y-3 text-brand-text-muted text-xs leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;