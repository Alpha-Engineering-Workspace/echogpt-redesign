import { ArrowRight, Puzzle, Sparkles } from "lucide-react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white transition-colors dark:bg-gray-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 mx-auto h-72 max-w-5xl bg-[radial-gradient(circle_at_top,rgba(104,87,245,0.10),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,rgba(104,87,245,0.18),transparent_65%)]" />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
            <Sparkles size={16} />
            One workspace for your AI tools
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-7xl">
            Work smarter with
            <span className="block text-[#6857f5] dark:text-[#8b7cff]">
              multiple AI models
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
            Chat, research, summarize, write, and explore the web using powerful
            AI models without constantly switching between different tools.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/chat" className="gap-2 px-6 py-3">
              Start Chatting
              <ArrowRight size={17} />
            </Button>

            <Button
              href="#extension"
              variant="secondary"
              className="gap-2 px-6 py-3"
            >
              <Puzzle size={17} />
              Explore Extension
            </Button>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Simple. Fast. Built for everyday productivity.
          </p>
        </div>
      </Container>
    </section>
  );
}
