"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import Container from "@/components/common/Container";
import { faqs } from "@/data/faqs";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  function handleToggle(index) {
    if (openIndex === index) {
      setOpenIndex(null);
      return;
    }

    setOpenIndex(index);
  }

  return (
    <section
      id="faq"
      className="bg-white py-20 transition-colors dark:bg-gray-950 sm:py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#6857f5] dark:text-violet-400">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors dark:border-gray-800 dark:bg-gray-900"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left transition hover:bg-gray-50 dark:hover:bg-gray-800/70"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-gray-950 dark:text-white">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-gray-500 transition dark:text-gray-400 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-5 py-4 dark:border-gray-800">
                      <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
