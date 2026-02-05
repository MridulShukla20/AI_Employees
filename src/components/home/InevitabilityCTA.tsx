import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function InevitabilityCTA() {
    return (
        <section className="py-40 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden flex items-center justify-center">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-purple-900/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl px-6">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8"
                >
                    This is how work <br />
                    <span className="text-muted-foreground/50">happens now.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto"
                >
                    Stop managing tools. Start orchestrating outcomes.
                    Join the execution layer.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-6"
                >
                    <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform">
                        Start Executing
                    </Button>
                    <span className="text-sm text-muted-foreground/50">
                        or <button className="underline hover:text-white transition-colors">read the manifesto</button>
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
