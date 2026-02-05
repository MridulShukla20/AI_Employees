import { motion } from "framer-motion";
import {
    Database,
    Mail,
    Calendar,
    MessageSquare,
    FileText,
    Share2
} from "lucide-react";

const tools = [
    { name: "CRM", icon: Database, position: "top" },
    { name: "Email", icon: Mail, position: "top-right" },
    { name: "Slack", icon: MessageSquare, position: "right" },
    { name: "Docs", icon: FileText, position: "bottom-right" },
    { name: "Calendar", icon: Calendar, position: "bottom" },
    { name: "Social", icon: Share2, position: "bottom-left" },
];

export function IntegrationsSection() {
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
                        Hire AI Employees for Your Existing Tools
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        No migration. No retraining. AI employees work inside your current stack.
                    </p>
                </motion.div>

                {/* Hub and Spoke Visual */}
                <div className="relative max-w-lg mx-auto aspect-square">
                    {/* Center Hub - Primerole */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl gradient-primary flex items-center justify-center shadow-glow">
                            <div className="text-center">
                                <span className="text-2xl md:text-3xl font-bold text-white">PR</span>
                                <p className="text-xs text-white/80 mt-1 hidden md:block">Primerole</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                            <motion.line
                                key={i}
                                x1="200"
                                y1="200"
                                x2={200 + 140 * Math.cos((angle - 90) * Math.PI / 180)}
                                y2={200 + 140 * Math.sin((angle - 90) * Math.PI / 180)}
                                stroke="hsl(var(--border))"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                            />
                        ))}
                    </svg>

                    {/* Tool nodes */}
                    {tools.map((tool, index) => {
                        const angle = index * 60 - 90;
                        const radius = 140;
                        const x = 50 + 35 * Math.cos(angle * Math.PI / 180);
                        const y = 50 + 35 * Math.sin(angle * Math.PI / 180);

                        return (
                            <motion.div
                                key={tool.name}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + index * 0.1, duration: 0.4, type: "spring" }}
                                className="absolute -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${x}%`, top: `${y}%` }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card border border-border shadow-soft flex items-center justify-center hover:shadow-elevated hover:border-primary/30 transition-all">
                                        <tool.icon className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground" />
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">{tool.name}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
