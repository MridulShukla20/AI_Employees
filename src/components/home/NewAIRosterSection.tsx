import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Megaphone, Users, CheckCircle, ArrowRight } from "lucide-react";
import { employees } from "@/data/employees";

const departments = [
  { id: "sales", label: "Sales", icon: TrendingUp },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "recruitment", label: "Recruiting", icon: Users },
];

// Filter employees by department
const getEmployeesByDepartment = (dept: string) => {
  const deptMap: Record<string, string[]> = {
    sales: ["mira", "riya", "maya", "sofia"],
    marketing: ["zara", "lena", "sana"],
    recruitment: ["priya", "tara"],
  };
  return deptMap[dept]?.map(id => employees[id]).filter(Boolean) || [];
};

// Geometric avatar component
const GeometricAvatar = ({ name, colorScheme }: { name: string; colorScheme: string }) => {
  const gradients: Record<string, string> = {
    purple: "from-purple-400 to-purple-600",
    pink: "from-pink-400 to-purple-500",
    amber: "from-amber-400 to-orange-500",
    teal: "from-teal-400 to-cyan-500",
    emerald: "from-emerald-400 to-teal-500",
    blue: "from-blue-400 to-indigo-500",
    rose: "from-rose-400 to-pink-500",
    indigo: "from-indigo-400 to-purple-500",
    green: "from-green-400 to-emerald-500",
  };

  return (
    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[colorScheme] || gradients.purple} flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
      {/* Abstract geometric shapes */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-full -translate-y-2 translate-x-2" />
      <div className="absolute bottom-0 left-0 w-6 h-6 bg-white/15 rounded-full translate-y-2 -translate-x-2" />
      <span className="text-2xl font-display font-bold text-white relative z-10">
        {name.charAt(0)}
      </span>
    </div>
  );
};

interface AIEmployeeCardProps {
  employee: ReturnType<typeof getEmployeesByDepartment>[0];
  index: number;
  colorScheme: string;
}

const AIEmployeeCard = ({ employee, index, colorScheme }: AIEmployeeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!employee) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/marketplace/${employee.id}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[380px] rounded-3xl p-8 bg-gradient-to-br from-indigo-dark via-purple-900/80 to-purple-800/60 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${colorScheme === 'purple' ? 'rgba(139, 92, 246, 0.2)' : colorScheme === 'pink' ? 'rgba(236, 72, 153, 0.2)' : colorScheme === 'amber' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'} 0%, transparent 70%)`,
            }}
          />

          {/* Floating shapes */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <GeometricAvatar name={employee.name} colorScheme={colorScheme} />
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-purple-500/30 to-transparent blur-md -z-10" />
              </div>
            </div>

            {/* Name & Role */}
            <h3 className="text-2xl font-display font-bold text-white text-center mb-1">
              {employee.name}
            </h3>
            <p className="text-sm uppercase tracking-wider text-purple-300 text-center mb-4">
              {employee.role}
            </p>

            {/* Description */}
            <p className="text-white/70 text-center text-sm leading-relaxed mb-4 line-clamp-2">
              {employee.oneLiner}
            </p>

            {/* Tag */}
            <div className="flex justify-center mb-auto">
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-white/80">
                Needs: {employee.inputs?.split('+')[0]?.trim() || 'Data connection'}
              </span>
            </div>

            {/* Stat badge */}
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">{employee.stat}</span>
              </div>
            </div>

            {/* Hover CTA */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-purple-600 font-semibold text-sm">
                    Hire {employee.name}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export function NewAIRosterSection() {
  const [activeTab, setActiveTab] = useState("sales");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const colorSchemes: Record<string, string[]> = {
    sales: ["purple", "pink", "amber", "teal"],
    marketing: ["rose", "indigo", "blue"],
    recruitment: ["emerald", "green"],
  };

  const currentEmployees = getEmployeesByDepartment(activeTab);

  return (
    <section ref={sectionRef} className="py-32 bg-indigo-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: "10%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ bottom: "20%", right: "-5%" }}
        />
        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-20 h-20 border border-white/10 rounded-lg rotate-12" />
        <div className="absolute bottom-40 left-40 w-16 h-16 border border-white/10 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Meet Your AI Employees</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Each AI employee is trained for a specific role. Hire the ones you need.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 border border-white/10">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === dept.id
                    ? "bg-white text-purple-600 shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <dept.icon className="w-4 h-4" />
                {dept.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Employee cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {currentEmployees.map((employee, index) => (
              <AIEmployeeCard
                key={employee?.id || index}
                employee={employee}
                index={index}
                colorScheme={colorSchemes[activeTab]?.[index] || "purple"}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
