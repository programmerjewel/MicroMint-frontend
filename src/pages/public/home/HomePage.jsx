
import CTA from "./components/CTA";
import DualAudienceSplitBanner from "./components/DualAudienceSplitBanner";
import HeroSection from "./components/HeroSection";
import LiveTasksSection from "./components/LiveTasksSection";
import PlatformAdvantages from "./components/PlatformAdvantages";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import TopWorkers from "./components/TopWorkers";


const HomePage = () => {
  return (
    <section>
      <HeroSection />
      <Stats />
      <LiveTasksSection />
      <DualAudienceSplitBanner />
      <PlatformAdvantages />
      <Testimonials/>
      <TopWorkers/>
      <CTA />
    </section>
    
  );
};

export default HomePage;