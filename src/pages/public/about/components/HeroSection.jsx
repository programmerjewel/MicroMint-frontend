import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { gsap } from "gsap";
// Import the background asset
import heroBgImage from "@/assets/images/about/heroimg.jpg";

const HeroSection = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const textGroupRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (authLoading) return;

    const ctx = gsap.context(() => {
      // 1. Set initial states to avoid text flash
      if (textGroupRef.current) {
        gsap.set(textGroupRef.current.children, { opacity: 0, y: 25 });
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 15 });
      }

      // 2. Animate all text elements simultaneously
      if (textGroupRef.current?.children?.length) {
        gsap.to(textGroupRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0, 
          ease: "power3.out",
          delay: 0.2
        });
      }

      // 3. Animate CTAs together alongside the text fade
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [authLoading]);

  const handleNavigation = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="py-20 lg:py-28 relative overflow-hidden bg-background text-foreground transition-colors duration-300 border-b border-border/50"
    >
      {/* Dynamic Background Image Layer with Soft Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-300 opacity-40 dark:opacity-20"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      />
      
      {/* Colored Matte Soft Overlay (Uses variable defined in index.css) */}
      <div className="absolute inset-0 z-0 bg-hero-overlay backdrop-blur-[2px]" />

      {/* Background glow and SVG structural grids */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px]" />
        
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0H0V30' stroke='currentColor' stroke-width='1'/%3E%3C/svg%3E")` }} 
        />
      </div>

      {/* Main UI Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6 lg:space-y-8">
        <div ref={textGroupRef} className="space-y-6 lg:space-y-8">
          <div>
            <Badge variant="homeSection">The Future of Micro-Work</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-brand-text">
            Work Small <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-primary via-indigo-500 to-brand-secondary">
              Earn Big
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-brand-text-muted max-w-xl mx-auto leading-relaxed">
            MicroMint is a high-performance marketplace where effort meets instant rewards. 
            We empower a global community to monetize their skills through bite-sized tasks.
          </p>
        </div>

        {/* Action Buttons Container */}
        <div ref={ctaRef}>
          <Button  
            onClick={handleNavigation} 
            disabled={authLoading} 
            size="lg" 
            className="w-full sm:w-auto rounded-xl font-bold px-8 h-12 bg-brand-primary text-primary-foreground hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/10 transition-all duration-300 cursor-pointer"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;