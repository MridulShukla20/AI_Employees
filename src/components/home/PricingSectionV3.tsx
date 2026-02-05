import { motion } from "framer-motion";
import {
    Users, Briefcase, Coins, Check, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingSectionV3() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-slate-50/50" id="pricing">

            {/* --- Global Background --- */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Gradient Wash */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3FF] via-[#FAFAFA] to-white" />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                {/* Soft Orbs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-200/20 rounded-full blur-[120px] -translate-y-[60%]" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-200/60 shadow-sm text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">
                            Transparent Pricing
                        </span>
                        <h2 className="text-4xl md:text-[56px] font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight font-[family-name:var(--font-cabinet-grotesk)]">
                            Pay for AI. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Not for Humans.</span>
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
                            Your entire team gets full platform access—free, forever. <br className="hidden md:block" />
                            Only pay when you hire AI employees to do the work.
                        </p>
                    </motion.div>
                </div>

                {/* --- PRICING CARDS --- */}
                <div className="grid xl:grid-cols-3 gap-8 items-start max-w-[1240px] mx-auto mb-12">

                    {/* Card 1: Human Seats (Free) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full bg-white rounded-[24px] p-8 md:p-10 border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative group"
                    >
                        <div className="mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-7 h-7" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Human Seats</h3>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-[48px] font-bold text-slate-900 leading-none tracking-tight">Free</span>
                            </div>
                            <p className="text-slate-500 font-medium">For your entire team, forever.</p>
                        </div>

                        <div className="space-y-4 mb-10">
                            {[
                                "Unlimited team members",
                                "Kanban board & workflows",
                                "Built-in dialer",
                                "Approval queue & controls",
                                "Mobile apps (iOS/Android)",
                                "Chrome extension",
                            ].map((feature) => (
                                <div key={feature} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-emerald-600" />
                                    </div>
                                    <span className="text-[15px] text-slate-600">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="w-full h-[52px] bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 rounded-xl font-semibold text-[15px] transition-all">
                            Get Started Free
                        </Button>
                        <p className="text-[12px] text-slate-400 text-center mt-4">No credit card required</p>
                    </motion.div>

                    {/* Card 2: AI Employees (Primary) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="w-full bg-white rounded-[24px] p-8 md:p-10 border border-purple-100 shadow-[0_20px_50px_rgba(124,58,237,0.12)] relative z-10 xl:-mt-6 xl:mb-6 ring-1 ring-purple-50 group"
                    >
                        {/* Highlight Pill */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg border border-white/10">
                                Most Popular
                            </span>
                        </div>

                        <div className="mb-8 mt-2">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="w-7 h-7" />
                            </div>
                            <h3 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-2">AI Employees</h3>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-[48px] font-bold text-slate-900 leading-none tracking-tight">$99</span>
                                <span className="text-xl text-slate-400 font-normal">-</span>
                                <span className="text-[48px] font-bold text-slate-900 leading-none tracking-tight">$299</span>
                            </div>
                            <p className="text-slate-500 font-medium">per AI employee / month</p>
                        </div>

                        <div className="space-y-4 mb-10">
                            {[
                                "1,000 credits included monthly",
                                "Full autonomous execution",
                                "Conversational training",
                                "Performance report cards",
                                "Self-improving memory",
                                "Priority support",
                            ].map((feature) => (
                                <div key={feature} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-purple-600" />
                                    </div>
                                    <span className="text-[15px] text-slate-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full h-[56px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-[16px] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300">
                            Hire Your First AI <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <p className="text-[12px] text-purple-900/40 text-center mt-4 font-medium">14-day free trial on all AI hires</p>
                    </motion.div>

                    {/* Card 3: Extra Credits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full bg-white rounded-[24px] p-8 md:p-10 border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <div className="mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Coins className="w-7 h-7" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Extra Credits</h3>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-[48px] font-bold text-slate-900 leading-none tracking-tight">$49</span>
                            </div>
                            <p className="text-slate-500 font-medium">per 1,000 credits</p>
                        </div>

                        <div className="space-y-4 mb-10">
                            {[
                                "Universal credit pool",
                                "Shared across all agents",
                                "Data enrichment tasks",
                                "AI-generated content",
                                "Never expire",
                                "Auto-refill options",
                            ].map((feature) => (
                                <div key={feature} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-amber-600" />
                                    </div>
                                    <span className="text-[15px] text-slate-600">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="w-full h-[52px] bg-white border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 rounded-xl font-semibold text-[15px] transition-all">
                            Buy Credits
                        </Button>
                        <p className="text-[12px] text-slate-400 text-center mt-4">Pay as you grow</p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
