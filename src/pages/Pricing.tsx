import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Users, Bot, Zap, Shield, HelpCircle } from "lucide-react";

const plans = [
  {
    name: "Free Workspace",
    description: "For teams exploring human + AI collaboration",
    price: "$0",
    period: "forever",
    highlight: false,
    features: [
      "Unlimited human seats",
      "Basic collaboration tools",
      "Community support",
      "1 approval queue",
      "Weekly summaries",
    ],
    cta: "Get Started Free",
    icon: Users,
  },
  {
    name: "AI Employee",
    description: "For teams replacing manual work with AI employees",
    price: "$99",
    period: "per AI employee/month",
    highlight: true,
    features: [
      "Everything in Free, plus:",
      "Full AI employee capabilities",
      "Conversational coaching",
      "Approval queue integration",
      "Weekly report cards",
      "Hard spending caps",
      "Priority support",
    ],
    cta: "Add AI Employee",
    icon: Bot,
  },
  {
    name: "Team Bundle",
    description: "For teams scaling AI across functions",
    price: "$249",
    period: "per month",
    highlight: false,
    features: [
      "Everything in AI Employee, plus:",
      "3 AI employees included",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated success manager",
      "SSO & SAML",
      "99.9% SLA",
    ],
    cta: "Contact Sales",
    icon: Zap,
  },
];

const faqs = [
  {
    question: "What counts as a 'human seat'?",
    answer: "Any person who logs into your PrimeRole workspace. Human seats are always free, with no limits on how many team members you can invite.",
  },
  {
    question: "How does the approval queue work?",
    answer: "Every action an AI employee wants to take that affects external systems (sending emails, updating CRMs, publishing content) goes through your approval queue. You review, edit, or approve with one click.",
  },
  {
    question: "What are 'hard caps' on spending?",
    answer: "You set a maximum monthly budget for each AI employee. Once reached, the AI pauses work and notifies you. No surprise bills, ever.",
  },
  {
    question: "How do I coach AI employees?",
    answer: "Through natural conversation. Tell them what you want, give feedback on their work, and they learn your preferences over time. No coding or configuration required.",
  },
  {
    question: "Can I try an AI employee before committing?",
    answer: "Yes! Every new workspace gets a 14-day trial of one AI employee. Experience the full collaboration before deciding.",
  },
  {
    question: "What's included in weekly report cards?",
    answer: "A summary of what each AI employee accomplished, actions taken, approvals requested, and key metrics. Think of it as a weekly 1:1, but with data.",
  },
];

const workloadItems = [
  { id: "lead-enrichment", label: "Lead enrichment & research", credits: 150 },
  { id: "outreach-drafting", label: "Outreach drafting & personalization", credits: 200 },
  { id: "call-analysis", label: "Call analysis & coaching insights", credits: 150 },
  { id: "content-creation", label: "Content creation & optimization", credits: 200 },
];

const CREDITS_PER_EMPLOYEE = 1000;
const PRICE_PER_EMPLOYEE = 99;

