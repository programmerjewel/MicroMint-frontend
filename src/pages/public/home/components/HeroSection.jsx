import { useState, useEffect, useCallback, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { LuCircleDollarSign, LuTrendingUp, LuShieldCheck, LuArrowRight } from 'react-icons/lu';
import { gsap } from 'gsap';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import heroBg1 from '@/assets/images/hero/picture-1.jpg';
import heroBg2 from '@/assets/images/hero/picture-2.jpg';
import heroBg3 from '@/assets/images/hero/picture-3.jpg';

const SLIDES_DATA = [
  {
    badgeText: "Start Earning Today",
    badgeIcon: LuCircleDollarSign,
    badgeStyles: "bg-brand-accent/20 text-yellow-900 border-brand-accent/40 dark:bg-brand-accent/10 dark:text-brand-accent dark:border-brand-accent/30",
    titleStart: "Turn Your Free Time",
    titleHighlight: "Into Real Cash",
    highlightStyles: "text-amber-500 dark:text-brand-accent", 
    description: "Complete simple tasks. Get paid instantly. Join thousands of happy earners worldwide.",
    bgImage: heroBg1,
    primaryCTA: "Start Earning Now",
    primaryCTAStyles: "bg-brand-accent text-black font-bold",
    secondaryCTA: "Browse Tasks",
  },
  {
    badgeText: "Grow Your Business",
    badgeIcon: LuTrendingUp,
    badgeStyles: "bg-brand-primary/15 text-brand-primary border-brand-primary/30 dark:bg-blue-500/40 dark:text-white dark:border-blue-400",
    titleStart: "Get Real Results",
    titleHighlight: "From Real People",
    highlightStyles: "text-brand-primary dark:text-brand-primary",
    description: "Post tasks and get them done by thousands of skilled workers ready to help.",
    bgImage: heroBg2,
    primaryCTA: "Post Your First Task",
    primaryCTAStyles: "bg-brand-primary text-white",
    secondaryCTA: "See Pricing",
  },
  {
    badgeText: "Transparent & Secure",
    badgeIcon: LuShieldCheck,
    badgeStyles: "bg-brand-secondary/20 text-emerald-900 border-brand-secondary/40 dark:bg-emerald-500/40 dark:text-white dark:border-emerald-400",
    titleStart: "The Fairest",
    titleHighlight: "Micro-Task Economy",
    highlightStyles: "text-emerald-600 dark:text-brand-secondary",
    description: "Simple coin system. No hidden fees. Complete transparency in every transaction.",
    bgImage: heroBg3,
    primaryCTA: "Learn How It Works",
    primaryCTAStyles: "bg-brand-secondary text-black font-bold",
    secondaryCTA: "Join Now",
  },
];

function HeroSlide({ data, isActive }) {
  const contentRef = useRef(null);
  const BadgeIcon = data.badgeIcon;

  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isActive) {
      const elements = contentRef.current.querySelectorAll('.animate-item');
      gsap.fromTo(elements, 
        { opacity: 0, y: 15, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.1,
        }
      );
    }
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center md:justify-start px-4 sm:px-6 pb-12 md:pb-0 md:px-12 lg:px-20">
      <div ref={contentRef} className="max-w-2xl lg:max-w-4xl w-full flex flex-col items-center text-center md:items-start md:text-left gap-4 lg:gap-5">
        
        {/* badge */}
        <div className={`animate-item inline-flex items-center gap-2 px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-[11px] md:text-xs font-semibold border backdrop-blur-lg transition-all duration-300 ${data.badgeStyles}`}>
          <BadgeIcon className="w-3.5 h-3.5" />
          <span>{data.badgeText}</span>
        </div>

        {/* title */}
        <h1 className="animate-item text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-text leading-[1.15] md:leading-[1.1]">
          {data.titleStart}
          <br />
          <span className={`${data.highlightStyles}`}>
            {data.titleHighlight}
          </span>
        </h1>

        {/* description */}
        <p className="animate-item text-sm md:text-base text-brand-text-muted max-w-md md:max-w-2xl leading-relaxed font-medium">
          {data.description}
        </p>

        {/* Action Blocks */}
        <div className="animate-item flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 md:w-full w-60">
          
          {/* CTA btns */}
          <button 
            className={`group relative btn-shimmer py-2.5 px-5 md:py-3 md:px-7 rounded-xl font-bold text-xs md:text-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.97] active:shadow-md flex items-center justify-center gap-2 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${data.primaryCTAStyles}`}>

            <span className="relative z-10">{data.primaryCTA}</span>
            <LuArrowRight className="relative z-10 w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />

          </button>
          
          <button 
            className="group py-2.5 px-5 md:py-3 md:px-7 rounded-xl font-semibold text-xs md:text-sm bg-secondary text-secondary-foreground border border-border/60 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-muted/80 hover:border-border active:translate-y-0 active:scale-[0.97] flex items-center justify-center w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            {data.secondaryCTA}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [api, setApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const bgLayersRef = useRef([]);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on('select', onSelect);
    api.on('reInit', onSelect);
  }, [api, onSelect]);

  useEffect(() => {
    bgLayersRef.current.forEach((layer, idx) => {
      if (!layer) return;
      if (idx === selectedIndex) {
        gsap.to(layer, {
          opacity: 1, 
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        gsap.to(layer, {
          opacity: 0,
          scale: 1.04,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
  }, [selectedIndex]);

  return (
    <section className="relative w-full min-h-[90vh] max-h-[95vh] overflow-hidden bg-background transition-colors duration-300">
      
      {/* Background Images */}
      <div className="absolute inset-0 z-0 bg-background">
        {SLIDES_DATA.map((slide, idx) => (
          <div
            key={idx}
            ref={(el) => (bgLayersRef.current[idx] = el)}
            className="absolute inset-0 bg-cover bg-center will-change-transform opacity-0 scale-[1.04]"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        ))}
      </div>

      {/* FIXED HERE: Simplified to a single, plain overlay block */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: 'var(--plain-hero-overlay)' }}
      />
      
      {/* Carousel Container */}
      <div className="absolute inset-0 z-20 flex flex-col">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, duration: 35 }}
          plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
          className="w-full h-full flex-1 [&>div]:h-full"
        >
          <CarouselContent className="ml-0 h-full">
            {SLIDES_DATA.map((slide, index) => (
              <CarouselItem key={index} className="p-0 basis-full min-w-0 h-full shrink-0">
                <HeroSlide data={slide} isActive={index === selectedIndex} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation points */}
        <div className="w-full relative z-20 pb-4 md:pb-6 flex justify-center gap-3">
          {SLIDES_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={`transition-all duration-300 ${
                idx === selectedIndex 
                  ? 'w-9 h-2 bg-brand-primary rounded-full' 
                  : 'w-2 h-2 bg-brand-text-muted/40 hover:bg-brand-text-muted/70 rounded-full'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}