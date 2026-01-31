import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Megaphone,
  UserPlus,
  CheckCircle,
  Shield,
  MessageSquare,
  FileBarChart,
  Search,
  Mail,
  Database,
  PenTool,
  BarChart3,
  Eye,
  Users,
  FileText,
  Calendar,
  Headphones,
  Share2,
  AtSign
} from "lucide-react";

interface AITeammate {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  valueSentence: string;
  autonomous: string[];
  needsApproval: string[];
  metric: string;
}

const salesTeammates: AITeammate[] = [
  {
    id: "data-revops-specialist",
    name: "Data & RevOps Specialist",
    role: "Sales Data & Operations",
    icon: Database,
    valueSentence: "Keeps your CRM accurate and insights flowing.",
    autonomous: ["Contact enrichment", "CRM hygiene", "Revenue insights"],
    needsApproval: ["Data deletions", "Forecast adjustments"],
    metric: "99% data accuracy",
  },
  {
    id: "sales-coach",
    name: "Sales Coach",
    role: "Performance & Training",
    icon: Headphones,
    valueSentence: "Turns every call into a coaching opportunity.",
    autonomous: ["Call analysis", "Coaching suggestions", "Skill tracking"],
    needsApproval: ["Training assignments", "Performance reviews"],
    metric: "23% quota improvement",
  },
  {
    id: "outreach-specialist",
    name: "Outreach Specialist",
    role: "Prospecting & Engagement",
    icon: Mail,
    valueSentence: "Drafts personalized outreach that gets replies.",
    autonomous: ["Email drafting", "Lead scoring", "Sequence management"],
    needsApproval: ["Sending messages", "Template changes"],
    metric: "3x reply rates",
  },
];

const marketingTeammates: AITeammate[] = [
  {
    id: "social-media-manager",
    name: "Social Media Manager",
    role: "Social Presence & Engagement",
    icon: Share2,
    valueSentence: "Keeps your social presence active and engaging.",
    autonomous: ["Post creation", "Engagement monitoring", "Trend analysis"],
    needsApproval: ["Publishing posts", "Brand messaging"],
    metric: "2x engagement rate",
  },
  {
    id: "email-campaign-manager",
    name: "Email Campaign Manager",
    role: "Email Marketing",
    icon: AtSign,
    valueSentence: "Designs campaigns that reach the right people.",
    autonomous: ["Campaign design", "Audience segmentation", "Performance analysis"],
    needsApproval: ["Sending campaigns", "List changes"],
    metric: "35% open rate improvement",
  },
  {
    id: "content-writer",
    name: "Content Writer",
    role: "Content Creation",
    icon: PenTool,
    valueSentence: "Creates SEO-optimized content in your brand voice.",
    autonomous: ["Content drafting", "SEO optimization", "Brand consistency"],
    needsApproval: ["Publishing", "Topic selection"],
    metric: "40% faster production",
  },
];

const recruitmentTeammates: AITeammate[] = [
  {
    id: "talent-sourcing-specialist",
    name: "Talent Sourcing Specialist",
    role: "Candidate Discovery",
    icon: Users,
    valueSentence: "Finds qualified candidates before you ask.",
    autonomous: ["Candidate sourcing", "Fit scoring", "Profile enrichment"],
    needsApproval: ["Outreach messages", "Adding to pipeline"],
    metric: "5x candidate volume",
  },
  {
    id: "screening-specialist",
    name: "Screening Specialist",
    role: "Initial Assessment",
    icon: FileText,
    valueSentence: "Handles first screens so you focus on finals.",
    autonomous: ["Initial screens", "Response evaluation", "Interview scheduling"],
    needsApproval: ["Advancing candidates", "Rejection decisions"],
    metric: "80% time saved",
  },
];

const departmentData = {
  sales: { teammates: salesTeammates, icon: TrendingUp, label: "Sales & RevOps" },
  marketing: { teammates: marketingTeammates, icon: Megaphone, label: "Marketing" },
  recruitment: { teammates: recruitmentTeammates, icon: UserPlus, label: "Recruitment" },
};

function TeammateCard({ teammate }: { teammate: AITeammate }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-soft hover-card hover:border-primary/20 group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-3">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:shadow-glow transition-shadow shrink-0">
          <teammate.icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{teammate.name}</h3>
          <p className="text-sm text-muted-foreground">{teammate.role}</p>
        </div>
      </div>

      {/* Value sentence */}
      <p className="text-sm text-muted-foreground mb-4">{teammate.valueSentence}</p>

      {/* Capability chips (collapsed view) */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {teammate.autonomous.map((item) => (
          <Badge key={item} variant="secondary" className="text-xs">
            {item}
          </Badge>
        ))}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="space-y-4 mb-4 pt-4 border-t border-border">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Works autonomously</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {teammate.autonomous.map((item) => (
                <Badge key={item} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span>Requires approval</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {teammate.needsApproval.map((item) => (
                <Badge key={item} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <p className="text-sm">
          <span className="font-semibold text-primary">{teammate.metric}</span>
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="text-primary text-xs"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Learn more"}
        </Button>
      </div>
    </motion.div>
  );
}

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI Employees That Work{" "}
              <span className="text-gradient">Within Your Approval Workflows</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Role-based AI specialists coached through conversation. They operate inside approval queues and come with weekly report cards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features bar */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground hover-pill rounded-full px-3 py-1 -mx-3 -my-1 cursor-default">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Coached through conversation</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover-pill rounded-full px-3 py-1 -mx-3 -my-1 cursor-default">
              <Shield className="w-4 h-4 text-primary" />
              <span>Human approval required</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover-pill rounded-full px-3 py-1 -mx-3 -my-1 cursor-default">
              <FileBarChart className="w-4 h-4 text-primary" />
              <span>Weekly report cards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Teammates Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              {Object.entries(departmentData).map(([key, data]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <data.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{data.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(departmentData).map(([key, data]) => (
              <TabsContent key={key} value={key}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.teammates.map((teammate) => (
                    <TeammateCard key={teammate.id} teammate={teammate} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to hire your first AI employee?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start with a free workspace. Add AI employees when you're ready.
            </p>
            <Button size="lg" className="shadow-elevated hover:shadow-glow transition-shadow animate-pulse-once">
              Create Free Workspace
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Marketplace;
