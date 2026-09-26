import { useState } from "react";
import { Copy, Check, RotateCcw, Cat } from "lucide-react";

function ChatMessage({ role, content, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (isUser) {
    return (
      <div className="flex justify-end px-4">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand-gradient px-3 py-2 text-sm text-white">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 px-4">
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-amber-400 border border-slate-700"
      >
        <Cat className="h-4 w-4" />
      </span>
      <div className="flex-1 min-w-0">
        <div role="article" aria-label="EchoGPT response" className="max-w-[90%] rounded-2xl rounded-tl-sm bg-surface border border-border-subtle px-3 py-2 text-sm text-text-primary">
          {content}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={handleCopy}
            aria-label={copied ? "Copied to clipboard" : "Copy response"}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-text-secondary hover:bg-elevated hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          >
            {copied ? <Check className="h-3 w-3 text-brand-lime" aria-hidden="true" /> : <Copy className="h-3 w-3" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={onRegenerate}
            aria-label="Regenerate response"
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-text-secondary hover:bg-elevated hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;