"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Search, X } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import useDebounce from "@/hooks/useDebounce";

/**
 * ChatSearch — live, debounced search across real chats.
 *
 * Filters against: title, preview (model), and firstUserMessage (if present).
 * Limit 8 results. Empty state appears when no matches.
 *
 * Exposes a focus() method via the global `echogpt:focus-chat-search` event
 * so the Command Palette can focus this input.
 */
export default function ChatSearch({ chats = [], onSelect }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const debounced = useDebounce(query, 150);
  const [isFocused, setIsFocused] = useState(false);

  const trimmed = debounced.trim().toLowerCase();
  const results = useMemo(() => {
    if (!trimmed) return [];
    return chats
      .filter((c) => {
        const haystack = [c.title, c.model, c.preview, c.firstUserMessage]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(trimmed);
      })
      .slice(0, 8);
  }, [chats, trimmed]);

  const showPanel = isFocused && (query.trim().length > 0 || results.length > 0);

  // Keep highlight in range when results change
  useEffect(() => {
    if (highlighted >= results.length) setHighlighted(0);
  }, [results.length, highlighted]);

  // Reset highlight when user types
  useEffect(() => {
    setHighlighted(0);
  }, [debounced]);

  // Listen for global focus event from command palette
  useEffect(() => {
    function focus() {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
    window.addEventListener("echogpt:focus-chat-search", focus);
    return () => window.removeEventListener("echogpt:focus-chat-search", focus);
  }, []);

  function go(chat) {
    if (!chat) return;
    onSelect?.(chat.id);
    setQuery("");
    inputRef.current?.blur();
    router.push(`/chat/${chat.id}`);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((h) => Math.min(h + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (event.key === "Enter" && results[highlighted]) {
      event.preventDefault();
      go(results[highlighted]);
    } else if (event.key === "Escape" && query) {
      event.preventDefault();
      event.stopPropagation();
      setQuery("");
      inputRef.current?.blur();
    }
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <div className="relative">
      <div onFocus={() => setIsFocused(true)} onBlur={(e) => {
        // Allow panel click to register first
        setTimeout(() => setIsFocused(false), 120);
      }}>
        <SearchInput
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          placeholder="Search conversations"
          kbd="⌘K"
        />
      </div>

      {showPanel && (
        <div
          role="listbox"
          aria-label="Chat search results"
          className="absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-md border border-border bg-surface-overlay shadow-pop"
        >
          {results.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <p className="text-xs font-medium text-fg">
                No chats found
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Try a different search term.
              </p>
              <button
                type="button"
                onClick={handleClear}
                className="mt-2 inline-flex items-center gap-1 rounded-sm border border-border bg-surface px-2 py-1 text-[11px] font-medium text-muted transition hover:text-fg"
              >
                <X size={10} />
                Clear
              </button>
            </div>
          ) : (
            <ul className="max-h-[320px] overflow-y-auto p-1">
              {results.map((chat, i) => {
                const isHighlighted = i === highlighted;
                return (
                  <li key={chat.id} role="option" aria-selected={isHighlighted}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlighted(i)}
                      onClick={() => go(chat)}
                      className={`flex w-full items-start gap-2.5 rounded-sm px-2 py-2 text-left transition ${
                        isHighlighted
                          ? "bg-accent-soft-strong text-fg"
                          : "text-muted hover:bg-surface-hover hover:text-fg"
                      }`}
                    >
                      <span
                        className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-xs ${
                          isHighlighted
                            ? "bg-accent text-white"
                            : "bg-surface text-muted-foreground"
                        }`}
                        aria-hidden="true"
                      >
                        <MessageSquare size={11} strokeWidth={2.25} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-xs font-semibold ${
                            isHighlighted ? "text-fg" : "text-fg/85"
                          }`}
                        >
                          {chat.title}
                        </p>
                        {chat.model && (
                          <p
                            className={`mt-0.5 truncate text-[10px] ${
                              isHighlighted ? "text-accent" : "text-muted-foreground"
                            }`}
                          >
                            {chat.model}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
