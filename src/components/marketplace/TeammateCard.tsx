import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield } from "lucide-react";
import type { Employee } from "@/data/employees";

interface TeammateCardProps {
  employee: Employee;
}

export function TeammateCard({ employee }: TeammateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border shadow-soft hover:border-primary/20 group"
    >
      <Link to={`/marketplace/${employee.id}`} className="block p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:shadow-glow transition-shadow shrink-0">
            <employee.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{employee.name}</h3>
            <p className="text-sm text-muted-foreground">{employee.role}</p>
          </div>
        </div>

        {/* Value sentence */}
        <p className="text-sm text-muted-foreground mb-4">{employee.oneLiner}</p>

        {/* Capability chips (collapsed view) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {employee.autonomous.slice(0, 3).map((item) => (
            <Badge key={item} variant="secondary" className="text-xs">
              {item.split(" ").slice(0, 2).join(" ")}
            </Badge>
          ))}
        </div>
      </Link>

      {/* Expanded content */}
      {isExpanded && (
        <div className="space-y-4 px-6 pb-4 pt-0 border-t border-border">
          <div className="pt-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Works autonomously</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {employee.autonomous.slice(0, 3).map((item) => (
                <Badge key={item} variant="secondary" className="text-xs">
                  {item.split(" ").slice(0, 3).join(" ")}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span>Requires approval</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {employee.requiresApproval.slice(0, 3).map((item) => (
                <Badge key={item} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 pb-6 pt-4 border-t border-border flex items-center justify-between">
        <p className="text-sm">
          <span className="font-semibold text-primary">{employee.stat}</span>
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="text-primary text-xs"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Show less" : "Learn more"}
        </Button>
      </div>
    </motion.div>
  );
}
