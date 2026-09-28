import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Puzzle,
  Sparkles,
} from "lucide-react";

import RegisterForm from "@/components/forms/RegisterForm";
import Logo from "@/components/common/Logo";

const features = [
  "Persistent conversations across devices",
  "Switch between EchoGPT, GPT, Claude, and Gemini",
  "Browser extension with page context",
  "Dark mode + keyboard shortcuts",
];

const models = [
  { name: "EchoGPT", color: "from-[#7c6cf5] to-[#a78bfa]" },
  { name: "GPT", color: "from-[#10a37f] to-[#34d399]" },
  { name: "Claude", color: "from-[#d97706] to-[#fbbf24]" },
  { name: "Gemini", color: "from-[#4285f4] to-[#60a5fa]" },
];

export default function RegisterPage() {
  return (
    <main className="relative flex h-screen min-h-screen overflow-hidden bg-bg">
      {/* Soft ambient backdrop */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(900px 600px at 100% 0%, rgba(124,108,245,0.10), transparent 60%), radial-gradient(800px 500px at 0% 100%, rgba(167,139,250,0.08), transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Right form panel (mirror of login) */}
      <section className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-y-auto px-4 py-6 lg:w-[48%] lg:order-1 lg:px-12 xl:px-16">
        {/* Subtle left-side gradient wash */}
        <div
          className="pointer-events-none absolute left-0 top-0 -z-10 h-[400px] w-[500px]"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(124,108,245,0.08), transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="w-full max-w-[400px]">
          {/* Mobile header */}
          <div className="mb-5 flex items-center justify-between lg:hidden">
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
            <Sparkles size={10} strokeWidth={2.5} className="text-accent" />
            Get started in seconds
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-[32px]">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted">
            Join EchoGPT and start your first conversation.
          </p>

          {/* Form card */}
          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-pop">
            {/* Top accent stripe */}
            <div
              className="h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(124,108,245,0.55) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <div className="p-5 sm:p-6">
              <RegisterForm />
            </div>
          </div>

          {/* Below-card footer */}
          <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-accent transition hover:text-[var(--primary-hover)]"
              >
                Sign in →
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

      {/* Left marketing panel */}
      <aside className="relative hidden h-screen min-h-screen overflow-hidden border-l border-border bg-surface lg:flex lg:w-[52%] lg:order-2 lg:flex-col lg:justify-between lg:p-12 xl:p-14">
        {/* Decorative grid + glow (mask flipped to bottom right) */}
        <div
          className="pointer-events-none absolute inset-0 -z-0 opacity-40 dark:opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(ellipse at bottom right, black 25%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at bottom right, black 25%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 top-1/3 -z-0 h-[600px] w-[600px] rounded-full blur-3xl"
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

        {/* Main copy + extension showcase — scrollable middle column */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col space-y-6 overflow-y-auto pt-6 lg:pt-10">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-soft-strong px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <Puzzle size={10} strokeWidth={2.5} />
            Free forever · No credit card
          </div>

          <div>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg xl:text-[44px]">
              Start chatting with AI in{" "}
              <span className="text-accent-gradient">one workspace.</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-muted">
              Create a free account and unlock persistent conversations, model
              switching, and the EchoGPT browser extension.
            </p>
          </div>

          {/* Extension showcase card */}
          <div className="overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-pop">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <div className="ml-3 flex-1 rounded-md border border-border bg-bg px-2.5 py-1 text-center text-[10px] text-muted">
                docs.react.dev/learn
              </div>
              <span className="inline-flex items-center gap-1 rounded-sm border border-border bg-bg px-1.5 py-0.5 text-[9px] font-medium text-muted">
                <Puzzle size={8} className="text-accent" />
                EchoGPT
              </span>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-soft-strong text-accent">
                  <Bot size={11} strokeWidth={2.25} />
                </div>
                <div className="max-w-[85%] rounded-lg border border-border bg-bg px-3 py-2 text-xs leading-relaxed text-fg">
                  Page context detected. Ask me to summarize, explain, or
                  rewrite anything on this page.
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: "Summarize" },
                  { label: "Explain" },
                  { label: "Translate" },
                ].map((a) => (
                  <span
                    key={a.label}
                    className="rounded-md border border-border bg-bg px-2 py-1.5 text-center text-[10px] font-medium text-fg"
                  >
                    {a.label}
                  </span>
                ))}
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
            <Lock size={11} className="text-success" />
            Encrypted · Secure
          </span>
        </div>
      </aside>
    </main>
  );
}

function Lock({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
