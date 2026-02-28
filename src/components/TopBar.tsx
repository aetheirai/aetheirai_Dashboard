import { Bell, Menu, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  onMenuToggle: () => void;
}

const TopBar = ({ onMenuToggle }: TopBarProps) => {
  const { user } = useAuth();

  return (
    <header className="h-14 md:h-16 border-b border-border/20 glass-panel-strong rounded-none flex items-center justify-between px-3 md:px-6 sticky top-0 z-20 gap-3">
      {/* Menu button (mobile) */}
      <button
        onClick={onMenuToggle}
        className="md:hidden w-10 h-10 rounded-xl bg-muted/20 border border-border/30 flex items-center justify-center hover:bg-muted/40 transition-colors shrink-0"
      >
        <Menu className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search knowledge base..."
          className="pl-10 bg-muted/20 border-border/30 h-9 md:h-10 rounded-xl focus:border-primary/40 text-sm"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-muted/20 border border-border/30 flex items-center justify-center hover:bg-muted/40 transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-xs md:text-sm font-bold text-primary uppercase">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight">{user?.name || "User"}</p>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Pro Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
