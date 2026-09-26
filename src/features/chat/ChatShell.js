"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import ChatSidebar from "@/features/chat/ChatSidebar";
import CommandPalette from "@/components/common/CommandPalette";

export default function ChatShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event) {
      // ⌘K / Ctrl+K — open command palette
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
        return;
      }

      // Escape — close palette or sidebar
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setIsSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <ChatSidebar />
      </div>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
        className="fixed left-3 top-3 z-40 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-fg shadow-1 transition hover:bg-surface-hover md:hidden"
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
        <ChatSidebar onNavigate={handleCloseSidebar} />
      </div>

      <main className="relative min-w-0 flex-1 overflow-hidden bg-bg">
        {children}
      </main>

      {/* Command palette */}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
