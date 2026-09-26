import { Cat } from "lucide-react";

function TypingIndicator() {
  return (
    <div className="flex gap-2 px-4">
      <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-amber-400 border border-slate-700">
        <Cat className="h-4 w-4" />
      </span>
      <div role="status" aria-label="EchoGPT is responding" className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-surface border border-border-subtle px-3 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-text-secondary animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-text-secondary animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-text-secondary animate-bounce" />
      </div>
    </div>
  );
}

export default TypingIndicator;