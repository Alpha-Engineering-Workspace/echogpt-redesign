"use client";

import { Send } from "lucide-react";

export default function ChatInput({
  message,
  setMessage,
  onSend,
  isSending,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    if (!message.trim() || isSending) {
      return;
    }

    onSend();
  }

  function handleKeyDown(event) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !isSending
    ) {
      event.preventDefault();

      if (message.trim()) {
        onSend();
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 bg-white p-4 transition-colors dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition-colors focus-within:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-gray-500">
        <textarea
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Message EchoGPT..."
          rows={1}
          disabled={isSending}
          className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-gray-950 outline-none placeholder:text-gray-400 disabled:opacity-60 dark:text-white dark:placeholder:text-gray-500"
        />

        <button
          type="submit"
          disabled={!message.trim() || isSending}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
        >
          <Send size={18} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </form>
  );
}