import AboutUs from "./ui/main-sections/AboutUs";
import Features from "./ui/main-sections/Features";
import HeroSection from "./ui/main-sections/HeroSection";
import PricingSection from "./ui/main-sections/PricingSection";
import Testimonials from "./ui/main-sections/Testimonials";
import PageCover from "./ui/PageCover";


const Page = () => {
  return (
    <PageCover title='Пастухи Беларуси'>      
      <HeroSection />
      <Features />
      <Testimonials />
      <AboutUs />
      <PricingSection />
    </PageCover>
  );
}

export default Page;
