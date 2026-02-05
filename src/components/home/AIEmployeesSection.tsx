import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp, Megaphone, Users, Database, Headphones, Mail,
    Share2, FileText, Search, ClipboardCheck, Check
} from "lucide-react";

// --- Types ---

type Department = 'sales' | 'marketing' | 'recruiting';

interface Integration {
    name: string;
    domain: string;
}

interface Employee {
    name: string;
    role: string;
    description: string;
    icon: React.ElementType;
    capabilities: string[];
    integrations: Integration[];
    departments: Department[];
}

// --- Data ---

const departments: { id: Department; label: string; icon: React.ElementType; color: string; bgColor: string }[] = [
    { id: 'sales', label: 'Sales', icon: TrendingUp, color: '#7C3AED', bgColor: '#F3E8FF' },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, color: '#EC4899', bgColor: '#FCE7F3' },
    { id: 'recruiting', label: 'Recruiting', icon: Users, color: '#14B8A6', bgColor: '#CCFBF1' },
];

const employees: Employee[] = [
    // Sales Tab
    {
        name: "Mira",
        role: "DATA & REVOPS SPECIALIST",
        description: "Keeps your CRM accurate and insights flowing",
        icon: Database,
        capabilities: ["Enrich contact data automatically", "Score leads by ICP fit", "Maintain CRM hygiene", "Generate pipeline reports"],
        integrations: [
            { name: "Salesforce", domain: "salesforce.com" },
            { name: "HubSpot", domain: "hubspot.com" },
            { name: "Apollo", domain: "apollo.io" },
            { name: "LinkedIn", domain: "linkedin.com" },
            { name: "ZoomInfo", domain: "zoominfo.com" }
        ],
        departments: ['sales', 'marketing']
    },
    {
        name: "Riya",
        role: "SALES COACH",
        description: "Turns every call into a coaching opportunity",
        icon: Headphones,
        capabilities: ["Analyze call recordings", "Provide rep feedback", "Run mock sessions", "Identify winning patterns"],
        integrations: [
            { name: "Zoom", domain: "zoom.us" },
            { name: "Google Meet", domain: "meet.google.com" },
            { name: "Gong", domain: "gong.io" },
            { name: "Chorus", domain: "chorus.ai" }
        ],
        departments: ['sales', 'recruiting']
    },
    {
        name: "Maya",
        role: "OUTREACH SPECIALIST (SDR)",
        description: "Writes personalized emails that get replies",
        icon: Mail,
        capabilities: ["Research prospects", "Write custom sequences", "Handle email replies", "A/B test messaging"],
        integrations: [
            { name: "Gmail", domain: "gmail.com" },
            { name: "Outlook", domain: "outlook.com" },
            { name: "Salesloft", domain: "salesloft.com" },
            { name: "Outreach", domain: "outreach.io" },
            { name: "Apollo", domain: "apollo.io" }
        ],
        departments: ['sales', 'marketing']
    },
    {
        name: "Sofia",
        role: "DEAL ADVISOR",
        description: "Your always-on deal desk analyst",
        icon: TrendingUp,
        capabilities: ["Monitor pipeline health", "Flag risks early", "Suggest next actions", "Prepare meeting briefs"],
        integrations: [
            { name: "Salesforce", domain: "salesforce.com" },
            { name: "HubSpot", domain: "hubspot.com" },
            { name: "Pipedrive", domain: "pipedrive.com" }
        ],
        departments: ['sales']
    },
    // Marketing Specific
    {
        name: "Zara",
        role: "SOCIAL MEDIA MANAGER",
        description: "Schedules and optimizes multi-platform posts",
        icon: Share2,
        capabilities: ["Draft platform-specific posts", "Create content calendar", "Suggest trending topics", "Engage with comments"],
        integrations: [
            { name: "LinkedIn", domain: "linkedin.com" },
            { name: "Twitter", domain: "twitter.com" },
            { name: "Instagram", domain: "instagram.com" },
            { name: "Buffer", domain: "buffer.com" },
            { name: "Hootsuite", domain: "hootsuite.com" }
        ],
        departments: ['marketing']
    },
    {
        name: "Lena",
        role: "EMAIL CAMPAIGN MANAGER",
        description: "Writes and A/B tests high-converting emails",
        icon: Mail,
        capabilities: ["Build email campaigns", "Write compelling copy", "Segment audiences", "A/B test subject lines"],
        integrations: [
            { name: "Mailchimp", domain: "mailchimp.com" },
            { name: "HubSpot", domain: "hubspot.com" },
            { name: "Klaviyo", domain: "klaviyo.com" },
            { name: "SendGrid", domain: "sendgrid.com" }
        ],
        departments: ['marketing']
    },
    {
        name: "Sana",
        role: "CONTENT WRITER",
        description: "Creates SEO-optimized content in your brand voice",
        icon: FileText,
        capabilities: ["Write blog posts", "Create case studies", "Draft newsletters", "Optimize for SEO"],
        integrations: [
            { name: "WordPress", domain: "wordpress.org" },
            { name: "Webflow", domain: "webflow.com" },
            { name: "Notion", domain: "notion.so" },
            { name: "Google Docs", domain: "docs.google.com" }
        ],
        departments: ['marketing']
    },
    // Recruiting Specific
    {
        name: "Priya",
        role: "TALENT SOURCER",
        description: "Sources qualified candidates automatically",
        icon: Search,
        capabilities: ["Source qualified candidates", "Build talent pipelines", "Write outreach messages", "Track responses"],
        integrations: [
            { name: "LinkedIn Recruiter", domain: "linkedin.com" },
            { name: "Indeed", domain: "indeed.com" },
            { name: "ZipRecruiter", domain: "ziprecruiter.com" },
            { name: "AngelList", domain: "wellfound.com" }
        ],
        departments: ['recruiting']
    },
    {
        name: "Tara",
        role: "SCREENING SPECIALIST",
        description: "Reviews resumes and screens applicants",
        icon: ClipboardCheck,
        capabilities: ["Review resumes", "Rank applicants", "Run phone screens", "Schedule interviews"],
        integrations: [
            { name: "Greenhouse", domain: "greenhouse.io" },
            { name: "Lever", domain: "lever.co" },
            { name: "Ashby", domain: "ashbyhq.com" },
            { name: "Workday", domain: "workday.com" }
        ],
        departments: ['recruiting']
    }
];

