import { MessageSquare, History, Settings } from "lucide-react";

const navItems = [
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "history", icon: History, label: "History" },
  { id: "settings", icon: Settings, label: "Settings" },
];

function NavRail({ activePage, onNavigate }) {
  return (
    <nav aria-label="Main navigation" className="flex flex-col items-center gap-1 w-14 shrink-0 border-l border-border-subtle bg-surface py-3">
      {navItems.map(({ id, icon: Icon, label }) => {
        const isActive = activePage === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center gap-1 w-11 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${
              isActive
                ? "bg-elevated text-brand-purple"
                : "text-text-secondary hover:text-text-primary hover:bg-elevated/60"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] leading-none">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default NavRail;