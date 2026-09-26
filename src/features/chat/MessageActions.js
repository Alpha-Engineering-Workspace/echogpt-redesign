"use client";

import { useState } from "react";
import { Check, Copy, Pencil, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

export default function MessageActions({
  message,
  isUser,
  isLastAssistant,
  onCopy,
  onRegenerate,
  onReact,
  onEdit,
  reaction,
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.content || "");
      setCopied(true);
      toast.success("Copied to clipboard");
      onCopy?.();
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  }

  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-surface-overlay p-0.5 shadow-1">
      <ActionButton
        onClick={handleCopy}
        label={copied ? "Copied" : "Copy"}
        icon={
          copied ? (
            <Check size={12} strokeWidth={3} />
          ) : (
            <Copy size={12} />
          )
        }
        success={copied}
      />

      {!isUser && isLastAssistant && onRegenerate && (
        <ActionButton
          onClick={onRegenerate}
          label="Regenerate"
          icon={<RefreshCw size={12} />}
        />
      )}

      {!isUser && onReact && (
        <>
          <ActionButton
            onClick={() => onReact("up")}
            label="Helpful"
            active={reaction === "up"}
            icon={<ThumbsUp size={12} />}
          />
          <ActionButton
            onClick={() => onReact("down")}
            label="Not helpful"
            active={reaction === "down"}
            icon={<ThumbsDown size={12} />}
          />
        </>
      )}

      {isUser && onEdit && (
        <ActionButton
          onClick={onEdit}
          label="Edit"
          icon={<Pencil size={12} />}
        />
      )}
    </div>
  );
}

function ActionButton({ onClick, label, icon, active = false, success = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition ${
        success
          ? "bg-success/10 text-success"
          : active
          ? "bg-accent-soft-strong text-accent"
          : "text-muted-foreground hover:bg-surface-hover hover:text-fg"
      }`}
    >
      {icon}
    </button>
  );
}
