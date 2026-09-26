import { Bot, Check } from "lucide-react";

import Container from "@/components/common/Container";
import { aiModels } from "@/data/models";

export default function ModelsSection() {
  return (
    <section
      id="models"
      className="bg-white py-20 transition-colors dark:bg-gray-950 sm:py-24"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[#6857f5] dark:text-violet-400">
              AI MODELS
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              Choose the right AI for every task
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-gray-600 dark:text-gray-400">
              Different tasks benefit from different models. EchoGPT makes it
              easy to switch models without changing your workflow.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Switch models from the same conversation",
                "Simple and consistent interface",
                "Models for writing, coding, and research",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  <Check size={18} className="text-[#6857f5] dark:text-violet-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {aiModels.map((model) => (
              <div
                key={model.name}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:hover:border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <Bot size={21} />
                  </div>

                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    {model.label}
                  </span>
                </div>

                <h3 className="mt-5 font-semibold text-gray-950 dark:text-white">
                  {model.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
