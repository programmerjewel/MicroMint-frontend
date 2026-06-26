import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";


function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

const MainLayout = () => {
   return (
    <ReactLenis root>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
       <main className="flex-1">
         <Outlet />
        </main>
        <Footer />
       </div>
     </ReactLenis>
   );
  
};

export default MainLayout;