"use client";

import { ChevronDown } from "lucide-react";

const models = [
  "EchoGPT",
  "GPT",
  "Claude",
  "Gemini",
];

export default function ModelSelector({
  selectedModel,
  onModelChange,
}) {
  return (
    <div className="relative">
      <select
        value={selectedModel}
        onChange={(event) =>
          onModelChange(event.target.value)
        }
className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:border-gray-500"        aria-label="Select AI model"
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}