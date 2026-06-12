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
    badgeStyles: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    titleStart: "Turn Your Free Time",
    titleHighlight: "Into Real Cash",
    highlightStyles: "from-amber-400 to-orange-400",
    description: "Complete simple tasks. Get paid instantly. Join thousands of happy earners worldwide.",
    bgImage: heroBg1,
    primaryCTA: "Start Earning Now",
    primaryCTAStyles: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25",
    secondaryCTA: "Browse Tasks",
  },
  {
    badgeText: "Grow Your Business",
    badgeIcon: LuTrendingUp,
    badgeStyles: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    titleStart: "Get Real Results",
    titleHighlight: "From Real People",
    highlightStyles: "from-blue-400 to-sky-400",
    description: "Post tasks and get them done by thousands of skilled workers ready to help.",
    bgImage: heroBg2,
    primaryCTA: "Post Your First Task",
    primaryCTAStyles: "bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-600/25",
    secondaryCTA: "See Pricing",
  },
  {
    badgeText: "Transparent & Secure",
    badgeIcon: LuShieldCheck,
    badgeStyles: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    titleStart: "The Fairest",
    titleHighlight: "Micro-Task Economy",
    highlightStyles: "from-emerald-600 to-teal-400",
    description: "Simple coin system. No hidden fees. Complete transparency in every transaction.",
    bgImage: heroBg3,
    primaryCTA: "Learn How It Works",
    primaryCTAStyles: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25",
    secondaryCTA: "Join Now",
  },
];

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
          scale: 1.03,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
  }, [selectedIndex]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* GLOBAL BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {SLIDES_DATA.map((slide, idx) => (
          <div
            key={idx}
            ref={(el) => (bgLayersRef.current[idx] = el)}
            className="absolute inset-0 bg-cover bg-center will-change-transform opacity-0 scale-[1.03]"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        ))}
      </div>

      {/* FIXED UNIFIED OVERLAY */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-r from-black/85 via-black/60 via-45% to-transparent" />
      
      {/* Structural effects & glow circles */}
      <div className="absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay pointer-events-none invert dark:invert-0" 
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />
      <div className="absolute top-32 right-20 w-96 h-96 z-10 bg-linear-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-32 left-20 w-80 h-80 z-10 bg-linear-to-br from-blue-500/10 to-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      {/* TEXT CAROUSEL ENGINE */}
      <Carousel
        setApi={setApi}
        opts={{ loop: true, duration: 30 }}
        plugins={[Autoplay({ delay: 5500, stopOnInteraction: false })]}
        className="w-full h-full relative z-10"
      >
        <CarouselContent className="ml-0 h-full">
          {SLIDES_DATA.map((slide, index) => (
            <CarouselItem key={index} className="p-0 basis-full min-w-0 h-full">
              <HeroSlide data={slide} isActive={index === selectedIndex} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {SLIDES_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => api?.scrollTo(idx)}
            className={`transition-all duration-300 ${
              idx === selectedIndex 
                ? 'w-10 h-2.5 bg-linear-to-r from-amber-500 to-orange-500 rounded-full' 
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70 rounded-full'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function HeroSlide({ data, isActive }) {
  const contentRef = useRef(null);
  const BadgeIcon = data.badgeIcon;

  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isActive) {
      const elements = contentRef.current.querySelectorAll('.animate-item');
      gsap.fromTo(elements, 
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
        }
      );
    }
  }, [isActive]);

  return (
    /* FIX: Used min-h-screen combined with items-center flex alignment 
       and stripped hardcoded padding restrictions. This guarantees that 
       the text container is mathematically centered on the screen y-axis.
    */
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      {/* FIX: Swapped max-w limits with a responsive percent fluid base width system 
          so the inner track maintains perfect margins on high-density 4K displays.
      */}
      <div className="w-full max-w-360 px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="max-w-2xl lg:max-w-4xl w-full flex flex-col justify-center">
          
          {/* Badge */}
          <div className="animate-item self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border shadow-sm mb-8 bg-linear-to-r backdrop-blur-md border-white/10 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
            <BadgeIcon className="w-4 h-4 text-white" />
            <span className="text-white/90">{data.badgeText}</span>
          </div>

          {/* Title */}
          <h1 className="animate-item text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-8">
            {data.titleStart}
            <br />
            <span className={`bg-clip-text text-transparent bg-linear-to-r ${data.highlightStyles}`}>
              {data.titleHighlight}
            </span>
          </h1>

          {/* Description */}
          <p className="animate-item text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
            {data.description}
          </p>

          {/* Buttons */}
          <div className="animate-item flex flex-col sm:flex-row gap-4">
            <button className={`group px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 ${data.primaryCTAStyles}`}>
              {data.primaryCTA}
              <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 rounded-xl font-semibold text-base bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center">
              {data.secondaryCTA}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}