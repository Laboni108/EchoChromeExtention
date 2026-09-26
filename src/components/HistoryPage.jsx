import { useState } from "react";
import { Search, Trash2, MessageSquare } from "lucide-react";
import { formatRelativeTime } from "../utils/formatTime";

function HistoryPage({ conversations, onSelect, onDelete }) {
  const [query, setQuery] = useState("");

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-4 border-b border-border-subtle">
        <label htmlFor="history-search" className="sr-only">Search conversations</label>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border-subtle focus-within:border-brand-purple/60 transition-colors">
          <Search className="h-4 w-4 text-text-secondary" aria-hidden="true" />
          <input
            id="history-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-secondary focus:outline-none"
          />
        </div>
      </div>

      <div role="list" aria-label="Conversation history" className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 mt-12 px-6 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/15 text-brand-purple">
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm text-text-primary font-medium">
              {conversations.length === 0 ? "No conversations yet" : "No matches found"}
            </p>
            <p className="text-xs text-text-secondary">
              {conversations.length === 0
                ? "Start a new chat and it'll show up here."
                : "Try a different search term."}
            </p>
          </div>
        )}
        {filtered.map((c) => {
          const preview = c.messages[0]?.content ?? "";
          return (
            <div
              key={c.id}
              role="listitem"
              tabIndex={0}
              onClick={() => onSelect(c.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(c.id);
                }
              }}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-elevated/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple/15 text-brand-purple">
                <MessageSquare className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-text-primary font-medium truncate">{c.title}</span>
                  <span className="text-[10px] text-text-secondary shrink-0">
                    {formatRelativeTime(c.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-text-secondary truncate">{preview}</p>
                <span className="text-[10px] text-brand-purple">{c.modelName}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(c.id);
                }}
                aria-label={`Delete conversation: ${c.title}`}
                className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 p-1.5 rounded-lg hover:bg-brand-pink/15 text-text-secondary hover:text-brand-pink transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryPage;