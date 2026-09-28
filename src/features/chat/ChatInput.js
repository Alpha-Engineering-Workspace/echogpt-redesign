"use client";

import { useEffect, useRef, useState } from "react";
import { CornerDownLeft, Mic, Paperclip, Send, Square } from "lucide-react";

const MAX_LENGTH = 4000;

export default function ChatInput({
  message,
  setMessage,
  onSend,
  isSending,
  onStop,
  isStreaming = false,
}) {
  const textareaRef = useRef(null);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [message]);

  function handleSubmit(event) {
    event.preventDefault();
    if (isStreaming) return;
    if (!message.trim() || isSending) return;
    onSend();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey && !isStreaming) {
      event.preventDefault();
      if (message.trim()) onSend();
    }
  }

  function handleAttach() {
    // UI-only stub
  }

  function handleVoice() {
    // UI-only stub
  }

  const charCount = message.length;
  const showCounter = charCount > MAX_LENGTH * 0.8;
  const isDisabled = (!message.trim() || isSending) && !isStreaming;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative border-t border-border bg-bg"
    >
      {/* Subtle violet hairline at the very top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124,108,245,0.45) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="px-3 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto w-full max-w-3xl">
          {/* Composer shell */}
          <div
            className={`group/composer relative flex items-end gap-1 rounded-xl border bg-surface-elevated p-1.5 transition-all duration-200 ${
              isStreaming
                ? "border-border shadow-1"
                : "border-border shadow-1 focus-within:border-accent focus-within:shadow-glow"
            }`}
          >
            {/* Attach */}
            <button
              type="button"
              onClick={handleAttach}
              aria-label="Attach file (coming soon)"
              title="Attach file (coming soon)"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-surface-hover hover:text-fg disabled:opacity-40"
              disabled={isStreaming}
            >
              <Paperclip size={15} />
            </button>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
              onKeyDown={handleKeyDown}
              data-chat-input=""
              placeholder={
                isStreaming ? "Assistant is responding..." : "Message EchoGPT..."
              }
              rows={1}
              disabled={isStreaming}
              className="max-h-[200px] min-h-9 flex-1 resize-none bg-transparent px-1.5 py-2 text-sm leading-6 text-fg outline-none placeholder:text-muted-foreground disabled:opacity-60"
            />

            {/* Voice */}
            <button
              type="button"
              onClick={handleVoice}
              aria-label="Voice input (coming soon)"
              title="Voice input (coming soon)"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-surface-hover hover:text-fg disabled:opacity-40"
              disabled={isStreaming}
            >
              <Mic size={15} />
            </button>

            {/* Send / Stop */}
            {isStreaming ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop generating"
                className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-danger px-2.5 text-xs font-semibold text-white transition hover:opacity-90"
              >
                <Square size={11} fill="currentColor" />
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={isDisabled}
                aria-label="Send message"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--primary)] text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_4px_14px_-4px_rgba(124,108,245,0.45)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
              >
                <Send size={14} strokeWidth={2.25} />
              </button>
            )}
          </div>

          {/* Footer row */}
          <div className="mt-2.5 flex items-center justify-between gap-3 px-1 text-[10.5px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <kbd className="inline-flex items-center gap-0.5 rounded-sm border border-border bg-surface-elevated px-1.5 py-px font-mono text-[10px] text-fg/80">
                <CornerDownLeft size={9} strokeWidth={2.5} />
              </kbd>
              <span>to send</span>
              <span className="mx-0.5 text-border-strong">·</span>
              <span>
                <kbd className="rounded-sm border border-border bg-surface-elevated px-1 py-px font-mono text-[10px] text-fg/80">
                  Shift
                </kbd>
                +
                <kbd className="rounded-sm border border-border bg-surface-elevated px-1 py-px font-mono text-[10px] text-fg/80">
                  Enter
                </kbd>
                <span className="ml-1">new line</span>
              </span>
            </span>

            <span className="flex items-center gap-2">
              {isStreaming && (
                <span className="inline-flex items-center gap-1 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                  Generating
                </span>
              )}
              {showCounter && (
                <span
                  className={`font-mono tabular-nums ${
                    charCount >= MAX_LENGTH ? "text-danger" : "text-warning"
                  }`}
                >
                  {charCount} / {MAX_LENGTH}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
