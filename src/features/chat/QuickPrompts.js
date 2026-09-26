"use client";

import {
  Code2,
  Lightbulb,
  PenLine,
  Sparkles,
} from "lucide-react";

const prompts = [
  {
    icon: Lightbulb,
    title: "Explain a concept",
    prompt: "Explain a complex topic in simple terms",
  },
  {
    icon: Code2,
    title: "Help me code",
    prompt: "Help me solve a programming problem",
  },
  {
    icon: PenLine,
    title: "Improve writing",
    prompt: "Help me improve something I wrote",
  },
  {
    icon: Sparkles,
    title: "Brainstorm ideas",
    prompt: "Help me brainstorm creative ideas",
  },
];

export default function QuickPrompts({ onPromptSelect }) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {prompts.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.title}
            type="button"
            onClick={() => onPromptSelect(item.prompt)}
            className="group rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-800"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <Icon size={18} />
            </div>

            <p className="text-sm font-semibold text-gray-950 dark:text-white">
              {item.title}
            </p>

            <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">
              {item.prompt}
            </p>
          </button>
        );
      })}
    </div>
  );
}