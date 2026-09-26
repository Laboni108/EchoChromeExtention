import { Moon, Sun, Keyboard, Info, ChevronRight } from "lucide-react";
import { models } from "../data/models";

const colorMap = {
  purple: "bg-brand-purple/15 text-brand-purple",
  cyan: "bg-brand-cyan/15 text-brand-cyan",
  orange: "bg-brand-orange/15 text-brand-orange",
  lime: "bg-brand-lime/15 text-brand-lime",
};

function SettingRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle last:border-b-0">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-text-secondary" />
        <span className="text-sm text-text-primary">{label}</span>
      </div>
      {children}
    </div>
  );
}

function SettingsPage({ defaultModel, onDefaultModelChange, theme, onThemeChange }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Appearance */}
      <div className="p-4 pb-2">
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Appearance</h2>
      </div>
      <div className="mx-4 mb-4 rounded-xl bg-surface border border-border-subtle overflow-hidden">
        <SettingRow icon={theme === "dark" ? Moon : Sun} label="Theme">
          <div className="flex items-center gap-1 rounded-lg bg-elevated p-0.5">
            <button
              onClick={() => onThemeChange("dark")}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                theme === "dark" ? "bg-brand-gradient text-white" : "text-text-secondary"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => onThemeChange("light")}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                theme === "light" ? "bg-brand-gradient text-white" : "text-text-secondary"
              }`}
            >
              Light
            </button>
          </div>
        </SettingRow>
      </div>

      {/* AI Preferences */}
      <div className="p-4 pb-2">
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide">AI Preferences</h2>
      </div>
      <div className="mx-4 mb-4 rounded-xl bg-surface border border-border-subtle overflow-hidden">
        <div className="px-4 py-3">
          <span className="text-sm text-text-primary block mb-2">Default model</span>
          <div className="flex flex-col gap-1">
            {models.map((m) => {
              const Icon = m.icon;
              const isActive = defaultModel.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onDefaultModelChange(m)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive ? "bg-elevated text-text-primary" : "text-text-secondary hover:bg-elevated/60"
                  }`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${colorMap[m.color]}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1 text-left">{m.name}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand-purple shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="p-4 pb-2">
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Preferences</h2>
      </div>
      <div className="mx-4 mb-4 rounded-xl bg-surface border border-border-subtle overflow-hidden">
        <SettingRow icon={Keyboard} label="Open EchoGPT">
          <kbd className="px-2 py-1 rounded-md bg-elevated text-xs text-text-secondary font-mono">
            Ctrl+Shift+E
          </kbd>
        </SettingRow>
      </div>

      {/* About */}
      <div className="p-4 pb-2">
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide">About</h2>
      </div>
      <div className="mx-4 mb-4 rounded-xl bg-surface border border-border-subtle overflow-hidden">
        <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-elevated/60 transition-colors">
          <div className="flex items-center gap-3">
            <Info className="h-4 w-4 text-text-secondary" />
            <span className="text-sm text-text-primary">About EchoGPT</span>
          </div>
          <ChevronRight className="h-4 w-4 text-text-secondary" />
        </button>
        <div className="px-4 pb-3 -mt-1">
          <span className="text-xs text-text-secondary">Version 1.0.0</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;