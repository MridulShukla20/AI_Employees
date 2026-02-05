import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, TrendingUp, Globe, FileText, CheckCircle, Zap, User, Bot, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function HowItWorksSection() {

    // Handoff tasks data
    const tasks = [
        { id: 1, text: "Draft outreach emails", checked: true },
        { id: 2, text: "Enrich contact data", checked: false },
        { id: 3, text: "Analyze sales calls", checked: false },
        { id: 4, text: "Schedule social posts", checked: false },
        { id: 5, text: "Source candidates", checked: false },
        { id: 6, text: "Screen resumes", checked: false },
    ];

    // Handoff badges
    const handoffMethods = [
        { icon: Globe, text: "Browser Extension" },
        { icon: FileText, text: "Bulk Upload" },
        { icon: CheckCircle, text: "CRM Select" },
        { icon: Zap, text: "Quick Actions" },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="how-it-works">
            <div className="container mx-auto px-6 max-w-[1240px]">

                {/* --- Section Header --- */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-[42px] font-bold text-slate-900 mb-6"
                    >
                        You Hand Off. AI Delivers.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 max-w-[700px] mx-auto leading-relaxed"
                    >
                        Select tasks, assign to AI, approve results. Works across all departments and employees.
                    </motion.p>
                </div>

                {/* --- 2-Column Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] max-w-[1200px] mx-auto relative mb-20">

                    {/* --- LEFT COLUMN: Handoff Input (40%) --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-purple-50/50 rounded-[20px] p-8 md:p-10 border border-slate-200 relative h-full flex flex-col"
                    >
                        <div className="inline-block px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide mb-6 w-fit">
                            1. Quick Handoff
                        </div>

                        {/* Selection Mockup */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6 flex-grow">
                            <div className="text-sm font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-3">
                                Select Your Task:
                            </div>
                            <div className="space-y-3 mb-6">
                                {tasks.map((task) => (
                                    <div key={task.id} className="flex items-center gap-3 group cursor-pointer">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.checked ? 'bg-purple-600 border-purple-600' : 'border-slate-300 group-hover:border-purple-400'}`}>
                                            {task.checked && <Check className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <span className={`text-[15px] ${task.checked ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                            {task.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-4">
                                <span className="text-sm text-slate-500">Selected: <span className="font-semibold text-purple-700">Multi-Department Tasks</span></span>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold h-12 shadow-lg shadow-purple-200 transition-all hover:-translate-y-0.5">
                                Hand Off to AI Queue <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>

                        <p className="text-[15px] text-slate-400 leading-relaxed text-center px-4">
                            Works with browser extensions, file uploads, bulk selections, or direct input.
                        </p>
                    </motion.div>

                    {/* --- RIGHT COLUMN: AI Concept Scale (60%) --- */}
                    <div className="flex flex-col gap-6 h-full">

                        {/* Card 1: AI Team Scale */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex-grow flex flex-col"
                        >
                            <div className="inline-block px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide mb-6 w-fit">
                                2. AI Team Executes Across All Depts
                            </div>

                            <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold text-lg">
                                <Users className="w-5 h-5 text-purple-600" /> 10 Active AI Employees:
                            </div>

                            <div className="space-y-6 flex-grow">
                                {/* Sales Team */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-slate-700">Sales Team <span className="text-slate-400 font-normal">(4 working)</span></span>
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">127 tasks in progress</span>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600 shadow-sm relative z-10">
                                                AI
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Marketing Team */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-slate-700">Marketing Team <span className="text-slate-400 font-normal">(3 working)</span></span>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">43 tasks in progress</span>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm relative z-10">
                                                AI
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recruiting Team */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-slate-700">Recruiting Team <span className="text-slate-400 font-normal">(3 working)</span></span>
                                        <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">28 tasks in progress</span>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center text-xs font-bold text-pink-600 shadow-sm relative z-10">
                                                AI
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm pt-6 mt-4 border-t border-slate-100">
                                <span className="text-slate-500 font-medium">→ All submit to your queue</span>
                                <Button size="sm" variant="outline" className="h-9 px-4 text-xs font-semibold border-slate-200 text-slate-700 hover:text-purple-600 hover:border-purple-200">
                                    Review Queue (15 items) <ArrowRight className="ml-1.5 w-3 h-3" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Card 2: Individual Performance (Dark Card) */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Star className="w-24 h-24 text-white" />
                            </div>

                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="inline-block px-3 py-1 rounded bg-blue-500/20 border border-blue-500/30 text-blue-200 text-[10px] font-bold uppercase tracking-wider">
                                    3. Track Individual Performance
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                                <div>
                                    <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Tasks</div>
                                    <div className="text-xl font-bold text-white">198 completed</div>
                                </div>
                                <div>
                                    <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">Time Saved</div>
                                    <div className="text-xl font-bold text-purple-300">12.3 hours</div>
                                </div>
                            </div>

                            <div className="mb-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider relative z-10">Employee Report Cards:</div>

                            <div className="grid grid-cols-3 gap-2 mb-6 relative z-10">
                                {[
                                    { name: "Maya", rating: "4.8" },
                                    { name: "Mira", rating: "5.0" },
                                    { name: "Riya", rating: "4.9" },
                                    { name: "Sofia", rating: "4.7" },
                                    { name: "Zara", rating: "4.8" },
                                    { name: "Lena", rating: "4.9" },
                                ].map((emp, i) => (
                                    <div key={i} className="bg-white/10 rounded px-2 py-1.5 flex items-center justify-between border border-white/5 hover:bg-white/20 transition-colors cursor-pointer">
                                        <span className="text-xs font-medium text-slate-200">{emp.name}</span>
                                        <div className="flex items-center gap-0.5">
                                            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-[10px] font-bold text-white">{emp.rating}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button variant="outline" className="w-full border-white/20 text-slate-200 hover:bg-white/10 hover:text-white bg-transparent h-9 text-xs font-semibold relative z-10">
                                View All Report Cards <ArrowRight className="ml-2 w-3 h-3" />
                            </Button>
                        </motion.div>
                    </div>

                </div>

                {/* --- Bottom: Handoff Methods --- */}
                <div className="flex flex-wrap justify-center gap-4">
                    {handoffMethods.map((method, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            whileHover={{ y: -2 }}
                            className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm hover:border-purple-300 hover:shadow-md transition-all cursor-default"
                        >
                            <method.icon className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-700">{method.text}</span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
