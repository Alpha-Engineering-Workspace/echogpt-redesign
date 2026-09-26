"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import QuickPrompts from "@/features/chat/QuickPrompts";

export default function EmptyChat({ onPromptSelect }) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center px-4 text-center">
      {/* Hero icon — layered, with soft halo + grid behind it */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Halo */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-accent-soft-strong blur-2xl" />

        {/* Decorative grid ring */}
        <div
          className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(124,108,245,0.18) 1px, transparent 1.5px)",
            backgroundSize: "14px 14px",
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
          }}
          aria-hidden="true"
        />

        {/* Icon shell */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface-elevated text-accent shadow-pop">
          <Sparkles size={22} strokeWidth={2.25} />

          {/* Tiny orbiting dot */}
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg bg-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
          </span>
        </div>
      </motion.div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-accent"
      >
        New conversation
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl"
      >
        How can I help{" "}
        <span className="text-accent-gradient">you today?</span>
      </motion.h2>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-3 max-w-md text-sm leading-6 text-muted sm:text-base"
      >
        Ask a question, explore an idea, write something, or get help with
        your code.
      </motion.p>

      {/* Quick prompts */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-9 w-full"
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Suggestions
          </span>
          <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:inline-flex">
            or just type below
            <ArrowRight size={11} />
          </span>
        </div>
        <QuickPrompts onPromptSelect={onPromptSelect} />
      </motion.div>
    </div>
  );
}
