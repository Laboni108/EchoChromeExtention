import { Sparkles, Brain, Code2, Zap } from "lucide-react";

export const models = [
  { id: "gpt-5", name: "GPT-5 Cyber", provider: "OpenAI", speed: "Fast", icon: Sparkles, color: "purple" },
  { id: "deepseek-r1", name: "DeepSeek R1", provider: "DeepSeek", speed: "Balanced", icon: Brain, color: "cyan" },
  { id: "claude-3.5", name: "Claude 3.5 Sonnet", provider: "Anthropic", speed: "Fast", icon: Code2, color: "orange" },
  { id: "gemini-flash", name: "Gemini 1.5 Flash", provider: "Google", speed: "Ultra Fast", icon: Zap, color: "lime" },
];