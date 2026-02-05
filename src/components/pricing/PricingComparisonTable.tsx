import { Check } from "lucide-react";

export function PricingComparisonTable() {
    return (
        <section className="py-24 bg-slate-50/50 border-t border-slate-200/60">
            <div className="container px-4 md:px-6 relative z-10 text-center">
                {/* --- Comparison Table (Simplified/Clean) --- */}
                <div className="max-w-[800px] mx-auto opacity-90 hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">What exactly is included?</h3>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
                        <div className="grid grid-cols-3 bg-slate-50/80 border-b border-slate-200 p-4 font-semibold text-slate-500">
                            <div className="text-left pl-2">Feature</div>
                            <div className="text-center">Humans (Free)</div>
                            <div className="text-center text-purple-600">AI Employees</div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {[
                                { name: "Kanban Boards", human: true, ai: true },
                                { name: "Built-in Dialer", human: true, ai: true },
                                { name: "Mobile Apps & Logic", human: true, ai: true },
                                { name: "Approval Queue", human: true, ai: true },
                                { name: "Autonomous Execution", human: false, ai: true },
                                { name: "Self-Correction", human: false, ai: true },
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-3 p-4 items-center hover:bg-slate-50/50 transition-colors">
                                    <div className="font-medium text-slate-700 text-left pl-2">{row.name}</div>
                                    <div className="flex justify-center">
                                        {row.human ? <Check className="w-5 h-5 text-emerald-500" /> : <span className="text-slate-300">—</span>}
                                    </div>
                                    <div className="flex justify-center">
                                        {row.ai ? <Check className="w-5 h-5 text-purple-600" /> : <span className="text-slate-300">—</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
