"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Sparkles } from "lucide-react";

import { aiModels } from "@/data/models";

const modelMeta = {
  EchoGPT: {
    description: "Balanced model for everyday AI tasks.",
    badge: "Default",
    badgeColor: "accent",
  },
  GPT: {
    description: "Great for reasoning, writing, and coding.",
    badge: "Popular",
    badgeColor: "accent",
  },
  Claude: {
    description: "Useful for long-form content and analysis.",
    badge: "Pro",
    badgeColor: "muted",
  },
  Gemini: {
    description: "Fast assistance for research and productivity.",
    badge: "Pro",
    badgeColor: "muted",
  },
};

export default function ModelSelector({
  selectedModel,
  onModelChange,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(model) {
    onModelChange(model);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`group inline-flex h-9 items-center gap-2 rounded-md border px-2.5 text-xs font-medium transition ${
          open
            ? "border-accent bg-accent-soft-strong text-fg shadow-glow"
            : "border-border bg-surface-elevated text-fg hover:bg-surface-hover"
        }`}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-xs bg-accent text-white">
          <Sparkles size={11} strokeWidth={2.5} />
        </span>
        <span className="font-semibold">{selectedModel}</span>
        <ChevronDown
          size={13}
          className={`text-muted transition-transform ${
            open ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-[300px] overflow-hidden rounded-lg border border-border bg-surface-overlay shadow-pop"
            role="listbox"
          >
            {/* Header */}
            <div className="border-b border-border bg-surface px-3.5 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Choose a model
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Different models for different tasks. You can switch anytime.
              </p>
            </div>

            {/* Model list */}
            <div className="p-1">
              {aiModels.map((model) => {
                const meta = modelMeta[model.name] || {};
                const isSelected = model.name === selectedModel;
                return (
                  <button
                    key={model.name}
                    type="button"
                    onClick={() => handleSelect(model.name)}
                    role="option"
                    aria-selected={isSelected}
                    className={`flex w-full items-start gap-2.5 rounded-md px-2 py-2 text-left transition ${
                      isSelected
                        ? "bg-accent-soft-strong"
                        : "hover:bg-surface-hover"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border ${
                        isSelected
                          ? "border-accent bg-accent text-white"
                          : "border-border bg-bg text-muted"
                      }`}
                    >
                      <Sparkles
                        size={12}
                        strokeWidth={2.25}
                        className={isSelected ? "" : "text-muted"}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? "text-accent" : "text-fg"
                          }`}
                        >
                          {model.name}
                        </span>
                        {meta.badge && (
                          <span
                            className={`rounded-xs px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider ${
                              meta.badgeColor === "accent"
                                ? "bg-accent text-white"
                                : "border border-border bg-bg text-muted-foreground"
                            }`}
                          >
                            {meta.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] leading-snug text-muted">
                        {meta.description || model.description}
                      </p>
                    </div>

                    {isSelected && (
                      <Check
                        size={13}
                        className="mt-1 shrink-0 text-accent"
                        strokeWidth={3}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-surface px-3.5 py-2">
              <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                All models available
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
