import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { employees, Employee } from "@/data/employees";

interface AIEmployeesDropdownProps {
  onClose?: () => void;
}

// Get employees for a department (primary or secondary)
const getEmployeesForDept = (dept: string): Employee[] => {
  return employees.filter(
    e => e.department === dept || e.secondaryDepartments?.includes(dept as "sales" | "marketing" | "recruitment")
  );
};

const departmentGroups = [
  {
    key: "sales",
    label: "Sales & RevOps",
    employees: getEmployeesForDept("sales"),
  },
  {
    key: "marketing",
    label: "Marketing",
    employees: getEmployeesForDept("marketing"),
  },
  {
    key: "recruitment",
    label: "Recruitment",
    employees: getEmployeesForDept("recruitment"),
  },
];

export function AIEmployeesDropdown({ onClose }: AIEmployeesDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-elevated overflow-hidden"
    >
      <div className="p-6">
        <div className="grid grid-cols-3 gap-8">
          {departmentGroups.map((group) => (
            <div key={group.key}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {group.label}
              </h4>
              <ul className="space-y-1">
                {group.employees.map((employee) => {
                  const isPrimary = employee.department === group.key;
                  return (
                    <li key={employee.id}>
                      <Link
                        to={`/ai-employees/${employee.id}`}
                        onClick={onClose}
                        className="block p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <employee.icon className={`w-4 h-4 ${isPrimary ? 'text-primary' : 'text-muted-foreground'} opacity-70 group-hover:opacity-100 transition-opacity`} />
                          <span className={`font-medium text-sm ${isPrimary ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {employee.name}
                          </span>
                          {!isPrimary && (
                            <span className="text-[10px] text-muted-foreground/60 ml-auto">+</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 pl-6">
                          {employee.role}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function AIEmployeesNavItem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        AI Employees
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && <AIEmployeesDropdown onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

// Mobile version with collapsible sections
export function AIEmployeesMobileMenu({
  onLinkClick,
}: {
  onLinkClick: () => void;
}) {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
        AI Employees
      </p>
      {departmentGroups.map((group) => (
        <div key={group.key}>
          <button
            onClick={() =>
              setExpandedDept(expandedDept === group.key ? null : group.key)
            }
            className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            {group.label}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${expandedDept === group.key ? "rotate-180" : ""
                }`}
            />
          </button>
          <AnimatePresence>
            {expandedDept === group.key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ul className="pl-4 space-y-1 py-2">
                  {group.employees.map((employee) => {
                    const isPrimary = employee.department === group.key;
                    return (
                      <li key={employee.id}>
                        <Link
                          to={`/ai-employees/${employee.id}`}
                          onClick={onLinkClick}
                          className={`flex items-center gap-2 px-2 py-1.5 text-sm transition-colors ${isPrimary ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}
                        >
                          <employee.icon className="w-4 h-4" />
                          {employee.name}
                          {!isPrimary && (
                            <span className="text-[10px] text-muted-foreground/60 ml-auto">+</span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
