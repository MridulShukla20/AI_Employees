import { Button } from "@/components/ui/button";
import { UserPlus, ShieldCheck, Zap, Sparkles, MessageCircle, ArrowRight, User, Bot, RefreshCw, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

// --- Components ---

// Feature Banner Card
const FeatureBannerCard = ({ icon: Icon, title, subtitle, iconColor, bgColor }: any) => (
    <motion.div
        whileHover={{ y: -4 }}
        className="glass-effect flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/90 transition-all duration-300"
    >
        <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm" style={{ backgroundColor: bgColor }}
        >
            <Icon className="w-8 h-8" style={{ color: iconColor }} />
        </motion.div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-[15px] text-slate-500 leading-snug">{subtitle}</p>
    </motion.div>
);

// Overlapping Avatar Group
const AvatarGroup = ({ type }: { type: 'human' | 'ai' }) => {
    const isHuman = type === 'human';
    const colors = isHuman
        ? ['bg-blue-100 text-blue-600', 'bg-blue-200 text-blue-700', 'bg-blue-50 text-blue-500']
        : ['bg-purple-100 text-purple-600', 'bg-purple-200 text-purple-700', 'bg-purple-50 text-purple-500'];

    return (
        <div className="flex justify-center items-center">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={`w-16 h-16 rounded-full border-[3px] border-white shadow-xl flex items-center justify-center text-lg font-bold ${colors[i]} relative`}
                    style={{ marginLeft: i === 0 ? 0 : -16, zIndex: i }}
                >
                    {isHuman ? (
                        <span className="opacity-80">
                            {['SC', 'ML', 'PS'][i]}
                        </span>
                    ) : (
                        <Bot className="w-8 h-8 opacity-80" />
                    )}
                </div>
            ))}
        </div>
    );
};

export function HeroSectionV3() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center pt-[120px] pb-20 overflow-hidden bg-slate-50"
            style={{ background: 'radial-gradient(ellipse at center, #FAFBFC 0%, #F5F7FA 100%)' }}
        >
            {/* --- Premium Background Layers --- */}
            {/* Grain Overlay */}
            <div className="grain-overlay mix-blend-overlay absolute inset-0 opacity-40 pointer-events-none" />

            {/* Gradient Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-purple-600/5 blur-[120px] animate-orb-float delay-0" />
            <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[100px] animate-orb-float delay-1000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-teal-500/5 blur-[110px] animate-orb-float delay-2000" />

            {/* Geometric Accent */}
            <div className="absolute right-[-400px] top-[-300px] w-[1000px] h-[1000px] border border-slate-200/40 rounded-full hidden lg:block" />

            {/* --- 1. HERO CONTENT --- */}
            <div className="relative z-10 w-full max-w-[1400px] px-6 grid place-items-center gap-10 mb-16 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-purple-100 shadow-[0_2px_12px_rgba(124,58,237,0.08)]">
                        <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                        <span className="text-sm font-medium text-purple-600 tracking-wide">Humans Lead. AI Delivers.</span>
                    </div>
                </motion.div>

                {/* Headline & CTAs */}
                <div className="max-w-[1000px] flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.1] text-slate-900 mb-6"
                    >
                        Stop Buying Software.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-500">Start Building an AI Team.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-slate-500 max-w-[780px] mx-auto leading-relaxed mb-10"
                    >
                        Hire AI employees across sales, marketing, and recruiting—without the $60K salaries. <strong className="text-slate-700 font-bold">$99/month</strong> each. Human seats <strong className="text-slate-700 font-bold">free forever</strong>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <Button size="lg" className="button-primary w-full sm:w-auto text-[17px] px-10 py-7 h-auto">
                            Start Free <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button size="lg" className="button-secondary w-full sm:w-auto text-[17px] px-10 py-7 h-auto">
                            See the AI Team
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* --- 2. SIMPLE COLLABORATION VISUAL --- */}
            <div className="w-full max-w-[900px] px-4 mb-24 relative z-10">
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 border border-white/60 shadow-xl shadow-purple-900/5">

                    {/* LEFT: Humans */}
                    <div className="flex flex-col items-center gap-4">
                        <AvatarGroup type="human" />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Your Team</span>
                    </div>

                    {/* CENTER: Flow */}
                    <div className="flex-1 flex items-center justify-center gap-4 w-full md:w-auto px-4">
                        {/* Left Arrow */}
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-slate-200 to-purple-400 relative hidden md:block">
                            <span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks</span>
                            <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-purple-400" />
                        </div>

                        {/* Center Icon */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg relative z-10"
                        >
                            <RefreshCw className="w-8 h-8 text-purple-600" />
                        </motion.div>

                        {/* Right Arrow */}
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-400 to-slate-200 relative hidden md:block">
                            <ArrowRight className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 text-purple-400 rotate-180" />
                            <span className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Results</span>
                        </div>
                    </div>

                    {/* RIGHT: AI */}
                    <div className="flex flex-col items-center gap-4">
                        <AvatarGroup type="ai" />
                        <span className="text-sm font-bold text-purple-600 uppercase tracking-wide">AI Employees</span>
                    </div>

                </div>
            </div>

            {/* --- 3. FEATURE BANNER --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[1200px] px-6"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureBannerCard
                        icon={UserPlus}
                        title="Free Human Seats"
                        subtitle="Unlimited teammates. Always free."
                        iconColor="#3B82F6"
                        bgColor="#EFF6FF"
                    />
                    <FeatureBannerCard
                        icon={ShieldCheck}
                        title="You Stay in Control"
                        subtitle="Approve every action first."
                        iconColor="#10B981"
                        bgColor="#F0FDF4"
                    />
                    <FeatureBannerCard
                        icon={MessageCircle}
                        title="Talk, Don't Configure"
                        subtitle="Conversational coaching, not setup."
                        iconColor="#7C3AED"
                        bgColor="#F5F3FF"
                    />
                    <FeatureBannerCard
                        icon={Zap}
                        title="AI From $99/month"
                        subtitle="Specialized employees as needed."
                        iconColor="#F59E0B"
                        bgColor="#FFFBEB"
                    />
                </div>
            </motion.div>

        </section>
    );
}
