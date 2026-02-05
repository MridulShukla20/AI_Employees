import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";

export function ManifestoHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center items-center bg-background overflow-hidden px-6 pt-20">

            {/* Background Ambience - Strict Control */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(120,60,255,0.03),_transparent_40%)]" />

            {/* Abstract "Pulse" of Intent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border border-primary/20"
                />
                <motion.div
                    animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute inset-0 rounded-full border border-primary/10"
                />
            </div>

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 max-w-5xl mx-auto text-center"
            >
                {/* Category Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex justify-center mb-12"
                >
                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase backdrop-blur-md">
                        The Control Plane
                    </span>
                </motion.div>

                {/* The Opinionated Headline */}
                <div className="overflow-hidden mb-8">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] text-foreground"
                    >
                        The age of <br />
                        <span className="text-muted-foreground/30">tools</span> is over.
                    </motion.h1>
                </div>

                {/* Subhead - The Shift */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-light"
                >
                    In the AI era, humans set intent. AI executes the work. <br className="hidden md:block" />
                    <span className="text-foreground font-normal">Start leading a workforce, not managing software.</span>
                </motion.p>

                {/* Primary Action - Calm Inevitability */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <Button className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 text-lg font-medium tracking-tight transition-all hover:scale-105">
                        Deploy Your Workforce
                    </Button>

                    <div className="mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground/40 font-mono tracking-widest uppercase">
                        <Terminal className="w-3 h-3" />
                        <span>System Status: Operational</span>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
