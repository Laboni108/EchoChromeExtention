import { useState } from "react";
import { ArrowUp } from "lucide-react";

function PromptInput({ value, onChange, onSend }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      className={`flex items-end gap-2 p-2 rounded-xl bg-surface border transition-colors ${
        isFocused ? "border-brand-purple/60" : "border-border-subtle"
      }`}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Ask EchoGPT anything..."
        rows={1}
        className="flex-1 resize-none bg-transparent text-sm text-text-primary placeholder-text-secondary focus:outline-none max-h-24"
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gradient disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
      >
        <ArrowUp className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}

export default PromptInput;