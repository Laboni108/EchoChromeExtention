import { useState } from "react";
import { Plus } from "lucide-react";
import Logo from "./components/Logo";
import ModelSelector from "./components/ModelSelector";
import QuickActions from "./components/QuickActions";
import PromptInput from "./components/PromptInput";
import NavRail from "./components/NavRail";
import HistoryPage from "./components/HistoryPage";
import SettingsPage from "./components/SettingsPage";
import ChatMessage from "./components/ChatMessage";
import TypingIndicator from "./components/TypingIndicator";
import { models } from "./data/models";
import { getMockResponse } from "./data/mockResponses";
import { generateTitle } from "./utils/generateTitle";
import { useChromeStorage } from "./hooks/useChromeStorage";

function App() {
  const [theme, setTheme] = useChromeStorage("echogpt-theme", "dark");
  const [defaultModel, setDefaultModel] = useChromeStorage("echogpt-defaultModel", models[0]);
  const [conversations, setConversations] = useChromeStorage("echogpt-conversations", []);
  const [activeConversationId, setActiveConversationId] = useChromeStorage("echogpt-activeId", null);

  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [prompt, setPrompt] = useState("");
  const [activePage, setActivePage] = useState("chat");
  const [isTyping, setIsTyping] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;
  const messages = activeConversation ? activeConversation.messages : [];

  const handleQuickAction = (label) => {
    setPrompt(`${label}: `);
  };

  const appendAiReply = (conversationId) => {
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage = { id: Date.now() + 1, role: "ai", content: getMockResponse() };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId ? { ...c, messages: [...c.messages, aiMessage] } : c
        )
      );
      setIsTyping(false);
    }, 500);
  };

  const handleSend = () => {
    if (!prompt.trim()) return;
    const userMessage = { id: Date.now(), role: "user", content: prompt };

    if (!activeConversationId) {
      const newId = Date.now();
      const newConversation = {
        id: newId,
        title: generateTitle(prompt),
        modelName: selectedModel.name,
        timestamp: Date.now(),
        messages: [userMessage],
      };
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(newId);
      appendAiReply(newId);
    } else {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, messages: [...c.messages, userMessage], timestamp: Date.now() }
            : c
        )
      );
      appendAiReply(activeConversationId);
    }

    setPrompt("");
  };

  const handleRegenerate = (messageId) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId ? { ...m, content: getMockResponse() } : m
              ),
            }
          : c
      )
    );
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
    setPrompt("");
  };

  const handleSelectConversation = (id) => {
    const convo = conversations.find((c) => c.id === id);
    if (convo) {
      const matchedModel = models.find((m) => m.name === convo.modelName);
      if (matchedModel) setSelectedModel(matchedModel);
    }
    setActiveConversationId(id);
    setActivePage("chat");
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (id === activeConversationId) {
      setActiveConversationId(null);
    }
  };

  return (
    <div data-theme={theme} className="bg-base text-text-primary h-full w-full flex">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-2 p-4 border-b border-border-subtle">
          <div className="flex items-center gap-2 min-w-0">
            <Logo />
            <h1 className="text-lg font-bold bg-brand-gradient bg-clip-text text-transparent">
              EchoGPT
            </h1>
          </div>
          {activePage === "chat" && messages.length > 0 && (
            <button
              onClick={handleNewChat}
              aria-label="Start new chat"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              New
            </button>
          )}
        </div>

        {activePage === "chat" && (
          <>
            <div className="p-4 border-b border-border-subtle">
              <ModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />
            </div>

            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center gap-4 p-4">
                <p className="text-center text-sm text-text-secondary">
                  How can EchoGPT assist you today?
                </p>
                <QuickActions onSelect={handleQuickAction} />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
                {messages.map((m) => (
                  <ChatMessage
                    key={m.id}
                    role={m.role}
                    content={m.content}
                    onRegenerate={() => handleRegenerate(m.id)}
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </div>
            )}

            <div className="p-4 border-t border-border-subtle">
              <PromptInput value={prompt} onChange={setPrompt} onSend={handleSend} />
            </div>
          </>
        )}

        {activePage === "history" && (
          <HistoryPage
            conversations={conversations}
            onSelect={handleSelectConversation}
            onDelete={handleDeleteConversation}
          />
        )}

        {activePage === "settings" && (
          <SettingsPage
            defaultModel={defaultModel}
            onDefaultModelChange={setDefaultModel}
            theme={theme}
            onThemeChange={setTheme}
          />
        )}
      </div>

      <NavRail activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

export default App;