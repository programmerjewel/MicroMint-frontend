import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowRight, HiOutlineCurrencyDollar } from "react-icons/hi2";
import SectionHeader from "@/components/ui/section-header";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, scale: 0.96, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="py-16 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Removed rounded-2xl, bg-card, border, border-border/60, shadow-xl, and padding */}
        <div 
          ref={boxRef} 
          className="relative text-center space-y-6"
        >
          {/* Decorative Icon Container */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center relative">
            {/* Ambient Pulse Ring */}
            <div className="absolute inset-0 rounded-full bg-brand-primary/10 animate-ping opacity-75 duration-1000" />
            
            {/* Icon Wrapper Background */}
            <div className="relative w-14 h-14 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary shadow-inner">
              <HiOutlineCurrencyDollar className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          <div>
            <SectionHeader
              title={
                <span className="text-brand-text font-bold tracking-tight text-3xl md:text-4xl block transition-colors duration-300">
                  Ready to Join the Fairest
                  <br />
                  Micro-Task Economy?
                </span>
              }
              subtitle={
                <span className="text-brand-text-muted mt-4 transition-colors duration-300 block max-w-2xl mx-auto text-base">
                  Create an account within seconds. Secure lightning-fast allocations as a skilled worldwide operator, or deploy crowd campaigns instantly with targeted tracking.
                </span>
              }
            />
          </div>

          {/* Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate(user ? "/dashboard" : "/register")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-primary hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-brand-primary/20 group cursor-pointer"
            >
              Join Now
              <HiOutlineArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;