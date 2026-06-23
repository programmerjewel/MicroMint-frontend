
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Missions from './components/Missions';
import Security from './components/Security';
import Milestones from './components/Milestones';

export default function AboutPage() {
  return (
      <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection />
      <HowItWorks />
      <Missions />
      <Security />
      <Milestones />
      <FAQ />
    </div>
  );
}