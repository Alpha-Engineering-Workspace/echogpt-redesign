import {
  Bot,
  FileText,
  Globe,
  History,
  Layers,
  Sparkles,
} from "lucide-react";

export const features = [
  {
    title: "Multiple AI Models",
    description:
      "Switch between powerful AI models from one simple workspace.",
    icon: Layers,
  },
  {
    title: "Smart Conversations",
    description:
      "Ask questions, brainstorm ideas, write content, and solve problems faster.",
    icon: Bot,
  },
  {
    title: "Page Summaries",
    description:
      "Summarize long articles and webpages without leaving your browser.",
    icon: FileText,
  },
  {
    title: "Browser Context",
    description:
      "Ask EchoGPT questions about the webpage you are currently viewing.",
    icon: Globe,
  },
  {
    title: "Conversation History",
    description:
      "Keep previous conversations organized and continue them anytime.",
    icon: History,
  },
  {
    title: "Quick Actions",
    description:
      "Summarize, explain, rewrite, and generate content with one click.",
    icon: Sparkles,
  },
];