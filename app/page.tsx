import AboutUs from "./ui/main-sections/AboutUs";
import ContactsSection from "./ui/main-sections/ContactsSection";
import Features from "./ui/main-sections/Features";
import HeroSection from "./ui/main-sections/HeroSection";
import PricingSection from "./ui/main-sections/PricingSection";
import Testimonials from "./ui/main-sections/Testimonials";
import VisualsSection from "./ui/main-sections/VisualsSection";
import PageCover from "./ui/PageCover";


const Page = () => {
  return (
    <PageCover title='Пастухи Беларуси'>
      <HeroSection />
      <Features />
      <Testimonials />
      <AboutUs />
      <PricingSection />
      <VisualsSection />
      <ContactsSection />
    </PageCover>
  );
}

export default Page;
