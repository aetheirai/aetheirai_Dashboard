import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, GitBranch, Brain, Link2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Notes Saved", value: "1,247", icon: FileText, change: "+12 this week" },
  { label: "Knowledge Connections", value: "3,891", icon: GitBranch, change: "+89 today" },
  { label: "AI Recalls This Week", value: "156", icon: Brain, change: "↑ 23%" },
  { label: "Semantic Links Active", value: "2,045", icon: Link2, change: "Live" },
];

const recentActivity = [
  { action: "Note created", title: "Quarterly AI Strategy Brief", time: "2 min ago" },
  { action: "Knowledge linked", title: "Neural Architecture → Performance Metrics", time: "15 min ago" },
  { action: "AI recall", title: "Retrieved context for Project Titan", time: "1 hour ago" },
  { action: "Note updated", title: "Infrastructure Scaling Roadmap v4", time: "3 hours ago" },
  { action: "Semantic link", title: "Connected 3 related research papers", time: "5 hours ago" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const DashboardOverview = () => {
  const { user } = useAuth();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 w-full">
      {/* Welcome */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, <span className="text-gradient-primary">{user?.name || "User"}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Your knowledge ecosystem at a glance</p>
        </div>
        
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-panel p-5 space-y-3 hover:border-primary/30 transition-colors group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</span>
              <s.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-3xl font-bold tracking-tight">{s.value}</div>
            <div className="text-xs text-primary font-medium">{s.change}</div>
          </div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={item} className="glass-panel p-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border/10 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.action}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">{a.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
