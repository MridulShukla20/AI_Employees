import { HeroSectionV3 } from "@/components/home/HeroSectionV3";

import { DepartmentCapabilitiesSection } from "@/components/home/DepartmentCapabilitiesSection";
import { MobileFirstSection } from "@/components/home/MobileFirstSection";
import { AIRosterSection } from "@/components/home/AIRosterSection";
import { PricingSectionV3 } from "@/components/home/PricingSectionV3";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { FooterV3 } from "@/components/home/FooterV3";
import { HeaderV3 } from "@/components/home/HeaderV3";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderV3 />
      <main>
        <HeroSectionV3 />

        <DepartmentCapabilitiesSection />
        <AIRosterSection />
        <MobileFirstSection />
        <PricingSectionV3 />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      <FooterV3 />
    </div>
  );
};

export default Index;
