import { motion } from "framer-motion";
import { Target, Lightbulb, CheckSquare, Play, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Human sets intent",
    description: "Define goals, priorities, and boundaries",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Lightbulb,
    title: "AI proposes actions",
    description: "Research, draft, and suggest next steps",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: CheckSquare,
    title: "Human approves or edits",
    description: "Review, refine, and authorize work",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Play,
    title: "AI executes",
    description: "Complete tasks with full transparency",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "Results measured",
    description: "Weekly report cards track outcomes",
    color: "bg-accent text-accent-foreground",
  },
];

export function WorkflowSection() {
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
            How Collaboration Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A continuous loop where humans stay in control and AI amplifies your team's capabilities.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon container */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-4 shadow-soft relative z-10 bg-background`}>
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 text-border">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>
                )}

                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
