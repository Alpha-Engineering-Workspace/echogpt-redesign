"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Command,
  MessageSquare,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
  X,
} from "lucide-react";

import Logo from "@/components/common/Logo";

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

export default function ChatSidebar({ onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();

  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadChats() {
      try {
        const response = await fetch("/api/chats");
        const data = await response.json();
        if (response.ok) {
          setChats(data.chats);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadChats();

    window.addEventListener("chatsUpdated", loadChats);

    return () => {
      window.removeEventListener("chatsUpdated", loadChats);
    };
  }, [pathname]);

  async function handleNewChat() {
    try {
      setIsCreating(true);

      const response = await fetch("/api/chats", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setChats((current) => [data.chat, ...current]);

      onNavigate?.();

      router.push(`/chat/${data.chat.id}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    } finally {
      setIsCreating(false);
    }
  }

  async function handleRename(chat) {
    const newTitle = window.prompt("Rename conversation", chat.title);
    if (!newTitle?.trim()) return;

    try {
      const response = await fetch(`/api/chats/${chat.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await response.json();
      if (!response.ok) return;

      setChats((current) =>
        current.map((item) =>
          item.id === chat.id ? data.chat : item
        )
      );
      router.refresh();
    } catch (error) {
      console.error("Failed to rename chat:", error);
    }
  }

  async function handleDelete(chat) {
    const confirmed = window.confirm(`Delete "${chat.title}"?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/chats/${chat.id}`, {
        method: "DELETE",
      });
      if (!response.ok) return;

      setChats((current) =>
        current.filter((item) => item.id !== chat.id)
      );

      if (pathname === `/chat/${chat.id}`) {
        router.push("/chat");
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  }

  // Filter chats by search
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    const q = searchQuery.toLowerCase();
    return chats.filter((c) =>
      c.title?.toLowerCase().includes(q)
    );
  }, [chats, searchQuery]);

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-surface">
      {/* Logo header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-3.5">
        <Logo />
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close sidebar"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-surface-hover hover:text-fg md:hidden"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* New chat button */}
      <div className="p-2.5">
        <button
          type="button"
          onClick={handleNewChat}
          disabled={isCreating}
          className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--primary)] py-2 text-xs font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_4px_14px_-4px_rgba(124,108,245,0.45)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus size={14} strokeWidth={2.5} />
          {isCreating ? "Creating..." : "New Chat"}
        </button>
      </div>

      {/* Search */}
      <div className="px-2.5">
        <div className="group relative">
          <Search
            size={12}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations"
            className="w-full rounded-md border border-border bg-bg py-1.5 pl-7 pr-12 text-xs text-fg outline-none transition placeholder:text-muted-foreground focus:border-accent"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-xs border border-border bg-surface px-1 py-px font-mono text-[9.5px] text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Chat list — wrapped in a soft surface card with hairline dividers */}
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-2.5">
        <div className="mb-2 flex items-center justify-between px-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {searchQuery
              ? `Results (${filteredChats.length})`
              : "Recent"}
          </p>
          {!searchQuery && !isLoading && (
            <span className="text-[10px] font-medium text-muted-foreground">
              {chats.length}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-1 px-1 py-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 rounded-md bg-surface-hover/50 animate-pulse"
              />
            ))}
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="rounded-md border border-dashed border-border bg-bg px-3 py-6 text-center">
            <p className="text-xs font-medium text-fg">
              {searchQuery
                ? `No chats matching "${searchQuery}"`
                : "No conversations yet"}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {searchQuery
                ? "Try a different search."
                : "Start one above to get going."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-border bg-bg">
            <AnimatePresence initial={false}>
              {filteredChats.map((chat, i, arr) => {
                const href = `/chat/${chat.id}`;
                const isActive = pathname === href;

                return (
                  <motion.div
                    key={chat.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.02,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group/chat relative ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
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
                        isActive
                          ? "bg-accent-soft-strong"
                          : "hover:bg-surface-hover"
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
                        <MessageSquare size={11} strokeWidth={2.25} />
                      </span>

                      {/* Text — title + (date for active only) */}
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

                      {/* Time */}
                      <span
                        className={`shrink-0 text-[9.5px] font-medium uppercase tracking-wider ${
                          isActive ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        {timeAgo(chat.updated_at || chat.created_at)}
                      </span>
                    </Link>

                    {/* Hover actions — row inside the same cell */}
                    <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-0.5 opacity-0 transition group-hover/chat:pointer-events-auto group-hover/chat:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRename(chat);
                        }}
                        aria-label="Rename conversation"
                        className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-surface-elevated text-muted-foreground transition hover:bg-bg hover:text-fg"
                      >
                        <Pencil size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(chat);
                        }}
                        aria-label="Delete conversation"
                        className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-surface-elevated text-muted-foreground transition hover:bg-danger/10 hover:text-danger"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom: nav + status */}
      <div className="shrink-0 border-t border-border p-2">
        <div className="space-y-0.5">
          <Link
            href="/settings"
            onClick={onNavigate}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs text-muted transition hover:bg-surface-hover hover:text-fg"
          >
            <Settings size={13} className="text-muted-foreground" />
            Settings
          </Link>
          <Link
            href="/profile"
            onClick={onNavigate}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs text-muted transition hover:bg-surface-hover hover:text-fg"
          >
            <User size={13} className="text-muted-foreground" />
            Profile
          </Link>
        </div>

        {/* Status footer */}
        <div className="mt-2 flex items-center gap-2 rounded-md border border-border bg-bg px-2.5 py-1.5 text-[10.5px] text-muted">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-success animate-pulse-dot" />
          </span>
          <span className="font-medium text-fg">All synced</span>
          <span className="ml-auto text-[10px] text-muted-foreground">
            <Command size={9} className="inline-block align-middle" />
            +K
          </span>
        </div>
      </div>
    </aside>
  );
}
