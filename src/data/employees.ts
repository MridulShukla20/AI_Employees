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

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: "sales" | "marketing" | "recruitment";
  departmentLabel: string;
  icon: React.ElementType;
  oneLiner: string;
  stat: string;
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
    departmentLabel: "Sales & RevOps",
    icon: Database,
    oneLiner: "Keeps your CRM accurate and insights flowing.",
    stat: "99% data accuracy",
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
    relatedEmployees: ["riya", "maya"],
  },
  {
    id: "riya",
    name: "Riya",
    role: "Sales Coach",
    department: "sales",
    departmentLabel: "Sales & RevOps",
    icon: Headphones,
    oneLiner: "Turns every call into a coaching opportunity.",
    stat: "23% quota improvement",
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
      { role: "ai", message: "I'll weight discovery question quality higher in my scoring. Look for 'Discovery Score' in future scorecards—I'll track open-ended vs closed questions." },
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
    relatedEmployees: ["mira", "sofia"],
  },
  {
    id: "maya",
    name: "Maya",
    role: "Outreach Specialist",
    department: "sales",
    departmentLabel: "Sales & RevOps",
    icon: Mail,
    oneLiner: "Drafts personalized outreach that gets replies.",
    stat: "3x reply rates",
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
      { role: "ai", message: "Short and punchy—got it. I'll aim for 75-100 words max. If I need to trim, I'll prioritize personalization over product details." },
      { role: "user", message: "Never mention competitor names directly" },
      { role: "ai", message: "Understood. I'll reference competitive situations without naming names—phrases like 'your current solution' or 'alternatives in the market' instead." },
    ],
    reportMetrics: [
      { label: "Emails Drafted", value: "234" },
      { label: "Sequences Created", value: "12" },
      { label: "Reply Rate", value: "18%" },
      { label: "Positive Reply Rate", value: "11%" },
      { label: "Meetings Pending", value: "7" },
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
    relatedEmployees: ["riya", "maya"],
  },

  // MARKETING
  {
    id: "zara",
    name: "Zara",
    role: "Social Media Manager",
    department: "marketing",
    departmentLabel: "Marketing",
    icon: Share2,
    oneLiner: "Keeps your social presence active and engaging.",
    stat: "2x engagement rate",
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
    relatedEmployees: ["lena", "sana"],
  },
  {
    id: "lena",
    name: "Lena",
    role: "Email Campaign Manager",
    department: "marketing",
    departmentLabel: "Marketing",
    icon: AtSign,
    oneLiner: "Designs campaigns that reach the right people.",
    stat: "35% open rate improvement",
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
      { role: "ai", message: "Short and mobile-friendly—perfect. I'll aim for 30-40 characters and front-load the key message. I'll flag any that run long for your review." },
      { role: "user", message: "Every email should have one clear CTA" },
      { role: "ai", message: "Single-focus emails it is. I'll design around one primary action per email. Secondary links will be subtle—no competing buttons or mixed messages." },
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
    relatedEmployees: ["zara", "sana"],
  },
  {
    id: "sana",
    name: "Sana",
    role: "Content Writer",
    department: "marketing",
    departmentLabel: "Marketing",
    icon: PenTool,
    oneLiner: "Creates SEO-optimized content in your brand voice.",
    stat: "40% faster production",
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
      { role: "ai", message: "Clear and accessible—great choice. I'll use shorter sentences, common words, and active voice. I'll run readability checks on everything before sending for review." },
      { role: "user", message: "All stats should come from primary sources" },
      { role: "ai", message: "Credibility first. I'll only cite original research, official reports, and first-party data. Each stat will include the source and date for your verification." },
      { role: "user", message: "Every post needs a clear takeaway" },
      { role: "ai", message: "I'll end each piece with a 'Key Takeaway' section—a single, actionable insight readers can apply immediately. I'll also weave the main point through the intro." },
    ],
    reportMetrics: [
      { label: "Pieces Drafted", value: "12" },
      { label: "Words Written", value: "18.4K" },
      { label: "Avg SEO Score", value: "87" },
      { label: "Published", value: "8" },
      { label: "Top Performer", value: "How-To Guide" },
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
    relatedEmployees: ["tara"],
  },
  {
    id: "tara",
    name: "Tara",
    role: "Screening Specialist",
    department: "recruitment",
    departmentLabel: "Recruitment",
    icon: FileText,
    oneLiner: "Handles first screens so you focus on finals.",
    stat: "80% time saved",
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
