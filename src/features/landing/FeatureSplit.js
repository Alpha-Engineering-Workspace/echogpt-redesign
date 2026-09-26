"use client";

import { Bot, Layers, Sparkles } from "lucide-react";

import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";

/**
 * FeatureSplit — left text + right layered UI mock.
 * The mock is a solid surface; only one small floating glass chip for depth.
 */
export default function FeatureSplit() {
  return (
    <section id="features" className="section-y">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left — copy */}
          <div className="max-w-md">
            <Reveal variant="fade-up">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Multi-model chat
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                Switch models without breaking your flow
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Stay in the same conversation and bring in the model that fits
                the next step. EchoGPT keeps context while you move between
                EchoGPT, GPT, Claude, and Gemini.
              </p>

              <ul className="mt-7 space-y-3 text-sm">
                {[
                  "Persistent context across model switches",
                  "Side-by-side comparison when you need a second opinion",
                  "No copy-paste between four browser tabs",
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
                      <Sparkles size={11} />
                    </span>
                    {item}
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right — layered mock */}
          <Reveal variant="fade-up" delay={0.05}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(124,108,245,0.10),transparent_60%)] blur-2xl" />

              <div className="rounded-xl border border-border bg-surface-elevated shadow-pop">
                {/* Mock header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold text-fg">
                      Refactor this component
                    </p>
                    <p className="text-[10px] text-muted">
                      GPT · Just now
                    </p>
                  </div>
                  <span className="rounded-sm bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                    v2
                  </span>
                </div>

                {/* Mock messages */}
                <div className="space-y-3 p-4">
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-lg bg-[var(--primary)] px-3 py-2 text-xs text-white">
                      Convert this to a React hook with proper cleanup.
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[90%] rounded-lg border border-border bg-bg px-3 py-2 text-xs leading-relaxed text-fg">
                      Here&apos;s a refactor that uses <code className="rounded-sm bg-surface px-1 py-px font-mono text-[10px] text-accent">useEffect</code> with
                      a cleanup return and exposes a cancel handler. Want me to
                      also add TypeScript generics?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-lg bg-[var(--primary)] px-3 py-2 text-xs text-white">
                      Yes, please.
                    </div>
                  </div>
                </div>

                {/* Mock composer */}
                <div className="border-t border-border p-3">
                  <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-2.5 py-1.5">
                    <input
                      type="text"
                      placeholder="Reply..."
                      className="min-w-0 flex-1 bg-transparent text-xs text-fg outline-none placeholder:text-muted-foreground"
                    />
                    <span className="text-[10px] text-muted">↵</span>
                  </div>
                </div>
              </div>

              {/* Single floating glass chip — the only glass in this section */}
              <div className="glass-panel absolute -top-3 right-4 hidden items-center gap-1.5 rounded-md px-2 py-1 text-[10px] sm:flex">
                <Layers size={10} className="text-accent" />
                Context retained
              </div>

              {/* Solid accent side chip — not glass */}
              <div className="absolute -bottom-3 left-4 hidden items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2 py-1 text-[10px] shadow-1 sm:flex">
                <Bot size={10} className="text-accent" />
                <span className="text-fg">Switch to Claude</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
