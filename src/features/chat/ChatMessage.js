"use client";

import { useEffect, useState } from "react";
import { Bot, Check, Pencil, Sparkles, User, X } from "lucide-react";
import Markdown from "@/components/common/Markdown";
import MessageActions from "./MessageActions";

function timeAgo(date) {
  if (!date) return "";
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 30) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatTime(date) {
  if (!date) return "";
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({
  message,
  isLastAssistant,
  reaction,
  onReact,
  onRegenerate,
  onEdit,
  onSaveEdit,
  isStreaming = false,
}) {
  const isUser = message.role === "user";
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(message.content || "");
  const [, setTick] = useState(0);

  // Re-render every 30s so timestamps stay fresh
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  function handleSave() {
    if (!draft.trim()) return;
    onSaveEdit?.(message.id, draft.trim());
    setEditing(false);
  }

  function handleCancel() {
    setDraft(message.content || "");
    setEditing(false);
  }

  const modelName = isUser ? "You" : message.model || "EchoGPT";

  return (
    <div
      className={`group flex gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar — colored ring + glow on assistant side */}
      <div className="relative shrink-0">
        {!isUser && (
          <span
            className="absolute inset-0 -z-10 rounded-md bg-accent-soft-strong blur-md"
            aria-hidden="true"
          />
        )}
        <div
          className={`relative flex h-8 w-8 items-center justify-center rounded-md border ${
            isUser
              ? "border-border bg-surface-hover text-fg"
              : "border-accent/30 bg-surface-elevated text-accent shadow-1"
          }`}
        >
          {isUser ? (
            <User size={14} strokeWidth={2.25} />
          ) : (
            <Bot size={14} strokeWidth={2.25} />
          )}
        </div>
      </div>

      {/* Content column */}
      <div
        className={`flex min-w-0 max-w-[85%] flex-col gap-1.5 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Meta line — model chip + timestamp */}
        <div
          className={`flex items-center gap-2 px-1 text-[10.5px] text-muted-foreground ${
            isUser ? "flex-row-reverse" : ""
          }`}
        >
          {!isUser && (
            <span className="inline-flex items-center gap-1 rounded-xs bg-accent-soft-strong px-1.5 py-0.5 font-semibold text-accent">
              <Sparkles size={9} strokeWidth={2.5} />
              {modelName}
            </span>
          )}
          {isUser && (
            <span className="font-semibold text-fg">{modelName}</span>
          )}
          <span
            className={`inline-flex items-center gap-1 ${
              isUser ? "flex-row-reverse" : ""
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span title={formatTime(message.created_at)}>
              {timeAgo(message.created_at)}
            </span>
          </span>
          {message.interrupted && (
            <span className="rounded-xs bg-warning/15 px-1.5 py-0.5 font-semibold text-warning">
              interrupted
            </span>
          )}
          {isStreaming && (
            <span className="inline-flex items-center gap-1 rounded-xs bg-accent-soft-strong px-1.5 py-0.5 font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
              streaming
            </span>
          )}
        </div>

        {/* Bubble */}
        {editing ? (
          <div className="w-full rounded-lg border border-accent bg-surface-elevated p-2.5 shadow-glow">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              rows={Math.max(2, draft.split("\n").length)}
              className="w-full resize-none rounded-md bg-bg p-2.5 text-sm text-fg outline-none placeholder:text-muted-foreground"
              placeholder="Edit your message..."
            />
            <div className="mt-2.5 flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs font-medium text-muted hover:bg-surface-hover hover:text-fg"
              >
                <X size={12} />
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-7 items-center gap-1 rounded-md bg-[var(--primary)] px-2.5 text-xs font-semibold text-white hover:bg-[var(--primary-hover)]"
              >
                <Check size={12} strokeWidth={3} />
                Save & Submit
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`relative rounded-lg text-sm leading-relaxed ${
              isUser
                ? "bg-[var(--primary)] px-4 py-2.5 text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_8px_24px_-10px_rgba(124,108,245,0.45)]"
                : "border border-border bg-surface-elevated px-4 py-3 text-fg shadow-1"
            }`}
          >
            {/* Subtle accent rail on assistant bubbles */}
            {!isUser && (
              <span
                className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full bg-gradient-to-b from-[#7c6cf5] via-[#a78bfa] to-transparent opacity-60"
                aria-hidden="true"
              />
            )}

            {isUser ? (
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            ) : (
              <Markdown content={message.content || ""} />
            )}

            {isStreaming && (
              <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-accent align-middle" />
            )}
          </div>
        )}

        {/* Action toolbar — slides in on hover, persistent for the active streaming msg */}
        {!editing && (
          <div
            className={`flex items-center gap-1 px-1 transition-opacity ${
              isStreaming
                ? "pointer-events-none opacity-0"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <MessageActions
              message={message}
              isUser={isUser}
              isLastAssistant={isLastAssistant}
              onRegenerate={onRegenerate}
              onReact={onReact}
              onEdit={() => {
                setDraft(message.content || "");
                setEditing(true);
              }}
              reaction={reaction}
            />
          </div>
        )}
      </div>
    </div>
  );
}
