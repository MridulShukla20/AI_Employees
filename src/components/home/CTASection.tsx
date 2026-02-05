import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Premium visual layering */}
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/8 via-primary/3 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Vision Statement */}
          <p className="text-lg text-muted-foreground mb-8 italic">
            "The future of work is humans and AI as teammates: each doing what they do best."
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to extend your team?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            See how AI employees can transform your operations in 30 minutes.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="text-base px-10 h-14 shadow-elevated hover:shadow-glow transition-all group"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
