import FAQ from "@/components/features/public/FAQ";
import HeroSection from "@/components/features/public/HeroSection";
import Testimonials from "@/components/features/public/Testimonials";
import TopWorkers from "@/components/features/public/TopWorkers";

const HomePage = () => {
  return (
    <section>
      <HeroSection />
      <Testimonials/>
      <FAQ/>
      <TopWorkers/>
    </section>
  );
};

export default HomePage;