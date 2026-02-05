import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, BarChart3, CreditCard } from "lucide-react";

export function PlatformConceptSection() {
    return (
        <section className="py-24 bg-gray-50/50 border-b border-gray-100">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
                        Built for Safe, Scalable Collaboration
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Not just chatbots. A complete platform for human-AI teamwork.
                    </p>
                </motion.div>

                {/* 4 Feature Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

                    {/* Card 1: Approval Queue */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Human Control Plane</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Approval Queue</h3>
                        <p className="text-gray-500 mb-6 leading-relaxed text-sm">
                            Every AI action flows through your approval queue. Review, approve, or reject with one click.
                        </p>
                        <ul className="space-y-2">
                            {["See work before it executes", "One-click approve/reject", "Full audit trail", "Auto-approve rules"].map(item => (
                                <li key={item} className="flex items-center text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 2: Conversational Interface */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">No Configuration</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Conversational Interface</h3>
                        <p className="text-gray-500 mb-6 leading-relaxed text-sm">
                            Talk to AI employees like teammates. No prompts, no workflows, no technical setup.
                        </p>
                        <ul className="space-y-2">
                            {["Natural chat interface", "Context retention", "Team collaboration", "Mobile access"].map(item => (
                                <li key={item} className="flex items-center text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 3: Report Cards */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Measurable Outcomes</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Report Cards & Analytics</h3>
                        <p className="text-gray-500 mb-6 leading-relaxed text-sm">
                            Track each AI employee's effectiveness with real metrics. See ROI, time saved, and quality scores.
                        </p>
                        <ul className="space-y-2">
                            {["Performance metrics", "Cost tracking", "Outcome analysis", "ROI visibility"].map(item => (
                                <li key={item} className="flex items-center text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 4: Billing */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">No Surprises</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Predictable Billing</h3>
                        <p className="text-gray-500 mb-6 leading-relaxed text-sm">
                            Pay per AI employee ($99-299/month). Hard spending caps. Unlimited human seats, always free.
                        </p>
                        <ul className="space-y-2">
                            {["Per-employee pricing", "Hard spending caps", "No per-seat charges", "Cancel anytime"].map(item => (
                                <li key={item} className="flex items-center text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
