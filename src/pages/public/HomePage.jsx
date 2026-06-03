import FAQ from "@/components/features/public/FAQ";
import Testimonials from "@/components/features/public/Testimonials";
import TopWorkers from "@/components/features/public/TopWorkers";

const HomePage = () => {
  return (
    <section>
      <Testimonials/>
      <FAQ/>
      <TopWorkers/>
    </section>
  );
};

export default HomePage;