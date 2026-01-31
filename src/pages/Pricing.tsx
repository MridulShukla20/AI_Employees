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
    description: "Add AI teammates to your workspace",
    price: "$99",
    period: "per AI employee/month",
    highlight: true,
    features: [
      "Everything in Free, plus:",
      "Full AI teammate capabilities",
      "Conversational coaching",
      "Approval queue integration",
      "Weekly report cards",
      "Hard spending caps",
      "Priority support",
    ],
    cta: "Add AI Teammate",
    icon: Bot,
  },
  {
    name: "Team Bundle",
    description: "Best value for growing teams",
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
    answer: "Every action an AI teammate wants to take that affects external systems (sending emails, updating CRMs, publishing content) goes through your approval queue. You review, edit, or approve with one click.",
  },
  {
    question: "What are 'hard caps' on spending?",
    answer: "You set a maximum monthly budget for each AI employee. Once reached, the AI pauses work and notifies you. No surprise bills, ever.",
  },
  {
    question: "How do I coach AI teammates?",
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

const Pricing = () => {
  const [aiEmployees, setAiEmployees] = useState([3]);

  const calculatePrice = () => {
    const count = aiEmployees[0];
    if (count <= 2) return count * 99;
    return 249 + (count - 3) * 79; // Bundle discount for 3+
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
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-2xl p-8 border ${
                  plan.highlight
                    ? "border-primary bg-card shadow-elevated"
                    : "border-border bg-card shadow-soft"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-primary text-primary-foreground border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    plan.highlight ? "gradient-primary" : "bg-muted"
                  }`}>
                    <plan.icon className={`w-5 h-5 ${
                      plan.highlight ? "text-primary-foreground" : "text-muted-foreground"
                    }`} />
                  </div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

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

      {/* Credit Calculator */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Calculate Your Investment
              </h2>
              <p className="text-muted-foreground">
                See how much value you can unlock with AI teammates.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-medium">Number of AI Employees</label>
                  <span className="text-2xl font-bold text-primary">{aiEmployees[0]}</span>
                </div>
                <Slider
                  value={aiEmployees}
                  onValueChange={setAiEmployees}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>1 AI</span>
                  <span>10 AI</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Monthly investment</span>
                  <span className="text-3xl font-bold">${calculatePrice()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {aiEmployees[0] >= 3 && (
                    <span className="text-primary">Team Bundle discount applied!</span>
                  )}
                  {aiEmployees[0] < 3 && "Get 3+ AI employees for bundle pricing"}
                </p>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Human seats are always free. You only pay for AI employees. 
                    Set hard caps to control spending.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about pricing and billing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-soft"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
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
