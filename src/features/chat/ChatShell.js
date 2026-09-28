"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

import ChatSidebar from "@/features/chat/ChatSidebar";
import CommandPalette from "@/components/common/CommandPalette";
import useLocalStorage from "@/hooks/useLocalStorage";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";

function isTypingInForm() {
  if (typeof document === "undefined") return false;
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  // Skip if the focused element is inside our modal/dialog
  return Boolean(el.closest("[role='dialog']"));
}

export default function ChatShell({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [collapsed, setCollapsed] = useLocalStorage("sidebarCollapsed", false);

  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  function toggleSidebar() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setCollapsed((c) => !c);
    } else {
      setIsSidebarOpen((v) => !v);
    }
  }

  // ── Keyboard: ⌘K / Ctrl+K — toggle command palette ───────────────────
  useKeyboardShortcut("mod", "k", () => setPaletteOpen((prev) => !prev));

  // ── Keyboard: ⌘B / Ctrl+B — toggle desktop sidebar collapse ──────────
  useKeyboardShortcut("mod", "b", () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setCollapsed((c) => !c);
    }
  });

  // ── Keyboard: ⌘⇧O / Ctrl+Shift+O — start a new chat ──────────────────
  useKeyboardShortcut("mod", "o", async () => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    try {
      const response = await fetch("/api/chats", { method: "POST" });
      const data = await response.json();
      if (response.ok) {
        router.push(`/chat/${data.chat.id}`);
      }
    } catch {
      // ignore
    }
  }, { shift: true });

  // ── Keyboard: `/` — focus the chat composer ──────────────────────────
  useKeyboardShortcut(null, "/", () => {
    if (isTypingInForm()) return;
    const composer = document.querySelector("textarea[data-chat-input]");
    if (composer) {
      composer.focus();
    }
  }, { preventDefault: true });

  // ── Keyboard: Escape — close palette or sidebar ──────────────────────
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      if (paletteOpen) {
        setPaletteOpen(false);
      }
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paletteOpen, isSidebarOpen]);

  // Hide the sidebar entirely when collapsed on desktop
  const sidebarWidthClass = collapsed
    ? "md:w-0 md:overflow-hidden md:border-r-0"
    : "md:w-72";

  return (
    <div className="relative flex h-screen overflow-hidden bg-bg">
      {/* Subtle ambient violet wash behind everything — mirrors the landing gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(900px 500px at 0% 0%, rgba(124,108,245,0.10), transparent 60%), radial-gradient(800px 500px at 100% 100%, rgba(167,139,250,0.08), transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Desktop sidebar — collapses to 0 width when collapsed */}
      <div className={`hidden md:block transition-[width] duration-200 ${sidebarWidthClass}`}>
        {!collapsed && (
          <ChatSidebar onOpenPalette={() => setPaletteOpen(true)} />
        )}
      </div>

      {/* Sidebar handle — visible on desktop in both states.
          - Collapsed: shows "Chats →" on the left edge to expand.
          - Expanded:  shows "← Hide" hugging the sidebar's right edge to collapse. */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar (⌘B)" : "Collapse sidebar (⌘B)"}
        className={`group fixed top-1/2 z-30 hidden h-9 -translate-y-1/2 items-center gap-1 border border-border bg-surface-elevated text-muted shadow-1 transition hover:bg-surface-hover hover:text-fg md:flex ${
          isSidebarOpen ? "hidden" : ""
        } ${collapsed ? "left-0 rounded-r-md border-l-0 px-1.5" : "left-[288px] -ml-3 rounded-full"}`}
      >
        {collapsed ? (
          <>
            <ChevronRight size={11} strokeWidth={2.5} />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Chats
            </span>
          </>
        ) : (
          <ChevronLeft size={11} strokeWidth={2.5} />
        )}
      </button>

      {/* Mobile menu button (lives above the AppNavbar hamburger) */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        title="Open sidebar"
        className={`fixed left-3 top-3 z-50 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-fg shadow-1 transition hover:bg-surface-hover md:hidden ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        <Menu size={16} />
      </button>

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={handleCloseSidebar}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-200 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ChatSidebar
          onNavigate={handleCloseSidebar}
          onOpenPalette={() => setPaletteOpen(true)}
        />
      </div>

      <main className="relative min-w-0 flex-1 overflow-hidden bg-bg">
        {children}
      </main>

      {/* Command palette */}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
