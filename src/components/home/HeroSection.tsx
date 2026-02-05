import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroPill = ({
  icon: Icon,
  title,
  subtitle,
  className,
  delay = 0
}: {
  icon: any,
  title: string,
  subtitle: string,
  className?: string,
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -15, 0]
      }}
      transition={{
        opacity: { duration: 1.2, delay, ease: "easeOut" },
        scale: { duration: 1.2, delay, ease: "easeOut" },
        y: {
          repeat: Infinity,
          duration: 10 + Math.random() * 4, // Slower, deeper breath (10-14s)
          ease: "easeInOut",
          delay: Math.random() * 2
        }
      }}
      className={`absolute hidden lg:flex items-center gap-5 px-6 py-5 rounded-full bg-background/60 border border-white/20 shadow-2xl backdrop-blur-md hover:scale-105 hover:bg-background/80 hover:border-primary/30 transition-all duration-500 w-[320px] cursor-default group z-0 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-inner">
        <Icon className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors duration-300" />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold text-foreground leading-tight tracking-tight">{title}</span>
        <span className="text-xs text-muted-foreground font-medium leading-tight mt-1">{subtitle}</span>
      </div>
    </motion.div>
  );
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Subtle parallax
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-[95vh] flex items-center bg-background/50 selection:bg-primary/20">
      {/* Premium visual layering */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.15]" />
      <div className="absolute inset-0 bg-atmosphere opacity-60" />

      {/* Deep, rich gradient center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,_hsla(270,60%,50%,0.08),_transparent_80%)]" />

      {/* Principles Layer - Floating Value Pills */}
      <div className="absolute inset-0 max-w-[1600px] mx-auto pointer-events-none">

        {/* Left: Free Human Seats */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-auto">
          <HeroPill
            icon={UserPlus}
            title="Free Human Seats"
            subtitle="Unlimited teammates. Always free."
            className="top-[30%] left-[4%] xl:left-[8%]"
            delay={0.1}
          />
        </motion.div>

        {/* Top Right: You Stay in Control */}
        <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-auto">
          <HeroPill
            icon={UserCheck}
            title="You Stay in Control"
            subtitle="Approve every action before it happens."
            className="top-[15%] right-[4%] xl:right-[8%]"
            delay={0.3}
          />
        </motion.div>

        {/* Bottom Right: AI From $99/month */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-auto">
          <HeroPill
            icon={Sparkles}
            title="AI From $99/month"
            subtitle="Hire specialized AI employees as needed."
            className="bottom-[20%] right-[6%] xl:right-[10%]"
            delay={0.5}
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 relative z-10 pointer-events-none">
        <div className="max-w-5xl mx-auto text-center pointer-events-auto">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.95] drop-shadow-sm text-foreground"
          >
            Hire AI Employees. <br className="hidden md:block" />
            <span className="text-foreground bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 saturate-[1.2]">
              Keep Your Team Free.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Collaborate with specialized AI employees that work alongside your team. <br className="hidden md:block" />
            You approve everything. They execute perfectly.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Button
              size="lg"
              className="text-lg px-10 h-16 min-w-[200px] rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-semibold bg-primary hover:bg-primary/90"
            >
              Hire Your First AI Employee
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 h-16 min-w-[200px] rounded-full border-2 hover:bg-secondary/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm bg-background/50"
            >
              See Who's Available
            </Button>
          </motion.div>

          {/* Trust Footnote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 text-sm font-medium text-muted-foreground/60 tracking-wide uppercase"
          >
            Trusted by founders at 100+ high-growth startups
          </motion.p>
        </div>
      </div>
    </section>
  );
}
