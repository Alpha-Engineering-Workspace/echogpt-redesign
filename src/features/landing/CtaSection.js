import { ArrowRight } from "lucide-react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";

/**
 * Final CTA — SOLID violet panel (not glass). Inverted hierarchy:
 * primary button is white on violet (high contrast), secondary is outlined white.
 */
export default function CtaSection() {
  return (
    <section className="pb-24 pt-8">
      <Container size="wide">
        <Reveal variant="fade-up">
          <div className="relative overflow-hidden rounded-lg bg-[var(--primary)] px-8 py-16 text-white shadow-pop sm:px-14 sm:py-20">
            {/* Subtle radial highlight inside the violet panel */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 50%)",
              }}
            />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to work smarter with AI?
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/80 sm:text-base">
                  Start using EchoGPT and bring every AI tool into one focused
                  workspace. Free to try, no credit card required.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button href="/register" variant="on-violet" size="lg">
                  Create free account
                  <ArrowRight size={15} />
                </Button>
                <Button href="/chat" variant="on-violet-outline" size="lg">
                  Try the demo
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
