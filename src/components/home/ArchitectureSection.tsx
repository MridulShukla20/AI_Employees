import { motion } from "framer-motion";
import { User, Cpu, Globe, Lock, GitBranch } from "lucide-react";

export function ArchitectureSection() {
    return (
        <section className="py-32 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">
                        System Architecture
                    </h2>
                    <p className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
                        The Control Plane
                    </p>
                </div>

                {/* The Diagram */}
                <div className="relative max-w-4xl mx-auto flex flex-col items-center">

                    {/* Level 1: Intent (Human) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center z-20"
                    >
                        <div className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            You (Architect)
                        </div>
                        <div className="h-16 w-px bg-gradient-to-b from-white to-purple-500/50 my-2" />
                    </motion.div>

                    {/* Connection Lines */}
                    <div className="absolute top-[80px] w-[60%] h-[100px] border-t border-x border-purple-500/20 rounded-t-3xl rounded-b-none pointer-events-none" />

                    {/* Level 2: The Protocol (PrimeRole) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl p-8 my-4 relative z-10 shadow-2xl"
                    >
                        {/* Glowing Core */}
                        <div className="absolute inset-0 bg-purple-900/10 blur-xl rounded-2xl" />

                        <div className="relative flex justify-between items-center z-10">
                            {/* Protocol Node 1 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-purple-400" />
                                </div>
                                <span className="text-xs font-mono text-muted-foreground">Governance</span>
                            </div>

                            {/* Center Node */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center animate-pulse-slow">
                                    <Cpu className="w-8 h-8 text-purple-400" />
                                </div>
                                <span className="text-sm font-semibold text-white">PrimeRole Protocol</span>
                            </div>

                            {/* Protocol Node 2 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <GitBranch className="w-4 h-4 text-purple-400" />
                                </div>
                                <span className="text-xs font-mono text-muted-foreground">Orchestration</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Level 3: Execution (Global) */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4 mt-8"
                    >
                        <div className="h-16 w-px bg-gradient-to-b from-purple-500/50 to-transparent absolute left-1/2 -translate-x-1/2 top-[280px]" />

                        {/* Workers Grid */}
                        <div className="grid grid-cols-3 gap-6 pt-12">
                            {['Research Agent', 'Outreach Swarm', 'Analyst Node'].map((agent, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                                        <Globe className="w-5 h-5 text-muted-foreground group-hover:text-white" />
                                    </div>
                                    <span className="text-xs text-muted-foreground/60">{agent}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
