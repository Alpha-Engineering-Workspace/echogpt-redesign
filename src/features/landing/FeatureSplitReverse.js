"use client";

import { ArrowRight, Globe, Highlighter, MessageSquareText, Puzzle } from "lucide-react";
import Link from "next/link";

import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";

/**
 * FeatureSplitReverse — right text + left layered UI mock (chrome extension).
 * Mock has subtle overlap with surrounding sections.
 */
export default function FeatureSplitReverse() {
  return (
    <section id="extension-overview" className="section-band section-y">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left — extension mock (visual first on lg) */}
          <Reveal variant="fade-up" className="order-2 lg:order-1">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(124,108,245,0.08),transparent_60%)] blur-2xl" />

              <div className="rounded-xl border border-border bg-surface-elevated shadow-pop">
                {/* Mock browser top */}
                <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-border" />
                  <span className="h-2 w-2 rounded-full bg-border" />
                  <span className="h-2 w-2 rounded-full bg-border" />
                  <div className="ml-2 flex-1 rounded-sm border border-border bg-bg px-2 py-0.5 text-center text-[10px] text-muted">
                    docs.react.dev
                  </div>
                </div>

                <div className="grid h-[280px] grid-cols-[1fr_220px]">
                  {/* Fake page */}
                  <div className="space-y-2 border-r border-border p-4">
                    <div className="h-2 w-12 rounded bg-surface-hover" />
                    <div className="h-3 w-3/4 rounded bg-surface-hover" />
                    <div className="space-y-1.5 pt-2">
                      <div className="h-1.5 w-full rounded bg-surface-hover" />
                      <div className="h-1.5 w-11/12 rounded bg-surface-hover" />
                      <div className="h-1.5 w-3/4 rounded bg-surface-hover" />
                      <div className="h-1.5 w-5/6 rounded bg-surface-hover" />
                    </div>
                    <div className="mt-4 h-24 rounded bg-surface-hover" />
                  </div>

                  {/* Extension panel */}
                  <div className="flex flex-col bg-surface p-3">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-xs bg-accent-soft-strong text-accent">
                        <MessageSquareText size={11} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-fg">
                          EchoGPT
                        </p>
                        <p className="text-[9px] text-muted">Browser</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-1">
                      {[
                        { Icon: Highlighter, label: "Explain" },
                        { Icon: Globe, label: "Translate" },
                      ].map(({ Icon, label }) => (
                        <button
                          key={label}
                          className="rounded-sm border border-border bg-bg px-2 py-1.5 text-[10px] font-medium text-fg transition hover:bg-surface-hover"
                        >
                          <Icon
                            size={10}
                            className="mb-1 inline-block text-accent"
                          />
                          <br />
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 rounded-md bg-accent-soft p-2 text-[10px] leading-4 text-fg">
                      This page explains React components and how they are used
                      to build reusable UIs.
                    </div>
                    <div className="mt-auto flex items-center gap-1 rounded-sm border border-border bg-bg p-1.5">
                      <input
                        type="text"
                        placeholder="Ask about page..."
                        className="min-w-0 flex-1 bg-transparent text-[10px] text-fg outline-none placeholder:text-muted-foreground"
                      />
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-xs bg-[var(--primary)] text-white text-[8px]">
                        ↵
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — copy */}
          <div className="order-1 max-w-md lg:order-2">
            <Reveal variant="fade-up">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Browser extension
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                Bring AI to whatever you&apos;re reading
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Summarize long pages, explain selected text, and ask questions
                grounded in the page you&apos;re already on — without breaking
                your reading flow.
              </p>

              <ul className="mt-7 space-y-3 text-sm">
                {[
                  "Summarize the page you&apos;re on in seconds",
                  "Explain a passage in plain language",
                  "Ask questions grounded in real page context",
                ].map((item, i) => (
                  <Reveal
                    key={item}
                    variant="fade-up"
                    index={i}
                    delay={0.05}
                    as="li"
                    className="flex items-start gap-3 text-fg"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-xs bg-accent-soft-strong text-accent">
                      <Globe size={11} />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </Reveal>
                ))}
              </ul>

              {/* Browser support row — small chip strip */}
              <div className="mt-7 flex flex-wrap items-center gap-2">
                {[
                  { name: "Chrome", dot: "bg-[#4285F4]" },
                  { name: "Firefox", dot: "bg-[#FF7139]" },
                  { name: "Edge", dot: "bg-[#0078D4]" },
                  { name: "Safari", dot: "bg-[#1B88CA]" },
                ].map((b) => (
                  <span
                    key={b.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-2 py-0.5 text-[11px] font-medium text-fg"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${b.dot}`} />
                    {b.name}
                  </span>
                ))}
              </div>

              {/* Demo CTA — the most prominent path to /extension */}
              <Reveal variant="fade-up" delay={0.15}>
                <div className="mt-9 rounded-lg border border-border bg-surface-elevated p-5 shadow-1">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-soft-strong text-accent">
                      <Puzzle size={16} strokeWidth={2.25} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-fg">
                        Try the full extension demo
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        Open the interactive panel with chat, quick actions,
                        history, and settings — same as the real side-panel
                        experience.
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Link
                          href="/extension"
                          className="group/demo inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--primary)] px-3 text-xs font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_4px_14px_-4px_rgba(124,108,245,0.45)] transition hover:bg-[var(--primary-hover)]"
                        >
                          Open the demo
                          <ArrowRight
                            size={13}
                            className="transition-transform group-hover/demo:translate-x-0.5"
                          />
                        </Link>
                        <span className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                          Free · No install required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