const Pricing = () => {
  const [selectedWorkloads, setSelectedWorkloads] = useState<string[]>(
    workloadItems.map(item => item.id) // All selected by default
  );
  const [manualOverride, setManualOverride] = useState<number | null>(null);

  const totalCredits = workloadItems
    .filter(item => selectedWorkloads.includes(item.id))
    .reduce((sum, item) => sum + item.credits, 0);

  const calculatedEmployees = Math.max(1, Math.ceil(totalCredits / CREDITS_PER_EMPLOYEE));
  const aiEmployeesRequired = manualOverride !== null
    ? Math.max(calculatedEmployees, manualOverride)
    : calculatedEmployees;

  const monthlyPrice = aiEmployeesRequired * PRICE_PER_EMPLOYEE;
  const creditsIncluded = aiEmployeesRequired * CREDITS_PER_EMPLOYEE;

  const toggleWorkload = (id: string) => {
    setSelectedWorkloads(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    setManualOverride(null); // Reset override when workload changes
  };

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
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              <Shield className="w-3.5 h-3.5 mr-2" />
              Predictable pricing, no surprises
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Pricing That{" "}
              <span className="text-gradient">Won't Surprise You</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlimited human seats are free. AI employees are paid, not people. Hard caps prevent overages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              Choose how your team collaborates with AI
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-2xl p-8 border transition-all duration-200 ${plan.highlight
                  ? "border-primary border-2 bg-card shadow-[0_8px_24px_rgba(147,51,234,0.15)] hover:shadow-[0_12px_32px_rgba(147,51,234,0.25)] hover:-translate-y-1"
                  : "border-border bg-card shadow-soft opacity-[0.98] hover:opacity-100 hover-card"
                  }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-primary text-primary-foreground border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${plan.highlight ? "gradient-primary" : "bg-muted"
                    }`}>
                    <plan.icon className={`w-5 h-5 ${plan.highlight ? "text-primary-foreground" : "text-muted-foreground"
                      }`} />
                  </div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-6 pl-[52px]">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">{plan.period}</span>
                </div>

                <Button
                  className={`w-full mb-6 ${plan.highlight ? "shadow-glow" : ""}`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Principles */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-center mb-8">Why PrimeRole pricing works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 p-3 rounded-lg hover-card cursor-default">
                <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Humans are always free</p>
                  <p className="text-xs text-muted-foreground">Invite your entire team at no cost</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover-card cursor-default">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Hard caps prevent surprise bills</p>
                  <p className="text-xs text-muted-foreground">AI pauses when limits are reached</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover-card cursor-default">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Weekly report cards show outcomes</p>
                  <p className="text-xs text-muted-foreground">See what AI accomplished, not usage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Planner */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Capacity Planner <span className="text-muted-foreground/60 font-normal">(Optional)</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Most teams start with one AI Employee. This helps validate capacity if you're unsure.
              </p>
            </div>

            <div className="bg-card/50 rounded-xl p-6 border border-border/50 space-y-5">
              {/* Section 1: What Your AI Employees Will Do */}
              <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-4">What Your AI Employees Will Do</h3>
                <div className="space-y-3">
                  {workloadItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleWorkload(item.id)}
                      className="w-full flex items-center justify-between py-2 text-left hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedWorkloads.includes(item.id)
                          ? "border-primary bg-primary/10"
                          : "border-muted-foreground/30 bg-transparent"
                          }`}>
                          {selectedWorkloads.includes(item.id) && (
                            <Check className="w-3 h-3 text-primary" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">≈ {item.credits} credits/month</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  This helps estimate whether your work fits within one AI Employee's monthly capacity.
                </p>
              </div>

              {/* Section 2: AI Employees Required */}
              <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">AI Employees Required</h3>
                  <span className="text-2xl font-bold text-primary">{aiEmployeesRequired}</span>
                </div>
                <Slider
                  value={[manualOverride ?? calculatedEmployees]}
                  onValueChange={(value) => setManualOverride(value[0])}
                  max={10}
                  min={calculatedEmployees}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{calculatedEmployees}</span>
                  <span>10</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Most teams start with 1–2 AI Employees per function.
                </p>
              </div>

              {/* Section 3: Predictable Monthly Cost */}
              <div className="bg-muted/50 rounded-xl p-6 border border-border border-l-4 border-l-primary">
                <h3 className="font-semibold mb-4">Predictable Monthly Cost</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI Employees</span>
                    <span className="font-semibold tabular-nums">{aiEmployeesRequired} {aiEmployeesRequired === 1 ? 'employee' : 'employees'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Credits included</span>
                    <span className="font-semibold tabular-nums">{creditsIncluded.toLocaleString()} credits/month</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">Monthly price</span>
                    <span className="text-3xl font-bold text-primary tabular-nums">${monthlyPrice}</span>
                  </div>
                </div>
              </div>

              {/* Reassurance note */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Human seats are always free. AI Employees pause automatically when hard caps are reached.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to know about pricing and billing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card border border-border rounded-xl px-5 data-[state=open]:shadow-soft hover:bg-muted/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-3 text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-3 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
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
              Start collaborating today
            </h2>
            <p className="text-muted-foreground mb-8">
              Create your free workspace with unlimited human seats. Add AI when you're ready.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="shadow-elevated hover:shadow-glow transition-shadow">
                Create Free Workspace
              </Button>
              <Button size="lg" variant="outline">
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
