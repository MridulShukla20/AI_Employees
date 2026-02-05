import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp, Megaphone, Users, Check,
    Database, Target, Phone, Briefcase, // Sales icons
    PenTool, Mail, Share2, // Marketing icons
    Search, FileCheck, // Recruiting icons
    CheckCircle2, MousePointer2, FileText, LayoutTemplate,
    Table2, User
} from "lucide-react";

// --- Types ---

type Department = 'sales' | 'marketing' | 'recruiting';

interface CapabilityCategory {
    id: string;
    label: string;
    icon: React.ElementType;
    title: string;
    description: string[];
    integrations: Integration[];
    demoData: DemoData;
}

interface Integration {
    name: string;
    domain: string;
    icon?: string;
}

interface DemoData {
    employeeName: string;
    employeeRole: string;
    employeeInitial: string;
    taskName: string;
    actionText: string;
    processingText: string;
    resultText: string;
    resultIcon: React.ElementType;

    // Real Content Fields
    contentType: 'text' | 'email' | 'data' | 'code';
    contentPreview: {
        title?: string;
        body?: string; // HTML-like string for typing effect
        dataRows?: { col1: string; col2: string; col3: string }[];
    };

    stats: { label: string; value: string }[];
}


// --- Data ---
const departments: { id: Department; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'sales', label: 'Sales', icon: TrendingUp, color: '#7C3AED' },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, color: '#EC4899' },
    { id: 'recruiting', label: 'Recruiting', icon: Users, color: '#14B8A6' },
];

