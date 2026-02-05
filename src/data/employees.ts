import {
  Database,
  Headphones,
  Mail,
  LineChart,
  Share2,
  AtSign,
  PenTool,
  Users,
  FileText,
} from "lucide-react";

export interface SampleOutput {
  title: string;
  content: React.ReactNode;
}

export interface CoachingMessage {
  role: "user" | "ai";
  message: string;
}

export interface HowItWorksStep {
  step: string;
  description: string;
}

export interface WhoItsFor {
  teamTypes: string[];
  companySize: string;
  useCases: string[];
}

export interface ExampleScenario {
  before: string;
  action: string;
  after: string;
}

export interface Capability {
  title: string;
  points: string[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: "sales" | "marketing" | "recruitment";
  secondaryDepartments?: ("sales" | "marketing" | "recruitment")[];
  departmentLabel: string;
  icon: React.ElementType;
  oneLiner: string;
  stat: string;
  // New premium fields
  headline: string;
  description: string;
  whatTheyDo: string;
  keyOutcomes: string[];
  howItWorks: HowItWorksStep[];
  whoItsFor: WhoItsFor;
  exampleScenario: ExampleScenario;
  // Redesign fields (Relevance AI style)
  valueStrip: string[];           // 5 short value props
  painPoints: string[];            // Without AI pain points
  outcomes: string[];              // With AI outcomes
  capabilities: Capability[];      // Structured capability blocks
  // Existing fields
  autonomous: string[];
  requiresApproval: string[];
  inputs: string;
  integrations: string[];
  setupTime: string;
  sampleOutputs: {
    tab1: { title: string; description: string };
    tab2: { title: string; description: string };
    tab3: { title: string; description: string };
  };
  coaching: CoachingMessage[];
  reportMetrics: { label: string; value: string }[];
  relatedEmployees: string[];
}

export const employees: Employee[] = [
  // SALES & REVOPS
  {
    id: "mira",
    name: "Mira",
    role: "Data & RevOps Specialist",
    department: "sales",
    secondaryDepartments: ["marketing"],
    departmentLabel: "Sales & RevOps",
    icon: Database,
    oneLiner: "Keeps your CRM accurate and insights flowing.",
    stat: "99% data accuracy",
    headline: "Your always-on data analyst that enriches, scores, and cleanses. So your pipeline stays pristine.",
    description: "Mira works around the clock to ensure every contact in your CRM is complete, accurate, and scored against your ideal customer profile. No more stale data or manual enrichment.",
    whatTheyDo: "Mira connects to your CRM and continuously monitors your contact database. She pulls enrichment data from multiple sources to fill in missing fields like company size, industry, and LinkedIn profiles. She scores every lead against your ICP criteria and flags duplicates before they become a problem. Each week, she delivers a health report showing exactly where your data stands. And what needs attention.",
    keyOutcomes: [
      "Reduce manual data entry by 15+ hours per week",
      "Catch duplicate records before they skew your reporting",
      "Know which leads match your ICP instantly",
      "Maintain 99%+ data completeness across your pipeline",
    ],
    howItWorks: [
      { step: "Connect", description: "Link your CRM (Salesforce, HubSpot, or Pipedrive) in under 10 minutes" },
      { step: "Configure", description: "Define your ICP criteria and enrichment priorities through conversation" },
      { step: "Enrich", description: "Mira automatically enriches contacts with 12+ data fields from verified sources" },
      { step: "Score", description: "Every lead gets an ICP score so your team knows where to focus" },
      { step: "Report", description: "Weekly data health reports land in your inbox every Monday" },
    ],
    whoItsFor: {
      teamTypes: ["Revenue Operations", "Sales Operations", "Growth Teams"],
      companySize: "50-500 employees with a growing CRM",
      useCases: ["Cleaning up legacy CRM data", "Enriching inbound leads", "Building targeted outbound lists"],
    },
    exampleScenario: {
      before: "Your sales team wastes hours researching leads manually. Duplicates clutter your CRM, and no one trusts the data in your reports.",
      action: "Mira enriches 500 contacts overnight, identifies 47 duplicate records, and scores everyone against your ICP. She flags 12 contacts with missing critical fields for review.",
      after: "Your reps open their CRM to find complete, accurate profiles. They know exactly which leads to prioritize, and your pipeline reports finally reflect reality.",
    },
    autonomous: [
      "Enriches contacts with 12+ data fields",
      "Scores leads against your ICP criteria",
      "Identifies duplicate records",
      "Flags stale or outdated data",
      "Generates weekly data health reports",
    ],
    requiresApproval: [
      "Merging duplicate records",
      "Deleting contacts from CRM",
      "Changing lead scores manually",
      "Bulk data updates",
    ],
    inputs: "Contacts (CSV upload, CRM sync, or manual entry)",
    integrations: ["Salesforce", "HubSpot", "Pipedrive", "CSV Import"],
    setupTime: "Under 10 minutes",
    sampleOutputs: {
      tab1: {
        title: "Enriched Contact",
        description: "Contact card with 12+ fields, ICP score, and completeness rating",
      },
      tab2: {
        title: "ICP Score Breakdown",
        description: "Detailed scoring criteria with point allocation",
      },
      tab3: {
        title: "Data Health Report",
        description: "Weekly metrics on record quality and completeness",
      },
    },
    coaching: [
      { role: "user", message: "Prioritize tech industry leads for enrichment" },
      { role: "ai", message: "Got it! I'll prioritize contacts with tech industry indicators and enrich those first. I'll also boost their ICP scores accordingly." },
      { role: "user", message: "Flag any contacts missing phone numbers" },
      { role: "ai", message: "I'll add 'Missing Phone' to my data quality checks. These will appear in your weekly health report under 'Needs Attention'." },
      { role: "user", message: "Score companies with 50+ employees higher" },
      { role: "ai", message: "Updated! Companies with 50+ employees now get +15 points on their ICP score. I'll recalculate existing records overnight." },
    ],
    reportMetrics: [
      { label: "Records Enriched", value: "847" },
      { label: "Duplicates Found", value: "23" },
      { label: "Completeness Rate", value: "94%" },
      { label: "ICP Match Rate", value: "67%" },
      { label: "Flagged for Review", value: "12" },
    ],
    valueStrip: [
      "Always-on enrichment",
      "99% data accuracy",
      "No manual entry",
      "ICP scoring built-in",
      "Weekly health reports",
    ],
    painPoints: [
      "Hours wasted researching leads manually",
      "Duplicate records cluttering your CRM",
      "Stale data skewing reports",
      "No clear lead prioritization",
      "Missed opportunities from incomplete profiles",
    ],
    outcomes: [
      "Instant, complete prospect profiles",
      "Zero duplicates in your pipeline",
      "Real-time ICP scoring",
      "15+ hours saved weekly",
      "Trust your data again",
    ],
    capabilities: [
      {
        title: "Automated Data Enrichment",
        points: [
          "Pulls from 12+ verified data sources",
          "Fills company size, industry, LinkedIn",
          "Updates records in real-time",
          "Works across your entire database",
        ],
      },
      {
        title: "Intelligent Lead Scoring",
        points: [
          "Custom ICP criteria configuration",
          "Automatic score updates",
          "Priority ranking for sales team",
          "Trend tracking over time",
        ],
      },
      {
        title: "Data Quality Monitoring",
        points: [
          "Duplicate detection and flagging",
          "Stale record identification",
          "Missing field alerts",
          "Weekly health report delivery",
        ],
      },
    ],
    relatedEmployees: ["riya", "maya"],
  },
  {
    id: "riya",
    name: "Riya",
    role: "Sales Coach",
    department: "sales",
    secondaryDepartments: ["recruitment"],
    departmentLabel: "Sales & RevOps",
    icon: Headphones,
    oneLiner: "Turns every call into a coaching opportunity.",
    stat: "23% quota improvement",
    headline: "Your tireless sales coach that listens to every call and helps your team get better. Automatically.",
    description: "Riya analyzes every sales conversation to identify winning patterns and coaching opportunities. She helps your managers scale their impact without adding hours to their day.",
    whatTheyDo: "Riya listens to your team's calls and scores them across key competencies: discovery, objection handling, closing, and more. She identifies what your top performers do differently and creates actionable feedback for everyone else. Instead of managers reviewing a handful of calls, Riya reviews them all. And surfaces the ones that matter most.",
    keyOutcomes: [
      "Cut manager coaching prep time by 80%",
      "Identify skill gaps before they impact quota",
      "Share winning behaviors across the entire team",
      "Track individual rep improvement over time",
    ],
    howItWorks: [
      { step: "Connect", description: "Integrate with Zoom, Meet, Gong, or your phone system" },
      { step: "Record", description: "Calls are automatically transcribed and analyzed" },
      { step: "Score", description: "Each call gets a scorecard across your chosen competencies" },
      { step: "Coach", description: "Riya suggests specific improvements with timestamped examples" },
      { step: "Track", description: "See skill progression over weeks and months" },
    ],
    whoItsFor: {
      teamTypes: ["Sales Managers", "Enablement Leaders", "VP of Sales"],
      companySize: "Teams of 5+ SDRs or AEs",
      useCases: ["New hire ramp acceleration", "Identifying top performer behaviors", "Scaling coaching without adding managers"],
    },
    exampleScenario: {
      before: "Your sales manager listens to 3 calls per week per rep, if they have time. Most feedback comes weeks after the call happened.",
      action: "Riya analyzes all 156 calls from the week, scores each one, and flags 8 calls with critical coaching moments. She identifies that discovery questions are the team's biggest gap.",
      after: "Monday's team meeting includes specific call clips showing what great discovery sounds like. Each rep gets personalized feedback in their inbox before their next call.",
    },
    autonomous: [
      "Transcribes and analyzes all sales calls",
      "Identifies patterns across your team",
      "Tracks skill progression over time",
      "Benchmarks reps against top performers",
      "Generates individual scorecards",
    ],
    requiresApproval: [
      "Sharing feedback directly with reps",
      "Scheduling coaching sessions",
      "Alerting managers about concerns",
      "Flagging calls for team review",
    ],
    inputs: "Call recordings (Zoom, Meet, phone systems, or Gong)",
    integrations: ["Zoom", "Google Meet", "Gong", "Dialpad", "RingCentral"],
    setupTime: "Under 10 minutes",
    sampleOutputs: {
      tab1: {
        title: "Call Scorecard",
        description: "Category scores with timestamps for key moments",
      },
      tab2: {
        title: "Rep Improvement Plan",
        description: "Focus areas, strengths, and weekly goals",
      },
      tab3: {
        title: "Team Pattern Analysis",
        description: "Winning behaviors and common improvement areas",
      },
    },
    coaching: [
      { role: "user", message: "Focus on discovery questions in your analysis" },
      { role: "ai", message: "I'll weight discovery question quality higher in my scoring. Look for 'Discovery Score' in future scorecards. I'll track open-ended vs closed questions." },
      { role: "user", message: "Flag any calls where competitors are mentioned" },
      { role: "ai", message: "Done! I'll tag calls with competitor mentions and include the context. These will show up in a new 'Competitive Intel' section of your weekly report." },
      { role: "user", message: "Praise reps who handle pricing objections well" },
      { role: "ai", message: "Great idea! When I spot strong pricing objection handling, I'll add it to the rep's 'Wins' section. I'll also compile the best examples for team training." },
    ],
    reportMetrics: [
      { label: "Calls Analyzed", value: "156" },
      { label: "Average Score", value: "7.4/10" },
      { label: "Top Performer", value: "Sarah M." },
      { label: "Most Common Gap", value: "Next Steps" },
      { label: "Calls Flagged", value: "8" },
    ],
    valueStrip: [
      "Every call analyzed",
      "Instant feedback",
      "Pattern recognition",
      "Rep benchmarking",
      "Skill tracking",
    ],
    painPoints: [
      "Managers only review a few calls weekly",
      "Feedback arrives weeks after calls happen",
      "No visibility into skill gaps",
      "Top performer behaviors stay hidden",
      "New hires ramp slowly",
    ],
    outcomes: [
      "100% call coverage",
      "Same-day coaching insights",
      "Clear skill gap identification",
      "Winning behaviors documented",
      "Faster new hire ramp",
    ],
    capabilities: [
      {
        title: "Call Analysis & Scoring",
        points: [
          "Automatic transcription and analysis",
          "Competency-based scoring",
          "Timestamped key moments",
          "Pattern detection across team",
        ],
      },
      {
        title: "Personalized Coaching",
        points: [
          "Individual improvement plans",
          "Specific call examples",
          "Strengths and gaps tracking",
          "Progress over time visibility",
        ],
      },
      {
        title: "Team Intelligence",
        points: [
          "Benchmark against top performers",
          "Common objection patterns",
          "Competitive intel extraction",
          "Weekly team reports",
        ],
      },
    ],
    relatedEmployees: ["mira", "sofia"],
  },
  {
    id: "maya",
    name: "Maya",
    role: "Outreach Specialist",
    department: "sales",
    secondaryDepartments: ["marketing"],
    departmentLabel: "Sales & RevOps",
    icon: Mail,
    oneLiner: "Drafts personalized outreach that gets replies.",
    stat: "3x reply rates",
    headline: "Your personal copywriter that researches every prospect and crafts messages they actually want to read.",
    description: "Maya doesn't send generic templates. She researches each prospect, finds genuine connection points, and writes emails that sound like a human wrote them, because you're still the one who hits send.",
    whatTheyDo: "Maya takes your lead list and gets to work. She researches each prospect's company, recent news, and LinkedIn activity. Then she drafts personalized emails that lead with relevance, not your product. She creates multi-touch sequences with strategic follow-ups, A/B tests subject lines, and categorizes every reply so you know exactly who's interested.",
    keyOutcomes: [
      "Triple your reply rates with genuine personalization",
      "Reclaim 10+ hours per week spent on email drafting",
      "Know which messaging resonates with your ICP",
      "Never send a generic template again",
    ],
    howItWorks: [
      { step: "Import", description: "Upload your lead list or connect your CRM" },
      { step: "Research", description: "Maya investigates each prospect for personalization hooks" },
      { step: "Draft", description: "She writes personalized emails for your review" },
      { step: "Approve", description: "You review and approve. She never sends without permission" },
      { step: "Optimize", description: "A/B test results improve future messaging" },
    ],
    whoItsFor: {
      teamTypes: ["SDR Teams", "Account Executives", "Founders doing outbound"],
      companySize: "Startups to mid-market with outbound motion",
      useCases: ["Cold outreach campaigns", "Warm lead follow-up", "Event or content follow-up sequences"],
    },
    exampleScenario: {
      before: "Your SDRs send 100 emails a day using the same three templates. Reply rates hover around 2%, and most responses are 'not interested.'",
      action: "Maya researches your target accounts, finds that 15 recently raised funding, 8 just hired a sales leader, and 12 posted about challenges you solve. She drafts personalized emails leading with each angle.",
      after: "Reply rates jump to 12%. Your SDRs spend their time on conversations instead of research. The VP of Sales finally believes outbound can work.",
    },
    autonomous: [
      "Researches prospects before writing",
      "Writes personalized email drafts",
      "Creates multi-touch sequences",
      "A/B tests subject lines and messaging",
      "Categorizes replies by intent",
    ],
    requiresApproval: [
      "Sending emails to prospects",
      "Activating new sequences",
      "Responding to prospect replies",
      "Moving prospects to next stage",
    ],
    inputs: "Lead list + connected email account",
    integrations: ["Gmail", "Outlook", "Outreach", "Salesloft", "Apollo", "HubSpot"],
    setupTime: "Under 15 minutes",
    sampleOutputs: {
      tab1: {
        title: "Personalized Email",
        description: "Subject line, body, and open/reply predictions",
      },
      tab2: {
        title: "Outreach Sequence",
        description: "5-touch sequence with timing and variations",
      },
      tab3: {
        title: "Reply Analysis",
        description: "Intent classification with suggested response",
      },
    },
    coaching: [
      { role: "user", message: "Lead with their recent funding news when relevant" },
      { role: "ai", message: "Perfect! I'll check Crunchbase and news sources for funding announcements. When found, I'll open with a congrats and tie it to your value prop." },
      { role: "user", message: "Keep all emails under 100 words" },
      { role: "ai", message: "Short and punchy, got it. I'll aim for 75-100 words max. If I need to trim, I'll prioritize personalization over product details." },
      { role: "user", message: "Never mention competitor names directly" },
      { role: "ai", message: "Understood. I'll reference competitive situations without naming names, phrases like 'your current solution' or 'alternatives in the market' instead." },
    ],
    reportMetrics: [
      { label: "Emails Drafted", value: "234" },
      { label: "Sequences Created", value: "12" },
      { label: "Reply Rate", value: "18%" },
      { label: "Positive Reply Rate", value: "11%" },
      { label: "Meetings Pending", value: "7" },
    ],
    valueStrip: [
      "Deep personalization",
      "3x reply rates",
      "Multi-touch sequences",
      "A/B tested messaging",
      "Zero templates",
    ],
    painPoints: [
      "Generic templates get ignored",
      "Hours spent researching prospects",
      "Low reply rates drain morale",
      "No insight into what works",
      "Outbound feels like spam",
    ],
    outcomes: [
      "Every email genuinely personalized",
      "Research done in seconds",
      "Reply rates that impress",
      "Clear messaging insights",
      "Outbound that converts",
    ],
    capabilities: [
      {
        title: "Prospect Research",
        points: [
          "Company news and funding",
          "LinkedIn activity analysis",
          "Industry and role context",
          "Pain point identification",
        ],
      },
      {
        title: "Personalized Drafting",
        points: [
          "Relevance-first messaging",
          "Multi-touch sequences",
          "Subject line optimization",
          "Human-sounding copy",
        ],
      },
      {
        title: "Performance Optimization",
        points: [
          "A/B testing at scale",
          "Reply categorization",
          "Messaging insights",
          "Continuous improvement",
        ],
      },
    ],
    relatedEmployees: ["mira", "sofia"],
  },
  {
    id: "sofia",
    name: "Sofia",
    role: "Deal Advisor",
    department: "sales",
    departmentLabel: "Sales & RevOps",
    icon: LineChart,
    oneLiner: "Your always-on deal desk analyst.",
    stat: "45% faster deal cycles",
    headline: "Your deal intelligence analyst that monitors every opportunity and tells you where to focus, before it's too late.",
    description: "Sofia watches your pipeline like a hawk. She spots at-risk deals early, prepares you for every meeting, and makes sure nothing slips through the cracks.",
    whatTheyDo: "Sofia connects to your CRM and monitors every active deal, every day. She looks for warning signs: stalled conversations, missing stakeholders, competitor mentions, and timeline slippage. Before every meeting, she prepares a brief with context, talking points, and what to watch for. Her forecast confidence scores help you call the quarter accurately.",
    keyOutcomes: [
      "Catch at-risk deals 2 weeks earlier than before",
      "Walk into every meeting fully prepared",
      "Improve forecast accuracy to 90%+",
      "Close 45% faster by knowing exactly what to do next",
    ],
    howItWorks: [
      { step: "Connect", description: "Link your CRM and calendar" },
      { step: "Monitor", description: "Sofia analyzes deal activity, emails, and call notes daily" },
      { step: "Alert", description: "She flags at-risk deals with specific concerns" },
      { step: "Brief", description: "Before meetings, you get a prep doc with everything you need" },
      { step: "Forecast", description: "Confidence scores update as deals progress" },
    ],
    whoItsFor: {
      teamTypes: ["Account Executives", "Sales Managers", "Revenue Leaders"],
      companySize: "Companies with 20+ active deals in pipeline",
      useCases: ["Enterprise sales with long cycles", "Managing complex multi-stakeholder deals", "Improving forecast accuracy"],
    },
    exampleScenario: {
      before: "Your biggest deal has gone quiet for 10 days. You only notice when your manager asks about it in the pipeline review.",
      action: "Sofia flagged the deal on day 4, noting the champion hadn't responded to two emails. She suggested a different stakeholder to re-engage and drafted talking points.",
      after: "You reach out to the CFO with a business case angle. The deal comes back to life, and you close it two weeks later. Your manager asks what changed.",
    },
    autonomous: [
      "Monitors pipeline health daily",
      "Scores deal risk and momentum",
      "Identifies at-risk deals early",
      "Prepares meeting briefs automatically",
      "Updates forecast confidence scores",
    ],
    requiresApproval: [
      "Changing deal stages in CRM",
      "Submitting forecast updates",
      "Alerting stakeholders about risks",
      "Reprioritizing pipeline focus",
    ],
    inputs: "CRM with active pipeline",
    integrations: ["Salesforce", "HubSpot", "Pipedrive", "Close"],
    setupTime: "Under 10 minutes",
    sampleOutputs: {
      tab1: {
        title: "Deal Risk Alert",
        description: "Risk signals with recommended actions",
      },
      tab2: {
        title: "Meeting Brief",
        description: "Attendees, context, talking points, competitor intel",
      },
      tab3: {
        title: "Pipeline Summary",
        description: "Weekly movement, risks, and forecast updates",
      },
    },
    coaching: [
      { role: "user", message: "Flag any deals stuck for more than 14 days" },
      { role: "ai", message: "Done! Deals with no stage movement for 14+ days will trigger a 'Stalled Deal' alert. I'll suggest re-engagement tactics based on the last activity." },
      { role: "user", message: "Prioritize deals over $50k in your analysis" },
      { role: "ai", message: "High-value focus enabled. Deals over $50k will appear first in all reports and get more detailed risk analysis. I'll also alert you faster on these." },
      { role: "user", message: "Include competitor intel in all meeting briefs" },
      { role: "ai", message: "I'll add a 'Competitive Landscape' section to every brief. I'll pull from your CRM notes, call transcripts, and any public info about their current vendors." },
    ],
    reportMetrics: [
      { label: "Deals Monitored", value: "47" },
      { label: "At-Risk Flagged", value: "8" },
      { label: "Deals Progressed", value: "15" },
      { label: "Forecast Accuracy", value: "89%" },
      { label: "Briefs Generated", value: "23" },
    ],
    valueStrip: [
      "Daily deal monitoring",
      "Early risk detection",
      "Meeting prep briefs",
      "90%+ forecast accuracy",
      "45% faster cycles",
    ],
    painPoints: [
      "Deals go quiet without warning",
      "No time to prepare for meetings",
      "Forecasts miss by 30%+",
      "Managers ask about stalled deals",
      "Key stakeholders get missed",
    ],
    outcomes: [
      "Risks flagged on day 4, not day 14",
      "Walk in fully prepared",
      "Forecasts you can trust",
      "Always know the next step",
      "Every stakeholder tracked",
    ],
    capabilities: [
      {
        title: "Deal Monitoring",
        points: [
          "Daily pipeline health checks",
          "Activity tracking and analysis",
          "Stakeholder engagement scoring",
          "Timeline slippage detection",
        ],
      },
      {
        title: "Meeting Preparation",
        points: [
          "Auto-generated briefs",
          "Talking points and context",
          "Competitor intelligence",
          "Key concerns highlighted",
        ],
      },
      {
        title: "Forecast Intelligence",
        points: [
          "Confidence scoring per deal",
          "Risk-adjusted projections",
          "Weekly momentum reports",
          "Historical pattern matching",
        ],
      },
    ],
    relatedEmployees: ["riya", "maya"],
  },

  // MARKETING
  {
    id: "zara",
    name: "Zara",
    role: "Social Media Manager",
    department: "marketing",
    secondaryDepartments: ["sales"],
    departmentLabel: "Marketing",
    icon: Share2,
    oneLiner: "Keeps your social presence active and engaging.",
    stat: "2x engagement rate",
    headline: "Your social media partner who drafts, schedules, and optimizes. So you're always present, never overwhelmed.",
    description: "Zara keeps your social channels active with on-brand content. She drafts posts, spots trending topics, and tells you exactly when to post. You stay in control; she just makes it effortless.",
    whatTheyDo: "Zara maintains your content calendar and drafts platform-specific posts that match your brand voice. She monitors what's trending in your industry and suggests timely angles. She tracks what performs well and adjusts future content accordingly. Every post goes through you before it's published. She never posts without approval.",
    keyOutcomes: [
      "Maintain daily social presence without daily effort",
      "Double your engagement with optimized posting times",
      "Jump on relevant trends while they're still trending",
      "Build a consistent brand voice across platforms",
    ],
    howItWorks: [
      { step: "Connect", description: "Link your LinkedIn, Twitter/X, and other social accounts" },
      { step: "Learn", description: "Zara analyzes your past content and brand guidelines" },
      { step: "Draft", description: "She creates a week of content tailored to each platform" },
      { step: "Approve", description: "You review, edit, and approve posts for scheduling" },
      { step: "Optimize", description: "Performance data improves future content" },
    ],
    whoItsFor: {
      teamTypes: ["Marketing Managers", "Founders", "Content Teams"],
      companySize: "Startups and SMBs without dedicated social resources",
      useCases: ["Building thought leadership", "Maintaining consistent presence", "Scaling personal brand for executives"],
    },
    exampleScenario: {
      before: "Your company hasn't posted on LinkedIn in three weeks. The marketing manager is focused on a product launch and social keeps sliding.",
      action: "Zara drafts 12 posts for the next two weeks, mixing product updates, industry insights, and team culture. She schedules them for optimal engagement times.",
      after: "Your LinkedIn engagement doubles. Prospects mention seeing your posts in sales calls. The marketing manager finally has breathing room.",
    },
    autonomous: [
      "Drafts platform-specific posts",
      "Maintains your content calendar",
      "Monitors trending topics",
      "Analyzes post performance",
      "Identifies optimal posting times",
    ],
    requiresApproval: [
      "Publishing posts to accounts",
      "Responding to comments/mentions",
      "Launching new campaigns",
      "Engaging with other accounts",
    ],
    inputs: "Brand guidelines + connected social accounts",
    integrations: ["LinkedIn", "Twitter/X", "Buffer", "Hootsuite", "Sprout Social"],
    setupTime: "Under 10 minutes",
    sampleOutputs: {
      tab1: {
        title: "Weekly Posts",
        description: "7 drafted posts with optimal times and hashtags",
      },
      tab2: {
        title: "Content Calendar",
        description: "Monthly view with content mix breakdown",
      },
      tab3: {
        title: "Trend Alert",
        description: "Trending topic with suggested angle and draft",
      },
    },
    coaching: [
      { role: "user", message: "Match the CEO's tone in our posts" },
      { role: "ai", message: "I'll analyze your CEO's recent posts and interviews to capture their voice. Expect a more conversational, direct tone with industry insights woven in." },
      { role: "user", message: "Aim for 80% thought leadership, 20% promotional" },
      { role: "ai", message: "Got it! I'll track the mix weekly. Most posts will share insights, trends, and perspectives. I'll save promotional content for launches and case studies." },
      { role: "user", message: "End posts with questions to drive engagement" },
      { role: "ai", message: "Great engagement tactic! I'll close with open-ended questions that invite discussion. I'll A/B test question styles to see what resonates with your audience." },
    ],
    reportMetrics: [
      { label: "Posts Drafted", value: "28" },
      { label: "Posts Published", value: "24" },
      { label: "Engagement Rate", value: "4.2%" },
      { label: "Follower Growth", value: "+312" },
      { label: "Top Post Reach", value: "15.4K" },
    ],
    valueStrip: [
      "Daily presence",
      "2x engagement",
      "Trend surfing",
      "Brand consistency",
      "Optimal timing",
    ],
    painPoints: [
      "Weeks without posting",
      "No time for social",
      "Missing trending topics",
      "Inconsistent brand voice",
      "Unknown best posting times",
    ],
    outcomes: [
      "Always-on content calendar",
      "Engagement doubles",
      "Trends caught in time",
      "On-brand every post",
      "Optimized scheduling",
    ],
    capabilities: [
      {
        title: "Content Creation",
        points: [
          "Platform-specific drafts",
          "Brand voice matching",
          "Hashtag optimization",
          "Visual suggestions",
        ],
      },
      {
        title: "Trend Monitoring",
        points: [
          "Industry trend detection",
          "Timely content angles",
          "Competitor watching",
          "Viral potential scoring",
        ],
      },
      {
        title: "Performance Analytics",
        points: [
          "Engagement tracking",
          "Best time analysis",
          "Content mix insights",
          "Growth reporting",
        ],
      },
    ],
    relatedEmployees: ["lena", "sana"],
  },
  {
    id: "lena",
    name: "Lena",
    role: "Email Campaign Manager",
    department: "marketing",
    secondaryDepartments: ["sales"],
    departmentLabel: "Marketing",
    icon: AtSign,
    oneLiner: "Designs campaigns that reach the right people.",
    stat: "35% open rate improvement",
    headline: "Your email strategist who builds campaigns, segments audiences, and tests everything. So every send performs.",
    description: "Lena takes the guesswork out of email marketing. She builds campaigns from strategy to execution, makes sure they reach the right segments, and continuously improves based on real data.",
    whatTheyDo: "Lena builds complete email campaigns, from defining the audience to writing the copy to setting up A/B tests. She segments your list intelligently based on behavior and engagement. She writes subject lines that get opened and CTAs that get clicked. Every campaign includes a test plan, and she learns from every send to make the next one better.",
    keyOutcomes: [
      "Increase open rates by 35% with tested subject lines",
      "Reach the right segment with every campaign",
      "Launch campaigns in hours instead of days",
      "Know exactly what messaging resonates with your audience",
    ],
    howItWorks: [
      { step: "Connect", description: "Link your email platform (Mailchimp, Klaviyo, HubSpot, etc.)" },
      { step: "Segment", description: "Lena analyzes your list and creates intelligent segments" },
      { step: "Create", description: "She builds campaigns with tested copy and design" },
      { step: "Test", description: "A/B tests run on subject lines, send times, and CTAs" },
      { step: "Learn", description: "Results feed into improved future campaigns" },
    ],
    whoItsFor: {
      teamTypes: ["Marketing Managers", "Growth Teams", "Demand Gen"],
      companySize: "Companies with 1,000+ email subscribers",
      useCases: ["Newsletter optimization", "Product launch campaigns", "Nurture sequence creation", "Re-engagement campaigns"],
    },
    exampleScenario: {
      before: "Your monthly newsletter goes to the entire list with a 12% open rate. You're not sure if it's the content, timing, or subject line.",
      action: "Lena segments your list into engaged (opened in 90 days) and dormant. She A/B tests three subject lines and finds the winner opens at 28%. She creates a separate re-engagement campaign for dormant subscribers.",
      after: "Your engaged segment now opens at 34%. The dormant campaign re-activates 200 subscribers. Your email becomes a predictable pipeline driver.",
    },
    autonomous: [
      "Builds campaign structures and flows",
      "Writes email copy and subject lines",
      "Segments audiences intelligently",
      "Sets up A/B tests",
      "Analyzes campaign performance",
    ],
    requiresApproval: [
      "Sending campaigns to lists",
      "Creating new audience segments",
      "Importing new contacts",
      "Activating automation sequences",
    ],
    inputs: "Email service provider + audience information",
    integrations: ["Mailchimp", "Klaviyo", "HubSpot", "Customer.io", "SendGrid"],
    setupTime: "Under 15 minutes",
    sampleOutputs: {
      tab1: {
        title: "Campaign Draft",
        description: "Email with A/B subjects, preview, and settings",
      },
      tab2: {
        title: "Audience Segment",
        description: "Segment criteria with size and insights",
      },
      tab3: {
        title: "A/B Test Results",
        description: "Winner analysis with statistical confidence",
      },
    },
    coaching: [
      { role: "user", message: "Keep subject lines under 40 characters" },
      { role: "ai", message: "Short and mobile-friendly, perfect. I'll aim for 30-40 characters and front-load the key message. I'll flag any that run long for your review." },
      { role: "user", message: "Every email should have one clear CTA" },
      { role: "ai", message: "Single-focus emails it is. I'll design around one primary action per email. Secondary links will be subtle. No competing buttons or mixed messages." },
      { role: "user", message: "Segment engaged vs dormant subscribers" },
      { role: "ai", message: "I'll create two segments: 'Engaged' (opened or clicked in last 90 days) and 'Dormant' (no activity in 90+ days). Want me to draft a re-engagement campaign for dormant users?" },
    ],
    reportMetrics: [
      { label: "Campaigns Created", value: "8" },
      { label: "Emails Sent", value: "45.2K" },
      { label: "Avg Open Rate", value: "34%" },
      { label: "Avg Click Rate", value: "4.8%" },
      { label: "A/B Tests Run", value: "6" },
    ],
    valueStrip: [
      "Smart segmentation",
      "35% higher opens",
      "A/B everything",
      "Launch in hours",
      "Data-driven copy",
    ],
    painPoints: [
      "Same email to everyone",
      "Low open rates",
      "No testing infrastructure",
      "Campaigns take days",
      "Unknown messaging performance",
    ],
    outcomes: [
      "Right message, right audience",
      "Open rates that impress",
      "Every send is a test",
      "Hours not days",
      "Know what resonates",
    ],
    capabilities: [
      {
        title: "Audience Segmentation",
        points: [
          "Behavior-based segments",
          "Engagement scoring",
          "Re-engagement targeting",
          "Dynamic list building",
        ],
      },
      {
        title: "Campaign Building",
        points: [
          "Complete draft creation",
          "Subject line optimization",
          "CTA testing",
          "Send time optimization",
        ],
      },
      {
        title: "Performance Analysis",
        points: [
          "A/B test management",
          "Statistical significance",
          "Winner identification",
          "Learnings documentation",
        ],
      },
    ],
    relatedEmployees: ["zara", "sana"],
  },
  {
    id: "sana",
    name: "Sana",
    role: "Content Writer",
    department: "marketing",
    secondaryDepartments: ["sales"],
    departmentLabel: "Marketing",
    icon: PenTool,
    oneLiner: "Creates SEO-optimized content in your brand voice.",
    stat: "40% faster production",
    headline: "Your content partner who researches, writes, and optimizes. So your blog actually drives traffic.",
    description: "Sana produces high-quality, SEO-optimized content that sounds like your brand and ranks on Google. She handles the research, writing, and optimization. You just approve and publish.",
    whatTheyDo: "Sana starts with keyword research to find topics your audience is searching for. She outlines each piece, writes a complete draft, and optimizes for search engines. She maintains your brand voice across everything she writes and can repurpose content into different formats. Every piece includes meta descriptions, internal links, and optimization notes.",
    keyOutcomes: [
      "Publish 40% more content with the same team",
      "Rank higher with SEO-optimized articles",
      "Maintain brand voice at scale",
      "Turn one piece of content into five formats",
    ],
    howItWorks: [
      { step: "Research", description: "Sana identifies high-opportunity keywords and topics" },
      { step: "Outline", description: "She creates a detailed structure for your approval" },
      { step: "Write", description: "Complete drafts in your brand voice, optimized for SEO" },
      { step: "Optimize", description: "Meta descriptions, headers, and internal links included" },
      { step: "Repurpose", description: "One article becomes a LinkedIn post, email snippet, and more" },
    ],
    whoItsFor: {
      teamTypes: ["Content Marketing", "Demand Gen", "SEO Teams"],
      companySize: "Companies investing in organic growth",
      useCases: ["Blog content production", "Case study development", "SEO content strategy", "Content repurposing"],
    },
    exampleScenario: {
      before: "Your blog publishes once a month because writing takes forever. Articles rank on page 3 because no one has time for SEO.",
      action: "Sana researches your top 10 keyword opportunities, drafts 4 optimized articles, and suggests internal linking structure. She also creates social snippets for each piece.",
      after: "You're publishing weekly. Two articles hit page 1 within three months. Organic traffic is up 60%, and the sales team has case studies to share.",
    },
    autonomous: [
      "Researches topics and keywords",
      "Writes blogs, case studies, newsletters",
      "Optimizes content for SEO",
      "Maintains consistent brand voice",
      "Repurposes content across formats",
    ],
    requiresApproval: [
      "Publishing content",
      "Major topic direction changes",
      "Brand voice adjustments",
      "External citations and quotes",
    ],
    inputs: "Brand voice guidelines + topic priorities",
    integrations: ["WordPress", "Webflow", "Notion", "Google Docs", "Contentful"],
    setupTime: "Under 10 minutes",
    sampleOutputs: {
      tab1: {
        title: "Blog Post Draft",
        description: "Full article with meta description and SEO score",
      },
      tab2: {
        title: "Case Study Outline",
        description: "Challenge, solution, results framework",
      },
      tab3: {
        title: "SEO Recommendations",
        description: "Keyword analysis with content suggestions",
      },
    },
    coaching: [
      { role: "user", message: "Write at an 8th grade reading level" },
      { role: "ai", message: "Clear and accessible, great choice. I'll use shorter sentences, common words, and active voice. I'll run readability checks on everything before sending for review." },
      { role: "user", message: "All stats should come from primary sources" },
      { role: "ai", message: "Credibility first. I'll only cite original research, official reports, and first-party data. Each stat will include the source and date for your verification." },
      { role: "user", message: "Every post needs a clear takeaway" },
      { role: "ai", message: "I'll end each piece with a 'Key Takeaway' section, a single, actionable insight readers can apply immediately. I'll also weave the main point through the intro." },
    ],
    reportMetrics: [
      { label: "Pieces Drafted", value: "12" },
      { label: "Words Written", value: "18.4K" },
      { label: "Avg SEO Score", value: "87" },
      { label: "Published", value: "8" },
      { label: "Top Performer", value: "How-To Guide" },
    ],
    valueStrip: [
      "SEO-first writing",
      "40% faster output",
      "Brand voice match",
      "Content repurposing",
      "Page 1 rankings",
    ],
    painPoints: [
      "Blog publishes once a month",
      "No time for proper SEO",
      "Inconsistent voice across content",
      "Content dies after publishing",
      "Stuck on page 3 of Google",
    ],
    outcomes: [
      "Weekly publishing cadence",
      "SEO built into every piece",
      "On-brand at scale",
      "One article, five formats",
      "First page visibility",
    ],
    capabilities: [
      {
        title: "Research & Strategy",
        points: [
          "Keyword opportunity analysis",
          "Topic prioritization",
          "Competitor content gaps",
          "Search intent matching",
        ],
      },
      {
        title: "Content Creation",
        points: [
          "SEO-optimized drafts",
          "Brand voice consistency",
          "Meta descriptions included",
          "Internal linking strategy",
        ],
      },
      {
        title: "Content Repurposing",
        points: [
          "Blog to social posts",
          "Article to email snippets",
          "Long-form to short-form",
          "Multi-format distribution",
        ],
      },
    ],
    relatedEmployees: ["zara", "lena"],
  },

  // RECRUITMENT
  {
    id: "priya",
    name: "Priya",
    role: "Talent Sourcer",
    department: "recruitment",
    departmentLabel: "Recruitment",
    icon: Users,
    oneLiner: "Finds qualified candidates before you ask.",
    stat: "5x candidate volume",
    headline: "Your proactive sourcer who builds pipelines before you even open the req.",
    description: "Priya sources candidates while you sleep. She finds people who match your criteria, writes personalized outreach, and builds pipelines so you're never starting from zero.",
    whatTheyDo: "Priya takes your job requirements and ideal candidate profile, then gets to work. She searches across LinkedIn, job boards, and her network to find qualified candidates. She scores each one against your criteria and writes personalized outreach messages. She tracks which channels produce the best candidates and optimizes accordingly.",
    keyOutcomes: [
      "Build pipelines 5x faster with automated sourcing",
      "Increase response rates with personalized outreach",
      "Know exactly where your best candidates come from",
      "Never start a search from scratch again",
    ],
    howItWorks: [
      { step: "Define", description: "Share your job requirements and ideal candidate profile" },
      { step: "Source", description: "Priya searches multiple platforms for matching candidates" },
      { step: "Score", description: "Each candidate is ranked against your requirements" },
      { step: "Draft", description: "Personalized outreach messages for your review" },
      { step: "Track", description: "Response rates by channel inform future sourcing" },
    ],
    whoItsFor: {
      teamTypes: ["Recruiters", "Talent Acquisition", "Hiring Managers"],
      companySize: "Companies hiring 5+ roles per quarter",
      useCases: ["Building candidate pipelines", "Hard-to-fill technical roles", "Executive search", "High-volume hiring"],
    },
    exampleScenario: {
      before: "You just opened a Senior Backend role. Your recruiter spends two weeks sourcing before the first qualified candidate reaches the hiring manager.",
      action: "Priya sources 89 candidates in 48 hours, scores them against your criteria, and drafts personalized outreach for the top 45. She identifies 3 from your competitor's engineering team.",
      after: "Your recruiter reviews Priya's shortlist, approves 30 for outreach, and has 5 phone screens scheduled by end of week. The role closes in 3 weeks instead of 8.",
    },
    autonomous: [
      "Sources from multiple platforms",
      "Scores candidates against requirements",
      "Builds talent pipelines proactively",
      "Writes personalized outreach",
      "Tracks source channel effectiveness",
    ],
    requiresApproval: [
      "Sending outreach messages",
      "Adding candidates to pipeline",
      "Advancing to screening stage",
      "Changing candidate scores",
    ],
    inputs: "Job requirements + ideal candidate profile",
    integrations: ["LinkedIn Recruiter", "Indeed", "Greenhouse", "Lever", "Ashby"],
    setupTime: "Under 15 minutes",
    sampleOutputs: {
      tab1: {
        title: "Candidate Shortlist",
        description: "Ranked list with scores and key strengths",
      },
      tab2: {
        title: "Outreach Message",
        description: "Personalized message with role highlights",
      },
      tab3: {
        title: "Pipeline Report",
        description: "Source breakdown with conversion rates",
      },
    },
    coaching: [
      { role: "user", message: "Prioritize candidates with startup experience" },
      { role: "ai", message: "Startup DNA is key. I'll boost scores for candidates with seed-to-Series B experience and look for signs of ownership and adaptability in their backgrounds." },
      { role: "user", message: "Source from our target company list" },
      { role: "ai", message: "I'll prioritize candidates from your target companies. Share the list and I'll set up alerts for new profiles and job changes at those organizations." },
      { role: "user", message: "Diversity is a priority for this role" },
      { role: "ai", message: "Understood. I'll expand my sourcing to include diversity-focused communities, HBCUs, and underrepresented talent networks. I'll track diversity metrics in pipeline reports." },
    ],
    reportMetrics: [
      { label: "Candidates Sourced", value: "89" },
      { label: "Outreach Sent", value: "45" },
      { label: "Response Rate", value: "34%" },
      { label: "Pipeline Growth", value: "+67" },
      { label: "Top Channel", value: "LinkedIn" },
    ],
    valueStrip: [
      "5x pipeline speed",
      "Multi-platform sourcing",
      "Personalized outreach",
      "Criteria-based scoring",
      "Channel optimization",
    ],
    painPoints: [
      "Weeks before first candidates",
      "Starting from zero each search",
      "Generic outreach ignored",
      "No scoring consistency",
      "Unknown best channels",
    ],
    outcomes: [
      "Candidates in 48 hours",
      "Pre-built talent pipelines",
      "Personalized first touchh",
      "Objective scoring",
      "Data-driven channel focus",
    ],
    capabilities: [
      {
        title: "Multi-Platform Sourcing",
        points: [
          "LinkedIn deep search",
          "Job board mining",
          "Network expansion",
          "Competitor mapping",
        ],
      },
      {
        title: "Candidate Scoring",
        points: [
          "Requirements matching",
          "Experience weighting",
          "Skills gap analysis",
          "Fit prediction",
        ],
      },
      {
        title: "Outreach Drafting",
        points: [
          "Personalized messages",
          "Role-specific angles",
          "Response optimization",
          "Follow-up sequences",
        ],
      },
    ],
    relatedEmployees: ["tara"],
  },
  {
    id: "tara",
    name: "Tara",
    role: "Screening Specialist",
    department: "recruitment",
    secondaryDepartments: ["sales"],
    departmentLabel: "Recruitment",
    icon: FileText,
    oneLiner: "Handles first screens so you focus on finals.",
    stat: "80% time saved",
    headline: "Your screening partner who reviews every applicant and surfaces the ones worth your time.",
    description: "Tara handles the most time-consuming part of hiring: the first pass. She reviews resumes, conducts initial screens, and gives you a shortlist of candidates ready for real conversations.",
    whatTheyDo: "Tara reviews every application against your criteria. She summarizes each candidate's strengths and concerns, flags must-haves and nice-to-haves, and can even conduct AI-powered phone screens with follow-up questions. She learns your preferences over time and gets better at predicting who you'll want to advance.",
    keyOutcomes: [
      "Save 80% of time spent on first-round screening",
      "Review 100+ applicants in hours, not weeks",
      "Never miss a great candidate in a stack of resumes",
      "Focus your time on candidates worth meeting",
    ],
    howItWorks: [
      { step: "Connect", description: "Link your ATS (Greenhouse, Lever, Ashby, etc.)" },
      { step: "Define", description: "Set your must-haves, nice-to-haves, and red flags" },
      { step: "Review", description: "Tara screens every applicant against your criteria" },
      { step: "Summarize", description: "Each candidate gets a brief with strengths and concerns" },
      { step: "Advance", description: "You decide who moves forward. Tara handles the rest" },
    ],
    whoItsFor: {
      teamTypes: ["Recruiters", "Hiring Managers", "People Teams"],
      companySize: "Teams reviewing 50+ applicants per role",
      useCases: ["High-volume hiring", "Inbound application management", "Contractor screening", "Internal mobility"],
    },
    exampleScenario: {
      before: "Your marketing role has 150 applicants. Your recruiter spends 12 hours reviewing resumes and phone screens 30 people to find 8 worth interviewing.",
      action: "Tara reviews all 150 applicants overnight, scores each against your criteria, and identifies 22 strong matches. She flags 3 who look overqualified and 5 who need visa sponsorship.",
      after: "Your recruiter reviews Tara's shortlist in 30 minutes, confirms 18 for phone screens, and has 8 candidates in front of the hiring manager by Friday. Total time: 2 hours instead of 12.",
    },
    autonomous: [
      "Reviews resumes against criteria",
      "Administers screening questionnaires",
      "Conducts AI phone screens",
      "Summarizes strengths and concerns",
      "Tracks screening metrics",
    ],
    requiresApproval: [
      "Advancing candidates to interviews",
      "Rejecting candidates",
      "Scheduling interviews with team",
      "Changing screening criteria",
    ],
    inputs: "ATS with applicants + screening criteria",
    integrations: ["Greenhouse", "Lever", "Workday", "Ashby", "BambooHR"],
    setupTime: "Under 10 minutes",
    sampleOutputs: {
      tab1: {
        title: "Resume Summary",
        description: "Match score with requirements checklist",
      },
      tab2: {
        title: "Phone Screen Summary",
        description: "Key responses with recommendation",
      },
      tab3: {
        title: "Screening Dashboard",
        description: "Volume, outcomes, and efficiency metrics",
      },
    },
    coaching: [
      { role: "user", message: "Must-have: 3+ years of relevant experience" },
      { role: "ai", message: "Hard requirement set. Candidates without 3+ years in the target area will be flagged as 'Does Not Meet Requirements' but kept in system for future roles." },
      { role: "user", message: "Nice-to-have: enterprise sales background" },
      { role: "ai", message: "Added as a preference. Enterprise experience will boost scores but won't disqualify otherwise strong candidates. I'll highlight it when present." },
      { role: "user", message: "Red flag: job hopping without progression" },
      { role: "ai", message: "I'll watch for multiple short stints (<1 year) without title or scope increases. These will trigger a 'Career Progression' concern in my summary for your review." },
    ],
    reportMetrics: [
      { label: "Resumes Reviewed", value: "156" },
      { label: "Screens Completed", value: "42" },
      { label: "Pass Rate", value: "38%" },
      { label: "Avg Time-to-Screen", value: "4 hrs" },
      { label: "Time Saved", value: "32 hrs" },
    ],
    valueStrip: [
      "80% time saved",
      "100+ reviewed/day",
      "AI phone screens",
      "Consistent criteria",
      "Zero missed gems",
    ],
    painPoints: [
      "Hours lost reviewing resumes",
      "Good candidates buried in stack",
      "Inconsistent screening criteria",
      "Phone screens take forever",
      "Hiring manager time wasted",
    ],
    outcomes: [
      "Resume review in minutes",
      "Best candidates surface first",
      "Objective, repeatable criteria",
      "AI handles first screens",
      "Hiring managers see finalists only",
    ],
    capabilities: [
      {
        title: "Resume Analysis",
        points: [
          "Criteria-based scoring",
          "Must-have detection",
          "Red flag identification",
          "Summary generation",
        ],
      },
      {
        title: "AI Phone Screens",
        points: [
          "Automated scheduling",
          "Custom question sets",
          "Response analysis",
          "Recommendation scoring",
        ],
      },
      {
        title: "Shortlist Delivery",
        points: [
          "Ranked candidate lists",
          "Strengths and concerns",
          "Comparison views",
          "Decision support",
        ],
      },
    ],
    relatedEmployees: ["priya"],
  },
];

export const getEmployeeById = (id: string): Employee | undefined => {
  return employees.find((emp) => emp.id === id);
};

export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter((emp) => emp.department === department);
};

