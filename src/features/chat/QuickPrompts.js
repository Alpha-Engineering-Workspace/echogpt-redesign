"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Lightbulb, PenLine, Sparkles } from "lucide-react";

const prompts = [
  {
    icon: Lightbulb,
    title: "Explain a concept",
    prompt: "Explain a complex topic in simple terms",
    accent: "from-[#7c6cf5] to-[#a78bfa]",
  },
  {
    icon: Code2,
    title: "Help me code",
    prompt: "Help me solve a programming problem",
    accent: "from-[#8b5cf6] to-[#c4b5fd]",
  },
  {
    icon: PenLine,
    title: "Improve writing",
    prompt: "Help me improve something I wrote",
    accent: "from-[#a78bfa] to-[#c4b5fd]",
  },
  {
    icon: Sparkles,
    title: "Brainstorm ideas",
    prompt: "Help me brainstorm creative ideas",
    accent: "from-[#7c6cf5] to-[#c4b5fd]",
  },
];

export default function QuickPrompts({ onPromptSelect }) {
  return (
    <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
      {prompts.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.button
            key={item.title}
            type="button"
            onClick={() => onPromptSelect(item.prompt)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.05 * i,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -2 }}
            className="group relative block w-full overflow-hidden rounded-lg border border-border bg-surface-elevated p-4 text-left transition-all duration-300 hover:border-border-strong hover:shadow-pop"
          >
            {/* Top accent gradient stripe */}
            <span
              className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${item.accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
              aria-hidden="true"
            />

            {/* Icon + arrow row */}
            <div className="mb-3 flex items-start justify-between">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft-strong text-accent transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:shadow-[0_4px_14px_-4px_rgba(124,108,245,0.45)]">
                <Icon size={16} strokeWidth={2.25} />
              </div>
              <ArrowUpRight
                size={14}
                className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
              />
            </div>

            {/* Text */}
            <p className="text-sm font-semibold text-fg">{item.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted">
              {item.prompt}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
