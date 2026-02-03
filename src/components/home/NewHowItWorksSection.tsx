import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ListChecks, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Talk to Your AI Team",
    description: "Chat naturally with AI employees. No complex setup. Just tell them what you need.",
    color: "from-purple-500 to-purple-600",
    preview: {
      type: "chat",
      content: [
        { role: "user", text: "Can you draft an outreach email for tech startups?" },
        { role: "ai", text: "I'll draft a personalized email. What's the key value proposition you want to highlight?" },
      ]
    }
  },
  {
    number: "02",
    icon: ListChecks,
    title: "Review Their Work",
    description: "Every action goes to your approval queue. You see what they'll do before it happens.",
    color: "from-amber-500 to-amber-600",
    preview: {
      type: "queue",
      items: [
        { status: "pending", action: "Outreach Email", ai: "Maya" },
        { status: "approved", action: "CRM Update", ai: "Mira" },
      ]
    }
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Track Their Impact",
    description: "See measurable outcomes on each AI employee's report card. ROI you can prove.",
    color: "from-emerald-500 to-emerald-600",
    preview: {
      type: "metrics",
      stats: [
        { label: "Reply Rate", value: "32%", change: "+12%" },
        { label: "Meetings", value: "18", change: "+8" },
      ]
    }
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      {/* Connecting line (hidden on mobile, visible on desktop) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-16 left-1/2 w-full h-[2px]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
            className="h-full bg-gradient-to-r from-border via-primary/30 to-border origin-left"
            style={{ transformOrigin: "left" }}
          />
        </div>
      )}

      {/* Step number (background) */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-display font-bold text-muted/30 select-none">
        {step.number}
      </div>

      {/* Icon container */}
      <motion.div
        className={`relative z-10 w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-8`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
        <step.icon className="w-12 h-12 text-white relative z-10" />
      </motion.div>

      {/* Content card */}
      <div className="bg-white rounded-3xl p-8 shadow-elevated border border-border/50 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-shadow duration-300">
        <h3 className="font-display text-2xl font-bold text-foreground mb-3 text-center">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-center leading-relaxed">
          {step.description}
        </p>

        {/* Preview mockup (appears on hover) */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          className="mt-6 overflow-hidden"
        >
          {step.preview.type === "chat" && (
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              {step.preview.content?.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-white border border-border" 
                      : "bg-purple-100 text-purple-900"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
          {step.preview.type === "queue" && (
            <div className="bg-muted/50 rounded-xl p-4 space-y-2">
              {step.preview.items?.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-lg px-4 py-2 border border-border">
                  <span className="text-sm font-medium">{item.action}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === "pending" 
                      ? "bg-amber-100 text-amber-700" 
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
          {step.preview.type === "metrics" && (
            <div className="bg-muted/50 rounded-xl p-4 grid grid-cols-2 gap-3">
              {step.preview.stats?.map((stat, i) => (
                <div key={i} className="bg-white rounded-lg px-4 py-3 border border-border text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-emerald-600 font-medium">{stat.change}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export function NewHowItWorksSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-32 gradient-subtle relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Work Together, Not in Sequence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI employees join your workspace. You chat, they work, you approve.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border-2 border-transparent animate-glow-pulse">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 -z-10 blur-sm opacity-50" />
            <div className="absolute inset-[2px] rounded-full bg-white" />
            <span className="relative text-base font-semibold text-foreground">
              Free for humans. Pay only for AI employees you hire.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
