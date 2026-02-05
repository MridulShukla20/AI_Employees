import { motion } from "framer-motion";
import { Quote, TrendingUp } from "lucide-react";

// Official SVG Paths from Simple Icons
const brandLogos = [
  {
    name: "Stripe",
    path: "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z",
    viewBox: "0 0 24 24"
  },
  {
    name: "Vercel",
    path: "m12 1.608 12 20.784H0Z",
    viewBox: "0 0 24 24"
  },
  {
    name: "Linear",
    path: "M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z",
    viewBox: "0 0 24 24"
  },
  {
    name: "Raycast",
    path: "M6.004 15.492v2.504L0 11.992l1.258-1.249Zm2.504 2.504H6.004L12.008 24l1.253-1.253zm14.24-4.747L24 11.997 12.003 0 10.75 1.251 15.491 6h-2.865L9.317 2.692 8.065 3.944l2.06 2.06H8.691v9.31H18v-1.432l2.06 2.06 1.252-1.252-3.312-3.32V8.506ZM6.63 5.372 5.38 6.625l1.342 1.343 1.251-1.253Zm10.655 10.655-1.247 1.251 1.342 1.343 1.253-1.251zM3.944 8.059 2.692 9.31l3.312 3.314v-2.506zm9.936 9.937h-2.504l3.314 3.312 1.25-1.252z",
    viewBox: "0 0 24 24"
  }
];

const testimonials = [
  {
    quote: "I was drowning in manual outreach. Now Maya handles 100% of the initial drafting and research. I just approve and hit send. It's like having a dedicated SDR who works 24/7.",
    author: "Alex Rivera",
    role: "Founder, GrowthMetric",
    image: "AR",
    metric: "4x increase in meetings booked"
  },
  {
    quote: "The deal briefs Sofia generates are better than what my old analyst produced. She catches risks I would have definitely missed. My forecast accuracy has never been higher.",
    author: "Sarah Chen",
    role: "VP Sales, TechFlow",
    image: "SC",
    metric: "45% faster deal cycles"
  }
];

export function TrustSection() {
  return (
    <section className="py-24 bg-muted/30 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted to execute critical work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Founders and leaders trust PrimeRole employees to represent their brand and execute their strategy.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all relative"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-primary/5" />

              <div className="mb-6">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-4 bg-primary/5 w-fit px-3 py-1 rounded-full border border-primary/10">
                  <TrendingUp className="w-4 h-4" />
                  {t.metric}
                </div>
                <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                  {t.image}
                </div>
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real Logo Strip */}
        <div className="border-y border-border/40 py-12 bg-background/50">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {brandLogos.map((logo) => (
              <div
                key={logo.name}
                className="group flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                title={logo.name}
              >
                <svg
                  viewBox={logo.viewBox}
                  className="h-8 w-auto fill-current text-foreground group-hover:text-primary transition-colors duration-300"
                  aria-label={logo.name}
                >
                  <path d={logo.path} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
