"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { LogOut, Plus, Settings, User, X } from "lucide-react";

import Logo from "@/components/common/Logo";
import ChatSearch from "@/features/chat/ChatSearch";
import ChatListItem from "@/features/chat/ChatListItem";
import PinnedChats from "@/features/chat/PinnedChats";
import PromptLibraryButton from "@/components/layout/PromptLibraryButton";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function ChatSidebar({ onNavigate, onOpenPalette }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    onNavigate?.();
    try {
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
      router.refresh();
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

      {/* Bottom: nav + status + logout */}
      <div className="shrink-0 border-t border-border p-2">
        <div className="space-y-0.5">
          <PromptLibraryButton onNavigate={onNavigate} />
          <SidebarNavItem
            onClick={onNavigate}
            href="/settings"
            icon={<Settings size={13} className="text-muted-foreground" />}
            label="Settings"
          />
          <SidebarNavItem
            onClick={onNavigate}
            href="/profile"
            icon={<User size={13} className="text-muted-foreground" />}
            label="Profile"
          />
          {session?.user && (
            <SidebarNavItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              icon={<LogOut size={13} className="text-muted-foreground" />}
              label={isLoggingOut ? "Signing out..." : "Log out"}
              danger
            />
          )}
        </div>

        {/* Status footer with prominent shortcut chip */}
        <div className="mt-2 flex items-center gap-2 rounded-md border border-border bg-bg px-2 py-1.5 text-[10.5px] text-muted">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-success animate-pulse-dot" />
          </span>
          <span className="font-medium text-fg">All synced</span>

          {/* ⌘K chip — clickable highlight for the command palette */}
          <button
            type="button"
            onClick={() => onOpenPalette?.()}
            aria-label="Open command palette"
            title="Open command palette (⌘K)"
            className="ml-auto inline-flex items-center gap-0.5 rounded-sm border border-border bg-surface px-1 py-px font-mono text-[10px] font-semibold text-fg/80 transition hover:border-accent hover:bg-accent-soft-strong hover:text-accent"
          >
            <span className="text-[10px] leading-none">⌘</span>
            <span className="text-[10px] leading-none">K</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

/**
 * SidebarNavItem — uniform bottom-nav item used for Prompt Library, Settings,
 * Profile, and Logout. Rendered as a <button> for every variant (the href
 * variants call router.push). This keeps the DOM identical across all 4
 * items so their font size, padding, gap, and icon alignment match exactly.
 *
 *  - icon: lucide <Icon /> element
 *  - label: visible text
 *  - href (optional): if provided, click navigates via router.push and
 *    triggers onClick (used to close the mobile drawer).
 *  - onClick (optional): if no href, this is the action handler (logout).
 *  - danger: swaps hover to danger red.
 *  - disabled: greys out the button.
 */
function SidebarNavItem({ icon, label, href, onClick, danger = false, disabled = false }) {
  const router = useRouter();

  function handleClick(event) {
    onClick?.();
    if (href) router.push(href);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs text-muted transition disabled:cursor-not-allowed disabled:opacity-60 ${
        danger
          ? "hover:bg-danger/10 hover:text-danger"
          : "hover:bg-surface-hover hover:text-fg"
      }`}
    >
      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center [&_svg]:block">
        {icon}
      </span>
      <span className="leading-none">{label}</span>
    </button>
  );
}
