import Features from "./ui/main-sections/Features";
import HeroSection from "./ui/main-sections/HeroSection";
import PageCover from "./ui/PageCover";


const Page = () => {
  return (
    <PageCover title='Пастухи Беларуси'>
      <HeroSection />
      <Features />
    </PageCover>
  );
}

export default Page;
