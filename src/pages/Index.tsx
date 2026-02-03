import { NewLayout } from "@/components/layout/NewLayout";
import { NewHeroSection } from "@/components/home/NewHeroSection";
import { NewHowItWorksSection } from "@/components/home/NewHowItWorksSection";
import { NewAIRosterSection } from "@/components/home/NewAIRosterSection";
import { NewApprovalSection } from "@/components/home/NewApprovalSection";
import { NewPricingSection } from "@/components/home/NewPricingSection";
import { NewTestimonialsSection } from "@/components/home/NewTestimonialsSection";
import { NewFinalCTASection } from "@/components/home/NewFinalCTASection";

const Index = () => {
  return (
    <NewLayout>
      <NewHeroSection />
      <NewHowItWorksSection />
      <NewAIRosterSection />
      <NewApprovalSection />
      <NewPricingSection />
      <NewTestimonialsSection />
      <NewFinalCTASection />
    </NewLayout>
  );
};

export default Index;
