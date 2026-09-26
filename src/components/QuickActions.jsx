import { quickActions } from "../data/quickActions";

const colorMap = {
  purple: "bg-brand-purple/15 text-brand-purple",
  cyan: "bg-brand-cyan/15 text-brand-cyan",
  pink: "bg-brand-pink/15 text-brand-pink",
  lime: "bg-brand-lime/15 text-brand-lime",
};

function QuickActions({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {quickActions.map(({ id, label, icon: Icon, color }) => (
        <button
          key={id}
          onClick={() => onSelect(label)}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface border border-border-subtle text-sm text-text-primary hover:border-white/20 hover:-translate-y-0.5 transition-all"
        >
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${colorMap[color]}`}>
            <Icon className="h-4 w-4" />
          </span>
          {label}
        </button>
      ))}
    </div>
  );
}

export default QuickActions;