import { motion } from "framer-motion";
import { Eye, CheckCircle, Zap, FileText, User, Clock, Pencil, X } from "lucide-react";

const features = [
    {
        icon: Eye,
        iconColor: "#7C3AED",
        title: "See proposed actions before they execute",
        description: "AI employees draft the work. You see exactly what they'll do—preview emails, review posts, check data changes.",
    },
    {
        icon: CheckCircle,
        iconColor: "#10B981",
        title: "Approve with one click or provide guidance",
        description: "One-click approve or add comments. AI learns from your feedback.",
    },
    {
        icon: Zap,
        iconColor: "#F59E0B",
        title: "Set auto-approve rules as you build trust",
        description: "Once you trust an AI employee, auto-approve certain actions. You still get notified.",
    },
    {
        icon: FileText,
        iconColor: "#6B7280",
        title: "Complete audit trail of every decision",
        description: "Full history of what was proposed, approved, or rejected. Perfect for compliance.",
    },
];

const mockApprovals = [
    { avatar: "R", name: "Riya", type: "Outreach Email", subject: "Your Q4 sales strategy question...", time: "2 min ago", priority: "high" },
    { avatar: "M", name: "Maya", type: "LinkedIn Post", subject: "5 trends reshaping B2B sales in 2026...", time: "12 min ago", priority: "medium" },
    { avatar: "S", name: "Sofia", type: "CRM Update", subject: "Updated 23 contact records with...", time: "1 hour ago", priority: "low" },
];

export function ApprovalQueueSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-5 gap-16 items-center">

                    {/* Left Content (3/5) */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                            You're Always in Control
                        </h2>
                        <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
                            Every email, every post, every action—your AI employees submit their work to you first.
                            Review, approve, or give feedback in seconds.
                        </p>

                        {/* Features */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-default"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${feature.iconColor}15` }}
                                    >
                                        <feature.icon className="w-6 h-6" style={{ color: feature.iconColor }} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Mockup (2/5) */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 shadow-2xl p-6 relative">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900">Approval Queue</h3>
                                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                                    3 pending
                                </span>
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex gap-2 mb-6">
                                {["All", "High Priority", "Waiting"].map((tab, i) => (
                                    <button
                                        key={tab}
                                        className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${i === 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Approval Cards */}
                            <div className="space-y-4">
                                {mockApprovals.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Avatar */}
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                {item.avatar}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                                                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">{item.type}</span>
                                                    {item.priority === "high" && (
                                                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 truncate">{item.subject}</p>
                                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                                                    <Clock className="w-3 h-3" />
                                                    {item.time}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-4">
                                            <button className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-colors">
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                Approve
                                            </button>
                                            <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
