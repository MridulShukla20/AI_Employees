import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, XCircle, Lock } from "lucide-react";

// Geometric avatar for AI employees constellation
const AIAvatar = ({ name, color, size = 60, delay = 0 }: { name: string; color: string; size?: number; delay?: number }) => (
  <motion.div
    className="absolute"
    animate={{
      y: [0, -8, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    style={{
      width: size,
      height: size,
    }}
  >
    <div
      className={`w-full h-full rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
    >
      <span className="text-white font-display font-bold" style={{ fontSize: size * 0.4 }}>
        {name.charAt(0)}
      </span>
    </div>
  </motion.div>
);

export function NewFinalCTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-dark via-purple-900 to-purple-800" />
      
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/40 blur-[100px]"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: "-20%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-pink-500/30 blur-[80px]"
          animate={{ x: [0, -50, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ bottom: "-10%", right: "-5%" }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Floating stars/sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* AI Employee avatars constellation */}
        <div className="relative h-24 mb-8 max-w-xl mx-auto hidden md:block">
          <AIAvatar name="Mira" color="from-purple-400 to-purple-600" size={50} delay={0} />
          <AIAvatar name="Riya" color="from-pink-400 to-rose-500" size={40} delay={0.3} />
          <AIAvatar name="Maya" color="from-amber-400 to-orange-500" size={45} delay={0.6} />
          <AIAvatar name="Sofia" color="from-teal-400 to-cyan-500" size={35} delay={0.9} />
          <AIAvatar name="Zara" color="from-rose-400 to-pink-500" size={42} delay={1.2} />
          <AIAvatar name="Lena" color="from-indigo-400 to-purple-500" size={38} delay={1.5} />
          <AIAvatar name="Sana" color="from-blue-400 to-indigo-500" size={48} delay={1.8} />
          <AIAvatar name="Priya" color="from-emerald-400 to-teal-500" size={36} delay={2.1} />
          
          {/* Position avatars in arc */}
          <style>{`
            .relative > div:nth-child(1) { left: 5%; top: 20%; }
            .relative > div:nth-child(2) { left: 18%; top: 0%; }
            .relative > div:nth-child(3) { left: 32%; top: 15%; }
            .relative > div:nth-child(4) { left: 45%; top: 5%; }
            .relative > div:nth-child(5) { left: 55%; top: 18%; }
            .relative > div:nth-child(6) { left: 68%; top: 0%; }
            .relative > div:nth-child(7) { left: 78%; top: 12%; }
            .relative > div:nth-child(8) { left: 88%; top: 25%; }
          `}</style>

          {/* Connecting dotted lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <motion.path
              d="M 30 50 Q 150 10, 270 40 Q 400 10, 520 50"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Ready to Hire Your First AI Employee?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto"
          >
            Start collaborating in 5 minutes. See how AI employees can transform your operations.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="group relative h-16 px-10 text-lg font-semibold bg-white text-purple-600 hover:bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-sparkle" />
              Start Hiring AI Employees
            </Button>
          </motion.div>

          {/* Secondary text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/60 mt-6"
          >
            Free for your human team. Always.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {[
              { icon: ShieldCheck, text: "No credit card required" },
              { icon: XCircle, text: "Cancel anytime" },
              { icon: Lock, text: "Data encrypted & secure" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm"
              >
                <badge.icon className="w-4 h-4" />
                {badge.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
