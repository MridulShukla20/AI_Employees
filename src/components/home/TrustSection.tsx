import { motion } from "framer-motion";
import { ListChecks, MessageCircle, CreditCard, FileBarChart } from "lucide-react";

const trustFeatures = [
  {
    icon: ListChecks,
    title: "Approval Queue",
    description: "Every AI action flows through your approval queue. Nothing happens without human sign-off.",
  },
  {
    icon: MessageCircle,
    title: "Conversational Coaching",
    description: "Guide AI through natural conversation. No complex configuration or programming required.",
  },
  {
    icon: CreditCard,
    title: "Predictable Billing",
    description: "Set hard caps on spending. No surprise bills. Know exactly what you'll pay each month.",
  },
  {
    icon: FileBarChart,
    title: "Weekly Report Cards",
    description: "Track AI performance with clear metrics. Measure outcomes, not just activities.",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Teams Trust PrimeRole
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for enterprises that need control, transparency, and predictability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-elevated transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
