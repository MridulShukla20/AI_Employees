import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, UserCircle, Building, Check, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    id: "free",
    badge: "For Teams",
    icon: Users,
    name: "Free Forever",
    price: "$0",
    priceDetail: "/month",
    subtitle: "Unlimited Human Seats",
    features: [
      "Collaborate with your team",
      "Access approval queue",
      "View AI employee work",
      "Report cards & analytics",
      "Mobile apps",
    ],
    cta: "Start Free",
    ctaVariant: "outline" as const,
    featured: false,
    bg: "bg-white",
    border: "border-border",
  },
  {
    id: "ai",
    badge: "Most Popular",
    icon: UserCircle,
    name: "AI Employee",
    price: "$99-299",
    priceDetail: "/month per employee",
    subtitle: "Specialized Roles",
    features: [
      "Specialized role training",
      "Unlimited executions",
      "Full report card",
      "Priority support",
      "Custom integrations",
    ],
    cta: "See Available Roles",
    ctaVariant: "default" as const,
    featured: true,
    bg: "gradient-primary",
    border: "border-purple-400",
  },
  {
    id: "enterprise",
    badge: "For Scale",
    icon: Building,
    name: "Enterprise",
    price: "Custom",
    priceDetail: "tailored pricing",
    subtitle: "Custom AI Workforce",
    features: [
      "Custom AI employees",
      "Dedicated success team",
      "Advanced integrations",
      "SLA & compliance",
      "Custom training",
    ],
    cta: "Talk to Sales",
    ctaVariant: "default" as const,
    featured: false,
    bg: "bg-indigo-dark",
    border: "border-white/20",
  },
];

const PricingCard = ({ tier, index }: { tier: typeof tiers[0]; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const isFeatured = tier.featured;
  const isDark = tier.id === "enterprise";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative ${isFeatured ? "lg:-translate-y-4 z-10" : ""}`}
    >
      <div
        className={`relative h-full rounded-3xl p-8 ${
          isFeatured
            ? "bg-gradient-to-br from-purple-600 to-purple-700 border-2 border-purple-400 shadow-purple-glow"
            : isDark
            ? "bg-indigo-dark border border-white/20"
            : "bg-white border-2 border-border"
        } transition-all duration-300 hover:shadow-elevated ${isFeatured ? "hover:shadow-[0_20px_50px_rgba(124,58,237,0.4)]" : ""}`}
      >
        {/* Featured glow */}
        {isFeatured && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 -z-10" />
        )}

        {/* Badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6 ${
          isFeatured
            ? "bg-amber-500 text-white animate-pulse"
            : isDark
            ? "bg-white/10 text-white/80"
            : "bg-muted text-muted-foreground"
        }`}>
          {tier.badge}
        </div>

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
          isFeatured
            ? "bg-white/20"
            : isDark
            ? "bg-gradient-to-br from-amber-400 to-amber-600"
            : "bg-purple-100"
        }`}>
          <tier.icon className={`w-7 h-7 ${isFeatured || isDark ? "text-white" : "text-purple-600"}`} />
        </div>

        {/* Title */}
        <h3 className={`font-display text-xl font-bold mb-4 ${
          isFeatured || isDark ? "text-white" : "text-foreground"
        }`}>
          {tier.name}
        </h3>

        {/* Price */}
        <div className="mb-6">
          <span className={`text-5xl font-display font-bold ${
            isFeatured || isDark ? "text-white" : "text-primary"
          }`}>
            {tier.price}
          </span>
          <span className={`text-sm ${isFeatured || isDark ? "text-white/70" : "text-muted-foreground"}`}>
            {tier.priceDetail}
          </span>
        </div>

        {/* Subtitle */}
        <p className={`text-sm mb-8 ${isFeatured || isDark ? "text-white/80" : "text-muted-foreground"}`}>
          {tier.subtitle}
        </p>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                isFeatured
                  ? "bg-white/20"
                  : isDark
                  ? "bg-amber-500/20"
                  : "bg-emerald-100"
              }`}>
                {isFeatured ? (
                  <Sparkles className="w-3 h-3 text-white" />
                ) : isDark ? (
                  <Sparkles className="w-3 h-3 text-amber-400" />
                ) : (
                  <Check className="w-3 h-3 text-emerald-600" />
                )}
              </div>
              <span className={`text-sm ${isFeatured || isDark ? "text-white/90" : "text-foreground"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to={tier.id === "ai" ? "/marketplace" : tier.id === "free" ? "/" : "/pricing"}>
          <Button
            className={`w-full h-12 font-semibold group ${
              isFeatured
                ? "bg-white text-purple-600 hover:bg-white/90"
                : isDark
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 hover:from-amber-400 hover:to-amber-500"
                : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
            }`}
            variant={tier.ctaVariant}
          >
            {tier.cta}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export function NewPricingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Predictable Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            No surprises. No hidden fees. Scale as you grow.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-50 border border-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              All plans include hard spending caps. No surprise bills.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
