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
  Calendar
} from "lucide-react";

interface AIEmployee {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  description: string;
  autonomous: string[];
  needsApproval: string[];
  metric: string;
}

const salesEmployees: AIEmployee[] = [
  {
    id: "data-revops-specialist",
    name: "Data & RevOps Specialist",
    role: "Sales Intelligence",
    icon: Search,
    description: "Researches and enriches leads with company data, technographics, and buying signals.",
    autonomous: ["Company research", "Contact enrichment", "Intent signal tracking"],
    needsApproval: ["Adding to sequences", "Priority scoring changes"],
    metric: "85% data accuracy",
  },
  {
    id: "outreach-specialist",
    name: "Outreach Specialist",
    role: "Sales Copywriting",
    icon: Mail,
    description: "Crafts personalized email sequences and follow-ups based on prospect research.",
    autonomous: ["Email drafting", "A/B variant creation", "Personalization"],
    needsApproval: ["Sending emails", "Template changes"],
    metric: "3x reply rates",
  },
  {
    id: "crm-data-operations-specialist",
    name: "CRM & Data Operations Specialist",
    role: "Data Operations",
    icon: Database,
    description: "Keeps your CRM clean, updated, and synced across all connected tools.",
    autonomous: ["Data deduplication", "Field updates", "Activity logging"],
    needsApproval: ["Merging records", "Deleting contacts"],
    metric: "99% data hygiene",
  },
];

const marketingEmployees: AIEmployee[] = [
  {
    id: "content-marketing-specialist",
    name: "Content Marketing Specialist",
    role: "Content Production",
    icon: PenTool,
    description: "Writes blog posts, social content, and marketing copy aligned with your brand voice.",
    autonomous: ["Draft creation", "SEO optimization", "Content research"],
    needsApproval: ["Publishing", "Brand voice changes"],
    metric: "40% faster production",
  },
  {
    id: "marketing-performance-analyst",
    name: "Marketing Performance Analyst",
    role: "Performance Analytics",
    icon: BarChart3,
    description: "Monitors campaign performance and surfaces optimization opportunities.",
    autonomous: ["Data collection", "Report generation", "Trend analysis"],
    needsApproval: ["Budget reallocation", "Campaign pausing"],
    metric: "25% ROAS improvement",
  },
  {
    id: "market-intelligence-specialist",
    name: "Market Intelligence Specialist",
    role: "Market Intelligence",
    icon: Eye,
    description: "Tracks competitor activities, pricing changes, and market movements.",
    autonomous: ["Website monitoring", "Social listening", "Alert creation"],
    needsApproval: ["Strategy recommendations"],
    metric: "Real-time insights",
  },
];

const recruitmentEmployees: AIEmployee[] = [
  {
    id: "talent-sourcing-specialist",
    name: "Talent Sourcing Specialist",
    role: "Candidate Discovery",
    icon: Users,
    description: "Finds and qualifies candidates from job boards, LinkedIn, and your talent pool.",
    autonomous: ["Profile sourcing", "Initial screening", "Talent mapping"],
    needsApproval: ["Outreach messages", "Adding to pipeline"],
    metric: "5x candidate volume",
  },
  {
    id: "screening-specialist",
    name: "Screening Specialist",
    role: "Application Review",
    icon: FileText,
    description: "Reviews applications against job requirements and ranks candidates by fit.",
    autonomous: ["Resume parsing", "Skill matching", "Ranking updates"],
    needsApproval: ["Moving to interview", "Rejection decisions"],
    metric: "80% time saved",
  },
  {
    id: "interview-coordination-specialist",
    name: "Interview Coordination Specialist",
    role: "Coordination",
    icon: Calendar,
    description: "Coordinates interview schedules across candidates and hiring managers.",
    autonomous: ["Availability checking", "Calendar management", "Reminder sending"],
    needsApproval: ["Final scheduling", "Rescheduling"],
    metric: "Zero scheduling conflicts",
  },
];

const departmentData = {
  sales: { employees: salesEmployees, icon: TrendingUp, label: "Sales & RevOps" },
  marketing: { employees: marketingEmployees, icon: Megaphone, label: "Marketing" },
  recruitment: { employees: recruitmentEmployees, icon: UserPlus, label: "Recruitment" },
};

function EmployeeCard({ employee }: { employee: AIEmployee }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-elevated transition-all hover:border-primary/20 group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:shadow-glow transition-shadow shrink-0">
          <employee.icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.role}</p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-6">{employee.description}</p>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Works autonomously</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {employee.autonomous.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Shield className="w-4 h-4 text-secondary-foreground" />
            <span>Requires approval</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {employee.needsApproval.map((item) => (
              <Badge key={item} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between">
        <p className="text-sm">
          <span className="font-semibold text-primary">{employee.metric}</span>
        </p>
        <Button size="sm" variant="ghost" className="text-primary">
          Learn more
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
      <section className="py-24 relative overflow-hidden">
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
              <span className="text-gradient">Inside Human Workflows</span>
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
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Coached through conversation</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>Human approval required</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileBarChart className="w-4 h-4 text-primary" />
              <span>Weekly report cards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Employees Grid */}
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
                  {data.employees.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
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
              Ready to meet your new AI employees?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start with a free workspace. Add AI employees when you're ready.
            </p>
            <Button size="lg" className="shadow-elevated hover:shadow-glow transition-shadow">
              Create Free Workspace
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Marketplace;
