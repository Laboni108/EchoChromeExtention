import { FileText, MessageSquareText, PenLine, Lightbulb } from "lucide-react";

export const quickActions = [
  { id: "summarize", label: "Summarize", icon: FileText, color: "purple" },
  { id: "explain", label: "Explain", icon: MessageSquareText, color: "cyan" },
  { id: "rewrite", label: "Rewrite", icon: PenLine, color: "pink" },
  { id: "brainstorm", label: "Brainstorm", icon: Lightbulb, color: "lime" },
];