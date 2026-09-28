"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import Modal from "@/components/common/Modal";
import SearchInput from "@/components/common/SearchInput";
import { PROMPT_CATEGORIES, PROMPTS, filterPrompts } from "@/data/prompts";

/**
 * PromptLibrary — modal listing curated prompts with search + category filter.
 *
 * Click a card to insert the prompt text into the chat composer via the
 * `echogpt:insert-prompt` window event. The composer (ChatInput) listens for
 * this event and pre-fills without sending.
 */
export default function PromptLibrary({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => filterPrompts(PROMPTS, { category, query }),
    [category, query]
  );

  // Reset filters when reopened
  useEffect(() => {
    if (open) {
      setQuery("");
      setCategory("All");
    }
  }, [open]);

  function handleSelect(prompt) {
    window.dispatchEvent(
      new CustomEvent("echogpt:insert-prompt", { detail: prompt.prompt })
    );
    toast.success("Prompt inserted into chat", {
      description: prompt.title,
    });
    onClose?.();
  }

  function handleReset() {
    setQuery("");
    setCategory("All");
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Prompt Library"
      description="Start a conversation with a curated prompt."
      size="xl"
    >
      <div className="p-5">
        {/* Search + filters */}
        <div className="flex flex-col gap-3">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search prompts..."
            autoFocus
          />

          {/* Category pills */}
          <div className="-mx-1 flex flex-wrap gap-1.5 px-1">
            {["All", ...PROMPT_CATEGORIES].map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                    active
                      ? "border-transparent bg-[var(--primary)] text-white shadow-[0_4px_14px_-4px_rgba(124,108,245,0.55)]"
                      : "border-border bg-surface text-muted hover:text-fg"
                  }`}
                >
                  {c}
                  {active && c !== "All" && (
                    <span className="inline-block h-1 w-1 rounded-full bg-white/80" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="mt-4">
          {filtered.length === 0 ? (
            <div className="rounded-md border border-dashed border-border bg-bg px-4 py-8 text-center">
              <p className="text-sm font-medium text-fg">No prompts match</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a different search or category.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-muted transition hover:text-fg"
              >
                <X size={11} />
                Reset filters
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((prompt) => (
                <li key={prompt.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(prompt)}
                    className="group flex h-full w-full flex-col rounded-md border border-border bg-surface p-3 text-left transition hover:-translate-y-px hover:border-border-strong hover:shadow-pop"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-xs bg-accent-soft-strong px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-accent">
                        <Sparkles size={9} strokeWidth={2.5} />
                        {prompt.category}
                      </span>
                      <ArrowRight
                        size={12}
                        className="translate-x-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-snug text-fg">
                      {prompt.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-muted">
                      {prompt.description}
                    </p>
                    <p className="mt-3 line-clamp-2 text-[10.5px] leading-snug text-muted-foreground">
                      {prompt.prompt}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10.5px] text-muted-foreground">
          <span>
            {filtered.length} of {PROMPTS.length} prompts
          </span>
          <span>
            Click a prompt to insert into the chat — nothing is sent automatically.
          </span>
        </div>
      </div>
    </Modal>
  );
}
