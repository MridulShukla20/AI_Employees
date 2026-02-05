import { motion } from "framer-motion";
import { Zap, Target, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const modes = [
    {
        title: "Velocity",
        headline: "Speed as a weapon.",
        description: "Go from partial thought to executed campaign in seconds. No drafting, no setup. Just approval.",
        icon: Zap,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20"
    },
    {
        title: "Precision",
        headline: "Zero-error tolerance.",
        description: "Execute complex research tasks with strict governance. AI that checks its own work before you see it.",
        icon: Target,
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20"
    },
    {
        title: "Scale",
        headline: "Infinite leverage.",
        description: "Spin up a 50-person research team for an afternoon project. Dissolve them when the job is done.",
        icon: BarChart3,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    }
];

export function NarrativeCases() {
    return (
        <section className="py-32 bg-[#0a0a0a] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="mb-20 pl-4 border-l-2 border-white/20">
                    <h2 className="text-4xl font-semibold text-white mb-2">Modes of Work</h2>
                    <p className="text-muted-foreground font-light">Don't hire for roles. Hire for outcomes.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {modes.map((mode, index) => {
                        const Icon = mode.icon;
                        return (
                            <motion.div
                                key={mode.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className={`group relative p-8 rounded-2xl border ${mode.border} bg-[#111] hover:bg-[#161616] transition-colors duration-500`}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`p-3 rounded-lg ${mode.bg} ${mode.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
                                        Mode 0{index + 1}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-muted-foreground/80 uppercase tracking-widest">
                                        {mode.title}
                                    </h3>
                                    <p className="text-2xl font-bold text-white leading-tight">
                                        {mode.headline}
                                    </p>
                                    <p className="text-muted-foreground font-light leading-relaxed">
                                        {mode.description}
                                    </p>
                                </div>

                                {/* Hover Interaction */}
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <span>Initialize Protocol</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
