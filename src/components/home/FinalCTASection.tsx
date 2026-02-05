import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight } from "lucide-react";

export function FinalCTASection() {
    return (
        <section className="py-24 md:py-36 bg-slate-50 relative overflow-hidden">

            {/* --- 1. Subtle Ambient Depth (Radial Gradient) --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="container mx-auto px-6 max-w-[1240px] relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    {/* --- 2. Visual Anchor --- */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/60 shadow-sm mb-8">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Human + AI Collaboration
                        </span>
                    </div>

                    {/* --- Headline & Support --- */}
                    <h2 className="text-4xl md:text-[56px] font-bold text-slate-900 tracking-tight mb-6 leading-[1.05] font-display">
                        Start free. <span className="text-slate-800">Hire AI when you’re ready.</span>
                    </h2>

                    <p className="text-xl text-slate-500 mb-12 font-light leading-relaxed max-w-xl mx-auto">
                        Your team works for free. AI employees join only when you need them.
                    </p>

                    {/* --- 3. Unified CTA Block (Premium/Onboarding Feel) --- */}
                    <div className="max-w-[480px] mx-auto bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200/60 flex flex-col sm:flex-row items-center gap-2 mb-10 transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                        <Input
                            type="email"
                            placeholder="Enter your work email"
                            className="flex-1 border-none shadow-none focus-visible:ring-0 text-base h-12 px-4 placeholder:text-slate-400 bg-transparent"
                        />
                        <Button className="w-full sm:w-auto h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[15px] font-bold transition-all shadow-md">
                            Get started
                        </Button>
                    </div>

                    {/* --- Secondary Actions & Trust --- */}
                    <div className="flex flex-col items-center gap-6">
                        <a href="#" className="text-sm font-semibold text-slate-600 hover:text-purple-700 transition-colors inline-flex items-center gap-1.5 group">
                            Book a demo
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>

                        <p className="text-[13px] text-slate-400 font-medium opacity-80">
                            Free forever for humans · No credit card required · Setup in minutes
                        </p>
                    </div>

                </motion.div>

            </div>
        </section>
    );
}
