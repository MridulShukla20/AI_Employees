import { motion } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";

const comparisons = [
    {
        today: "Sales reps manually update CRM after every call",
        withAI: "CRM is updated automatically after each conversation",
    },
    {
        today: "Marketing tools operate in silos. Data doesn't sync",
        withAI: "One AI works across email, social, and content tools",
    },
    {
        today: "Managers discover pipeline issues after numbers drop",
        withAI: "Risks are flagged and surfaced before they become problems",
    },
    {
        today: "Recruiters manually screen hundreds of resumes",
        withAI: "AI screens and scores candidates instantly",
    },
    {
        today: "Outreach is generic. Personalization takes too long",
        withAI: "Every email is personalized based on real data",
    },
];

export function DifferentiationSection() {
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
                        How Work Happens Today vs With AI Employees
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        See the difference in real workflows, not abstract promises.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {/* Column headers */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                                Today
                            </span>
                        </div>
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                With AI Employees
                            </span>
                        </div>
                    </div>

                    {/* Comparison rows */}
                    <div className="space-y-4">
                        {comparisons.map((row, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {/* Today */}
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <X className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{row.today}</p>
                                </div>

                                {/* With AI */}
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-primary/20 shadow-soft">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed">{row.withAI}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary arrow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex justify-center mt-10"
                    >
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Manual, fragmented work</span>
                            <ArrowRight className="w-4 h-4 text-primary" />
                            <span className="font-medium text-foreground">Automated, connected work</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
