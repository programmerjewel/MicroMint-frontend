import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CgBolt } from "react-icons/cg";
import { GoShieldCheck } from "react-icons/go";
import { AiOutlineDollar } from "react-icons/ai";
import SectionHeader from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";


import settlementImg from "@/assets/images/trust/settlement.jpg";
import currencyImg from "@/assets/images/trust/money.jpg";
import antiFraudImg from "@/assets/images/trust/anti-fraud.jpg";

gsap.registerPlugin(ScrollTrigger);

const ADVANTAGES = [
  {
    id: "01",
    icon: CgBolt,
    image: settlementImg,
    title: "Instant Micro-Settlements",
    desc: "No threshold delays. As soon as a client approves your submission, coins hit your wallet in real time.",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(245,158,11,0.1)]"
  },
  {
    id: "02",
    icon: GoShieldCheck,
    image: antiFraudImg,
    title: "Anti-Fraud Architecture",
    desc: "Automated verification layers test task rules natively, ensuring data accuracy for buyers.",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.1)]"
  },
  {
    id: "03",
    icon: AiOutlineDollar,
    image: currencyImg,
    title: "Ultra-Low Fees",
    desc: "We minimize transaction overhead across local channels so operators keep exactly what they earn.",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.1)]"
  }
];

export default function PlatformAdvantages() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-16 lg:py-24 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 lg:space-y-14 relative z-10">
        
        {/* header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="mb-3">
            <Badge variant="homeSection" className="uppercase text-[10px] tracking-wider px-3 py-0.5 backdrop-blur-md bg-muted/40">
              Engineered Performance
            </Badge>
          </div>
          <SectionHeader 
            title="Why Global Teams Trust MicroMint" 
            subtitle="Specialized infrastructure tailored to frictionless execution, safe ledgers, and seamless token conversions." 
          />
        </div>

        {/* cards grid */}
        <div ref={cardsRef} className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 lg:gap-8">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div 
                key={adv.id} 
                className={`group relative grid grid-cols-10 sm:flex sm:flex-col sm:justify-end bg-card overflow-hidden rounded-md transition-all duration-300 sm:aspect-3/4 ${adv.glow}`}
              >
                {/* image */}
                <div className="col-span-4 relative overflow-hidden h-full sm:absolute sm:inset-0 sm:z-0">
                  <img 
                    src={adv.image} 
                    alt={adv.title} 
                    loading="lazy" 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out brightness-95 dark:brightness-[0.75]"
                  />
                  <div className="hidden sm:block absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* texts */}
                <div className="col-span-6 relative z-10 w-full p-4 sm:p-5 bg-card border-l border-border/30 sm:border-l-0 sm:border-t sm:border-border/40 shadow-xs flex flex-col">
                  <div className="space-y-3 flex flex-col h-full">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${adv.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* content */}
                    <div className="space-y-1.5 flex-1 flex flex-col justify-end">
                      <h3 className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-150">
                        {adv.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {adv.desc}
                      </p>
                    </div>
        
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}