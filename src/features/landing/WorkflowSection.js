import { ArrowUpRight } from "lucide-react";

import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";

const steps = [
  {
    n: "01",
    label: "Sign in",
    body: "Create an account in seconds. No setup, no API keys to manage.",
  },
  {
    n: "02",
    label: "Pick a model",
    body: "Choose EchoGPT, GPT, Claude, or Gemini — switch mid-conversation.",
  },
  {
    n: "03",
    label: "Start a chat",
    body: "Persistent threads you can rename, search, and resume anytime.",
  },
  {
    n: "04",
    label: "Ship the output",
    body: "Copy, export, or hand off directly to the browser extension.",
  },
];

// Vertical offset per step creates the staircase rise
const stairOffset = ["mt-0", "lg:mt-10", "lg:mt-20", "lg:mt-28"];

export default function WorkflowSection() {
  return (
    <section
      id="how"
      className="section-y relative overflow-hidden border-y border-border bg-surface"
    >
      {/* Soft ambient glow behind the staircase */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[560px]">
        <div className="absolute left-1/2 top-[-120px] h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,108,245,0.18),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(124,108,245,0.22),transparent_60%)]" />
      </div>

      <Container size="wide" className="relative">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
              How it works
            </span>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl">
              From sign-in to shipped{" "}
              <span className="text-accent-gradient">in four steps</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              No setup, no juggling tabs. A focused workflow from your first
              message to the final answer.
            </p>
          </Reveal>
        </div>

        {/* Staircase */}
        <div className="relative mt-20 lg:mt-24">
          {/* Diagonal guide line behind the steps — mimics the stair slope */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 -z-0 hidden h-full w-full lg:block"
            viewBox="0 0 1200 380"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="stairLine" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c6cf5" stopOpacity="0" />
                <stop offset="15%" stopColor="#7c6cf5" stopOpacity="0.55" />
                <stop offset="85%" stopColor="#a78bfa" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Stepped diagonal that climbs left-to-right */}
            <path
              d="M 60 360 L 340 360 L 340 270 L 620 270 L 620 180 L 900 180 L 900 90 L 1140 90"
              fill="none"
              stroke="url(#stairLine)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <ol className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <Reveal
                key={step.n}
                variant="fade-up"
                index={i}
                delay={0.05}
                as="li"
                className={`group relative ${stairOffset[i]}`}
              >
                {/* Step card */}
                <div className="relative h-full overflow-hidden rounded-lg border border-border bg-surface-elevated p-6 shadow-1 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-pop">
                  {/* Top accent stripe */}
                  <span
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#7c6cf5] via-[#a78bfa] to-[#c4b5fd]"
                    aria-hidden="true"
                  />

                  {/* Header: numeral + step count */}
                  <div className="flex items-start justify-between">
                    <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-md border border-border bg-bg font-mono text-sm font-bold tracking-tight text-fg transition-all duration-300 group-hover:border-accent group-hover:text-accent">
                      {step.n}
                    </div>

                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Step {i + 1} / 4
                    </span>
                  </div>

                  {/* Label + body */}
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.body}
                  </p>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {i < steps.length - 1 ? "Next" : "Done"}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                </div>

                {/* Step marker dot on the diagonal — desktop only */}
                <span
                  className="absolute right-4 top-[24px] hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-bg bg-accent shadow-[0_0_0_3px_var(--surface-elevated)] lg:block"
                  aria-hidden="true"
                />
              </Reveal>
            ))}
          </ol>

          {/* Mobile connector — vertical line between stacked cards */}
          <div
            className="pointer-events-none absolute left-[34px] top-[60px] bottom-[60px] w-px lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(124,108,245,0.45) 10%, rgba(124,108,245,0.45) 90%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </Container>
    </section>
  );
}
