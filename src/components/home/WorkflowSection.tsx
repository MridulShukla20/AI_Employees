import { motion } from "framer-motion";
import { Target, Zap, CheckCircle, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Target,
    number: "01",
    title: "You set the goal",
    description: "Define what you need done: research a list, draft emails, screen candidates.",
  },
  {
    icon: Zap,
    number: "02",
    title: "AI gets to work",
    description: "Your AI employee researches, drafts, and executes. All in the background.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "You review & approve",
    description: "Nothing goes out without your sign-off. You stay in complete control.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Results delivered",
    description: "Track outcomes with weekly reports. Know exactly what your AI achieved.",
  },
];

export function WorkflowSection() {
  return (
    <section className="py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Collaboration Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            You decide. AI executes. Every action is visible and approved.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Step card */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-soft text-center lg:text-left">
                  {/* Number badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-primary text-white font-bold text-sm mb-4 relative z-10">
                    {step.number}
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
