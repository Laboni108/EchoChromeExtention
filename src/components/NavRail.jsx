import { MessageSquare, History, Settings } from "lucide-react";

const navItems = [
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "history", icon: History, label: "History" },
  { id: "settings", icon: Settings, label: "Settings" },
];

function NavRail({ activePage, onNavigate }) {
  return (
    <div className="flex flex-col items-center gap-1 w-14 shrink-0 border-l border-border-subtle bg-surface py-3">
      {navItems.map(({ id, icon: Icon, label }) => {
        const isActive = activePage === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            title={label}
            className={`flex flex-col items-center gap-1 w-11 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-elevated text-brand-purple"
                : "text-text-secondary hover:text-text-primary hover:bg-elevated/60"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] leading-none">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default NavRail;