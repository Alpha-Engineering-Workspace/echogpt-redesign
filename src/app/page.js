import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/features/landing/HeroSection";
import ProductPreview from "@/features/landing/ProductPreview";
import FeaturesSection from "@/features/landing/FeaturesSection";
import ModelsSection from "@/features/landing/ModelsSection";
import ExtensionSection from "@/features/landing/ExtensionSection";
import WhyChooseSection from "@/features/landing/WhyChooseSection";
import PricingSection from "@/features/landing/PricingSection";
import FaqSection from "@/features/landing/FaqSection";
import CtaSection from "@/features/landing/CtaSection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <ProductPreview />
        <FeaturesSection />
        <ModelsSection />
        <ExtensionSection />
        <WhyChooseSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}