// --- Components ---

const EmployeeCard = ({ employee, activeDeptColor }: { employee: Employee; activeDeptColor: string }) => {
    return (
        <div
            className="bg-white border border-slate-200 rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            style={{
                // Using style for dynamic hover border effect is simpler with inline styles or css vars, 
                // but for now we'll stick to class utilities and basic hover state. 
                // To do color department border on hover we'd need dynamic class or style.
            }}
        >
            {/* Department Badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
                {employee.departments.map(deptId => {
                    const d = departments.find(dep => dep.id === deptId)!;
                    return (
                        <span
                            key={deptId}
                            className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                            style={{ backgroundColor: d.bgColor, color: d.color }}
                        >
                            {d.label}
                        </span>
                    );
                })}
            </div>

            {/* Header */}
            <div className="mb-4">
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: `${activeDeptColor}15` }}
                >
                    <employee.icon className="w-7 h-7" style={{ color: activeDeptColor }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{employee.name}</h3>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{employee.role}</div>
            </div>

            <p className="text-[15px] text-slate-500 leading-relaxed mb-6">
                {employee.description}
            </p>

            {/* Capabilities */}
            <div className="space-y-3 mb-8">
                {employee.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                        <span className="text-sm text-slate-600 leading-normal">{cap}</span>
                    </div>
                ))}
            </div>

            {/* Integrations */}
            <div className="pt-6 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Integrates with:</div>
                <div className="flex flex-wrap gap-2">
                    {employee.integrations.map((int, i) => (
                        <img
                            key={i}
                            src={`https://logo.clearbit.com/${int.domain}`}
                            alt={int.name}
                            title={int.name}
                            className="w-6 h-6 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 hover:scale-110 cursor-help"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

export function AIEmployeesSection() {
    const [activeTab, setActiveTab] = useState<Department>('sales');
    const activeDeptData = departments.find(d => d.id === activeTab)!;

    // Filter employees based on active tab
    const visibleEmployees = employees.filter(emp => emp.departments.includes(activeTab));

    return (
        <section className="py-24 bg-white" id="ai-employees">
            <div className="container mx-auto px-6 max-w-[1200px]">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                        Meet Your AI Employees
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Hire specialized AI employees trained for specific roles. Each one joins your team and submits work to your approval queue.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="flex gap-8 border-b border-slate-200">
                        {departments.map((dept) => {
                            const Icon = dept.icon;
                            const isActive = activeTab === dept.id;
                            return (
                                <button
                                    key={dept.id}
                                    onClick={() => setActiveTab(dept.id)}
                                    className={`relative pb-4 flex items-center gap-2 text-sm md:text-base font-bold transition-all duration-300 ${isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? '' : 'grayscale opacity-70'}`} style={isActive ? { color: dept.color } : {}} />
                                    <span style={isActive ? { color: dept.color } : {}}>{dept.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="tab-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                                            style={{ backgroundColor: dept.color }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Grid */}
                <div className="max-w-[900px] mx-auto">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {visibleEmployees.map((emp) => (
                                <motion.div
                                    key={emp.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <EmployeeCard employee={emp} activeDeptColor={activeDeptData.color} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
