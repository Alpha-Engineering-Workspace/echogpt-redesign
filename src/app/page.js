import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/features/landing/HeroSection";
import MetricsStrip from "@/features/landing/MetricsStrip";
import ProductPreview from "@/features/landing/ProductPreview";
import FeatureSplit from "@/features/landing/FeatureSplit";
import FeatureSplitReverse from "@/features/landing/FeatureSplitReverse";
import WorkflowSection from "@/features/landing/WorkflowSection";
import CapabilityBento from "@/features/landing/CapabilityBento";
import PricingSection from "@/features/landing/PricingSection";
import FaqSection from "@/features/landing/FaqSection";
import CtaSection from "@/features/landing/CtaSection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="landing-gradient">
        <HeroSection />
        <MetricsStrip />
        <ProductPreview />
        <FeatureSplit />
        <FeatureSplitReverse />
        <WorkflowSection />
        <CapabilityBento />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
