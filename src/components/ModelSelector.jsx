import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { models } from "../data/models";

const colorMap = {
  purple: "bg-brand-purple/15 text-brand-purple",
  cyan: "bg-brand-cyan/15 text-brand-cyan",
  orange: "bg-brand-orange/15 text-brand-orange",
  lime: "bg-brand-lime/15 text-brand-lime",
};

function ModelSelector({ selectedModel, onSelect }) {
  const [open, setOpen] = useState(false);
  const SelectedIcon = selectedModel.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-surface border border-border-subtle text-sm hover:border-white/20 transition-colors"
      >
        <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${colorMap[selectedModel.color]}`}>
          <SelectedIcon className="h-3.5 w-3.5" />
        </span>
        <span className="font-medium text-text-primary">{selectedModel.name}</span>
        <ChevronDown className={`h-4 w-4 text-text-secondary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 w-72 bg-surface border border-border-subtle rounded-xl shadow-xl shadow-black/40 overflow-hidden z-10">
          {models.map((model) => {
            const Icon = model.icon;
            const isActive = selectedModel.id === model.id;
            return (
              <button
                key={model.id}
                onClick={() => {
                  onSelect(model);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                  isActive ? "bg-elevated" : "hover:bg-elevated/60"
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorMap[model.color]}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-text-primary font-medium truncate">{model.name}</div>
                  <div className="text-xs text-text-secondary">{model.provider} · {model.speed}</div>
                </div>
                {isActive && <Check className="h-4 w-4 text-brand-purple shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ModelSelector;