import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, UserPlus, ShieldCheck, Zap, ChevronDown } from "lucide-react";

// Animated gradient orbs
const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[120px]"
      animate={{
        x: [0, 50, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      style={{ top: "-20%", left: "-10%" }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full bg-blue-400/15 blur-[100px]"
      animate={{
        x: [0, -40, 0],
        y: [0, 50, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      style={{ top: "20%", right: "-5%" }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full bg-pink-400/15 blur-[80px]"
      animate={{
        x: [0, 30, 0],
        y: [0, -40, 0],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={{ bottom: "10%", left: "30%" }}
    />
  </div>
);

// Floating feature card component
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  glowColor: string;
  delay: number;
  position: string;
}

const FloatingCard = ({ icon: Icon, title, subtitle, glowColor, delay, position }: FeatureCardProps) => (
  <motion.div
    className={`absolute hidden lg:flex flex-col items-start p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-elevated border border-white/50 ${position}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 + delay, duration: 0.6 }}
    style={{
      boxShadow: `0 8px 32px ${glowColor}`,
    }}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3`} style={{ background: glowColor.replace('0.15', '0.2') }}>
        <Icon className="w-6 h-6" style={{ color: glowColor.replace('rgba(', '').replace(', 0.15)', '').includes('16, 185') ? '#10B981' : glowColor.includes('245') ? '#F59E0B' : '#14B8A6' }} />
      </div>
      <h4 className="font-semibold text-foreground text-base">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </motion.div>
  </motion.div>
);

export function NewHeroSection() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("how-it-works");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-hero-bg animate-gradient" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient orbs */}
      <GradientOrbs />

      {/* Floating feature cards */}
      <FloatingCard
        icon={UserPlus}
        title="Free Human Seats"
        subtitle="Unlimited teammates. Always free."
        glowColor="rgba(20, 184, 166, 0.15)"
        delay={0}
        position="top-[18%] left-[8%]"
      />
      <FloatingCard
        icon={ShieldCheck}
        title="You Stay in Control"
        subtitle="Approve every action first."
        glowColor="rgba(245, 158, 11, 0.15)"
        delay={0.3}
        position="top-[22%] right-[6%]"
      />
      <FloatingCard
        icon={Zap}
        title="AI From $99/month"
        subtitle="Specialized employees as needed."
        glowColor="rgba(16, 185, 129, 0.15)"
        delay={0.6}
        position="bottom-[22%] right-[10%]"
      />

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            <span className="text-gradient">Hire AI Employees.</span>
            <br />
            <span className="text-foreground">Keep Your Team Free.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Collaborate with specialized AI employees that work alongside your team. 
            You approve everything. They execute perfectly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="group relative px-8 h-14 text-base font-semibold gradient-primary hover:opacity-90 shadow-purple-glow hover:shadow-[0_12px_40px_hsl(263_70%_50%_/_0.35)] transition-all duration-300 hover:-translate-y-1"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-sparkle" />
              Hire Your First AI Employee
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 h-14 text-base font-medium border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              See Who's Available
            </Button>
          </motion.div>

          {/* Mobile feature badges (shown instead of floating cards on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="lg:hidden flex flex-wrap justify-center gap-3 mt-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-border">
              <UserPlus className="w-4 h-4 text-teal-500" />
              <span className="text-sm font-medium">Free Human Seats</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-border">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">You Stay in Control</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-border">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">AI From $99/mo</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-sm font-medium">See how it works</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
