import { useEffect, useRef } from "react";
import { Shield, Lock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/ui/section-header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AdminImg from "../../../../assets/images/about/admin.jpg";
import LedgerImg from "../../../../assets/images/about/ledger.jpg";
import SecurityImg from "../../../../assets/images/about/security.jpg";

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  { 
    icon: Shield, 
    title: "Anti-Fraud Verification", 
    tag: "PORTRAIT",
    description: "Advanced internal checks instantly block bot submissions and multi-account configurations to preserve Buyer tokens.",
    imageSrc: SecurityImg,
    imageAlt: "Anti-Fraud Illustration"
  },
  { 
    icon: Lock, 
    title: "Escrow Ledger Lock", 
    tag: "LEDGER",
    description: "Coin balances are safely held in app context memory until micro-tasks are successfully verified and approved.",
    imageSrc: LedgerImg,
    imageAlt: "Escrow Ledger Illustration"
  },
  { 
    icon: Eye, 
    title: "Manual Admin Oversight", 
    tag: "ADMIN",
    description: "Our dedicated support system audits submitted proofs and balances to eliminate dispute inconsistencies.",
    imageSrc: AdminImg,
    imageAlt: "Admin Oversight Illustration"
  },
];

const Security = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 0, y: 30 });
      if (gridRef.current?.children?.length) gsap.set(gridRef.current.children, { opacity: 0, scale: 0.95, y: 20 });

      gsap.to(headerRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power3.out", 
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" } 
      });
      
      gsap.to(gridRef.current.children, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out", 
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" } 
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 lg:py-28 relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 lg:space-y-16 relative z-10">
        
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Badge variant="homeSection">
              Security Infrastructure
            </Badge>
          </div>
          <div className="[&_h2]:text-brand-text [&_p]:text-brand-text-muted">
            <SectionHeader
              title="Your Assets, Safely Protected"
              subtitle="We prioritize strict transactional safety. Whether you are purchasing campaign packages or processing withdrawal earnings, your workflow remains fully verified."
            />
          </div>
        </div>

        {/* cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="relative overflow-hidden rounded-lg border border-border bg-card/40 dark:bg-card/20 backdrop-blur-md hover:border-brand-secondary/40 transition-all duration-300 group shadow-none min-h-105 md:min-h-0 md:flex md:flex-col"
              >
                {/* Image Container: Absolute layout on mobile overlay; clean aspect ratio block on desktop */}
                <div className="absolute inset-0 md:relative md:inset-auto md:w-full md:aspect-3/2 shrink-0 overflow-hidden">
                  <img 
                    src={feature.imageSrc} 
                    alt={feature.imageAlt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Subtle dark gradient overlay behind text on mobile for ultimate readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent md:hidden" />
                </div>

                {/* Text Details Content Wrapper: Fills remainder perfectly without extra blank spacing */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end space-y-3 
                                md:relative md:bottom-auto md:left-auto md:right-auto md:p-5 md:flex-1 md:justify-start md:bg-transparent">
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-brand-secondary/20 md:bg-brand-secondary/10 text-brand-secondary shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-base font-bold text-white md:text-brand-text group-hover:text-brand-secondary transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-zinc-300 md:text-brand-text-muted leading-relaxed transition-colors duration-300 line-clamp-3 md:line-clamp-none">
                      {feature.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Security;