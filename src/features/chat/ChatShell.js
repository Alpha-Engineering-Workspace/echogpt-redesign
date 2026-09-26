"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import ChatSidebar from "@/features/chat/ChatSidebar";

export default function ChatShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <ChatSidebar />
      </div>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
        className="fixed left-4 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 md:hidden"
      >
        <Menu size={20} />
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
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <ChatSidebar onNavigate={handleCloseSidebar} />

        <button
          type="button"
          onClick={handleCloseSidebar}
          aria-label="Close sidebar"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <X size={18} />
        </button>
      </div>

      <main className="min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-950">
        {children}
      </main>
    </div>
  );
}