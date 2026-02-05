import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Megaphone, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { employees, Employee } from "@/data/employees";

// Department definitions
const departments = [
  {
    id: "sales" as const,
    name: "Sales",
    icon: TrendingUp,
    tagline: "AI employees that help revenue teams move faster and close more deals.",
    outcomes: [
      "Keep CRM data clean and enriched",
      "Coach reps using real call insights",
      "Flag pipeline risks before they grow",
      "Personalize outreach at scale",
    ],
    gradient: "from-violet-500/10 via-indigo-500/5 to-transparent",
    iconBg: "from-violet-500 to-indigo-600",
    accentColor: "text-violet-600",
    borderColor: "border-violet-200/50",
  },
  {
    id: "marketing" as const,
    name: "Marketing",
    icon: Megaphone,
    tagline: "AI employees that create, publish, and optimize content across channels.",
    outcomes: [
      "Generate social content on autopilot",
      "Write emails that get opened",
      "Create SEO content that ranks",
      "Analyze performance and suggest improvements",
    ],
    gradient: "from-pink-500/10 via-rose-500/5 to-transparent",
    iconBg: "from-pink-500 to-rose-600",
    accentColor: "text-pink-600",
    borderColor: "border-pink-200/50",
  },
  {
    id: "recruitment" as const,
    name: "HR / Recruiting",
    icon: Users,
    tagline: "AI employees that help you find and hire great people faster.",
    outcomes: [
      "Source qualified candidates automatically",
      "Screen resumes and rank applicants",
      "Schedule interviews without friction",
      "Keep candidates engaged throughout",
    ],
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    iconBg: "from-emerald-500 to-teal-600",
    accentColor: "text-emerald-600",
    borderColor: "border-emerald-200/50",
  },
];

type DeptId = "sales" | "marketing" | "recruitment";

// Get capabilities (departments) for an employee
function getEmployeeCapabilities(emp: Employee): DeptId[] {
  const caps: DeptId[] = [emp.department];
  if (emp.secondaryDepartments) {
    emp.secondaryDepartments.forEach(d => {
      if (!caps.includes(d)) caps.push(d);
    });
  }
  return caps;
}

// Pre-compute employee lists based on CAPABILITIES (View Model)
function getEmployeesByCapability(): Record<DeptId, Employee[]> {
  const result: Record<DeptId, Employee[]> = {
    sales: [],
    marketing: [],
    recruitment: [],
  };

  // Single pass through all employees
  employees.forEach(emp => {
    const capabilities = getEmployeeCapabilities(emp);
    capabilities.forEach(cap => {
      if (result[cap] && !result[cap].some(e => e.id === emp.id)) {
        result[cap].push(emp);
      }
    });
  });

  return result;
}

