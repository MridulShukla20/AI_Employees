import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Employee } from "@/data/employees";

interface EmployeeSampleOutputsProps {
  employee: Employee;
}

// Sample output mockups for each employee
const sampleOutputContent: Record<string, { tab1: React.ReactNode; tab2: React.ReactNode; tab3: React.ReactNode }> = {
  mira: {
    tab1: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-semibold">Jennifer Martinez</p>
            <p className="text-sm text-muted-foreground">VP of Engineering at TechStart Inc.</p>
          </div>
          <div className="text-right">
            <Badge className="bg-primary/10 text-primary">ICP Score: 92</Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-muted-foreground">Email:</span> j.martinez@techstart.io</div>
          <div><span className="text-muted-foreground">Phone:</span> +1 (415) 555-0187</div>
          <div><span className="text-muted-foreground">Company Size:</span> 127 employees</div>
          <div><span className="text-muted-foreground">Industry:</span> B2B SaaS</div>
          <div><span className="text-muted-foreground">Location:</span> San Francisco, CA</div>
          <div><span className="text-muted-foreground">LinkedIn:</span> linkedin.com/in/jmartinez</div>
          <div><span className="text-muted-foreground">Recent Funding:</span> Series B ($24M)</div>
          <div><span className="text-muted-foreground">Tech Stack:</span> AWS, React, Python</div>
        </div>
        <div className="pt-3 border-t">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Data Completeness:</span>
            <div className="flex-1 bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }} />
            </div>
            <span className="text-sm text-primary font-semibold">94%</span>
          </div>
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">ICP Score Breakdown</h4>
          <Badge>92/100</Badge>
        </div>
        <div className="space-y-3">
          {[
            { criteria: "Company Size (50-500)", points: 20, max: 20 },
            { criteria: "Industry Match (B2B SaaS)", points: 20, max: 20 },
            { criteria: "Title Level (VP+)", points: 15, max: 15 },
            { criteria: "Tech Stack Alignment", points: 12, max: 15 },
            { criteria: "Geography (US)", points: 10, max: 10 },
            { criteria: "Recent Funding", points: 10, max: 10 },
            { criteria: "Email Verified", points: 5, max: 5 },
            { criteria: "Phone Available", points: 0, max: 5 },
          ].map((item) => (
            <div key={item.criteria} className="flex items-center gap-3">
              <span className="text-sm flex-1">{item.criteria}</span>
              <div className="w-24 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(item.points / item.max) * 100}%` }} 
                />
              </div>
              <span className="text-sm w-12 text-right">{item.points}/{item.max}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Weekly Data Health Report</h4>
          <span className="text-sm text-muted-foreground">Jan 27 - Feb 2</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">847</p>
            <p className="text-xs text-muted-foreground">Records Enriched</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">94%</p>
            <p className="text-xs text-muted-foreground">Avg Completeness</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">23</p>
            <p className="text-xs text-muted-foreground">Duplicates Found</p>
          </div>
        </div>
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Needs Attention (12 records)</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 8 contacts missing phone numbers</li>
            <li>• 3 contacts with outdated job titles</li>
            <li>• 1 duplicate pair pending merge approval</li>
          </ul>
        </div>
      </div>
    ),
  },
  riya: {
    tab1: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-semibold">Discovery Call - Acme Corp</p>
            <p className="text-sm text-muted-foreground">Rep: Sarah Mitchell • Jan 30, 2024</p>
          </div>
          <Badge className="bg-primary/10 text-primary">Score: 8.2/10</Badge>
        </div>
        <div className="space-y-3">
          {[
            { category: "Discovery Questions", score: 9, notes: "Strong open-ended questions" },
            { category: "Active Listening", score: 8, notes: "Good follow-ups" },
            { category: "Value Articulation", score: 7, notes: "Could tie to specific pain points" },
            { category: "Objection Handling", score: 9, notes: "Handled budget concern well" },
            { category: "Next Steps", score: 8, notes: "Clear action items set" },
          ].map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <span className="text-sm font-medium w-40">{item.category}</span>
              <div className="w-24 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${item.score * 10}%` }} />
              </div>
              <span className="text-sm w-8">{item.score}/10</span>
              <span className="text-xs text-muted-foreground flex-1">{item.notes}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium">Key Moment: 12:34</p>
          <p className="text-sm text-muted-foreground">Excellent reframe of pricing objection using ROI comparison</p>
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold">Improvement Plan: Mike Chen</h4>
            <p className="text-sm text-muted-foreground">Account Executive</p>
          </div>
          <Badge variant="secondary">Week 4</Badge>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Focus Areas</p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <span>Setting clear next steps before call end</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <span>Deeper discovery on decision-making process</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Strengths</p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2" />
                <span>Building rapport quickly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2" />
                <span>Technical product knowledge</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium">Weekly Goal</p>
          <p className="text-sm text-muted-foreground">End every call with confirmed next meeting or clear follow-up task</p>
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <h4 className="font-semibold">Team Pattern Analysis</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Winning Behaviors (Top Performers)</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Ask 5+ discovery questions before pitching</li>
              <li>• Reference specific competitor weaknesses</li>
              <li>• Send recap email within 2 hours</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Common Improvement Areas</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 67% of reps skip multi-threading question</li>
              <li>• Average talk ratio is 52% (target: 40%)</li>
              <li>• Only 45% confirm budget on first call</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  maya: {
    tab1: (
      <div className="space-y-4">
        <div className="border-b pb-3">
          <p className="text-xs text-muted-foreground mb-1">To: jennifer.martinez@techstart.io</p>
          <p className="font-semibold">Congrats on the Series B. Quick question about your data pipeline</p>
        </div>
        <div className="text-sm space-y-3">
          <p>Hi Jennifer,</p>
          <p>Congratulations on TechStart's Series B! $24M is a strong signal that your engineering velocity is paying off.</p>
          <p>I noticed you're scaling the data team. We helped Acme Corp cut their pipeline build time by 60% after a similar growth phase.</p>
          <p>Worth a 15-min chat to see if we could help TechStart move faster too?</p>
          <p>Best,<br/>Alex</p>
        </div>
        <div className="border-t pt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span>Predicted open rate: <span className="text-primary font-medium">42%</span></span>
          <span>Predicted reply rate: <span className="text-primary font-medium">18%</span></span>
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <h4 className="font-semibold">5-Touch Outreach Sequence</h4>
        <div className="space-y-3">
          {[
            { day: "Day 1", type: "Email", subject: "Congrats on the Series B. Quick question" },
            { day: "Day 3", type: "LinkedIn", subject: "Connection request + comment on post" },
            { day: "Day 6", type: "Email", subject: "Quick case study from similar company" },
            { day: "Day 10", type: "Email", subject: "One specific idea for TechStart" },
            { day: "Day 14", type: "Email", subject: "Should I close the loop?" },
          ].map((touch) => (
            <div key={touch.day} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium w-16">{touch.day}</span>
              <Badge variant="secondary" className="text-xs">{touch.type}</Badge>
              <span className="text-sm flex-1">{touch.subject}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Reply Analysis</h4>
          <Badge className="bg-green-100 text-green-800">Positive</Badge>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-sm">
          <p className="italic">"Thanks for reaching out! The timing is actually good. We're evaluating options this quarter. Can you send over some more details about the Acme case study?"</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm"><span className="font-medium">Intent:</span> Interest + Info Request</p>
          <p className="text-sm"><span className="font-medium">Priority:</span> High</p>
          <p className="text-sm"><span className="font-medium">Suggested Response:</span></p>
          <p className="text-sm text-muted-foreground">Send Acme case study PDF + offer 15-min call to walk through specifics. Propose 2-3 meeting times.</p>
        </div>
      </div>
    ),
  },
  sofia: {
    tab1: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-semibold text-amber-600">⚠️ At-Risk Deal Alert</p>
            <p className="text-sm text-muted-foreground">Acme Corp - Enterprise License</p>
          </div>
          <Badge variant="outline" className="border-amber-500 text-amber-600">$85,000 ARR</Badge>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">Risk Signals Detected</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• No activity in 16 days (your threshold: 14)</li>
              <li>• Champion hasn't opened last 2 emails</li>
              <li>• CFO added to last call but hasn't responded since</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Recommended Actions</p>
            <ul className="text-sm space-y-1">
              <li>1. Reach out to secondary contact (VP Ops)</li>
              <li>2. Share ROI calculator with CFO directly</li>
              <li>3. Propose shortened pilot to reduce perceived risk</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-semibold">Meeting Brief: TechStart Follow-up</p>
            <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM • 45 min</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-2">Attendees</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Jennifer Martinez (VP Engineering)</li>
              <li>• Tom Baker (CFO) - NEW</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">Context</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• 3rd meeting, post-demo</li>
              <li>• Budget discussion expected</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Suggested Talking Points</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>1. Address implementation timeline concerns from last call</li>
            <li>2. Present ROI model for CFO</li>
            <li>3. Propose pilot scope and success criteria</li>
          </ul>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-1">Competitive Intel</p>
          <p className="text-sm text-muted-foreground">Currently evaluating DataCo (mentioned in call 2). Their weakness: no SOC 2 compliance.</p>
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Weekly Pipeline Summary</h4>
          <span className="text-sm text-muted-foreground">Jan 27 - Feb 2</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">$1.2M</p>
            <p className="text-xs text-muted-foreground">Pipeline Value</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-green-600">+$340K</p>
            <p className="text-xs text-muted-foreground">Moved Forward</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-amber-600">3</p>
            <p className="text-xs text-muted-foreground">At Risk</p>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-2">Forecast Update</p>
          <p className="text-sm text-muted-foreground">Weighted forecast: $420K (was $380K). Confidence increased on TechStart and Globex deals based on recent activity.</p>
        </div>
      </div>
    ),
  },
  zara: {
    tab1: (
      <div className="space-y-4">
        <h4 className="font-semibold">This Week's Posts</h4>
        <div className="space-y-3">
          {[
            { day: "Mon", time: "9:00 AM", platform: "LinkedIn", content: "3 things we learned scaling to 10K users..." },
            { day: "Tue", time: "11:30 AM", platform: "Twitter", content: "Hot take: The best sales tool is still a good product." },
            { day: "Wed", time: "9:00 AM", platform: "LinkedIn", content: "Our CEO on why we're betting big on AI..." },
            { day: "Thu", time: "2:00 PM", platform: "Twitter", content: "Quick tip for founders raising their Series A..." },
            { day: "Fri", time: "10:00 AM", platform: "LinkedIn", content: "Case study: How Acme Corp saved 40 hrs/week" },
          ].map((post, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium w-10">{post.day}</span>
              <span className="text-xs text-muted-foreground w-16">{post.time}</span>
              <Badge variant="secondary" className="text-xs">{post.platform}</Badge>
              <span className="text-sm flex-1 truncate">{post.content}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">February Content Calendar</h4>
          <Badge variant="secondary">28 posts planned</Badge>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm w-32">Thought Leadership</span>
            <div className="flex-1 bg-muted rounded-full h-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: '65%' }} />
            </div>
            <span className="text-sm w-12">65%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-32">Product Updates</span>
            <div className="flex-1 bg-muted rounded-full h-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: '15%' }} />
            </div>
            <span className="text-sm w-12">15%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-32">Case Studies</span>
            <div className="flex-1 bg-muted rounded-full h-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: '12%' }} />
            </div>
            <span className="text-sm w-12">12%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-32">Promotional</span>
            <div className="flex-1 bg-muted rounded-full h-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: '8%' }} />
            </div>
            <span className="text-sm w-12">8%</span>
          </div>
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">🔥 Trend Alert</h4>
          <Badge className="bg-amber-100 text-amber-800">Trending Now</Badge>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm font-medium mb-2">#AIProductivity is trending in your industry</p>
          <p className="text-sm text-muted-foreground">+340% mentions in the last 24 hours. Key influencers in B2B SaaS are sharing takes on AI + work.</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Suggested Angle</p>
          <p className="text-sm text-muted-foreground">Share your "humans + AI" philosophy. Differentiate from "AI replacing workers" narrative.</p>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-2">Draft Post</p>
          <p className="text-sm italic text-muted-foreground">"The best AI tools don't replace your team. They make your team more effective. Here's how we think about humans + AI at PrimeRole..."</p>
        </div>
      </div>
    ),
  },
  lena: {
    tab1: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h4 className="font-semibold">Product Launch Campaign</h4>
          <Badge variant="secondary">Draft</Badge>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">A/B Subject Lines</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                <span className="text-xs font-medium w-8">A:</span>
                <span className="text-sm">We just shipped something big 🚀</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                <span className="text-xs font-medium w-8">B:</span>
                <span className="text-sm">The feature you've been asking for is here</span>
              </div>
            </div>
          </div>
          <div className="border-t pt-3">
            <p className="text-sm font-medium mb-2">Preview</p>
            <div className="bg-white border rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Hi {"{first_name}"},</p>
              <p className="text-muted-foreground">After months of development (and lots of your feedback), we're excited to announce...</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-3">
          <span>Audience: 12,456 subscribers</span>
          <span>Est. open rate: 38%</span>
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">New Segment: Power Users</h4>
          <Badge>2,847 contacts</Badge>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Segment Criteria</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Opened 5+ emails in last 30 days
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Clicked at least 2 CTAs
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Active product user (logged in this week)
            </li>
          </ul>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-2">Segment Insights</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 68% are from companies with 50+ employees</li>
            <li>• Most engaged with product update emails</li>
            <li>• 34% higher click rate than average</li>
          </ul>
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">A/B Test Results</h4>
          <Badge className="bg-green-100 text-green-800">Winner: B</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm font-medium mb-1">Version A</p>
            <p className="text-xs text-muted-foreground mb-3">"Quick update from PrimeRole"</p>
            <div className="space-y-2">
              <p className="text-sm">Open Rate: <span className="font-medium">28%</span></p>
              <p className="text-sm">Click Rate: <span className="font-medium">3.2%</span></p>
            </div>
          </div>
          <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
            <p className="text-sm font-medium mb-1">Version B 🏆</p>
            <p className="text-xs text-muted-foreground mb-3">"You asked, we built it"</p>
            <div className="space-y-2">
              <p className="text-sm">Open Rate: <span className="font-medium text-primary">36%</span></p>
              <p className="text-sm">Click Rate: <span className="font-medium text-primary">5.1%</span></p>
            </div>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium">Key Learning</p>
          <p className="text-sm text-muted-foreground">Customer-centric subject lines ("you") outperform company-centric ("we") by 29%.</p>
        </div>
      </div>
    ),
  },
  sana: {
    tab1: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-semibold">The Complete Guide to Human-AI Collaboration</p>
            <p className="text-sm text-muted-foreground">Blog Post • 1,847 words</p>
          </div>
          <Badge className="bg-green-100 text-green-800">SEO: 87</Badge>
        </div>
        <div className="text-sm space-y-2">
          <p className="font-medium">Meta Description</p>
          <p className="text-muted-foreground italic">"Learn how leading teams are combining human judgment with AI execution. Includes frameworks, examples, and implementation tips."</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Structure</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>H1: The Complete Guide to Human-AI Collaboration</li>
            <li>H2: Why "Human in the Loop" Matters</li>
            <li>H2: The Collaboration Framework</li>
            <li>H2: Real-World Examples</li>
            <li>H2: Getting Started</li>
          </ul>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-3">
          <span>Target keyword: human AI collaboration</span>
          <span>Difficulty: Medium</span>
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Case Study Outline</h4>
          <Badge variant="secondary">Draft</Badge>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-primary">The Challenge</p>
            <p className="text-sm text-muted-foreground">Acme Corp's sales team was spending 15+ hours/week on data entry and CRM updates.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-primary">The Solution</p>
            <p className="text-sm text-muted-foreground">Deployed Mira (Data & RevOps Specialist) with approval workflows for sensitive changes.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-primary">The Results</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 12 hours/week saved per rep</li>
              <li>• 99% data accuracy (up from 74%)</li>
              <li>• 3x faster lead response time</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium">Suggested Quote</p>
          <p className="text-sm text-muted-foreground italic">"Mira handles the grunt work so our team can focus on selling." — VP Sales, Acme Corp</p>
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <h4 className="font-semibold">SEO Recommendations</h4>
        <div className="space-y-3">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">AI employee management</span>
              <Badge variant="secondary" className="text-xs">Volume: 1,200/mo</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Difficulty: Low • Currently rank: Not ranking</p>
            <p className="text-xs mt-1">Suggested: Create pillar page + 3 supporting articles</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">human in the loop AI</span>
              <Badge variant="secondary" className="text-xs">Volume: 880/mo</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Difficulty: Medium • Currently rank: Page 3</p>
            <p className="text-xs mt-1">Suggested: Update existing blog, add more examples</p>
          </div>
        </div>
      </div>
    ),
  },
  priya: {
    tab1: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Candidate Shortlist: Senior Engineer</h4>
          <Badge>12 candidates</Badge>
        </div>
        <div className="space-y-3">
          {[
            { name: "Alex Chen", score: 94, current: "Staff Eng @ Stripe", strength: "System design expertise" },
            { name: "Sarah Johnson", score: 91, current: "Sr Eng @ Datadog", strength: "Distributed systems" },
            { name: "Michael Park", score: 88, current: "Lead Eng @ Startup (Series B)", strength: "Full-stack, startup exp" },
          ].map((candidate) => (
            <div key={candidate.name} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{candidate.name}</p>
                <p className="text-xs text-muted-foreground">{candidate.current}</p>
              </div>
              <div className="text-right">
                <Badge className="bg-primary/10 text-primary">{candidate.score}%</Badge>
                <p className="text-xs text-muted-foreground mt-1">{candidate.strength}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <h4 className="font-semibold">Outreach Message</h4>
        <div className="border rounded-lg p-4 text-sm space-y-3">
          <p>Hi Alex,</p>
          <p>Your work on Stripe's payment infrastructure caught my attention, especially the latency improvements you shipped last year.</p>
          <p>I'm reaching out about a Staff Engineer role at PrimeRole. We're building the collaboration layer between humans and AI, and your systems background would be incredibly valuable.</p>
          <p>Would you be open to a quick chat? No pressure. Happy to share more about what we're building either way.</p>
          <p>Best,<br/>Priya (on behalf of the PrimeRole team)</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Personalization score: High</span>
          <span>Expected response rate: 28%</span>
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Pipeline Report</h4>
          <span className="text-sm text-muted-foreground">Senior Engineer Role</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">89</p>
            <p className="text-xs text-muted-foreground">Sourced</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">34%</p>
            <p className="text-xs text-muted-foreground">Response Rate</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">18</p>
            <p className="text-xs text-muted-foreground">In Pipeline</p>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-2">Source Breakdown</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm w-24">LinkedIn</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }} />
              </div>
              <span className="text-sm w-8">60%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm w-24">Referrals</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-sm w-8">25%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm w-24">Indeed</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '15%' }} />
              </div>
              <span className="text-sm w-8">15%</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  tara: {
    tab1: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-semibold">Resume Summary: Alex Chen</p>
            <p className="text-sm text-muted-foreground">Senior Engineer Candidate</p>
          </div>
          <Badge className="bg-green-100 text-green-800">Match: 94%</Badge>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">Requirements Check</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span>
                5+ years experience
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span>
                Distributed systems
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span>
                Python/Go
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs">~</span>
                Management exp (nice-to-have)
              </div>
            </div>
          </div>
          <div className="border-t pt-3">
            <p className="text-sm font-medium mb-1">Strengths</p>
            <p className="text-sm text-muted-foreground">8 years at top-tier companies, shipped payment infra at scale</p>
            <p className="text-sm font-medium mb-1 mt-2">Considerations</p>
            <p className="text-sm text-muted-foreground">No startup experience. May need adjustment period</p>
          </div>
        </div>
      </div>
    ),
    tab2: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Phone Screen Summary</h4>
          <Badge className="bg-green-100 text-green-800">Advance</Badge>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Q: Why are you interested in PrimeRole?</p>
            <p className="text-sm text-muted-foreground mt-1">"I've been at big companies my whole career. I want to build something from earlier stage and have more ownership. The human-AI collaboration space is genuinely interesting to me."</p>
          </div>
          <div>
            <p className="text-sm font-medium">Q: Describe a complex system you've built.</p>
            <p className="text-sm text-muted-foreground mt-1">Detailed explanation of Stripe's real-time fraud detection pipeline. Strong system design thinking.</p>
          </div>
          <div>
            <p className="text-sm font-medium">Q: What's your expected compensation?</p>
            <p className="text-sm text-muted-foreground mt-1">"I'm flexible on cash if equity is meaningful. Looking for $180-220K base."</p>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium">Recommendation</p>
          <p className="text-sm text-muted-foreground">Strong advance. Schedule technical interview with engineering leads.</p>
        </div>
      </div>
    ),
    tab3: (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Screening Dashboard</h4>
          <span className="text-sm text-muted-foreground">This Week</span>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">156</p>
            <p className="text-xs text-muted-foreground">Resumes</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">42</p>
            <p className="text-xs text-muted-foreground">Screened</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-green-600">16</p>
            <p className="text-xs text-muted-foreground">Advanced</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">4 hrs</p>
            <p className="text-xs text-muted-foreground">Avg Time</p>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-2">Efficiency Gains</p>
          <p className="text-sm text-muted-foreground">Saved 32 hours this week vs. manual screening. Pass rate: 38% (aligned with target).</p>
        </div>
      </div>
    ),
  },
};

export function EmployeeSampleOutputs({ employee }: EmployeeSampleOutputsProps) {
  const outputs = sampleOutputContent[employee.id];

  if (!outputs) {
    return null;
  }

  return (
    <Tabs defaultValue="tab1">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="tab1">{employee.sampleOutputs.tab1.title}</TabsTrigger>
        <TabsTrigger value="tab2">{employee.sampleOutputs.tab2.title}</TabsTrigger>
        <TabsTrigger value="tab3">{employee.sampleOutputs.tab3.title}</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1">
        <Card className="shadow-lg">
          <CardContent className="p-6 relative">
            <Badge variant="outline" className="absolute top-4 right-4 text-xs">Sample</Badge>
            {outputs.tab1}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tab2">
        <Card className="shadow-lg">
          <CardContent className="p-6 relative">
            <Badge variant="outline" className="absolute top-4 right-4 text-xs">Sample</Badge>
            {outputs.tab2}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tab3">
        <Card className="shadow-lg">
          <CardContent className="p-6 relative">
            <Badge variant="outline" className="absolute top-4 right-4 text-xs">Sample</Badge>
            {outputs.tab3}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
