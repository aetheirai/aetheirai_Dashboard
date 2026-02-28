import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Moon, Bell, LogOut } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const SettingsPage = () => {
  const { user, logout } = useAuth();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 w-full">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          <span className="text-gradient-primary">Settings</span>
        </h1>
        <p className="text-muted-foreground text-sm">Manage your preferences and account</p>
      </motion.div>

      {/* Profile */}
      <motion.div variants={item} className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Profile</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-xl font-bold text-primary uppercase">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-semibold">{user?.name || "User"}</p>
            <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div variants={item} className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Theme</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Always enabled for optimal experience</p>
          </div>
          <Switch defaultChecked disabled />
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={item} className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Notifications</h3>
        </div>
        {["AI Recall Alerts", "Knowledge Link Updates", "Weekly Digest"].map((n, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <span className="text-sm">{n}</span>
            <Switch defaultChecked={i < 2} />
          </div>
        ))}
      </motion.div>

      {/* Account */}
      <motion.div variants={item} className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <LogOut className="w-4 h-4 text-destructive" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Account</h3>
        </div>
        <Button variant="destructive" onClick={logout} className="rounded-xl">
          Sign Out
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
