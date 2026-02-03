import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Zap, Clock } from "lucide-react";

const testimonials = [
  {
    metric: "4x increase in meetings booked",
    metricIcon: TrendingUp,
    quote: "Riya handles 100% of my call analysis. I just approve her coaching notes and focus on selling. It's like having a dedicated SDR that works 24/7.",
    name: "Alex Rivera",
    title: "Founder, GrowthMetric",
    avatar: "AR",
    avatarGradient: "from-purple-400 to-purple-600",
    borderColor: "border-l-purple-500",
    metricBg: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    metric: "80% time saved on screening",
    metricIcon: Clock,
    quote: "Tara screens hundreds of resumes overnight. I wake up to a prioritized list of top candidates. Our time-to-hire dropped from 6 weeks to 2.",
    name: "Sarah Chen",
    title: "Head of Talent, Nexus Labs",
    avatar: "SC",
    avatarGradient: "from-amber-400 to-orange-500",
    borderColor: "border-l-amber-500",
    metricBg: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
  {
    metric: "3x content output",
    metricIcon: Zap,
    quote: "Sana drafts our blog posts, and I just add the final touches. What used to take my team a week now takes a day. The quality stays consistent.",
    name: "Michael Torres",
    title: "Marketing Director, Cloudpeak",
    avatar: "MT",
    avatarGradient: "from-emerald-400 to-teal-500",
    borderColor: "border-l-emerald-500",
    metricBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group"
    >
      <div className={`h-full bg-white rounded-3xl p-8 border-l-4 ${testimonial.borderColor} border border-border shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2`}>
        {/* Metric badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${testimonial.metricBg} text-white text-sm font-semibold mb-6 shadow-lg`}>
          <testimonial.metricIcon className="w-4 h-4" />
          {testimonial.metric}
        </div>

        {/* Quote */}
        <blockquote className="text-lg text-foreground leading-relaxed mb-8 italic">
          "{testimonial.quote}"
        </blockquote>

        {/* Attribution */}
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarGradient} flex items-center justify-center text-white font-semibold border-2 border-white shadow-md`}>
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-semibold text-foreground">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">{testimonial.title}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function NewTestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real Teams, Real Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how companies are extending their teams with AI employees.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
