import { useState } from "react";
import { Search, Trash2, MessageSquare } from "lucide-react";
import { conversations as initialConversations } from "../data/conversations";

function HistoryPage() {
  const [query, setQuery] = useState("");
  const [conversations, setConversations] = useState(initialConversations);

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border-subtle">
          <Search className="h-4 w-4 text-text-secondary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-secondary focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 && (
          <p className="text-center text-sm text-text-secondary mt-8">No conversations found.</p>
        )}
        {filtered.map((c) => (
          <div
            key={c.id}
            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-elevated/60 transition-colors cursor-pointer"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple/15 text-brand-purple">
              <MessageSquare className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-text-primary font-medium truncate">{c.title}</span>
                <span className="text-[10px] text-text-secondary shrink-0">{c.timestamp}</span>
              </div>
              <p className="text-xs text-text-secondary truncate">{c.preview}</p>
              <span className="text-[10px] text-brand-purple">{c.model}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(c.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-brand-pink/15 text-text-secondary hover:text-brand-pink transition-all shrink-0"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;