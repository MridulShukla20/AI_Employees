import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { employees, getEmployeesForDepartment } from "@/data/employees";

const AIEmployeesIndex = () => {
    const [searchParams] = useSearchParams();
    const deptFilter = searchParams.get("dept");

    // Get department title for filtered view
    const deptTitles: Record<string, string> = {
        sales: "Sales & RevOps",
        marketing: "Marketing",
        recruitment: "HR / Recruiting",
    };

    // Get employees based on filter
    const { primaryEmployees, secondaryEmployees, allEmployees } = (() => {
        if (!deptFilter) {
            return { primaryEmployees: [], secondaryEmployees: [], allEmployees: employees };
        }
        const { primary, secondary } = getEmployeesForDepartment(deptFilter);
        return { primaryEmployees: primary, secondaryEmployees: secondary, allEmployees: [] };
    })();

    // Employee card component with premium styling
    const EmployeeCard = ({ emp, index, isSecondary = false }: { emp: typeof employees[0]; index: number; isSecondary?: boolean }) => {
        const Icon = emp.icon;
        const hasSecondary = emp.secondaryDepartments && emp.secondaryDepartments.length > 0;

        return (
            <motion.div
                key={emp.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{
                    delay: index * 0.05,
                    duration: 0.35,
                    ease: [0.4, 0, 0.2, 1]
                }}
                layout
            >
                <Link
                    to={`/ai-employees/${emp.id}`}
                    className="group block h-full focus-ring rounded-2xl"
                >
                    <div className={`
                        h-full bg-card rounded-2xl border p-6 card-premium
                        ${isSecondary
                            ? 'border-dashed border-border/60 hover:border-primary/20'
                            : 'border-border hover:border-primary/30'
                        }
                    `}>
                        {/* Icon and departments */}
                        <div className="flex items-start justify-between mb-5">
                            <div className={`
                                w-12 h-12 rounded-xl flex items-center justify-center avatar-glow
                                ${isSecondary ? 'bg-primary/8' : 'gradient-primary'}
                            `}>
                                <Icon className={`w-6 h-6 ${isSecondary ? 'text-primary' : 'text-primary-foreground'}`} />
                            </div>
                            <div className="flex flex-wrap gap-1.5 justify-end max-w-[140px]">
                                <Badge variant="secondary" className="text-xs badge-subtle">
                                    {emp.departmentLabel}
                                </Badge>
                                {hasSecondary && (
                                    <Badge variant="outline" className="text-xs text-muted-foreground/70">
                                        +{emp.secondaryDepartments!.length} more
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Name and role */}
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-200">
                            {emp.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {emp.role}
                        </p>

                        {/* One-liner outcome */}
                        <p className="text-sm text-foreground/80 mb-6 leading-relaxed line-clamp-2">
                            {emp.oneLiner}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center text-sm font-medium text-primary">
                            View details
                            <ArrowRight className="w-4 h-4 ml-1.5 arrow-animate" />
                        </div>
                    </div>
                </Link>
            </motion.div>
        );
    };

    return (
        <Layout>
            {/* Hero */}
            <section className="pt-24 pb-16 relative overflow-hidden">
                {/* Premium visual layering */}
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 bg-atmosphere" />
                <div className="container mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            {deptFilter ? deptTitles[deptFilter] || "AI Employees" : "Meet Your AI Employees"}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {deptFilter
                                ? `AI teammates optimized for your ${deptTitles[deptFilter]?.toLowerCase()} team, and beyond.`
                                : "Role-based AI teammates that work inside your workflows, not outside them."}
                        </p>

                        {/* Filter badges */}
                        <div className="flex flex-wrap gap-2">
                            <Link to="/ai-employees">
                                <Badge
                                    variant={!deptFilter ? "default" : "secondary"}
                                    className="cursor-pointer hover-pill px-4 py-1.5"
                                >
                                    All
                                </Badge>
                            </Link>
                            {Object.entries(deptTitles).map(([key, title]) => (
                                <Link key={key} to={`/ai-employees?dept=${key}`}>
                                    <Badge
                                        variant={deptFilter === key ? "default" : "secondary"}
                                        className="cursor-pointer hover-pill px-4 py-1.5"
                                    >
                                        {title}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Employee Cards */}
            <section className="py-12 border-t border-border">
                <div className="container mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {/* All employees (no filter) */}
                        {!deptFilter && (
                            <motion.div
                                key="all"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl"
                            >
                                {allEmployees.map((emp, index) => (
                                    <EmployeeCard key={emp.id} emp={emp} index={index} />
                                ))}
                            </motion.div>
                        )}

                        {/* Filtered view with primary/secondary separation */}
                        {deptFilter && (
                            <motion.div
                                key={deptFilter}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                {/* Primary employees */}
                                {primaryEmployees.length > 0 && (
                                    <div className="mb-16">
                                        <h2 className="text-sm font-medium text-muted-foreground mb-6 flex items-center gap-2.5">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            Optimized for {deptTitles[deptFilter]}
                                        </h2>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                                            {primaryEmployees.map((emp, index) => (
                                                <EmployeeCard key={emp.id} emp={emp} index={index} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Secondary employees */}
                                {secondaryEmployees.length > 0 && (
                                    <div>
                                        <h2 className="text-sm font-medium text-muted-foreground mb-6 flex items-center gap-2.5">
                                            <span className="w-2 h-2 rounded-full bg-muted-foreground/40"></span>
                                            Also works with {deptTitles[deptFilter]}
                                        </h2>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                                            {secondaryEmployees.map((emp, index) => (
                                                <EmployeeCard key={emp.id} emp={emp} index={index} isSecondary />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 border-t border-border">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className="max-w-2xl text-center mx-auto"
                    >
                        <h2 className="text-2xl font-bold mb-4">Not sure where to start?</h2>
                        <p className="text-muted-foreground mb-8">
                            Book a demo and we'll help you choose the right AI employees for your team.
                        </p>
                        <Button size="lg" className="group">
                            Book a Demo
                            <ArrowRight className="w-4 h-4 ml-2 arrow-animate" />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default AIEmployeesIndex;