const capabilitiesData: Record<Department, CapabilityCategory[]> = {
    sales: [
        {
            id: 'outreach', label: 'Outreach & Engagement', icon: Target,
            title: 'OUTREACH & ENGAGEMENT',
            description: ["Research prospects automatically", "Write personalized email sequences", "Handle reply detection & routing", "A/B test subject lines", "Track engagement metrics"],
            integrations: [{ name: "Gmail", domain: "gmail.com", icon: "/gmail-icon.png" }, { name: "Salesloft", domain: "salesloft.com" }, { name: "Outreach", domain: "outreach.io" }],
            demoData: {
                employeeName: "Maya",
                employeeRole: "Outreach Specialist",
                employeeInitial: "M",
                taskName: "Draft outreach emails",
                actionText: "Hand Off to Maya",
                processingText: "Drafting emails...",
                resultText: "47 Emails Drafted",
                resultIcon: Mail,
                contentType: 'email',
                contentPreview: {
                    title: "Re: Partnership Opportunity",
                    body: "Hi Sarah,\n\nI noticed your team is expanding rapidly. Typically, VP of Sales at this stage struggle with... \n\nBest,\nJason"
                },
                stats: [{ label: "Reply Rate", value: "23%" }, { label: "Time Saved", value: "4.5h" }]
            }
        },
        {
            id: 'data', label: 'Data & Enrichment', icon: Database,
            title: 'DATA & ENRICHMENT',
            description: ["Automatically enrich contacts", "Verify email addresses", "Score leads by ICP criteria", "Maintain CRM data hygiene", "Generate pipeline insights"],
            integrations: [{ name: "Salesforce", domain: "salesforce.com" }, { name: "HubSpot", domain: "hubspot.com" }, { name: "Apollo", domain: "apollo.io" }],
            demoData: {
                employeeName: "Mira",
                employeeRole: "Data Specialist",
                employeeInitial: "Mi",
                taskName: "Enrich contact list",
                actionText: "Hand Off to Mira",
                processingText: "Enriching contacts...",
                resultText: "127 Contacts Enriched",
                resultIcon: Database,
                contentType: 'data',
                contentPreview: {
                    dataRows: [
                        { col1: "Acme Corp", col2: "$50M Rev", col3: "✅ High" },
                        { col1: "Globex", col2: "$12M Rev", col3: "⚠️ Med" },
                        { col1: "Soylent", col2: "$120M Rev", col3: "✅ High" }
                    ]
                },
                stats: [{ label: "Accuracy", value: "99%" }, { label: "Time Saved", value: "3.2h" }]
            }
        },
        {
            id: 'call', label: 'Call Intelligence', icon: Phone,
            title: 'CALL INTELLIGENCE',
            description: ["Transcribe sales calls automatically", "Extract key moments & action items", "Analyze talk-to-listen ratio", "Provide coaching feedback", "Identify objections & patterns"],
            integrations: [{ name: "Zoom", domain: "zoom.us" }, { name: "Gong", domain: "gong.io" }],
            demoData: {
                employeeName: "Riya",
                employeeRole: "Sales Coach",
                employeeInitial: "R",
                taskName: "Analyze sales calls",
                actionText: "Hand Off to Riya",
                processingText: "Analyzing calls...",
                resultText: "12 Calls Analyzed",
                resultIcon: Phone,
                contentType: 'text',
                contentPreview: {
                    title: "Call Summary: Acme Discovery",
                    body: "• Budget confirmed for Q3\n• Key blocker: Security compliance\n• Next step: Send technical docs"
                },
                stats: [{ label: "Bio-Breaks", value: "4" }, { label: "Coaching Tips", value: "8" }]
            }
        },
        {
            id: 'deal', label: 'Deal Management', icon: Briefcase,
            title: 'DEAL MANAGEMENT',
            description: ["Monitor pipeline health continuously", "Flag at-risk deals early", "Suggest next best actions", "Prepare deal review briefs", "Forecast with accuracy"],
            integrations: [{ name: "Salesforce", domain: "salesforce.com" }, { name: "HubSpot", domain: "hubspot.com" }],
            demoData: {
                employeeName: "Sofia",
                employeeRole: "Deal Advisor",
                employeeInitial: "S",
                taskName: "Review deal pipeline",
                actionText: "Hand Off to Sofia",
                processingText: "Reviewing pipeline...",
                resultText: "3 Risks Flagged",
                resultIcon: Briefcase,
                contentType: 'data',
                contentPreview: {
                    dataRows: [
                        { col1: "Nike Deal", col2: "No Decision", col3: "⚠️ Risk" },
                        { col1: "Tesla Exp", col2: "Verbal Yes", col3: "✅ On Track" },
                        { col1: "Uber Ren", col2: "Ghosting", col3: "❌ Stalled" }
                    ]
                },
                stats: [{ label: "Pipeline", value: "$1.2M" }, { label: "Next Steps", value: "5" }]
            }
        }
    ],
    marketing: [
        {
            id: 'content', label: 'Content Creation', icon: PenTool,
            title: 'CONTENT CREATION',
            description: ["Write blog posts & articles", "Create social media copy", "Draft email newsletters", "Generate meta descriptions", "Optimize for SEO keywords"],
            integrations: [{ name: "WordPress", domain: "wordpress.org" }, { name: "Notion", domain: "notion.so" }],
            demoData: {
                employeeName: "Sana",
                employeeRole: "Content Writer", // Corrected Name
                employeeInitial: "S",
                taskName: "Draft blog posts",
                actionText: "Hand Off to Sana",
                processingText: "Writing blog content...",
                resultText: "3 Articles Drafted",
                resultIcon: PenTool,
                contentType: 'text',
                contentPreview: {
                    title: "The Future of AI Sales",
                    body: "Artificial Intelligence is not just a tool; it's a teammate. In this post, we explore how modern teams are..."
                },
                stats: [{ label: "SEO Score", value: "95" }, { label: "Time Saved", value: "6h" }]
            }
        },
        {
            id: 'email-mkt', label: 'Email Campaigns', icon: Mail,
            title: 'EMAIL CAMPAIGNS',
            description: ["Build campaign workflows", "Write compelling email copy", "Segment audiences intelligently", "A/B test subject lines", "Optimize send times"],
            integrations: [{ name: "Mailchimp", domain: "mailchimp.com" }, { name: "Klaviyo", domain: "klaviyo.com" }],
            demoData: {
                employeeName: "Lena",
                employeeRole: "Email Manager", // Corrected Name
                employeeInitial: "L",
                taskName: "Create nurture campaign",
                actionText: "Hand Off to Lena",
                processingText: "Designing campaign...",
                resultText: "Campaign Ready",
                resultIcon: Mail,
                contentType: 'email',
                contentPreview: {
                    title: "Welcome Sequence #1",
                    body: "Subject: Welcome to PrimeRole!\n\nThanks for joining. Here is how you can get started with your first AI employee..."
                },
                stats: [{ label: "Segments", value: "4" }, { label: "Variants", value: "A/B" }]
            }
        },
        {
            id: 'social', label: 'Social Media', icon: Share2,
            title: 'SOCIAL MEDIA',
            description: ["Schedule cross-platform posts", "Generate platform-specific copy", "Find trending topics", "Suggest optimal posting times", "Respond to comments"],
            integrations: [{ name: "LinkedIn", domain: "linkedin.com" }, { name: "Twitter/X", domain: "twitter.com" }],
            demoData: {
                employeeName: "Zara",
                employeeRole: "Social Manager",
                employeeInitial: "Z",
                taskName: "Schedule social posts",
                actionText: "Hand Off to Zara",
                processingText: "Generating copy...",
                resultText: "8 Posts Scheduled",
                resultIcon: Share2,
                contentType: 'text',
                contentPreview: {
                    title: "LinkedIn Post",
                    body: "Excited to announce our Series B! 🚀\n\nThis funding will help us accelerate our mission to... #TechNews #Startup"
                },
                stats: [{ label: "Platforms", value: "3" }, { label: "Time Saved", value: "2h" }]
            }
        },
    ],
    recruiting: [
        {
            id: 'sourcing', label: 'Candidate Sourcing', icon: Search,
            title: 'CANDIDATE SOURCING',
            description: ["Search for qualified candidates", "Build talent pipelines", "Write personalized outreach", "Track response rates", "Maintain candidate databases"],
            integrations: [{ name: "LinkedIn", domain: "linkedin.com" }, { name: "Indeed", domain: "indeed.com" }],
            demoData: {
                employeeName: "Priya",
                employeeRole: "Talent Sourcer",
                employeeInitial: "P",
                taskName: "Source candidates",
                actionText: "Hand Off to Priya",
                processingText: "Sourcing talent...",
                resultText: "15 Candidates Found",
                resultIcon: Search,
                contentType: 'data',
                contentPreview: {
                    dataRows: [
                        { col1: "Alex C.", col2: "Frontend", col3: "Matched" },
                        { col1: "Sam J.", col2: "Product", col3: "Matched" },
                        { col1: "Jordan P.", col2: "Design", col3: "Review" }
                    ]
                },
                stats: [{ label: "Match Rate", value: "90%" }, { label: "Time Saved", value: "5h" }]
            }
        },
        {
            id: 'screening', label: 'Resume Screening', icon: FileCheck,
            title: 'RESUME SCREENING',
            description: ["Parse & analyze resumes", "Rank by job requirements", "Extract key qualifications", "Flag red flags & gaps", "Generate screening questions"],
            integrations: [{ name: "Greenhouse", domain: "greenhouse.io" }, { name: "Lever", domain: "lever.co" }],
            demoData: {
                employeeName: "Tara",
                employeeRole: "Recruiting Coordinator",
                employeeInitial: "T",
                taskName: "Screen resumes",
                actionText: "Hand Off to Tara",
                processingText: "Evaluating applicants...",
                resultText: "25 Resumes Screened",
                resultIcon: FileCheck,
                contentType: 'text',
                contentPreview: {
                    title: "Candidate Evaluation",
                    body: "Recommended: YES\n\nStrong experience with React. Clear communicator. Gaps in employment explained."
                },
                stats: [{ label: "Qualified", value: "8" }, { label: "Time Saved", value: "3h" }]
            }
        },
    ]
};