export const getRelatedEmployees = (employeeId: string): Employee[] => {
  const employee = getEmployeeById(employeeId);
  if (!employee) return [];
  return employee.relatedEmployees
    .map((id) => getEmployeeById(id))
    .filter((emp): emp is Employee => emp !== undefined);
};

// Department label mapping
export const departmentLabelMap: Record<string, string> = {
  sales: "Sales & RevOps",
  marketing: "Marketing",
  recruitment: "HR / Recruiting",
};

// Get all employees that work with a department (primary or secondary)
export const getEmployeesForDepartment = (dept: string): { primary: Employee[]; secondary: Employee[] } => {
  const primary = employees.filter(emp => emp.department === dept);
  const secondary = employees.filter(
    emp => emp.department !== dept && emp.secondaryDepartments?.includes(dept as "sales" | "marketing" | "recruitment")
  );
  return { primary, secondary };
};

// Get all department labels for an employee
export const getDepartmentLabels = (emp: Employee): { primary: string; secondary: string[] } => {
  const primary = emp.departmentLabel;
  const secondary = emp.secondaryDepartments?.map(d => departmentLabelMap[d]).filter(Boolean) || [];
  return { primary, secondary };
};

// Get all departments an employee works with
export const getAllDepartments = (emp: Employee): string[] => {
  return [emp.department, ...(emp.secondaryDepartments || [])];
};
