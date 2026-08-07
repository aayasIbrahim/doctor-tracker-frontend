import HeroSection from "./_components/HeroSection";
import QuickSearchSection from "./_components/QuickSearchSection";
import SpecialitesSection from "./_components/SpecialitesSection";
import FeaturedDoctorSection from "./_components/FeaturedDoctorSection";
import WhyChooseUs from "./_components/WhyChooseUs";

export default function HomePage() {
  return (
    <div className="container mx-auto flex flex-col ">
      <HeroSection />

      <QuickSearchSection />

      <SpecialitesSection />

      <FeaturedDoctorSection />
      <WhyChooseUs />
    </div>
  );
}
