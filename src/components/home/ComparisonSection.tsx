import { motion } from "framer-motion";
import { User, Bot, Compass, Shield, MessageSquare, Search, Clock, TrendingUp } from "lucide-react";

const humanCapabilities = [
  { icon: Compass, label: "Strategy & intent", description: "Set direction and make key decisions" },
  { icon: Shield, label: "Approval & accountability", description: "Review and authorize all actions" },
  { icon: MessageSquare, label: "Coaching via conversation", description: "Guide AI through natural dialogue" },
];

const aiCapabilities = [
  { icon: Search, label: "Research & execution", description: "Deep analysis and task completion" },
  { icon: Clock, label: "Continuous work", description: "24/7 availability without fatigue" },
  { icon: TrendingUp, label: "Surfacing insights & risks", description: "Proactive recommendations" },
];

export function ComparisonSection() {
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
            The Best of Both Worlds
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Humans bring judgment and accountability. AI brings scale and speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Humans Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-soft"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <User className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Humans</h3>
            </div>

            <div className="space-y-6">
              {humanCapabilities.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 border border-primary/20 shadow-soft relative overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">AI Teammates</h3>
              </div>

              <div className="space-y-6">
                {aiCapabilities.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
