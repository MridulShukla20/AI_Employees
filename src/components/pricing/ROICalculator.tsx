import { useState } from "react";
import { Minus, Plus, Check, Gift, Shield, Zap } from "lucide-react";

export function ROICalculator() {
    const [teamSize, setTeamSize] = useState(10);
    const [selectedTools, setSelectedTools] = useState([
        "AI Writing", "Basic CRM", "AI Chatbot", "Team Wiki", "Project Management"
    ]);

    const toolsList = [
        { id: "search", name: "AI Search", price: 20 },
        { id: "writing", name: "AI Writing", price: 25 },
        { id: "calendar", name: "Calendar Scheduling", price: 10 },
        { id: "crm", name: "Basic CRM", price: 30 },
        { id: "chatbot", name: "AI Chatbot", price: 20 },
        { id: "email", name: "AI Email App", price: 15 },
        { id: "wiki", name: "Team Wiki", price: 10 },
        { id: "builder", name: "Site Builder", price: 15 },
        { id: "notes", name: "AI Meeting Notes", price: 20 },
        { id: "research", name: "AI Research", price: 30 },
        { id: "pm", name: "Project Management", price: 24 },
        { id: "forms", name: "Forms", price: 10 },
    ];

    const toggleTool = (name: string) => {
        if (selectedTools.includes(name)) {
            setSelectedTools(selectedTools.filter(t => t !== name));
        } else {
            setSelectedTools([...selectedTools, name]);
        }
    };

    // Calculation
    const selectedToolsCost = toolsList
        .filter(t => selectedTools.includes(t.name))
        .reduce((acc, curr) => acc + curr.price, 0);

    // Tools total cost per month
    const toolsTotal = selectedToolsCost * teamSize;

    // Projected Monthly Savings (Conservative Estimate: 60% reduction)
    const monthlySavings = toolsTotal * 0.6;
    const annualSavings = monthlySavings * 12;

    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container px-4 md:px-6 relative z-10">

                {/*  Highlights */}
                <div className="flex flex-col md:flex-row gap-6 justify-center mb-24">
                    {[
                        { title: "Bundle Discounts", desc: "Save 20% when hiring 3+ AI agents.", icon: Gift, color: "text-purple-600", bg: "bg-purple-50" },
                        { title: "Hard Spend Caps", desc: "Set limits. No surprise overages ever.", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { title: "Usage Alerts", desc: "Get notified at 50% & 90% usage.", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 pr-8 shadow-sm hover:bg-white transition-colors">
                            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-[15px]">{item.title}</div>
                                <div className="text-slate-500 text-[13px]">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ROI Calculator */}
                <div className="max-w-5xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-[0_24px_60px_rgba(0,0,0,0.03)] overflow-hidden">
                    <div className="bg-slate-50/50 p-8 md:p-12 text-center border-b border-slate-100">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Calculate Your Savings</h3>
                        <p className="text-slate-500">Compare PrimeRole to your current software stack spend.</p>
                    </div>

                    <div className="grid md:grid-cols-2">
                        {/* Inputs */}
                        <div className="p-8 md:p-12 border-r border-slate-100">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Select Current Tools</label>
                            <div className="flex flex-wrap gap-2 mb-10">
                                {toolsList.map((tool) => (
                                    <button
                                        key={tool.id}
                                        onClick={() => toggleTool(tool.name)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${selectedTools.includes(tool.name)
                                                ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-500/20"
                                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                            }`}
                                    >
                                        {tool.name}
                                    </button>
                                ))}
                            </div>

                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Team Size</label>
                            <div className="flex items-center gap-6 bg-slate-50 rounded-2xl p-2 w-fit">
                                <button
                                    onClick={() => setTeamSize(Math.max(1, teamSize - 1))}
                                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-2xl font-bold text-slate-900 w-12 text-center tabular-nums">{teamSize}</span>
                                <button
                                    onClick={() => setTeamSize(teamSize + 1)}
                                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="p-8 md:p-12 bg-slate-50/30 flex flex-col justify-center">
                            <div className="mb-8">
                                <div className="text-sm font-medium text-slate-500 mb-1">Estimated Monthly Savings</div>
                                <div className="text-5xl md:text-6xl font-bold text-emerald-500 tracking-tight">
                                    ${Math.round(monthlySavings).toLocaleString()}
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-slate-200/60">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Current annual tool spend</span>
                                    <span className="font-semibold text-slate-900 line-through decoration-slate-300">${(toolsTotal * 12).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-purple-700 font-medium">New annual spend</span>
                                    <span className="font-bold text-purple-700">${((toolsTotal * 12) - annualSavings).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
