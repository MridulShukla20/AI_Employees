import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Megaphone, UserPlus, ArrowRight, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const departments = [
  {
    icon: TrendingUp,
    title: "Sales & RevOps",
    description: "AI employees that enrich data, coach reps, and manage outreach—with human approval at every step.",
    autonomous: ["Data enrichment & CRM hygiene", "Call analysis & coaching", "Email drafting & lead scoring"],
    needsApproval: ["Sending outreach", "Forecast changes", "Training assignments"],
    metric: "2.3x pipeline generated",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "AI employees that manage social, run email campaigns, and create content for your review.",
    autonomous: ["Social post creation", "Email campaign design", "Content drafting & SEO"],
    needsApproval: ["Publishing content", "Sending campaigns", "Brand messaging"],
    metric: "40% faster content production",
  },
  {
    icon: UserPlus,
    title: "Recruitment",
    description: "AI employees that source candidates, conduct screens, and coordinate interviews—you retain all hiring decisions.",
    autonomous: ["Candidate sourcing", "Initial screening", "Interview scheduling"],
    needsApproval: ["Outreach messages", "Advancing candidates", "Rejection decisions"],
    metric: "60% reduction in time-to-hire",
  },
];

export function AITeammatesSection() {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const toggleCard = (title: string) => {
    setExpandedCards(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Your AI Employees
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Role-based AI specialists that work inside your workflows, not outside them.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {departments.map((dept, index) => {
            const isExpanded = expandedCards.includes(dept.title);
            return (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-soft hover-card hover:border-primary/20 group cursor-pointer"
                onClick={() => toggleCard(dept.title)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:shadow-glow transition-shadow">
                    <dept.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{dept.title}</h3>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{dept.description}</p>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="space-y-4 mb-4 pt-4 border-t border-border">
                    {/* What AI does autonomously */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium mb-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Works autonomously</span>
                      </div>
                      <ul className="space-y-1.5 pl-6">
                        {dept.autonomous.map((item) => (
                          <li key={item} className="text-sm text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What needs approval */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <span>Requires approval</span>
                      </div>
                      <ul className="space-y-1.5 pl-6">
                        {dept.needsApproval.map((item) => (
                          <li key={item} className="text-sm text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <p className="text-sm">
                    <span className="font-semibold text-primary">{dept.metric}</span>
                    <span className="text-muted-foreground"> on average</span>
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(dept.title);
                    }}
                  >
                    {isExpanded ? "Show less" : "Learn more"}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/marketplace">
            <Button variant="outline" size="lg" className="group">
              Explore All AI Employees
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
