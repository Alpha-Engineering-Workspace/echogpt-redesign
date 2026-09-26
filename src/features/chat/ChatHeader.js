"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Download,
  MoreHorizontal,
  Pencil,
  Share2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import ModelSelector from "@/features/chat/ModelSelector";

export default function ChatHeader({
  title = "New conversation",
  selectedModel,
  onModelChange,
  chatId,
  onTitleChange,
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);
  const menuRef = useRef(null);

  useEffect(() => {
    setTitleDraft(title);
  }, [title]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSaveTitle() {
    if (!titleDraft.trim() || titleDraft === title) {
      setEditingTitle(false);
      setTitleDraft(title);
      return;
    }
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleDraft.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to rename");
      }
      onTitleChange?.(data.chat.title);
      setEditingTitle(false);
      router.refresh();
      toast.success("Renamed");
    } catch (err) {
      toast.error(err.message || "Could not rename");
      setTitleDraft(title);
      setEditingTitle(false);
    }
  }

  async function handleDelete() {
    if (!chatId) return;
    const confirmed = window.confirm(`Delete "${title}"?`);
    if (!confirmed) return;
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      toast.success("Chat deleted");
      router.push("/chat");
      router.refresh();
    } catch (err) {
      toast.error("Could not delete chat");
    }
    setMenuOpen(false);
  }

  async function handleShare() {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied");
    } catch {
      toast.error("Failed to copy link");
    }
    setMenuOpen(false);
  }

  function handleExport() {
    window.dispatchEvent(new CustomEvent("echogpt:export-chat"));
    setMenuOpen(false);
  }

  return (
    <header className="relative flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface-overlay px-3 pl-14 pr-3 sm:px-6">
      {/* Subtle violet hairline at the bottom of the header */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124,108,245,0.35) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Title */}
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        {/* Tiny accent dot */}
        <span className="hidden h-2 w-2 shrink-0 rounded-full bg-accent sm:inline-block" />

        {editingTitle ? (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle();
                if (e.key === "Escape") {
                  setTitleDraft(title);
                  setEditingTitle(false);
                }
              }}
              autoFocus
              className="h-7 min-w-0 max-w-xs rounded-md border border-accent bg-surface-elevated px-2 text-sm font-semibold text-fg outline-none"
            />
            <button
              type="button"
              onClick={handleSaveTitle}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
              aria-label="Save title"
            >
              <Check size={13} strokeWidth={3} />
            </button>
            <button
              type="button"
              onClick={() => {
                setTitleDraft(title);
                setEditingTitle(false);
              }}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted hover:bg-surface-hover hover:text-fg"
              aria-label="Cancel"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => chatId && setEditingTitle(true)}
            className="group flex min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1 transition hover:bg-surface-hover"
            title={chatId ? "Click to rename" : ""}
          >
            <h1 className="truncate text-sm font-semibold text-fg">
              {title}
            </h1>
            {chatId && (
              <Pencil
                size={11}
                className="shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100"
              />
            )}
          </button>
        )}

        {/* Live model chip */}
        {chatId && !editingTitle && (
          <span className="hidden items-center gap-1 rounded-xs border border-border bg-bg px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
            <Sparkles size={9} className="text-accent" />
            {selectedModel}
          </span>
        )}
      </div>

      {/* Right side: model selector + menu */}
      <div className="flex items-center gap-1.5">
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={onModelChange}
        />

        {chatId && (
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Chat options"
              aria-expanded={menuOpen}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md border text-muted transition ${
                menuOpen
                  ? "border-accent bg-accent-soft-strong text-accent"
                  : "border-border bg-surface-elevated hover:bg-surface-hover hover:text-fg"
              }`}
            >
              <MoreHorizontal size={15} />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-lg border border-border bg-surface-overlay shadow-pop"
                >
                  <div className="border-b border-border bg-surface px-3.5 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Actions
                    </p>
                  </div>

                  <div className="p-1">
                    <MenuItem
                      icon={<Pencil size={13} />}
                      label="Rename"
                      onClick={() => {
                        setMenuOpen(false);
                        setEditingTitle(true);
                      }}
                    />
                    <MenuItem
                      icon={<Download size={13} />}
                      label="Export Markdown"
                      onClick={handleExport}
                    />
                    <MenuItem
                      icon={<Share2 size={13} />}
                      label="Copy share link"
                      onClick={handleShare}
                    />
                  </div>

                  <div className="border-t border-border p-1">
                    <MenuItem
                      icon={<Trash2 size={13} />}
                      label="Delete chat"
                      onClick={handleDelete}
                      danger
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
}

function MenuItem({ icon, label, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs transition ${
        danger
          ? "text-danger hover:bg-danger/10"
          : "text-fg hover:bg-surface-hover"
      }`}
    >
      <span className={danger ? "text-danger" : "text-muted"}>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
