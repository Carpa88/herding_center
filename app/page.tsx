import AboutUs from './_ui/main-sections/AboutUs';
import ContactsSection from './_ui/main-sections/ContactsSection';
import Features from './_ui/main-sections/Features';
import HeroSection from './_ui/main-sections/HeroSection';
import PricingSection from './_ui/main-sections/PricingSection';
import Testimonials from './_ui/main-sections/Testimonials';
import VisualsSection from './_ui/main-sections/VisualsSection';
import PageCover from './_ui/PageCover';

const Page = () => (
  <PageCover title="Пастухи Беларуси">
    <HeroSection />
    <Features />
    <Testimonials />
    <AboutUs />
    <PricingSection />
    <VisualsSection />
    <ContactsSection />
  </PageCover>
);

export default Page;
