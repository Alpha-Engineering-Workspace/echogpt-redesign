import { Sparkles } from "lucide-react";

import QuickPrompts from "@/features/chat/QuickPrompts";

export default function EmptyChat({ onPromptSelect }) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white">
        <Sparkles size={22} />
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
        How can I help you today?
      </h2>

      <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
        Ask a question, explore an idea, write something, or get help with
        your code.
      </p>

      <div className="mt-8 w-full">
        <QuickPrompts onPromptSelect={onPromptSelect} />
      </div>
    </div>
  );
}