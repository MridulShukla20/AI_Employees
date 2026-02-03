import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle, Zap, FileText, Check, X, Pencil } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "See proposed actions before they execute",
    description: "AI employees draft the work. You see exactly what they'll do—preview emails, review posts, check data changes.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: CheckCircle,
    title: "Approve with one click or provide guidance",
    description: "One-click approve or add comments. AI learns from your feedback.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Set auto-approve rules as you build trust",
    description: "Once you trust an AI employee, auto-approve certain actions. You still get notified.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: FileText,
    title: "Complete audit trail of every decision",
    description: "Full history of what was proposed, approved, or rejected. Perfect for compliance.",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
];

const mockQueueItems = [
  {
    id: 1,
    ai: "Maya",
    aiColor: "from-amber-400 to-orange-500",
    action: "Outreach Email",
    preview: "Subject: Your Q4 sales strategy question...",
    excerpt: "Hi Jennifer, I noticed your recent post about scaling sales teams. I'd love to share how our AI employees can help...",
    time: "2 minutes ago",
    priority: "high",
  },
  {
    id: 2,
    ai: "Zara",
    aiColor: "from-rose-400 to-pink-500",
    action: "LinkedIn Post",
    preview: "5 ways AI is changing the way teams collaborate...",
    excerpt: "The future of work isn't about replacing humans—it's about empowering them. Here's what we've learned...",
    time: "12 minutes ago",
    priority: "medium",
  },
  {
    id: 3,
    ai: "Sofia",
    aiColor: "from-teal-400 to-cyan-500",
    action: "CRM Update",
    preview: "Update deal stage: Acme Corp → Negotiation",
    excerpt: "Moving based on yesterday's meeting notes indicating price discussion.",
    time: "25 minutes ago",
    priority: "low",
  },
];

const QueueCard = ({ item, onApprove }: { item: typeof mockQueueItems[0]; onApprove: (id: number) => void }) => {
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => onApprove(item.id), 600);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isApproving ? 0 : 1, y: isApproving ? -50 : 0, scale: isApproving ? 0.95 : 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className="bg-white rounded-2xl p-5 border border-border shadow-soft hover:shadow-elevated transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* AI Avatar */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.aiColor} flex items-center justify-center shrink-0`}>
          <span className="text-white font-semibold text-sm">{item.ai.charAt(0)}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">{item.ai}</span>
            <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {item.action}
            </span>
            {item.priority === "high" && (
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            )}
          </div>
          <p className="text-sm font-medium text-foreground mb-1 truncate">{item.preview}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{item.excerpt}</p>
          <p className="text-xs text-muted-foreground mt-2">{item.time}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <button
          onClick={handleApprove}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
        >
          <Check className="w-4 h-4" />
          Approve
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-gray-200 transition-colors">
          <Pencil className="w-4 h-4" />
          Edit
        </button>
        <button className="p-2 rounded-xl text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export function NewApprovalSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [queueItems, setQueueItems] = useState(mockQueueItems);

  const handleApprove = (id: number) => {
    setQueueItems(prev => prev.filter(item => item.id !== id));
    // Add new item after short delay
    setTimeout(() => {
      setQueueItems(prev => [
        ...prev,
        {
          id: Date.now(),
          ai: "Mira",
          aiColor: "from-purple-400 to-purple-600",
          action: "Data Enrichment",
          preview: "Enriched 12 new contacts from TechStart Inc",
          excerpt: "Added company size, funding stage, and decision maker details to your CRM.",
          time: "Just now",
          priority: "low",
        }
      ]);
    }, 800);
  };

  return (
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              You're Always in Control
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Every email, every post, every action—your AI employees submit their work to you first. 
              Review, approve, or give feedback in seconds.
            </p>

            {/* Feature list */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center shrink-0`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Interactive mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl -z-10" />

            {/* Mockup container */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-elevated border border-border">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Approval Queue</h3>
                  <p className="text-sm text-muted-foreground">Review pending actions</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-600">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-sm font-medium">{queueItems.length} pending</span>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-2 mb-6">
                {["All", "High Priority", "Waiting"].map((tab, i) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      i === 0 
                        ? "bg-primary text-white" 
                        : "bg-muted text-muted-foreground hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Queue items */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {queueItems.map((item) => (
                    <QueueCard key={item.id} item={item} onApprove={handleApprove} />
                  ))}
                </AnimatePresence>
              </div>

              {queueItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
                  <p className="font-medium text-foreground">All caught up!</p>
                  <p className="text-sm text-muted-foreground">No pending approvals</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
