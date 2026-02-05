import { Layout } from "@/components/layout/Layout";
import { PricingSectionV3 } from "@/components/home/PricingSectionV3";
import { ROICalculator } from "@/components/pricing/ROICalculator";
import { PricingComparisonTable } from "@/components/pricing/PricingComparisonTable";
import { FinalCTASection } from "@/components/home/FinalCTASection";

const Pricing = () => {
  return (
    <Layout>
      {/* 1. Hero + Cards (reused from Homepage, now contains only cards) */}
      <PricingSectionV3 />

      {/* 2. ROI Calculator (Moved from Homepage) */}
      <ROICalculator />

      {/* 3. Comparison Table (Moved from Homepage) */}
      <PricingComparisonTable />

      {/* 4. Final CTA (Same as Homepage) */}
      <FinalCTASection />
    </Layout>
  );
};

export default Pricing;