// Optimized Card Component
const DepartmentCard = ({
  dept,
  index,
  employees: deptEmployees,
  progress, // Spring-smoothed progress 0..1
}: {
  dept: typeof departments[0];
  index: number;
  employees: Employee[];
  progress: MotionValue<number>;
}) => {
  const Icon = dept.icon;
  const totalSteps = departments.length;

  // Timeline Logic:
  // 0.0 - 0.33: Sales Active
  // 0.33 - 0.66: Marketing Active
  // 0.66 - 1.0: HR Active

  // Phase logic with smooth entry/exit overlaps
  const stepSize = 1 / totalSteps;
  const myStart = index * stepSize;
  const myEnd = (index + 1) * stepSize;

  // 1. Scale Logic: 1.0 when active, 0.92 when inactive (behind or passed)
  const scale = useTransform(
    progress,
    [myStart - 0.1, myStart, myEnd, myEnd + 0.1],
    [0.92, 1, 1, 0.92]
  );

  // 2. Opacity Logic: 1.0 when active, 0.0 when very far, 0.3 when just behind
  const opacity = useTransform(
    progress,
    [myStart - 0.2, myStart, myEnd, myEnd + 0.2],
    [0, 1, 1, 0]
  );

  // 3. Y-Position Logic:
  // Enters from bottom (+40px), Sits at 0, Exits to top (-40px)
  const y = useTransform(
    progress,
    [myStart - 0.15, myStart, myEnd, myEnd + 0.15],
    [40, 0, 0, -40]
  );

  // 4. Blur Logic: clear when active, blurred when inactive
  const filter = useTransform(
    progress,
    [myStart - 0.1, myStart, myEnd, myEnd + 0.1],
    ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]
  );

  // 5. Z-Index Management
  const zIndex = useTransform(
    progress,
    [myStart, myEnd],
    [10, 10] // Active layer
  );

  // Staggered opacity for employees inside the card to feel "alive" as it enters
  const empOpacity = useTransform(
    progress,
    [myStart, myStart + 0.05],
    [0.2, 1]
  );

  return (
    <motion.div
      className={`absolute inset-0 rounded-3xl bg-card border ${dept.borderColor} shadow-floating overflow-hidden will-change-transform`}
      style={{
        scale,
        opacity,
        y,
        filter,
        zIndex: index, // Default stacking order
      }}
    >
      {/* Active Department Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${dept.gradient}`} />

      <div className="relative p-6 md:p-10 h-full flex flex-col pointer-events-none">
        {/* Pointer events none on container, auto on interactive children to prevent scroll trapping */}

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 shrink-0 pointer-events-auto">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${dept.iconBg} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold">{dept.name}</h3>
            <p className="text-sm md:text-base text-muted-foreground line-clamp-1">{dept.tagline}</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 flex-1 min-h-0 pointer-events-auto">
          {/* Outcomes - Takes up 4 columns */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                Key Outcomes
              </h4>
              <ul className="space-y-3">
                {dept.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm">
                    <CheckCircle className={`w-4 h-4 ${dept.accentColor} shrink-0 mt-0.5`} />
                    <span className="leading-snug">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-border/40 hidden lg:block">
              <Link to={`/ai-employees?dept=${dept.id}`}>
                <Button variant="outline" className="group w-full justify-between">
                  Explore {dept.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Employees List - Takes up 8 columns - Grid Layout */}
          <div className="lg:col-span-8 flex flex-col min-h-0">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 shrink-0">
              Available Employees ({deptEmployees.length})
            </h4>

            {/* Scrollable grid container if needed, but we try to fix fit */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              style={{ opacity: empOpacity }}
            >
              {deptEmployees.map((emp) => {
                const EmpIcon = emp.icon;
                const worksWithAlso = emp.department !== dept.id;

                return (
                  <Link
                    key={emp.id}
                    to={`/ai-employees/${emp.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background/60 border border-border/40 hover:bg-background hover:border-border transition-all group hover:shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <EmpIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-semibold text-sm truncate">{emp.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                        {emp.oneLiner}
                      </p>
                      {worksWithAlso && (
                        <span className="text-[10px] text-primary/70 block mt-1 font-medium">
                          + works with {dept.name}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </motion.div>

            {/* Mobile-only CTA */}
            <div className="mt-6 lg:hidden">
              <Link to={`/ai-employees?dept=${dept.id}`}>
                <Button variant="outline" className="group w-full justify-between">
                  Explore {dept.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function AITeammatesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 1. Scroll-linked progress (0 to 1) purely via transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 2. Physics-based smoothing (Spring)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. Pre-compute capabilities (Data Model)
  const employeesByDept = useMemo(() => getEmployeesByCapability(), []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }} // 300vh scroll track
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 w-full h-full flex flex-col justify-center">

          {/* Section Header */}
          <div className="text-center mb-8 shrink-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Flexible AI Team Modules
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Deploy specialized AI units to handle end-to-end workflows. <br className="hidden md:block" />
              They adapt to your tools and scale with your needs.
            </p>
          </div>

          {/* Cards Container - Responsive Height */}
          <div className="relative w-full max-w-6xl mx-auto h-[65vh] min-h-[500px] max-h-[800px]" style={{ perspective: "1000px" }}>
            {departments.map((dept, index) => (
              <DepartmentCard
                key={dept.id}
                dept={dept}
                index={index}
                employees={employeesByDept[dept.id]}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
