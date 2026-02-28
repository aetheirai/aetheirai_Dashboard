import {
  LayoutDashboard,
  Sparkles,
  GitBranch,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
  FileText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Courses", path: "/courses", icon: BookOpen }, // ✅ Added
  { title: "Notes", path: "/notes", icon: FileText },     // ✅ Added
  { title: "Features", path: "/features", icon: Sparkles },
  { title: "How It Works", path: "/how-it-works", icon: GitBranch },
  { title: "Settings", path: "/settings", icon: Settings },
];

interface DashboardSidebarProps {
  isMobile: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({
  isMobile,
  mobileOpen,
  onClose,
}: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  const isVisible = isMobile ? mobileOpen : true;
  const showLabels = isMobile ? true : !collapsed;

  if (!isVisible) return null;

  return (
    <aside
      className={cn(
        "h-screen flex flex-col glass-panel-strong border-r border-border/30 transition-all duration-300 z-50",
        isMobile
          ? "fixed top-0 left-0 w-[260px] shadow-2xl"
          : cn("sticky top-0", collapsed ? "w-[72px]" : "w-[240px]")
      )}
    >
      {/* =========================
          Brand Section
      ========================== */}
      <div className="p-4 flex items-center justify-between border-b border-border/20">
        <div className="flex items-center gap-3 overflow-hidden">
          <a
            href="https://aetheirai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="AetheriAI Logo"
              className={cn(
                "transition-all duration-300 object-contain",
                collapsed && !isMobile ? "w-8" : "w-32"
              )}
            />
          </a>
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* =========================
          Navigation
      ========================== */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={isMobile ? onClose : undefined}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20 glow-primary-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )
            }
          >
            <item.icon className="w-5 h-5 shrink-0 transition-colors" />
            {showLabels && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* =========================
          Bottom Section
      ========================== */}
      <div className="p-3 border-t border-border/20 space-y-1">
        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {showLabels && <span>Logout</span>}
        </button>

        {/* Collapse (Desktop Only) */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all w-full"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 shrink-0" />
            ) : (
              <ChevronLeft className="w-5 h-5 shrink-0" />
            )}
            {!collapsed && <span>Collapse</span>}
          </button>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;