import { motion } from "framer-motion";
import { Layers, X, Check } from "lucide-react";

export function ParadigmShiftSection() {
    return (
        <section className="py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-6 text-white">
                        The Paradigm Shift
                    </h2>
                    <p className="text-xl text-muted-foreground font-light leading-relaxed">
                        We spent the last decade collecting tools. <br />
                        Now we're drowning in them.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">

                    {/* The Tool Trap (Old Way) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative border border-white/10 bg-white/5 rounded-2xl p-8 md:p-12 overflow-hidden hover:border-red-500/20 transition-colors duration-500">
                            <div className="absolute top-4 right-4 text-xs font-mono text-red-500/70 uppercase tracking-widest border border-red-500/20 px-2 py-1 rounded">The Tool Trap</div>

                            {/* Chaos Graphic */}
                            <div className="relative h-48 mb-8 mt-4 flex items-center justify-center">
                                {/* Disjointed Icons/Nodes */}
                                <div className="absolute w-full h-full">
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                x: [Math.random() * 40, -Math.random() * 40],
                                                y: [Math.random() * 40, -Math.random() * 40],
                                                rotate: [0, 360]
                                            }}
                                            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center"
                                            style={{
                                                top: `${20 + Math.random() * 60}%`,
                                                left: `${20 + Math.random() * 60}%`
                                            }}
                                        >
                                            <X className="w-4 h-4 text-white/20" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-semibold text-white mb-3">Fragmentation</h3>
                            <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                Siloed data. Manual copy-pasting. Constant context switching.
                                You act as the router between 50 different SaaS apps.
                            </p>
                        </div>
                    </motion.div>

                    {/* The Execution Layer (New Way) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative border border-white/10 bg-white/5 rounded-2xl p-8 md:p-12 overflow-hidden hover:border-purple-500/40 transition-colors duration-500">
                            <div className="absolute top-4 right-4 text-xs font-mono text-purple-400 uppercase tracking-widest border border-purple-500/20 px-2 py-1 rounded">The Platform</div>

                            {/* Order Graphic */}
                            <div className="relative h-48 mb-8 mt-4 flex items-center justify-center">
                                <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ x: [-100, 200] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                                    />
                                </div>
                                {/* Hub Nodes */}
                                <div className="absolute flex gap-6">
                                    <div className="w-12 h-12 rounded-full border border-purple-500/50 bg-black flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] z-10">
                                        <Layers className="w-5 h-5 text-purple-400" />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-semibold text-white mb-3">Orchestration</h3>
                            <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                One control plane. You define the outcome, the protocol handles the complexity.
                                Tools become infrastructure, invisible and automated.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
