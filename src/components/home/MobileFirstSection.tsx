import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Smartphone, CheckCircle, Bell, Chrome, ArrowLeft,
    ChevronRight, Battery, Wifi, Signal, MoreHorizontal,
    Mail, Briefcase, Calendar, Check, Search
} from "lucide-react";

// --- Official Store Badges ---

const AppStoreBadge = () => (
    <a href="#" className="inline-block transition-transform hover:scale-105 active:scale-95">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
            alt="Download on the App Store"
            className="h-[44px] w-auto"
        />
    </a>
);

const GooglePlayBadge = () => (
    <a href="#" className="inline-block transition-transform hover:scale-105 active:scale-95">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="h-[44px] w-auto" // Matched height
        />
    </a>
);


// --- Phone Mockup Component ---

const PhoneMockup = () => {
    const [screenState, setScreenState] = useState<0 | 1 | 2>(0); // 0: Home, 1: Approval, 2: Approved

    // Auto-cycle states
    useEffect(() => {
        const interval = setInterval(() => {
            setScreenState(prev => (prev + 1) % 3 as any);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const PhoneScreen = () => {
        return (
            <div className="w-full h-full bg-[#FAFAFA] relative overflow-hidden font-sans text-slate-900 select-none">
                {/* Status Bar (iOS 16+) */}
                <div className="h-[54px] w-full flex justify-between items-end pb-3 px-7 absolute top-0 left-0 right-0 z-20 text-slate-900 font-semibold text-[15px]">
                    <span className="tracking-tight">9:41</span>
                    <div className="flex gap-2 items-center">
                        <Signal className="w-4 h-4 fill-slate-900" />
                        <Wifi className="w-4 h-4" />
                        <Battery className="w-6 h-6 fill-slate-900 text-slate-500" />
                    </div>
                </div>

                <AnimatePresence mode="wait">

                    {/* --- HOME SCREEN (INBOX) --- */}
                    {screenState === 0 && (
                        <motion.div
                            key="home"
                            initial={{ filter: "blur(2px)", opacity: 0 }}
                            animate={{ filter: "blur(0px)", opacity: 1 }}
                            exit={{ filter: "blur(2px)", opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 pt-[60px] pb-8 px-5 flex flex-col h-full bg-[#f2f2f7]"
                        >
                            {/* App Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-[34px] font-bold tracking-tight leading-none text-slate-900">Inbox</h1>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 p-[2px] shadow-sm">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-100">JD</div>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="bg-[#e3e3e8] rounded-[10px] h-9 w-full mb-6 flex items-center px-3 gap-2">
                                <Search className="w-4 h-4 text-slate-500" />
                                <span className="text-[17px] text-slate-500">Search</span>
                            </div>

                            <div className="flex-1 overflow-hidden relative">
                                <div className="text-[13px] font-semibold text-slate-400 uppercase mb-2 ml-1">Today</div>

                                {/* List Container */}
                                <div className="bg-white rounded-[12px] overflow-hidden divide-y divide-slate-100 shadow-sm border border-slate-200/50">
                                    {/* Unread Item */}
                                    <div className="p-4 flex gap-3 relative cursor-default active:bg-slate-50/80 transition-colors">
                                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-500" />
                                        <div className="w-[42px] h-[42px] rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0 text-lg">
                                            M
                                        </div>
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <span className="font-bold text-[17px] leading-tight text-slate-900">Maya</span>
                                                <span className="text-[15px] text-slate-400 font-normal">9:41 AM</span>
                                            </div>
                                            <div className="text-[15px] font-semibold text-slate-900 leading-tight mb-0.5">Draft: Partnership Outreach</div>
                                            <div className="text-[15px] text-slate-500 leading-tight line-clamp-2">
                                                Hi Sarah, I noticed your team is scaling accurately and I thought...
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 self-center opacity-50" />
                                    </div>

                                    {/* Read Item */}
                                    <div className="p-4 flex gap-3 opacity-60">
                                        <div className="w-[42px] h-[42px] rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold shrink-0 text-lg">
                                            R
                                        </div>
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <span className="font-semibold text-[17px] leading-tight text-slate-900">Riya</span>
                                                <span className="text-[15px] text-slate-400 font-normal">Yesterday</span>
                                            </div>
                                            <div className="text-[15px] font-medium text-slate-900 leading-tight mb-0.5">Call Summary: TechCorp</div>
                                            <div className="text-[15px] text-slate-500 leading-tight line-clamp-1">
                                                Budget confirmed. Next step: Demo scheduled for Friday.
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 self-center opacity-50" />
                                    </div>
                                </div>
                            </div>

                            {/* Alert Floater */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="absolute bottom-6 left-5 right-5 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-[18px] shadow-xl flex items-center gap-4 z-30"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bell className="w-5 h-5 fill-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[15px] font-semibold">Approval Required</div>
                                    <div className="text-[13px] text-white/70">Partnership Email Draft</div>
                                </div>
                                <button className="bg-white text-slate-900 px-4 py-2 rounded-full text-[13px] font-bold">
                                    View
                                </button>
                            </motion.div>

                        </motion.div>
                    )}

                    {/* --- DETAIL SCREEN (REVIEW) --- */}
                    {screenState === 1 && (
                        <motion.div
                            key="detail"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-25%' }}
                            transition={{ type: "spring", stiffness: 280, damping: 28 }}
                            className="absolute inset-0 bg-[#F2F2F7] flex flex-col h-full shadow-[shadow:_-20px_0_50px_rgba(0,0,0,0.1)] z-10 overflow-hidden"
                        >
                            {/* iOS Nav Bar */}
                            <div className="pt-[50px] pb-3 px-2 flex items-center bg-[#F2F2F7]/90 backdrop-blur-md border-b border-slate-200/50 shrink-0 z-40">
                                <div className="flex items-center text-blue-500 -ml-1 active:opacity-50 transition-opacity cursor-pointer">
                                    <ChevronRight className="w-7 h-7 rotate-180" />
                                    <span className="text-[17px] font-normal leading-none pb-0.5">Inbox</span>
                                </div>
                                <div className="flex-1 text-center font-semibold text-[17px] -ml-16">Review</div>
                                <div className="w-16" />
                            </div>

                            {/* Scrollable Content Container (Strict Flex Containment) */}
                            <div className="flex-1 overflow-y-auto w-full min-h-0">
                                <div className="px-5 pt-4 pb-6">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-1">Partnership Outreach</h2>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-purple-100 text-purple-700 text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Draft</span>
                                                <span className="text-slate-400 text-[13px]">To: Sarah Chen</span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Email Body Container */}
                                    <div className="bg-white p-6 rounded-[22px] shadow-sm border border-slate-200/60">
                                        <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">M</div>
                                            <div className="text-[15px]">
                                                <div className="font-semibold text-slate-900">Maya</div>
                                                <div className="text-slate-400 text-xs">AI Agent • 9:41 AM</div>
                                            </div>
                                        </div>

                                        <div className="text-[17px] leading-[1.5] text-slate-800 font-normal space-y-4 font-[family-name:_-apple-system,BlinkMacSystemFont,sans-serif]">
                                            <p>Hi Sarah,</p>
                                            <p>
                                                I noticed your team is expanding rapidly. Typically, VPs of Sales at this stage struggle with maintaining CRM data hygiene while scaling.
                                            </p>
                                            <p>
                                                PrimeRole acts as your autonomous layer to handle this. Would you be open to a 15-min chat next Tuesday?
                                            </p>
                                            <p className="text-slate-600">
                                                Best,<br />
                                                Jason
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Action Sheet (Flex-anchored) */}
                            <div className="bg-white border-t border-slate-100 p-5 pb-8 rounded-t-[26px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] shrink-0 z-50">
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-slate-100 text-slate-900 font-semibold text-[17px] h-[52px] rounded-[16px] active:bg-slate-200 transition-colors">
                                        Edit
                                    </button>
                                    <button className="flex-1 bg-[#007AFF] text-white font-semibold text-[17px] h-[52px] rounded-[16px] shadow-lg shadow-blue-500/20 active:opacity-90 transition-opacity">
                                        Approve & Send
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- SUCCESS SCREEN --- */}
                    {screenState === 2 && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50 px-8"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-8"
                            >
                                <Check className="w-12 h-12 stroke-[3px]" />
                            </motion.div>
                            <h3 className="text-[28px] font-bold text-slate-900 mb-3 tracking-tight">Approved</h3>
                            <p className="text-[17px] text-slate-500 text-center leading-relaxed">
                                Your email has been scheduled. <br />Maya is moving to the next task.
                            </p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-12 w-full max-w-[200px]"
                            >
                                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-green-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3 }}
                                    />
                                </div>
                                <div className="text-center text-[13px] font-medium text-slate-400 mt-3">Redirecting to Inbox...</div>
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* Home Indicator */}
                <div className="absolute bottom-[9px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#1c1c1e] rounded-full z-50" />
            </div>
        );
    };

    return (
        <div className="relative mx-auto w-[370px] h-[750px] group perspective-[1200px] transform scale-[0.85] sm:scale-100 origin-center">
            {/* iPhone 14 Pro Max Body */}
            <div className="relative w-full h-full bg-[#1c1c1e] rounded-[68px] shadow-[0_0_0_2px_#3a3a3c,0_0_0_6px_#121212,0_30px_60px_rgba(0,0,0,0.4),inset_0_0_40px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10 transition-transform duration-500 group-hover:rotate-y-[-2deg] group-hover:rotate-x-[2deg]">

                {/* Stainless Steel Frame Gradient */}
                <div className="absolute inset-0 rounded-[68px] bg-gradient-to-tr from-[#333] via-[#111] to-[#222] opacity-80 pointer-events-none" />

                {/* Screen Container */}
                <div className="absolute top-[10px] left-[10px] right-[10px] bottom-[10px] bg-black rounded-[58px] overflow-hidden border-[4px] border-black z-10" style={{ WebkitMaskImage: "linear-gradient(to bottom, black, black)", maskImage: "linear-gradient(to bottom, black, black)" }}>
                    <PhoneScreen />

                    {/* Screen Reflection Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-40 pointer-events-none rounded-[54px] z-20" />
                </div>

                {/* Dynamic Island */}
                <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50 flex justify-between items-center px-4 ring-1 ring-white/5 shadow-sm">
                    {/* Selfie Cam */}
                    <div className="w-[12px] h-[12px] rounded-full bg-[#111] ring-1 ring-white/10 shadow-inner" />
                    {/* FaceID Sensors */}
                    <div className="w-8 h-2 bg-[#080808] rounded-full opacity-60" />
                </div>

                {/* Side Buttons (Simulated with div + gradients) */}
                {/* Silent */}
                <div className="absolute top-[110px] -left-[6px] w-[6px] h-[26px] bg-gradient-to-b from-[#444] to-[#222] rounded-l-[3px] shadow-lg" />
                {/* Vol Up */}
                <div className="absolute top-[160px] -left-[6px] w-[6px] h-[50px] bg-gradient-to-b from-[#555] to-[#222] rounded-l-[3px] shadow-lg border-r border-[#111]" />
                {/* Vol Down */}
                <div className="absolute top-[224px] -left-[6px] w-[6px] h-[50px] bg-gradient-to-b from-[#555] to-[#222] rounded-l-[3px] shadow-lg border-r border-[#111]" />
                {/* Power */}
                <div className="absolute top-[190px] -right-[6px] w-[6px] h-[80px] bg-gradient-to-b from-[#555] to-[#222] rounded-r-[3px] shadow-lg border-l border-[#111]" />

                {/* Antenna Bands (Subtle Lines) */}
                <div className="absolute top-[90px] left-0 w-[6px] h-[1px] bg-[#444] opacity-50" />
                <div className="absolute top-[90px] right-0 w-[6px] h-[1px] bg-[#444] opacity-50" />
                <div className="absolute bottom-[80px] left-0 w-[6px] h-[1px] bg-[#444] opacity-50" />
                <div className="absolute bottom-[80px] right-0 w-[6px] h-[1px] bg-[#444] opacity-50" />
            </div>
        </div>
    );
};


// --- Feature List Component ---

const FeatureItem = ({ icon: Icon, color, title, description, delay }: { icon: any, color: 'purple' | 'green' | 'amber' | 'blue', title: string, description: string, delay: number }) => {

    const theme = {
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', ring: 'group-hover:ring-purple-100' },
        green: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'group-hover:ring-emerald-100' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'group-hover:ring-amber-100' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'group-hover:ring-blue-100' },
    }[color];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex gap-6 group hover:translate-x-2 transition-transform duration-300"
        >
            <div className={`w-14 h-14 rounded-full ${theme.bg} flex items-center justify-center shrink-0 transition-all duration-300 ring-4 ring-transparent ${theme.ring} shadow-sm group-hover:shadow-md`}>
                <Icon className={`w-6 h-6 ${theme.text}`} />
            </div>
            <div className="pt-0.5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-purple-700 transition-colors">{title}</h3>
                <p className="text-[15px] text-slate-500 leading-relaxed max-w-sm">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};


// --- Main Section Component ---

export function MobileFirstSection() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden" id="mobile-feature">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[#FAFAFA] z-0">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-white to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="container mx-auto px-6 max-w-[1240px] relative z-10">

                {/* Header */}
                <div className="mb-20 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-4">
                            Enterprise Control
                        </span>
                        <h2 className="text-4xl md:text-[56px] font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                            Approve AI Actions <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Anywhere.</span>
                        </h2>
                        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light">
                            Capture contacts on the go. Review and approve AI work from your phone. Stay in control without being tied to your desk.
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

                    {/* Left: Features */}
                    <div className="w-full lg:w-[45%] space-y-12">
                        <FeatureItem
                            icon={Smartphone}
                            color="purple"
                            title="Capture Contacts Instantly"
                            description="Snap business cards, manually add contacts, or import from any source. AI enriches data while you network."
                            delay={0.1}
                        />
                        <FeatureItem
                            icon={CheckCircle}
                            color="green"
                            title="Approve on the Go"
                            description="Swipe to approve, edit, or reject AI actions from your phone. Quick approvals without breaking flow."
                            delay={0.2}
                        />
                        <FeatureItem
                            icon={Bell}
                            color="amber"
                            title="Real-Time Notifications"
                            description="Get push alerts for hot leads, urgent approvals, and important prospect responses."
                            delay={0.3}
                        />
                        <FeatureItem
                            icon={Chrome}
                            color="blue"
                            title="Desktop Extensions Too"
                            description="Capture contacts from LinkedIn, websites, and emails with our Chrome extension."
                            delay={0.4}
                        />
                    </div>

                    {/* Right: Mockump */}
                    <div className="w-full lg:w-[50%] flex justify-center lg:justify-end">
                        <PhoneMockup />
                    </div>

                </div>

                {/* Bottom CTA Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-28 flex justify-center"
                >
                    <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] px-10 py-8 text-center relative overflow-hidden">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Available on iOS & Android</div>
                        <div className="flex gap-4">
                            <AppStoreBadge />
                            <GooglePlayBadge />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
