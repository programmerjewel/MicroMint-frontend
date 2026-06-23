import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';      
import useAuth from '@/hooks/useAuth';
import { ArrowRight, Zap, Layers, CheckCircle2, ShieldCheck, Activity, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/section-header";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DualAudienceSplitBanner() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('earners');
  
  
  const navigate = useNavigate();
  const { user } = useAuth(); 

  
  const handleNavigation = () => {
    if (user) {
      navigate('/dashboard'); 
    } 
    else {
      navigate('/register');  
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.split-banner-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );

      if (window.innerWidth >= 768) {
        tl.fromTo(
          '.audience-track-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 },
          '-=0.2'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-background">
      {/* gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-72 h-72 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-72 h-72 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={triggerRef} className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-10 sm:space-y-12">
        
        {/* header */}
        <div className="split-banner-header flex flex-col items-center text-center">
          <div className="mb-3">
            <Badge variant="homeSection" className="gap-1.5 py-1 px-3">
              <Sparkles className="w-3 h-3 text-primary" />
              Ecosystem Gateways
            </Badge>
          </div>
          <SectionHeader
            title="One Platform. Two Ways to Win."
            subtitle="Earn swift rewards with micro-tasks, or scale your operations with a global on-demand workforce." />
        </div>

        {/* mobile view toggler */}
        <div className="flex md:hidden p-1 bg-muted/60 rounded-xl max-w-xs mx-auto border border-border/60 relative isolation-auto">
          <div className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-lg transition-transform duration-300 ease-out z-0 shadow-xs ${
              activeTab === 'earners' 
                ? 'translate-x-0 bg-background border border-border/40' 
                : 'translate-x-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20'
            }`} />

          <Button variant="ghost" size="sm" onClick={() => setActiveTab('earners')} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 relative z-10 active:scale-100 hover:bg-transparent dark:hover:bg-transparent ${ 
            activeTab === 'earners' 
            ? 'text-foreground' 
            : 'text-muted-foreground hover:text-foreground' }`}>
            For Earners
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('buyers')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 relative z-10 active:scale-100 hover:bg-transparent dark:hover:bg-transparent ${
              activeTab === 'buyers' ? 'text-emerald-700 dark:text-emerald-400' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            For Buyers
          </Button>
        </div>

        {/*  cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* workers */}
          <div className={`audience-track-card flex flex-col justify-between p-5 sm:p-8 rounded-2xl border border-border/40 bg-muted/10 relative overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-xs ${
            activeTab === 'earners' ? 'block animate-in fade-in duration-300 slide-in-from-bottom-2' : 'hidden md:flex'
          }`}>
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary/90 bg-primary/5 px-2.5 py-0.5 rounded-md inline-block">
                  Get Paid
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  For Global Earners
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Complete flexible on-demand micro-jobs from anywhere and claim immediate payouts.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">Instant Settlements</h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Tokens hit your active balance immediately on approval.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">Flexible Work Pool</h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Choose from hundreds of micro-tasks that match your skills.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">Escrow Protection</h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Smart contracts secure your payouts for every honest setup.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <Button variant="default" size="lg" onClick={() => handleNavigation()} className="w-full rounded-xl font-semibold cursor-pointer group/btn">
                Start Earning Now
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </div>

          {/* buyers */}
          <div className={`audience-track-card flex flex-col justify-between p-5 sm:p-8 rounded-2xl border border-border/40 bg-muted/10 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500 shadow-xs ${
            activeTab === 'buyers' ? 'block animate-in fade-in duration-300 slide-in-from-bottom-2' : 'hidden md:flex'
          }`}>
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 rounded-md inline-block">
                  Outsource
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  For Business Buyers
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Scale data labeling, product testing, and human intelligence tasks across a vetted global crew.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">High-Fidelity Consensus</h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Multi-worker checks filter out bad submissions automatically.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">Rapid Verification</h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Programmatic validation steps drop processing intervals to seconds.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">Targeted Routing</h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Filter operations by location, custom demographic tiers, or task ratings.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              
              <Button 
                variant="default"
                size="lg"
                onClick={() => handleNavigation()}
                className="w-full bg-foreground text-background dark:bg-white dark:text-black dark:hover:bg-white/90 hover:bg-foreground/90 rounded-xl font-semibold cursor-pointer group/btn"
              >
                Post a Task
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}