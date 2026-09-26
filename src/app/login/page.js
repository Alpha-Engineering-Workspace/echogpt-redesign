import Link from "next/link";
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, Sparkles } from "lucide-react";

import LoginForm from "@/components/forms/LoginForm";
import Logo from "@/components/common/Logo";

const features = [
  "Pick up your conversations where you left off",
  "Switch between 4 AI models mid-chat",
  "Browser extension with page context",
];

const models = [
  { name: "EchoGPT", color: "from-[#7c6cf5] to-[#a78bfa]" },
  { name: "GPT", color: "from-[#10a37f] to-[#34d399]" },
  { name: "Claude", color: "from-[#d97706] to-[#fbbf24]" },
  { name: "Gemini", color: "from-[#4285f4] to-[#60a5fa]" },
];

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen bg-bg">
      {/* Soft ambient backdrop — same gradient language as landing */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(900px 600px at 0% 0%, rgba(124,108,245,0.10), transparent 60%), radial-gradient(800px 500px at 100% 100%, rgba(167,139,250,0.08), transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Left marketing panel */}
      <aside className="relative hidden overflow-hidden border-r border-border bg-surface lg:flex lg:w-[52%] lg:flex-col lg:justify-between lg:p-12 xl:p-14">
        {/* Decorative grid + glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-0 opacity-40 dark:opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(ellipse at top left, black 25%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top left, black 25%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 top-1/3 -z-0 h-[600px] w-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(124,108,245,0.22), transparent 65%)",
          }}
          aria-hidden="true"
        />

        {/* Logo + back link */}
        <div className="relative z-10 flex items-center justify-between">
          <Logo size="lg" />
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-border-strong hover:text-fg"
          >
            <ArrowLeft
              size={12}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to home
          </Link>
        </div>

        {/* Main copy + chat preview */}
        <div className="relative z-10 space-y-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-fg shadow-1">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-success animate-pulse-dot" />
            </span>
            Welcome back
          </div>

          <div>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg xl:text-[44px]">
              Continue where you{" "}
              <span className="text-accent-gradient">left off.</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-muted">
              Pick up your conversations, ask follow-up questions, or start
              something new — all in one focused workspace.
            </p>
          </div>

          {/* Animated chat preview card */}
          <div className="overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-pop">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <div className="ml-3 flex-1 rounded-md border border-border bg-bg px-2.5 py-1 text-center text-[10px] text-muted">
                echogpt.live/chat
              </div>
            </div>

            <div className="space-y-3 p-4">
              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-lg bg-[var(--primary)] px-3 py-2 text-xs text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset]">
                  How do I reduce React re-renders?
                </div>
              </div>
              {/* Assistant message */}
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-soft-strong text-accent">
                  <Bot size={11} strokeWidth={2.25} />
                </div>
                <div className="max-w-[80%] rounded-lg border border-border bg-bg px-3 py-2 text-xs leading-relaxed text-fg">
                  Use <span className="rounded bg-surface px-1 font-mono text-[10px]">React.memo</span>, split
                  state, and lift derived values with{" "}
                  <span className="rounded bg-surface px-1 font-mono text-[10px]">useMemo</span>. Want
                  me to refactor a component?
                </div>
              </div>
              {/* Streaming indicator */}
              <div className="flex items-center gap-2 pl-8 text-[10.5px] text-muted-foreground">
                <span className="flex gap-0.5">
                  <span className="h-1 w-1 rounded-full bg-accent animate-pulse-dot" />
                  <span
                    className="h-1 w-1 rounded-full bg-accent animate-pulse-dot"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="h-1 w-1 rounded-full bg-accent animate-pulse-dot"
                    style={{ animationDelay: "0.3s" }}
                  />
                </span>
                EchoGPT is typing
              </div>
            </div>

            {/* Model strip */}
            <div className="flex items-center gap-2 border-t border-border bg-surface px-3 py-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Models
              </span>
              <div className="flex flex-1 items-center gap-1.5 overflow-hidden">
                {models.map((m) => (
                  <span
                    key={m.name}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-bg px-2 py-0.5 text-[10px] font-medium text-fg"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${m.color}`}
                    />
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Feature checklist */}
          <ul className="space-y-2.5">
            {features.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-fg"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent-soft-strong text-accent">
                  <CheckCircle2 size={11} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer trust row */}
        <div className="relative z-10 flex items-center justify-between border-t border-border pt-5 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles size={11} className="text-accent" />
            Built for everyday productivity
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            All systems normal
          </span>
        </div>
      </aside>

      {/* Right form */}
      <section className="relative flex w-full items-center justify-center px-4 py-10 lg:w-[48%] lg:px-12 xl:px-16">
        {/* Subtle right-side gradient wash */}
        <div
          className="pointer-events-none absolute right-0 top-0 -z-10 h-[400px] w-[500px]"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(124,108,245,0.08), transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="w-full max-w-[400px]">
          {/* Mobile header */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-elevated px-2 py-1 text-xs text-muted hover:text-fg"
            >
              <ArrowLeft size={12} />
              Back
            </Link>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent shadow-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Sign in
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-[32px]">
            Sign in to EchoGPT
          </h2>
          <p className="mt-2 text-sm text-muted">
            Enter your credentials to access your conversations.
          </p>

          {/* Form card */}
          <div className="mt-7 overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-pop">
            {/* Top accent stripe */}
            <div
              className="h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(124,108,245,0.55) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <div className="p-6 sm:p-7">
              <LoginForm />
            </div>
          </div>

          {/* Below-card footer */}
          <div className="mt-6 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-accent transition hover:text-[var(--primary-hover)]"
              >
                Create one →
              </Link>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 transition hover:text-fg"
            >
              Learn more
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
