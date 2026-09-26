import { Clock, MessageSquare, Server, Sparkles } from "lucide-react";

import Container from "@/components/common/Container";

const stats = [
  {
    value: "4",
    label: "AI models",
    sub: "EchoGPT · GPT · Claude · Gemini",
    Icon: Sparkles,
    accent: "from-[#7c6cf5] to-[#a78bfa]",
  },
  {
    value: "12k+",
    label: "Conversations",
    sub: "Saved, searchable, resumable",
    Icon: MessageSquare,
    accent: "from-[#7c6cf5] to-[#8e7fff]",
  },
  {
    value: "99.9%",
    label: "Uptime",
    sub: "Multi-region failover",
    Icon: Server,
    accent: "from-[#8b5cf6] to-[#c4b5fd]",
  },
  {
    value: "240ms",
    label: "Median first token",
    sub: "Streaming starts fast",
    Icon: Clock,
    accent: "from-[#a78bfa] to-[#c4b5fd]",
  },
];

export default function MetricsStrip() {
  return (
    <section className="relative border-y border-border bg-surface py-12 sm:py-14">
      <Container size="wide">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
        {stats.map((s, i) => {
          const Icon = s.Icon;
          return (
            <div
              key={s.label}
              className={`group relative ${
                i > 0 ? "sm:pl-6 sm:border-l sm:border-border" : ""
              }`}
            >
              {/* Icon + number on the same line */}
              <div className="flex items-center gap-2.5">
                <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-soft-strong text-accent transition group-hover:scale-105">
                  <Icon size={15} strokeWidth={2.25} />
                </span>
                <span className="text-3xl font-semibold leading-none tracking-tight text-fg sm:text-[34px]">
                  {s.value}
                </span>
              </div>

              {/* Label + sub stacked below */}
              <div className="mt-2.5 flex flex-col gap-0.5 pl-[46px]">
                <span className="text-xs font-semibold uppercase tracking-wider text-fg/80">
                  {s.label}
                </span>
                <span className="hidden text-[11px] leading-snug text-muted sm:block">
                  {s.sub}
                </span>
              </div>

              {/* Subtle accent underline on hover (desktop) */}
              <span
                className={`absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r ${s.accent} transition-all duration-300 group-hover:w-12 hidden sm:block`}
                aria-hidden="true"
              />
            </div>
          );
        })}
        </div>
      </Container>
    </section>
  );
}
