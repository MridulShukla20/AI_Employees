import { motion } from "framer-motion";
import { Users, MessageSquare, ShieldCheck, BarChart3, Bot, Zap, Lock, LineChart } from "lucide-react";

const capabilities = [
    {
        title: "Execution Layer",
        subtitle: "Autonomous AI Workers",
        description: "Specialized agents that research, draft, outreach, and report. They work in parallel to scale your output.",
        icon: Bot,
        color: "bg-blue-100 text-blue-600",
        features: ["Task parallelism", "Context retention", "Multi-step reasoning"]
    },
    {
        title: "Collaboration Layer",
        subtitle: "Seamless Handoffs",
        description: "AI employees communicate with each other and your team. Work moves instantly between agents without context loss.",
        icon: MessageSquare,
        color: "bg-purple-100 text-purple-600",
        features: ["Shared workspace", "Slack/Teams sync", "Human-AI threads"]
    },
    {
        title: "Governance Layer",
        subtitle: "Human Control Plane",
        description: "You set the permissions. AI waits for approval on critical actions. Nothing gets published without your sign-off.",
        icon: ShieldCheck,
        color: "bg-green-100 text-green-600",
        features: ["Approval workflows", "Budget limits", "Action auditing"]
    },
    {
        title: "Intelligence Layer",
        subtitle: "Live Reporting",
        description: "Track every action, outcome, and ROI in real-time. See exactly what your digital workforce is accomplishing.",
        icon: LineChart,
        color: "bg-orange-100 text-orange-600",
        features: ["Performance metrics", "Cost analysis", "Outcome tracking"]
    }
];

export function CapabilitiesSection() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        A complete platform for autonomous work
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        PrimeRole isn't just a collection of chatbots. It's a vertically integrated platform designed for safe, scalable execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {capabilities.map((cap, index) => {
                        const Icon = cap.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-border/80 hover:shadow-lg transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl ${cap.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold mb-1">{cap.title}</h3>
                                <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-4">{cap.subtitle}</p>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {cap.description}
                                </p>

                                <ul className="space-y-2 border-t border-border/40 pt-4">
                                    {cap.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground/80">
                                            <div className="w-1 h-1 rounded-full bg-primary/40" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
