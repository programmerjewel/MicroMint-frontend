import SectionHeader from "@/components/ui/section-header";
import Marquee from "react-fast-marquee";
import { BiSolidQuoteLeft } from "react-icons/bi";
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Salman Haider",
      role: "Freelance Worker",
      photo:
        "https://i.ibb.co.com/fGPgFVgd/586099097-4323742771192656-2942265504356037351-n.jpg",
      quote:
        "MicroMint has completely changed how I earn money online. The tasks are simple, payments are instant whenever I have free time. I've earned over $2,000 in just 3 months!",
      rating: 4,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Small Business Owner",
      photo: "https://i.ibb.co.com/k24QqC0P/john.png",
      quote:
        "As a buyer, I'm impressed with the quality of work and speed of delivery. The platform makes it incredibly easy to get tasks done without hiring full-time staff. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "David Thompson",
      role: "Part-Time Worker",
      photo: "https://i.ibb.co.com/hxPyy52v/Man-32.png",
      quote:
        "I started using MicroMint during my college years. It's perfect for students like me. The support team is amazing and always ready to help! Highly recommended for beginners.",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Digital Marketing Agency",
      photo: "https://i.ibb.co.com/r2ZzKq8G/Woman-23.png",
      quote:
        "We've been using MicroMint for content moderation, and my client's small tasks. The platform is reliable, workers are skilled, and the pricing is great. Game-changer for our agency!",
      rating: 5,
    },
    {
      id: 5,
      name: "Sarah Johnson",
      role: "Remote Worker",
      photo: "https://i.ibb.co.com/tpwxcSD9/Woman-19.png",
      quote:
        "Working from home has never been easier. MicroMint provides consistent task availability and fair compensation. I love the transparency and trust this platform offers.",
      rating: 5,
    },
  ];

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
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

  // Testimonial Card component
  const TestimonialCard = ({ testimonial }) => {
    return (
      <div className="w-87.5 md:w-100 mx-4 bg-white rounded-2xl p-6 border border-gray-200">
        {/* Quote Icon */}
        <div className="mb-4">
          <BiSolidQuoteLeft size={45} className="text-green-400"/>
        </div>

        {/* Quote Text */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
          "{testimonial.quote}"
        </p>

        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        {/* Section Header */}
        <SectionHeader title="What Our Users Say" subtitle="Join thousands of satisfied workers and businesses who trust
            SwiftBounty for their micro-task needs."/>
      </div>

      {/* Marquee */}
      <Marquee
        speed={60}
        gradient={true}
        gradientColor="#f9fafb"
        gradientWidth={100}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </Marquee>
    </section>
  );
};

export default Testimonials;