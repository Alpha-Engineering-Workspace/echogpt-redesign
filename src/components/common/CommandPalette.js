"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  Library,
  MessageSquare,
  MessageSquarePlus,
  Monitor,
  Moon,
  PenSquare,
  Pin,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";

import useLocalStorage from "@/hooks/useLocalStorage";

/**
 * CommandPalette — cmdk-backed palette with all action groups.
 *
 * Quick actions: New Chat, Search Chats, Open Prompt Library, Toggle Theme,
 *                Open Settings, Open Profile, Browse Extension.
 * Pinned:        chats the user has pinned (localStorage).
 * Recent:        last 5 chats from /api/chats.
 *
 * Theme cycle: light → dark → system → light.
 */
export default function CommandPalette({ open, onOpenChange }) {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [recentChats, setRecentChats] = useState([]);
  const [pinnedIds] = useLocalStorage("pinnedChats", []);

  // Fetch recent chats when palette opens
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/chats");
        const data = await response.json();
        if (!cancelled && response.ok) {
          setRecentChats(data.chats.slice(0, 5));
        }
      } catch {
        // ignore
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Resolve pinned chats from the recent list (we don't fetch full list to
  // keep the palette snappy; pinned items may not appear if they're older
  // than the recent limit, which is acceptable UX).
  const pinnedChats = useMemo(() => {
    if (!pinnedIds.length) return [];
    return recentChats.filter((c) => pinnedIds.includes(c.id));
  }, [recentChats, pinnedIds]);

  function handleAction(callback) {
    callback();
    onOpenChange(false);
  }

  async function handleNewChat() {
    try {
      const response = await fetch("/api/chats", { method: "POST" });
      const data = await response.json();
      if (response.ok) {
        router.push(`/chat/${data.chat.id}`);
      }
    } catch {
      // ignore
    }
  }

  function cycleTheme() {
    const order = ["light", "dark", "system"];
    const idx = order.indexOf(theme || resolvedTheme || "system");
    const next = order[(idx + 1) % order.length];
    setTheme(next);
  }

  const themeLabel = {
    light: "Light mode",
    dark: "Dark mode",
    system: "System theme",
  }[theme || resolvedTheme || "system"];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-[15vh] z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <Command
              className="overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-pop"
              shouldFilter
            >
              <div className="flex items-center border-b border-border px-3">
                <Search size={14} className="text-muted-foreground" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex h-11 w-full bg-transparent px-2 text-sm text-fg outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded-sm border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-1.5">
                <Command.Empty className="py-6 text-center text-xs text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Quick actions"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  <Item
                    icon={<MessageSquarePlus size={14} />}
                    label="New chat"
                    shortcut="⌘⇧O"
                    onSelect={() => handleAction(handleNewChat)}
                  />
                  <Item
                    icon={<Search size={14} />}
                    label="Search chats"
                    shortcut="⌘K"
                    onSelect={() =>
                      handleAction(() =>
                        window.dispatchEvent(new Event("echogpt:focus-chat-search"))
                      )
                    }
                  />
                  <Item
                    icon={<Library size={14} />}
                    label="Open prompt library"
                    onSelect={() =>
                      handleAction(() =>
                        window.dispatchEvent(new Event("echogpt:open-prompt-library"))
                      )
                    }
                  />
                  <Item
                    icon={
                      theme === "system" ? (
                        <Monitor size={14} />
                      ) : theme === "dark" || resolvedTheme === "dark" ? (
                        <Sun size={14} />
                      ) : (
                        <Moon size={14} />
                      )
                    }
                    label={`Theme — ${themeLabel}`}
                    shortcut="cycle"
                    onSelect={() => handleAction(cycleTheme)}
                  />
                  <Item
                    icon={<Settings size={14} />}
                    label="Open settings"
                    onSelect={() => handleAction(() => router.push("/settings"))}
                  />
                  <Item
                    icon={<User size={14} />}
                    label="Open profile"
                    onSelect={() => handleAction(() => router.push("/profile"))}
                  />
                  <Item
                    icon={<PenSquare size={14} />}
                    label="Browse extension demo"
                    onSelect={() => handleAction(() => router.push("/extension"))}
                  />
                </Command.Group>

                {pinnedChats.length > 0 && (
                  <Command.Group
                    heading="Pinned"
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
                  >
                    {pinnedChats.map((chat) => (
                      <Item
                        key={chat.id}
                        icon={<Pin size={12} className="text-accent" />}
                        label={chat.title}
                        shortcut={chat.model}
                        onSelect={() =>
                          handleAction(() => router.push(`/chat/${chat.id}`))
                        }
                      />
                    ))}
                  </Command.Group>
                )}

                {recentChats.length > 0 && (
                  <Command.Group
                    heading="Recent chats"
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
                  >
                    {recentChats.map((chat) => (
                      <Item
                        key={chat.id}
                        icon={<MessageSquare size={14} />}
                        label={chat.title}
                        shortcut={chat.model}
                        onSelect={() =>
                          handleAction(() => router.push(`/chat/${chat.id}`))
                        }
                      />
                    ))}
                  </Command.Group>
                )}
              </Command.List>

              <div className="flex items-center justify-between border-t border-border bg-surface px-3 py-1.5 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>
                    <kbd className="rounded-sm border border-border bg-surface-elevated px-1 font-mono">
                      ↑↓
                    </kbd>{" "}
                    navigate
                  </span>
                  <span>
                    <kbd className="rounded-sm border border-border bg-surface-elevated px-1 font-mono">
                      ↵
                    </kbd>{" "}
                    select
                  </span>
                </div>
                <span>EchoGPT</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Item({ icon, label, shortcut, onSelect }) {
  return (
    <Command.Item
      value={label}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-fg transition aria-selected:bg-accent-soft-strong aria-selected:text-fg data-[selected=true]:bg-accent-soft-strong"
    >
      <span className="text-muted">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {shortcut && (
        <span className="text-[10px] text-muted-foreground">{shortcut}</span>
      )}
    </Command.Item>
  );
}
