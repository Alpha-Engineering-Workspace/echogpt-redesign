"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Command, Plus, Settings, User, X } from "lucide-react";

import Logo from "@/components/common/Logo";
import ChatSearch from "@/features/chat/ChatSearch";
import ChatListItem from "@/features/chat/ChatListItem";
import PinnedChats from "@/features/chat/PinnedChats";
import PromptLibraryButton from "@/components/layout/PromptLibraryButton";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function ChatSidebar({ onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();

  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [pinnedIds, setPinnedIds] = useLocalStorage("pinnedChats", []);

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

  function handleTogglePin(chat) {
    setPinnedIds((current) => {
      if (current.includes(chat.id)) {
        return current.filter((id) => id !== chat.id);
      }
      return [chat.id, ...current];
    });
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
        current.map((item) => (item.id === chat.id ? data.chat : item))
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

      setChats((current) => current.filter((item) => item.id !== chat.id));
      setPinnedIds((current) => current.filter((id) => id !== chat.id));

      if (pathname === `/chat/${chat.id}`) {
        router.push("/chat");
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  }

  // Split chats into pinned and recent
  const { pinnedChats, recentChats } = useMemo(() => {
    const pinned = [];
    const recent = [];
    for (const chat of chats) {
      if (pinnedIds.includes(chat.id)) {
        pinned.push(chat);
      } else {
        recent.push(chat);
      }
    }
    return { pinnedChats: pinned, recentChats: recent };
  }, [chats, pinnedIds]);

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
        <ChatSearch chats={chats} onSelect={() => onNavigate?.()} />
      </div>

      {/* Chat list — Pinned + Recent */}
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-2.5">
        <PinnedChats
          pinnedChats={pinnedChats}
          onTogglePin={handleTogglePin}
          onRename={handleRename}
          onDelete={handleDelete}
          onNavigate={onNavigate}
        />

        <div className="mb-2 flex items-center justify-between px-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Recent
          </p>
          {!isLoading && (
            <span className="text-[10px] font-medium text-muted-foreground">
              {recentChats.length}
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
        ) : recentChats.length === 0 ? (
          <div className="rounded-md border border-dashed border-border bg-bg px-3 py-6 text-center">
            <p className="text-xs font-medium text-fg">
              {chats.length === 0
                ? "No conversations yet"
                : "All your chats are pinned"}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {chats.length === 0
                ? "Start one above to get going."
                : "Unpin one to move it here."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-border bg-bg">
            <AnimatePresence initial={false}>
              {recentChats.map((chat, i) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  index={i}
                  onTogglePin={handleTogglePin}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  onNavigate={onNavigate}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom: nav + status */}
      <div className="shrink-0 border-t border-border p-2">
        <div className="space-y-0.5">
          <PromptLibraryButton onNavigate={onNavigate} />
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
