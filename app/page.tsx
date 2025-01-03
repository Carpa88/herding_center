import Features from "./ui/main-sections/Features";
import HeroSection from "./ui/main-sections/HeroSection";
import Testimonials from "./ui/main-sections/Testimonials";
import PageCover from "./ui/PageCover";


const Page = () => {
  return (
    <PageCover title='Пастухи Беларуси'>      
      <HeroSection />
      <Features />
      <Testimonials />
    </PageCover>
  );
}

export default Page;
