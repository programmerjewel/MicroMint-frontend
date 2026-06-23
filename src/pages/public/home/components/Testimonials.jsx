import PropTypes from 'prop-types';
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/ui/section-header";
import Marquee from "react-fast-marquee";
import { BiSolidQuoteLeft } from "react-icons/bi";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Salman Haider",
      role: "Freelance Worker",
      photo: "https://i.ibb.co.com/fGPgFVgd/586099097-4323742771192656-2942265504356037351-n.jpg",
      quote: "MicroMint has completely changed how I earn money online. The tasks are simple, payments are instant whenever I have free time. I've earned over $2,000 in just 3 months!",
      rating: 4,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Small Business Owner",
      photo: "https://i.ibb.co.com/k24QqC0P/john.png",
      quote: "As a buyer, I'm impressed with the quality of work and speed of delivery. The platform makes it incredibly easy to get tasks done without hiring full-time staff. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "David Thompson",
      role: "Part-Time Worker",
      photo: "https://i.ibb.co.com/hxPyy52v/Man-32.png",
      quote: "I started using MicroMint during my college years. It's perfect for students like me. The support team is amazing and always ready to help! Highly recommended for beginners.",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Digital Marketing Agency",
      photo: "https://i.ibb.co.com/r2ZzKq8G/Woman-23.png",
      quote: "We've been using MicroMint for content moderation, and my client's small tasks. The platform is reliable, workers are skilled, and the pricing is great. Game-changer for our agency!",
      rating: 5,
    },
    {
      id: 5,
      name: "Sarah Johnson",
      role: "Remote Worker",
      photo: "https://i.ibb.co.com/tpwxcSD9/Woman-19.png",
      quote: "Working from home has never been easier. MicroMint provides consistent task availability and fair compensation. I love the transparency and trust this platform offers.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 lg:space-y-16 relative z-10">
        
        {/* header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Badge variant="homeSection">Testimonials</Badge>
          </div>
          <SectionHeader 
            title="What Our Users Say" 
            subtitle="Join thousands of satisfied workers and businesses who trust MicroMint for their micro-task needs."
          />
        </div>

        {/* carousel */}
        <div className="relative w-full">
          {/* edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 z-10 pointer-events-none bg-linear-to-r from-background via-background/70 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 z-10 pointer-events-none bg-linear-to-l from-background via-background/70 to-transparent" />

          <Marquee speed={80} gradient={false} pauseOnHover={true}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>

      </div>
    </section>
  );
};

// --- Native Star Rating Generator (No External Libraries) ---
const NativeStars = ({ rating }) => {
  return (
    <div className="flex gap-0.5 sm:gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
            index < rating ? "text-amber-400" : "text-muted/60 dark:text-muted/20"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// --- Testimonial Card Component ---
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="w-70 sm:w-85 shrink-0 mx-3 rounded-xl p-5 sm:p-6 border border-border/90 bg-card/60 backdrop-blur-xs flex flex-col justify-between min-h-62.5 sm:min-h-70">
      <div>
        <div className="mb-3 sm:mb-4">
          <BiSolidQuoteLeft className="w-8 h-8 sm:w-10 sm:h-10 text-primary/60" />
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-4 font-normal">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-border/30">
        {/* Render Native Stars */}
        <NativeStars rating={testimonial.rating} />

        {/* User Profile Block */}
        <div className="flex items-center gap-3">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border border-border"
          />
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-foreground truncate">
              {testimonial.name}
            </h3>
            <p className="text-[11px] text-muted-foreground truncate">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

NativeStars.propTypes = {
  rating: PropTypes.number.isRequired,
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default Testimonials;