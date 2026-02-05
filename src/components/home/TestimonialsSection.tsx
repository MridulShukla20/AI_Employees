import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "Riya analyzes my sales calls and gives me coaching notes to approve. It's like having a dedicated analyst.",
        name: "Alex Rivera",
        title: "Founder, GrowthMetric",
        metric: "4x increase in meetings booked",
    },
    {
        quote: "Sofia's deal briefs catch risks I would have missed. I approve her recommendations and accuracy is up.",
        name: "Sarah Chen",
        title: "VP Sales, TechFlow",
        metric: "45% faster deal cycles",
    },
    {
        quote: "Ada sources candidates while I sleep. Every morning I wake up to a curated list of qualified people.",
        name: "James Park",
        title: "Head of People, TechStart",
        metric: "5x candidate pipeline",
    },
];

// Official SVG Logos (Full Color)
const logos = [
    { name: "Notion", url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" },
    { name: "GitLab", url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg" },
    { name: "Twilio", url: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg" },
    { name: "Stripe", url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
];

export function TestimonialsSection() {
    return (
        <section className="py-16 bg-gray-50/30 border-t border-slate-100 relative overflow-hidden" id="testimonials">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Section Header (Compact) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-display">
                        Real Outcomes
                    </h2>
                </motion.div>

                {/* Testimonial Cards (Compact Grid) */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-gray-100 text-left"
                        >
                            {/* Quote */}
                            <p className="text-gray-800 text-[15px] leading-relaxed font-medium mb-6 min-h-[48px]">
                                "{testimonial.quote}"
                            </p>

                            {/* Author Block */}
                            <div>
                                <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                                <div className="text-xs text-gray-500 mb-3">{testimonial.title}</div>

                                {/* Metric (Text Only, No Pills) */}
                                <div className="text-xs font-semibold text-purple-700">
                                    {testimonial.metric}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust / Logos Section */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                        Trusted by teams at
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-100">
                        {logos.map((logo) => (
                            <img
                                key={logo.name}
                                src={logo.url}
                                alt={`${logo.name} logo`}
                                className="h-6 md:h-7 w-auto object-contain transition-opacity hover:opacity-80"
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
