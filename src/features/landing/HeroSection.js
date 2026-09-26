"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, ChevronDown, Globe, Plus, Puzzle, Search, Send } from "lucide-react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Single soft accent gradient (no noise, no grid, no second orb) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]">
        <div className="absolute left-1/2 top-[-200px] h-[800px] w-[1400px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,108,245,0.16),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(124,108,245,0.20),transparent_60%)]" />
      </div>

      <Container size="wide" className="pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Left — copy */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              One workspace · Multiple models
            </p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[64px]"
            >
              Work smarter with{" "}
              <span className="text-accent-gradient">multiple AI models</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg"
            >
              Chat, research, summarize, and write with the model that fits the
              task — all in one focused workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 flex flex-col items-start gap-2.5 sm:flex-row sm:items-center"
            >
              <Button href="/register" size="lg">
                Start chatting
                <ArrowRight size={15} />
              </Button>
              <Button href="/extension" variant="outline" size="lg">
                <Puzzle size={14} />
                Try extension
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-wider text-muted-foreground"
            >
              <span>EchoGPT</span>
              <span className="h-3 w-px bg-border" />
              <span>GPT</span>
              <span className="h-3 w-px bg-border" />
              <span>Claude</span>
              <span className="h-3 w-px bg-border" />
              <span>Gemini</span>
            </motion.div>

            {/* Extension quick-CTA — small badge with browser logos */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              <a
                href="/extension"
                className="group/ext inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-2.5 py-1.5 text-[11px] font-medium text-fg shadow-1 transition hover:border-border-strong hover:shadow-pop"
              >
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft-strong text-accent transition group-hover/ext:bg-[var(--primary)] group-hover/ext:text-white">
                  <Puzzle size={10} strokeWidth={2.5} />
                </span>
                <span>Browser extension</span>
                <span className="hidden text-muted-foreground sm:inline">·</span>
                <span className="hidden text-muted-foreground sm:inline">
                  Chrome, Firefox, Edge
                </span>
                <ArrowRight
                  size={11}
                  className="text-muted-foreground transition-all group-hover/ext:translate-x-0.5 group-hover/ext:text-accent"
                />
              </a>
            </motion.div>
          </div>

          {/* Right — layered product mock */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Soft glow behind the mock */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,108,245,0.22),transparent_60%)] blur-2xl" />
            </div>

            {/* Floating animation on the whole stack */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Main browser-frame mock — solid surface, no glass */}
              <div className="rounded-xl border border-border bg-surface-elevated shadow-pop">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-border" />
                  <span className="h-2 w-2 rounded-full bg-border" />
                  <span className="h-2 w-2 rounded-full bg-border" />
                  <div className="ml-3 flex-1 rounded-sm border border-border bg-bg px-2 py-1 text-center text-[10px] text-muted">
                    echogpt.live/chat
                  </div>
                </div>

                {/* Workspace body */}
                <div className="flex h-[340px]">
                  {/* Sidebar */}
                  <div className="hidden w-44 shrink-0 border-r border-border bg-surface p-2 sm:block">
                    <button className="flex w-full items-center justify-center gap-1 rounded-md bg-[var(--primary)] py-1.5 text-[11px] font-semibold text-white">
                      <Plus size={12} />
                      New Chat
                    </button>
                    <div className="mt-2 flex items-center gap-1.5 rounded-sm border border-border bg-bg px-2 py-1.5 text-[10px] text-muted">
                      <Search size={10} />
                      Search
                    </div>
                    <div className="mt-3 space-y-0.5">
                      {[
                        "React performance",
                        "Portfolio ideas",
                        "REST APIs",
                      ].map((t, i) => (
                        <div
                          key={t}
                          className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-[10px] ${
                            i === 1
                              ? "bg-bg text-fg"
                              : "text-muted"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${
                              i === 1 ? "bg-accent" : "bg-border-strong"
                            }`}
                          />
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main — empty state */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex h-9 items-center justify-between border-b border-border px-3">
                      <p className="text-[11px] font-semibold text-fg">
                        New conversation
                      </p>
                      <button className="inline-flex items-center gap-1 rounded-sm border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-fg">
                        EchoGPT
                        <ChevronDown size={9} />
                      </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center p-4">
                      <div className="text-center">
                        <div className="mx-auto inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft-strong text-accent">
                          <Bot size={14} />
                        </div>
                        <p className="mt-3 text-sm font-semibold text-fg">
                          How can I help you today?
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted">
                          Ask a question or pick a prompt below.
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-1.5 text-left">
                          {[
                            ["Explain", "Break down a topic."],
                            ["Write", "Improve a draft."],
                            ["Code", "Debug & review."],
                            ["Brainstorm", "Explore ideas."],
                          ].map(([title, sub]) => (
                            <div
                              key={title}
                              className="rounded-md border border-border bg-surface-elevated p-2"
                            >
                              <p className="text-[10px] font-semibold text-fg">
                                {title}
                              </p>
                              <p className="mt-0.5 text-[9px] text-muted">
                                {sub}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Composer */}
                    <div className="border-t border-border p-2">
                      <div className="flex items-center gap-1.5 rounded-md border border-border bg-bg p-1.5">
                        <input
                          type="text"
                          placeholder="Ask EchoGPT anything..."
                          className="min-w-0 flex-1 bg-transparent px-1.5 text-xs text-fg outline-none placeholder:text-muted-foreground"
                        />
                        <button
                          className="inline-flex h-6 w-6 items-center justify-center rounded-xs bg-[var(--primary)] text-white"
                          aria-label="Send"
                        >
                          <Send size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating glass chip — second and only other glass surface on the page */}
              <div className="glass-panel absolute -top-3 -left-3 hidden items-center gap-2 rounded-md px-2.5 py-1.5 text-[10px] sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                <span className="font-semibold text-fg">Streaming</span>
                <span className="text-muted">· EchoGPT</span>
              </div>

              {/* Floating accent chip — solid surface (not glass) */}
              <div className="absolute -bottom-3 -right-3 hidden items-center gap-2 rounded-md border border-border bg-surface-elevated px-2.5 py-1.5 text-[10px] shadow-1 sm:flex">
                <span className="font-mono text-muted">⌘K</span>
                <span className="text-fg">Quick switch</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
