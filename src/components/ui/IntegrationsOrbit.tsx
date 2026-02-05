import { motion } from "framer-motion";
import { ElementType } from "react";

// Default integrations fallback by department
const departmentDefaults: Record<string, string[]> = {
    sales: ["Salesforce", "HubSpot", "Pipedrive", "Gmail", "Slack", "Zoom"],
    marketing: ["HubSpot", "Mailchimp", "LinkedIn", "Buffer", "Google Ads", "Slack"],
    recruitment: ["LinkedIn", "Greenhouse", "Lever", "Workday", "Slack", "Zoom"],
};

// Global fallback if department not found
const globalDefaults = ["Slack", "Google", "Microsoft", "Salesforce", "HubSpot", "Zoom"];

interface IntegrationsOrbitProps {
    employeeName: string;
    employeeIcon: ElementType;
    integrations?: string[];
    department?: string;
}

export const IntegrationsOrbit = ({
    employeeName,
    employeeIcon: EmployeeIcon,
    integrations = [],
    department = "sales",
}: IntegrationsOrbitProps) => {
    // Get integrations with fallbacks - ensure minimum 5, maximum 8
    let displayIntegrations = integrations.length >= 5
        ? integrations.slice(0, 8)
        : integrations;

    // If less than 5, fill from department defaults
    if (displayIntegrations.length < 5) {
        const fallback = departmentDefaults[department] || globalDefaults;
        const existing = new Set(displayIntegrations.map(i => i.toLowerCase()));
        const additional = fallback.filter(i => !existing.has(i.toLowerCase()));
        displayIntegrations = [...displayIntegrations, ...additional].slice(0, 8);
    }

    // Ensure at least 5
    if (displayIntegrations.length < 5) {
        const existing = new Set(displayIntegrations.map(i => i.toLowerCase()));
        const additional = globalDefaults.filter(i => !existing.has(i.toLowerCase()));
        displayIntegrations = [...displayIntegrations, ...additional].slice(0, Math.max(5, displayIntegrations.length));
    }

    const count = displayIntegrations.length;
    const radius = 120; // pixels from center

    // Pre-calculate positions for each integration
    const positions = displayIntegrations.map((_, i) => {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2; // Start from top
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return { x, y, angle };
    });

    return (
        <div className="relative w-80 h-80 mx-auto">
            {/* Orbit circle (SVG background) */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 320 320"
                style={{ zIndex: 0 }}
            >
                <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                    strokeDasharray="4 4"
                />
            </svg>

            {/* Center avatar */}
            <motion.div
                className="absolute w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-elevated"
                style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-40px",
                    marginLeft: "-40px",
                    zIndex: 10,
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <EmployeeIcon className="w-10 h-10 text-white" />
            </motion.div>

            {/* Integration badges */}
            {displayIntegrations.map((integration, i) => {
                const { x, y } = positions[i];

                return (
                    <motion.div
                        key={`${integration}-${i}`}
                        className="absolute px-3 py-1.5 rounded-full bg-card border border-border shadow-soft whitespace-nowrap"
                        style={{
                            top: "50%",
                            left: "50%",
                            marginTop: y - 14, // Half of badge height
                            marginLeft: x - 40, // Approximate half of badge width
                            zIndex: 5,
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
                    >
                        <span className="text-sm font-medium">{integration}</span>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default IntegrationsOrbit;
