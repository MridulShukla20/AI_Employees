import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    CheckCircle2,
    XCircle,
    Zap,
    Clock,
    Target,
    Shield,
    TrendingUp,
    Settings,
    Calendar,
    Mail,
    Database as DatabaseIcon,
    BarChart3,
    Users as UsersIcon,
    Sparkles,
} from "lucide-react";
import { getEmployeeById, getRelatedEmployees, departmentLabelMap } from "@/data/employees";
import { IntegrationsOrbit } from "@/components/ui/IntegrationsOrbit";

const AIEmployeeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const employee = id ? getEmployeeById(id) : undefined;
    const relatedEmployees = id ? getRelatedEmployees(id) : [];

    if (!employee) {
        return <Navigate to="/" replace />;
    }

    // Department pill labels
    const departmentPills: Record<string, string> = {
        sales: "For Sales",
        marketing: "For Marketing",
        recruitment: "For Hiring",
    };

    // Value strip icons
    const valueStripIcons = [Zap, Clock, Target, Shield, TrendingUp];

    // Integration icons (generic)
    const integrationPositions = [
        { top: '10%', left: '50%', delay: 0 },
        { top: '25%', left: '85%', delay: 0.1 },
        { top: '60%', left: '90%', delay: 0.2 },
        { top: '85%', left: '70%', delay: 0.3 },
        { top: '85%', left: '30%', delay: 0.4 },
        { top: '60%', left: '10%', delay: 0.5 },
        { top: '25%', left: '15%', delay: 0.6 },
    ];

    return (
        <Layout>
            {/* SECTION 1: HERO - Centered with floating elements */}
            <section className="pt-28 pb-20 relative overflow-hidden">
                {/* Background flow lines */}
                <div className="absolute inset-0 overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 600">
                        <path d="M0,300 Q200,200 400,300 T800,300" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M0,350 Q200,250 400,350 T800,350" fill="none" stroke="currentColor" strokeWidth="1" />
                        <path d="M0,250 Q200,150 400,250 T800,250" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </div>

                {/* Floating decorative icons */}
                <motion.div
                    className="absolute top-32 left-[10%] w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Mail className="w-5 h-5 text-primary/30" />
                </motion.div>
                <motion.div
                    className="absolute top-48 right-[12%] w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <DatabaseIcon className="w-6 h-6 text-primary/30" />
                </motion.div>
                <motion.div
                    className="absolute bottom-32 left-[15%] w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <BarChart3 className="w-4 h-4 text-primary/30" />
                </motion.div>
                <motion.div
                    className="absolute bottom-48 right-[8%] w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                    <Calendar className="w-5 h-5 text-primary/30" />
                </motion.div>

                <div className="container mx-auto px-6 relative">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Department pill */}
                        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
                            {departmentPills[employee.department]}
                        </Badge>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
                            Deploy your AI{" "}
                            <span className="text-gradient">{employee.role}</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {employee.headline}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="shadow-elevated hover:shadow-glow transition-shadow">
                                Start Free
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline">
                                Book a demo
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: VALUE STRIP */}
            <section className="py-8 border-y border-border bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
                        {employee.valueStrip.map((value, i) => {
                            const Icon = valueStripIcons[i % valueStripIcons.length];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                                >
                                    <Icon className="w-4 h-4 text-primary" />
                                    <span>{value}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 3: WITHOUT vs WITH AI EMPLOYEE */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Without AI Employee */}
                            <div className="bg-card rounded-2xl p-8 border border-border">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                        <XCircle className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-muted-foreground">Without an AI Employee</h3>
                                </div>
                                <ul className="space-y-4">
                                    {employee.painPoints.map((pain, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <XCircle className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">{pain}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* With AI Employee */}
                            <div className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-2xl p-8 border-2 border-primary/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold">With {employee.name}</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {employee.outcomes.map((outcome, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <span className="font-medium">{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4: TRAIN & CUSTOMIZE */}
            <section className="py-20 bg-muted/30 border-y border-border">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Text block */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Train and customize{" "}
                                    <span className="text-gradient">{employee.name}</span>{" "}
                                    to work how you work.
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Adapt to your workflows, playbooks, and tools. {employee.name} learns your preferences and gets smarter with every interaction.
                                </p>
                            </div>

                            {/* System diagram */}
                            <div className="relative">
                                <div className="aspect-square max-w-md mx-auto relative">
                                    {/* Center avatar */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-elevated z-10"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <employee.icon className="w-12 h-12 text-white" />
                                    </motion.div>

                                    {/* Orbiting integration icons */}
                                    {employee.integrations.slice(0, 7).map((integration, i) => {
                                        const pos = integrationPositions[i];
                                        return (
                                            <motion.div
                                                key={i}
                                                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card border border-border shadow-soft flex items-center justify-center"
                                                style={{ top: pos.top, left: pos.left }}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: pos.delay + 0.3 }}
                                            >
                                                <span className="text-xs font-medium text-muted-foreground text-center px-1">
                                                    {integration.split(' ')[0]}
                                                </span>
                                            </motion.div>
                                        );
                                    })}

                                    {/* Connection lines (decorative) */}
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" strokeDasharray="2 2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 5: CORE CAPABILITIES */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto space-y-16">
                        {employee.capabilities.map((capability, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Visual mockup */}
                                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-8 border border-border aspect-video flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
                                                <Sparkles className="w-8 h-8 text-white" />
                                            </div>
                                            <p className="text-sm font-medium text-muted-foreground">{capability.title}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6">{capability.title}</h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {capability.points.map((point, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6: WHERE THIS EMPLOYEE FITS */}
            <section className="py-16 border-y border-border">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Where {employee.name} Fits
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            {employee.name} works across teams, adapting to your specific workflows and needs.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Badge className="px-4 py-2 text-sm font-medium">
                                Optimized for {employee.departmentLabel}
                            </Badge>
                            {employee.secondaryDepartments?.map(d => (
                                <Badge key={d} variant="secondary" className="px-4 py-2 text-sm">
                                    Also used by {departmentLabelMap[d]}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 7: INTEGRATIONS ORBIT - Only show if integrations exist */}
            {employee.integrations && employee.integrations.length > 0 && (
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Integrates with your existing stack
                            </h2>
                            <p className="text-lg text-muted-foreground mb-12">
                                {employee.name} connects to the tools you already use
                            </p>

                            {/* Orbital layout */}
                            <div className="mb-4">
                                <IntegrationsOrbit
                                    employeeName={employee.name}
                                    employeeIcon={employee.icon}
                                    integrations={employee.integrations}
                                    department={employee.department}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* SECTION 8: FINAL CTA */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to deploy {employee.name}?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Get started in minutes. Stay in control.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="shadow-elevated hover:shadow-glow transition-shadow">
                                Start Free
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline">
                                Book a demo
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Related Employees */}
            {relatedEmployees.length > 0 && (
                <section className="py-16 border-t border-border bg-muted/30">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-xl font-bold mb-6 text-center">Often Deployed Together</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {relatedEmployees.map((related) => (
                                    <Link
                                        key={related.id}
                                        to={`/ai-employees/${related.id}`}
                                        className="group p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-soft transition-all flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                                            <related.icon className="w-5 h-5 text-primary-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">{related.name}</h3>
                                            <p className="text-sm text-muted-foreground">{related.role}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
};

export default AIEmployeeDetail;