// --- Real Work Visualizer Component ---

const RealWorkVisualizer = ({ data, color }: { data: DemoData; color: string }) => {

    // Typewriter effect for text/email content
    const Typewriter = ({ text }: { text: string }) => {
        const [displayedText, setDisplayedText] = useState("");
        useEffect(() => {
            let i = 0;
            const timer = setInterval(() => {
                setDisplayedText(text.substring(0, i));
                i++;
                if (i > text.length) clearInterval(timer);
            }, 30); // Typing speed
            return () => clearInterval(timer);
        }, [text]);
        return <div className="leading-relaxed whitespace-pre-wrap">{displayedText}</div>;
    };

    // Staggered row reveal for data content
    const DataGrid = ({ rows }: { rows: any[] }) => {
        return (
            <div className="w-full border border-slate-100 rounded-lg overflow-hidden text-xs">
                <div className="bg-slate-50 p-2 flex font-bold text-slate-500 border-b border-slate-100">
                    <div className="flex-1">Name</div>
                    <div className="flex-1">Metric</div>
                    <div className="w-16">Status</div>
                </div>
                {rows.map((row, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5 }} // Staggered entry
                        className="p-2 flex border-b border-slate-50 last:border-0 items-center bg-white"
                    >
                        <div className="flex-1 font-medium text-slate-900">{row.col1}</div>
                        <div className="flex-1 text-slate-500">{row.col2}</div>
                        <div className="w-16 text-slate-500">{row.col3}</div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-white rounded-lg border border-slate-100 shadow-sm p-4 overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 border-b border-slate-50 pb-2">
                <div className="w-2 h-2 rounded-full bg-slate-200" />
                <span className="text-[10px] uppercase font-bold text-slate-400">
                    {data.contentType === 'text' ? 'Document Editor' :
                        data.contentType === 'email' ? 'Drafting Window' : 'Data View'}
                </span>
            </div>

            {/* Content Area */}
            <div className="text-xs text-slate-700 font-mono">
                {data.contentType === 'data' ? (
                    <DataGrid rows={data.contentPreview.dataRows!} />
                ) : (
                    <>
                        {data.contentPreview.title && <div className="font-bold mb-2 text-slate-900">{data.contentPreview.title}</div>}
                        <Typewriter text={data.contentPreview.body || ""} />
                    </>
                )}
            </div>

            {/* Cursor Animation */}
            {(data.contentType === 'text' || data.contentType === 'email') && (
                <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 h-3 bg-purple-500 inline-block ml-0.5 align-middle"
                />
            )}
        </div>
    );
};


// --- Product Demo Video Component ---

const ProductDemoVideo = ({ data, color }: { data: DemoData; color: string }) => {
    // Phases: 0 = Handoff, 1 = Working, 2 = Approval, 3 = Report Card
    const [phase, setPhase] = useState(0);

    // Loop animation
    useEffect(() => {
        const sequence = async () => {
            setPhase(0); // Reset
            await new Promise(r => setTimeout(r, 2500)); // Handoff
            setPhase(1);
            await new Promise(r => setTimeout(r, 4500)); // Working (longer for typing)
            setPhase(2);
            await new Promise(r => setTimeout(r, 2500)); // Approval
            setPhase(3);
            await new Promise(r => setTimeout(r, 3000)); // Report
            // Loop restarts
            sequence();
        }
        sequence();
        return () => { };
    }, [data]);

    return (
        <div className="w-full h-[400px] bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden shadow-sm flex flex-col font-sans">

            {/* Top Bar (Browser/App style) */}
            <div className="h-10 bg-white border-b border-slate-100 flex items-center px-4 gap-2 absolute top-0 left-0 right-0 z-20">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                <div className="flex-1 text-center text-[10px] sm:text-xs font-medium text-slate-400">PrimeRole Platform</div>
            </div>

            {/* Content Area */}
            <div className="flex-1 mt-10 p-6 relative">
                <AnimatePresence mode="wait">

                    {/* --- SCENE 1: HANDOFF --- */}
                    {phase === 0 && (
                        <motion.div
                            key="handoff"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 p-6 flex flex-col justify-center items-center"
                        >
                            <div className="absolute top-4 left-4 bg-slate-900/5 px-2 py-1 rounded text-[10px] font-bold text-slate-400 uppercase tracking-wider">Human Handoff</div>

                            <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-4 border-b border-slate-50">
                                    <div className="text-xs font-semibold text-slate-500 mb-3">Select Action</div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 p-2 rounded bg-purple-50 border border-purple-100">
                                            <div className="w-4 h-4 rounded border border-purple-600 bg-purple-600 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <div className="text-sm font-medium text-slate-900">{data.taskName}</div>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 rounded opacity-40">
                                            <div className="w-4 h-4 rounded border border-slate-300" />
                                            <div className="h-2 bg-slate-200 rounded w-1/2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 flex justify-end">
                                    <div className="relative">
                                        <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
                                            {data.actionText}
                                        </button>
                                        <motion.div
                                            initial={{ x: 20, y: 20, opacity: 0 }}
                                            animate={{ x: 10, y: 10, opacity: 1 }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                            className="absolute bottom-[-10px] right-[-10px]"
                                        >
                                            <MousePointer2 className="w-6 h-6 text-slate-900 fill-slate-900 stroke-white" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- SCENE 2: AI WORKING (REAL CONTENT) --- */}
                    {phase === 1 && (
                        <motion.div
                            key="working"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute inset-0 p-6 flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-4 z-10">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md relative shrink-0" style={{ backgroundColor: color }}>
                                    {data.employeeInitial}
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm">{data.employeeName} is working...</div>
                                    <div className="text-xs text-slate-500">{data.processingText}</div>
                                </div>
                            </div>

                            <div className="flex-1 relative">
                                <RealWorkVisualizer data={data} color={color} />
                            </div>
                        </motion.div>
                    )}

                    {/* --- SCENE 3: APPROVAL --- */}
                    {phase === 2 && (
                        <motion.div
                            key="approval"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 p-6 flex flex-col justify-center items-center"
                        >
                            <div className="absolute top-4 left-4 bg-slate-900/5 px-2 py-1 rounded text-[10px] font-bold text-slate-400 uppercase tracking-wider">Human Approval</div>

                            <div className="w-full max-w-sm bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                                <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Ready for Review</span>
                                </div>
                                <div className="p-4">
                                    <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm mb-4 flex gap-3">
                                        <div className="p-2 bg-slate-50 rounded h-fit">
                                            <data.resultIcon className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{data.resultText}</div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                {data.contentPreview.title || "Review generated output before sending."}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-xs font-semibold">Edit</button>
                                        <button className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-xs font-bold shadow-md flex items-center justify-center gap-2">
                                            Approve <CheckCircle2 className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <motion.div
                                        initial={{ x: 100, y: 100, opacity: 0 }}
                                        animate={{ x: 60, y: 30, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="absolute bottom-6 right-10 pointer-events-none"
                                    >
                                        <MousePointer2 className="w-6 h-6 text-slate-900 fill-slate-900 stroke-white" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- SCENE 4: REPORT CARD --- */}
                    {phase === 3 && (
                        <motion.div
                            key="report"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 p-6 flex flex-col justify-center items-center"
                        >
                            <div className="absolute top-4 left-4 bg-slate-900/5 px-2 py-1 rounded text-[10px] font-bold text-slate-400 uppercase tracking-wider">Emplopyee Report Card</div>

                            <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
                                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4 relative">
                                    <data.resultIcon className="w-8 h-8" style={{ color: color }} />
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white"
                                    >
                                        <Check className="w-3 h-3" />
                                    </motion.div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Task Completed</h3>
                                <p className="text-xs text-slate-500 mb-6">{data.resultText} successfully.</p>

                                <div className="grid grid-cols-2 gap-4">
                                    {data.stats.map((stat, i) => (
                                        <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                            <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">{stat.label}</div>
                                            <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Progress Indicators */}
            <div className="h-1 bg-slate-100 flex">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 h-full border-r border-white last:border-0 relative overflow-hidden">
                        {phase === i && (
                            <motion.div
                                className="absolute inset-0 bg-purple-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: i === 1 ? 4.5 : (i === 3 ? 3 : 2.5), ease: "linear" }}
                            />
                        )}
                        {phase > i && <div className="absolute inset-0 bg-purple-500" />}
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Main Component ---

export function DepartmentCapabilitiesSection() {
    const [activeDept, setActiveDept] = useState<Department>('sales');
    const [activeCategory, setActiveCategory] = useState<string>(capabilitiesData['sales'][0].id);

    const currentDeptData = departments.find(d => d.id === activeDept)!;
    const currentCategories = capabilitiesData[activeDept];
    const currentCategoryData = currentCategories.find(c => c.id === activeCategory) || currentCategories[0];

    // Reset category when department changes
    useEffect(() => {
        setActiveCategory(capabilitiesData[activeDept][0].id);
    }, [activeDept]);

    return (
        <section className="py-24 bg-white" id="capabilities">
            <div className="container mx-auto px-6 max-w-[1200px]">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                        Built for Modern Teams
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Specialized AI capabilities that integrate with your existing stack.
                    </p>
                </div>

                {/* Primary Tabs (Departments) */}
                <div className="flex justify-center mb-12 border-b border-slate-200">
                    <div className="flex gap-8">
                        {departments.map((dept) => {
                            const Icon = dept.icon;
                            const isActive = activeDept === dept.id;
                            return (
                                <button
                                    key={dept.id}
                                    onClick={() => setActiveDept(dept.id)}
                                    className={`relative pb-4 flex items-center gap-2 text-sm md:text-base font-bold transition-all duration-300 ${isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? '' : 'grayscale opacity-70'}`} style={isActive ? { color: dept.color } : {}} />
                                    <span style={isActive ? { color: dept.color } : {}}>{dept.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="primary-tab-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                                            style={{ backgroundColor: dept.color }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Secondary Tabs (Categories) - Left Sidebar */}
                    <div className="w-full md:w-[240px] flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                        {currentCategories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap
                                        ${isActive
                                            ? 'text-white shadow-md'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }
                                    `}
                                    style={isActive ? { backgroundColor: currentDeptData.color } : {}}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Main Content Card */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDept + activeCategory}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border border-slate-200 rounded-[24px] p-8 md:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                            >
                                <div className="flex flex-col lg:flex-row gap-10">

                                    {/* Capabilities Details */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide mb-6 flex items-center gap-2">
                                            {currentCategoryData.title}
                                            <div className="h-[2px] w-8 ml-2" style={{ backgroundColor: currentDeptData.color }} />
                                        </h3>

                                        <div className="mb-8">
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">What it does</h4>
                                            <ul className="space-y-3">
                                                {currentCategoryData.description.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                                        <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                                                        </div>
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Works with</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {currentCategoryData.integrations.map((int, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center transition-all hover:border-purple-200 hover:shadow-md hover:scale-105 group relative"
                                                        title={int.name}
                                                    >
                                                        <img
                                                            src={int.icon || `https://www.google.com/s2/favicons?domain=${int.domain}&sz=128`}
                                                            alt={int.name}
                                                            className="w-7 h-7 object-contain grayscale-0 group-hover:scale-110 transition-transform duration-300"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.visibility = 'hidden';
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Demo Video */}
                                    <div className="w-full lg:w-[45%]">
                                        <ProductDemoVideo data={currentCategoryData.demoData} color={currentDeptData.color} />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
