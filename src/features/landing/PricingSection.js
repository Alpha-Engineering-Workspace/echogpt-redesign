"use client";

import { Check } from "lucide-react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";

export default function PricingSection() {
  return (
    <section id="pricing" className="section-y">
      <Container size="wide">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="fade-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Start free. Upgrade when you need more.
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Explore EchoGPT and choose the experience that fits your
              workflow.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2">
          <Reveal variant="fade-up">
            <PricingCard
              tier="Free"
              price="$0"
              period="/ month"
              description="For exploring EchoGPT and everyday AI tasks."
              features={[
                "Access to EchoGPT model",
                "Conversation history",
                "Basic browser features",
                "Responsive web application",
              ]}
              ctaText="Get started"
              ctaHref="/register"
              variant="secondary"
            />
          </Reveal>

          <Reveal variant="fade-up" delay={0.08}>
            <PricingCard
              tier="Pro"
              price="$12"
              period="/ month"
              description="For users who want more models and productivity tools."
              features={[
                "Everything in Free",
                "Access to GPT, Claude, Gemini",
                "Advanced browser actions",
                "Higher usage limits",
              ]}
              ctaText="Explore Pro"
              ctaHref="/register"
              variant="primary"
              inverted
            />
          </Reveal>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Pricing shown here is part of the redesign concept and can be
          updated to match the production product.
        </p>
      </Container>
    </section>
  );
}

function PricingCard({
  tier,
  price,
  period,
  description,
  features,
  ctaText,
  ctaHref,
  inverted = false,
  variant,
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-lg p-7 transition-shadow ${
        inverted
          ? "bg-[var(--primary)] text-white shadow-glow"
          : "border border-border bg-surface-elevated text-fg shadow-1"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <h3
          className={`text-lg font-semibold ${
            inverted ? "text-white" : "text-fg"
          }`}
        >
          {tier}
        </h3>
        {inverted && (
          <span className="rounded-xs bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Recommended
          </span>
        )}
      </div>

      <div className="mt-5 flex items-end gap-1">
        <span
          className={`text-4xl font-semibold tracking-tight ${
            inverted ? "text-white" : "text-fg"
          }`}
        >
          {price}
        </span>
        <span
          className={`pb-1 text-xs ${
            inverted ? "text-white/70" : "text-muted"
          }`}
        >
          {period}
        </span>
      </div>

      <p
        className={`mt-3 text-sm leading-6 ${
          inverted ? "text-white/80" : "text-muted"
        }`}
      >
        {description}
      </p>

      <div
        className={`my-6 border-t ${
          inverted ? "border-white/15" : "border-border"
        }`}
      />

      <div className="space-y-2.5">
        {features.map((feature) => (
          <div
            key={feature}
            className={`flex items-center gap-2.5 text-sm ${
              inverted ? "text-white" : "text-fg"
            }`}
          >
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-xs ${
                inverted
                  ? "bg-white/15 text-white"
                  : "bg-accent-soft-strong text-accent"
              }`}
            >
              <Check size={11} strokeWidth={3} />
            </span>
            {feature}
          </div>
        ))}
      </div>

      <Button
        href={ctaHref}
        variant={variant}
        className="mt-7 w-full"
        size="md"
      >
        {ctaText}
      </Button>
    </div>
  );
}
