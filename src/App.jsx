import { useState } from "react";
import Logo from "./components/Logo";
import ModelSelector from "./components/ModelSelector";
import QuickActions from "./components/QuickActions";
import PromptInput from "./components/PromptInput";
import NavRail from "./components/NavRail";
import { models } from "./data/models";

function App() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [prompt, setPrompt] = useState("");
  const [activePage, setActivePage] = useState("chat");

  const handleQuickAction = (label) => {
    setPrompt(`${label}: `);
  };

  const handleSend = () => {
    console.log("Sending:", prompt, "to", selectedModel.name);
    setPrompt("");
  };

  return (
    <div className="bg-base text-text-primary h-full w-full flex">
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 p-4 border-b border-border-subtle">
          <Logo />
          <h1 className="text-lg font-bold bg-brand-gradient bg-clip-text text-transparent">
            EchoGPT
          </h1>
        </div>

        {activePage === "chat" && (
          <>
            <div className="p-4 border-b border-border-subtle">
              <ModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4 p-4">
              <p className="text-center text-sm text-text-secondary">
                How can EchoGPT assist you today?
              </p>
              <QuickActions onSelect={handleQuickAction} />
            </div>

            <div className="p-4 border-t border-border-subtle">
              <PromptInput value={prompt} onChange={setPrompt} onSend={handleSend} />
            </div>
          </>
        )}

        {activePage === "history" && (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-text-secondary text-sm">History page — coming in Step 7</p>
          </div>
        )}

        {activePage === "settings" && (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-text-secondary text-sm">Settings page — coming in Step 8</p>
          </div>
        )}
      </div>

      <NavRail activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

export default App;