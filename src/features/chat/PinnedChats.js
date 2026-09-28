"use client";

import { AnimatePresence } from "framer-motion";
import { Pin } from "lucide-react";
import ChatListItem from "./ChatListItem";

/**
 * PinnedChats — list group rendered above the recent list.
 * Hidden entirely if there are no pinned chats.
 */
export default function PinnedChats({
  pinnedChats,
  onTogglePin,
  onRename,
  onDelete,
  onNavigate,
}) {
  if (!pinnedChats.length) return null;

  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center gap-1.5 px-1.5">
        <Pin size={10} strokeWidth={2.5} className="text-accent" />
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pinned
        </p>
        <span className="text-[10px] font-medium text-muted-foreground">
          {pinnedChats.length}
        </span>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-bg">
        <AnimatePresence initial={false}>
          {pinnedChats.map((chat, i) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              pinned
              index={i}
              onTogglePin={onTogglePin}
              onRename={onRename}
              onDelete={onDelete}
              onNavigate={onNavigate}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
