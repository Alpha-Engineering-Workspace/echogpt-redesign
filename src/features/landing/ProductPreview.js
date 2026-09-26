import { Bot, ChevronDown, Plus, Search, Send, Sparkles } from "lucide-react";

import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";

/**
 * ProductPreview — full-bleed dark band, real-looking chat shell at scale.
 * Solid `bg-surface` band; mock shell is solid `bg-bg`. No glass here.
 */
export default function ProductPreview() {
  return (
    <section className="section-band border-y border-border py-20">
      <Container size="wide">
        <Reveal variant="fade-up">
          <div className="overflow-hidden rounded-xl border border-border bg-bg shadow-pop">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <div className="ml-3 flex-1 rounded-sm border border-border bg-surface px-3 py-1.5 text-center text-[11px] text-muted">
                echogpt.live/chat
              </div>
              <div className="ml-3 hidden items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 py-1 text-[10px] text-muted sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                live
              </div>
            </div>

            <div className="grid h-[480px] grid-cols-1 lg:h-[560px] lg:grid-cols-[220px_minmax(0,1fr)]">
              {/* Sidebar */}
              <aside className="hidden border-r border-border bg-surface p-3 lg:flex lg:flex-col">
                {/* New Chat CTA */}
                <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--primary)] py-2 text-xs font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_4px_14px_-4px_rgba(124,108,245,0.45)] transition hover:bg-[var(--primary-hover)]">
                  <Plus size={13} />
                  New Chat
                </button>

                {/* Search */}
                <div className="group mt-2.5 flex items-center gap-2 rounded-md border border-border bg-bg px-2.5 py-2 text-xs text-muted transition focus-within:border-accent">
                  <Search size={12} className="text-muted-foreground" />
                  <span className="select-none">Search chats</span>
                  <span className="ml-auto hidden rounded-xs border border-border bg-surface px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground sm:inline-block">
                    ⌘K
                  </span>
                </div>

                {/* Section label */}
                <div className="mb-2 mt-6 flex items-center justify-between px-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Recent
                  </p>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    3
                  </span>
                </div>

                {/* Recent list — grouped card with hairline divider between items */}
                <div className="overflow-hidden rounded-md border border-border bg-bg">
                  {[
                    {
                      title: "React performance tips",
                      preview: "How can I reduce re-renders…",
                      time: "2m",
                      active: true,
                      icon: "bolt",
                    },
                    {
                      title: "Portfolio ideas",
                      preview: "Looking for a minimal hero section…",
                      time: "1h",
                      active: false,
                      icon: "sparkles",
                    },
                    {
                      title: "Explain REST APIs",
                      preview: "What is idempotency in HTTP?",
                      time: "Yesterday",
                      active: false,
                      icon: "book",
                    },
                  ].map((c, idx, arr) => (
                    <button
                      key={c.title}
                      className={`group/item relative flex w-full items-start gap-2.5 px-2.5 py-2 text-left transition ${
                        idx > 0 ? "border-t border-border" : ""
                      } ${
                        c.active
                          ? "bg-accent-soft-strong text-fg"
                          : "text-muted hover:bg-surface-hover"
                      }`}
                    >
                      {/* Active accent rail */}
                      {c.active && (
                        <span
                          className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-accent"
                          aria-hidden="true"
                        />
                      )}

                      {/* Icon square */}
                      <span
                        className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-xs ${
                          c.active
                            ? "bg-accent text-white"
                            : "bg-surface text-muted-foreground group-hover/item:bg-surface-elevated"
                        }`}
                        aria-hidden="true"
                      >
                        {c.icon === "bolt" && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
                          </svg>
                        )}
                        {c.icon === "sparkles" && (
                          <Sparkles size={10} strokeWidth={2.25} />
                        )}
                        {c.icon === "book" && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                        )}
                      </span>

                      {/* Text block — title + preview */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-xs font-semibold ${
                            c.active ? "text-fg" : "text-fg/85"
                          }`}
                        >
                          {c.title}
                        </p>
                        <p
                          className={`mt-0.5 truncate text-[10.5px] leading-snug ${
                            c.active ? "text-muted" : "text-muted-foreground"
                          }`}
                        >
                          {c.preview}
                        </p>
                      </div>

                      {/* Time + more */}
                      <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
                        <span
                          className={`text-[9.5px] font-medium uppercase tracking-wider ${
                            c.active ? "text-accent" : "text-muted-foreground"
                          }`}
                        >
                          {c.time}
                        </span>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`opacity-0 transition ${
                            c.active
                              ? "text-accent opacity-100"
                              : "text-muted-foreground group-hover/item:opacity-100"
                          }`}
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Footer status */}
                <div className="mt-auto flex items-center gap-2 rounded-md border border-border bg-bg px-2.5 py-2 text-[11px] text-muted">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-success animate-pulse-dot" />
                  </span>
                  <span className="font-medium text-fg">All synced</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    Just now
                  </span>
                </div>
              </aside>

              {/* Main column */}
              <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className="flex h-12 items-center justify-between border-b border-border px-4 sm:px-6">
                  <div>
                    <p className="text-sm font-semibold text-fg">
                      New conversation
                    </p>
                    <p className="text-[11px] text-muted">
                      Start asking anything
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-fg transition hover:bg-surface-hover">
                    <Sparkles size={11} className="text-accent" />
                    EchoGPT
                    <ChevronDown size={11} />
                  </button>
                </div>

                {/* Empty state */}
                <div className="flex flex-1 items-center justify-center p-6">
                  <div className="w-full max-w-xl text-center">
                    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft-strong text-accent">
                      <Bot size={20} />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight text-fg">
                      How can I help you today?
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">
                      Choose a suggestion or ask your own question.
                    </p>

                    <div className="mt-6 grid gap-2 sm:grid-cols-2">
                      {[
                        ["Explain something", "Break down a difficult topic."],
                        ["Write better", "Improve or rewrite your content."],
                        ["Help me code", "Debug and understand code."],
                        ["Brainstorm ideas", "Explore ideas and possibilities."],
                      ].map(([title, sub]) => (
                        <button
                          key={title}
                          className="rounded-md border border-border bg-surface-elevated p-3 text-left transition hover:border-border-strong hover:bg-surface-hover"
                        >
                          <strong className="block text-sm font-semibold text-fg">
                            {title}
                          </strong>
                          <span className="mt-0.5 block text-xs text-muted">
                            {sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Composer */}
                <div className="p-4 sm:p-5">
                  <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-md border border-border bg-surface-elevated p-2 shadow-1 focus-within:border-accent">
                    <input
                      type="text"
                      placeholder="Ask EchoGPT anything..."
                      className="min-w-0 flex-1 bg-transparent px-2 text-sm text-fg outline-none placeholder:text-muted-foreground"
                    />
                    <button
                      className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-[var(--primary)] text-white transition hover:bg-[var(--primary-hover)]"
                      aria-label="Send message"
                    >
                      <Send size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
