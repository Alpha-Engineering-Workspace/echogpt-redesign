"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { faqs } from "@/data/faqs";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  function handleToggle(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="section-y">
      <Container size="default">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* Left intro */}
          <Reveal variant="fade-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Answers, in plain language
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Everything you might wonder before signing up. If we missed
              something, reach out and we&apos;ll add it.
            </p>
          </Reveal>

          {/* Right list */}
          <Reveal variant="fade-up" delay={0.05}>
            <ul className="border-t border-border">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <li
                    key={faq.question}
                    className="border-b border-border"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggle(index)}
                      aria-expanded={isOpen}
                      className="flex w-full min-h-[72px] items-start gap-4 py-5 text-left transition"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xs bg-accent-soft text-[11px] font-semibold text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-base font-medium leading-snug text-fg">
                        {faq.question}
                      </span>
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xs border transition ${
                          isOpen
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-border bg-surface-elevated text-muted"
                        }`}
                      >
                        <ChevronDown
                          size={14}
                          strokeWidth={2.25}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pl-[44px] pr-12 text-sm leading-6 text-muted">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
