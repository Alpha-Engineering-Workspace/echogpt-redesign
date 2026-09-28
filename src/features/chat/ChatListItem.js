"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageSquare, MoreHorizontal, Pin, Trash2 } from "lucide-react";

function timeAgo(date) {
  if (!date) return "";
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w`;
}

/**
 * ChatListItem — single chat row, used by both PinnedChats and RecentChats.
 *
 * Props:
 *  - chat: chat object
 *  - pinned: boolean — show pin indicator + hover pin button
 *  - onTogglePin: (chat) => void
 *  - onRename: (chat) => void
 *  - onDelete: (chat) => void
 *  - onNavigate: () => void — called after clicking the row
 *  - index: number — animation stagger index
 *  - layout: boolean — whether to animate layout shifts (Pinned section uses it)
 */
export default function ChatListItem({
  chat,
  pinned = false,
  onTogglePin,
  onRename,
  onDelete,
  onNavigate,
  index = 0,
}) {
  const pathname = usePathname();
  const href = `/chat/${chat.id}`;
  const isActive = pathname === href;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{
        duration: 0.2,
        delay: index * 0.02,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/chat relative border-t border-border first:border-t-0"
    >
      {isActive && (
        <span
          className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r-full bg-accent"
          aria-hidden="true"
        />
      )}

      <Link
        href={href}
        onClick={onNavigate}
        className={`flex min-w-0 items-start gap-2.5 px-2.5 py-2 transition ${
          isActive ? "bg-accent-soft-strong" : "hover:bg-surface-hover"
        }`}
      >
        {/* Icon square */}
        <span
          className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-xs transition ${
            isActive
              ? "bg-accent text-white"
              : "bg-surface text-muted-foreground group-hover/chat:bg-surface-elevated"
          }`}
          aria-hidden="true"
        >
          {pinned ? (
            <Pin size={11} strokeWidth={2.5} className="text-accent" />
          ) : (
            <MessageSquare size={11} strokeWidth={2.25} />
          )}
        </span>

        {/* Text — title + model */}
        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-xs font-semibold ${
              isActive ? "text-fg" : "text-fg/85"
            }`}
          >
            {chat.title}
          </p>
          {chat.model && (
            <p
              className={`mt-0.5 truncate text-[10px] ${
                isActive ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {chat.model}
            </p>
          )}
        </div>

        {/* Right column: time + optional pin badge */}
        <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
          <span
            className={`text-[9.5px] font-medium uppercase tracking-wider ${
              isActive ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {timeAgo(chat.updated_at || chat.created_at)}
          </span>
          {pinned && (
            <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent">
              <Pin size={9} strokeWidth={2.5} />
              Pinned
            </span>
          )}
        </div>
      </Link>

      {/* Hover actions — revealed on row hover */}
      <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-0.5 opacity-0 transition group-hover/chat:pointer-events-auto group-hover/chat:opacity-100">
        {onTogglePin && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onTogglePin(chat);
            }}
            aria-label={pinned ? "Unpin conversation" : "Pin conversation"}
            aria-pressed={pinned}
            className={`inline-flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-surface-elevated transition ${
              pinned
                ? "text-accent"
                : "text-muted-foreground hover:bg-bg hover:text-fg"
            }`}
          >
            <Pin size={10} />
          </button>
        )}
        {onRename && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRename(chat);
            }}
            aria-label="Rename conversation"
            className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-surface-elevated text-muted-foreground transition hover:bg-bg hover:text-fg"
          >
            <MoreHorizontal size={10} />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(chat);
            }}
            aria-label="Delete conversation"
            className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-surface-elevated text-muted-foreground transition hover:bg-danger/10 hover:text-danger"
          >
            <Trash2 size={10} />
          </button>
        )}
      </div>
    </motion.div>
  );
}