import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { TrustSection } from "@/components/home/TrustSection";
import { AITeammatesSection } from "@/components/home/AITeammatesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WorkflowSection />
      <ComparisonSection />
      <TrustSection />
      <AITeammatesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
