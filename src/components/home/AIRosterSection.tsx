import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Megaphone, Users, CheckCircle, Database, Headphones, Mail } from "lucide-react";

type Department = 'sales' | 'marketing' | 'recruiting';

interface Employee {
    name: string;
    role: string;
    description: string;
    tag: string;
    metric: string;
    icon: any;
    color: string;
    bg: string;
    departments: Department[]; // Added for filtering and pills
}

// Flattened Roster Data - Merging duplicates (Mira, Maya, Riya) based on primary roles
const roster: Employee[] = [
    {
        name: "Mira",
        role: "Data & RevOps Specialist",
        description: "Keeps your CRM accurate, insights flowing, and marketing lists segmented.", // Merged concept without changing much text
        tag: "Needs: Data Access",
        metric: "99.8% data accuracy",
        icon: Database,
        color: "text-purple-600",
        bg: "bg-purple-100",
        departments: ['sales', 'marketing']
    },
    {
        name: "Maya",
        role: "Outreach Specialist",
        description: "Writes personalized emails that get replies and coordinates outreach campaigns.",
        tag: "Needs: Leads",
        metric: "45% reply rate",
        icon: Mail,
        color: "text-indigo-600",
        bg: "bg-indigo-100",
        departments: ['sales', 'marketing']
    },
    {
        name: "Riya",
        role: "Performance Coach", // Slight generalized title
        description: "Turns every call into a coaching opportunity and improves interview techniques.",
        tag: "Needs: Recordings",
        metric: "4x increase in meetings",
        icon: Headphones,
        color: "text-violet-600",
        bg: "bg-violet-100",
        departments: ['sales', 'recruiting']
    },
    {
        name: "Sofia",
        role: "Deal Advisor",
        description: "Your always-on deal desk analyst. Catches risks early.",
        tag: "Needs: CRM",
        metric: "Catches risks early",
        icon: TrendingUp,
        color: "text-blue-600",
        bg: "bg-blue-100",
        departments: ['sales']
    },
    {
        name: "Zara",
        role: "Social Media Manager",
        description: "Schedules and optimizes multi-platform posts for maximum engagement.",
        tag: "Needs: Brand Voice",
        metric: "3x engagement",
        icon: Megaphone,
        color: "text-pink-600",
        bg: "bg-pink-100",
        departments: ['marketing']
    },
    {
        name: "Lena",
        role: "Email Campaign Manager",
        description: "Writes and A/B tests high-converting emails and nurture sequences.",
        tag: "Needs: Strategy",
        metric: "40% open rate",
        icon: Mail,
        color: "text-orange-600",
        bg: "bg-orange-100",
        departments: ['marketing']
    },
    {
        name: "Priya",
        role: "Talent Sourcer",
        description: "Source qualified candidates automatically from multiple channels.",
        tag: "Needs: Job Spec",
        metric: "5x candidate pool",
        icon: Users,
        color: "text-green-600",
        bg: "bg-green-100",
        departments: ['recruiting']
    },
    {
        name: "Tara",
        role: "Screening Specialist",
        description: "Screen resumes and rank applicants based on your criteria.",
        tag: "Needs: Criteria",
        metric: "90% time saved",
        icon: CheckCircle,
        color: "text-emerald-600",
        bg: "bg-emerald-100",
        departments: ['recruiting']
    }
];

const tabs = [
    { id: "all", label: "All Employees" },
    { id: "sales", label: "Sales" },
    { id: "marketing", label: "Marketing" },
    { id: "recruiting", label: "Recruiting" },
];

const deptColors: Record<Department, string> = {
    sales: "text-purple-600 bg-purple-50 border-purple-100",
    marketing: "text-pink-600 bg-pink-50 border-pink-100",
    recruiting: "text-emerald-600 bg-emerald-50 border-emerald-100",
};

const EmployeeCard = ({ employee, index }: { employee: Employee, index: number }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="group relative h-full"
    >
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">

            {/* Header: Icon + Pills */}
            <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl ${employee.bg} ${employee.color} flex items-center justify-center`}>
                    <employee.icon className="w-7 h-7" />
                </div>

                {/* Department Pills */}
                <div className="flex flex-col items-end gap-1.5">
                    {employee.departments.map(dept => (
                        <span key={dept} className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${deptColors[dept]}`}>
                            {dept}
                        </span>
                    ))}
                </div>
            </div>

            {/* Name & Role */}
            <h3 className="text-xl font-bold text-gray-900 mb-1">{employee.name}</h3>
            <p className="text-sm font-medium text-gray-500 mb-4">{employee.role}</p>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{employee.description}</p>

            {/* Footer */}
            <div className="space-y-4 pt-4 border-t border-gray-50 mt-auto">
                <div className="flex flex-wrap gap-2">
                    {/* Tag */}
                    <div className="inline-flex px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[11px] font-semibold text-gray-500">
                        {employee.tag}
                    </div>
                    {/* Metric Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${employee.bg} bg-opacity-70`}>
                        <CheckCircle className={`w-3.5 h-3.5 ${employee.color}`} />
                        <span className={`text-[11px] font-bold ${employee.color}`}>{employee.metric}</span>
                    </div>
                </div>
            </div>

            {/* Hover CTA */}
            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                <button className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-xl hover:bg-slate-800 transition-colors text-sm">
                    Hire {employee.name}
                </button>
            </div>
        </div>
    </motion.div>
);

export function AIRosterSection() {
    const [activeTab, setActiveTab] = useState("all");

    const filteredEmployees = activeTab === "all"
        ? roster
        : roster.filter(e => e.departments.includes(activeTab as Department));

    return (
        <section className="py-24 bg-gray-50/50" id="roster">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* --- HEADER (Centered) --- */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-display">
                        Meet Your New <span className="text-purple-600">AI Team</span>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Hire specialized AI employees trained for specific roles. Each one joins your team, learns your process, and executes work autonomously.
                    </p>
                </div>

                {/* --- TABS (Centered) --- */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-gray-50"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- GRID (Centered) --- */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredEmployees.map((employee, index) => (
                            <EmployeeCard key={employee.name} employee={employee} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
}
