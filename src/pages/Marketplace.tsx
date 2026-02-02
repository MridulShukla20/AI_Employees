import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Megaphone, UserPlus, MessageSquare, Shield, FileBarChart } from "lucide-react";
import { employees } from "@/data/employees";
import { TeammateCard } from "@/components/marketplace/TeammateCard";

const departmentData = {
  sales: { 
    employees: employees.filter(e => e.department === "sales"),
    icon: TrendingUp, 
    label: "Sales & RevOps" 
  },
  marketing: { 
    employees: employees.filter(e => e.department === "marketing"),
    icon: Megaphone, 
    label: "Marketing" 
  },
  recruitment: { 
    employees: employees.filter(e => e.department === "recruitment"),
    icon: UserPlus, 
    label: "Recruitment" 
  },
};

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
                    <TeammateCard key={employee.id} employee={employee} />
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
