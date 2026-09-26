import {
  Puzzle,
  FileText,
  Highlighter,
  MessageSquareText,
  Send,
} from "lucide-react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";

export default function ExtensionSection() {
  return (
    <section
      id="extension"
      className="bg-gray-950 py-20 text-white transition-colors dark:bg-black sm:py-24"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-100">
              <Puzzle size={16} />
              Chrome Extension
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Bring AI directly into your browser
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-gray-400">
              Summarize webpages, explain selected text, and ask questions about
              what you are reading without constantly switching tabs.
            </p>

            <div className="mt-7 space-y-4">
              <ExtensionFeature icon={FileText} text="Summarize long webpages" />
              <ExtensionFeature icon={Highlighter} text="Explain selected content" />
              <ExtensionFeature
                icon={MessageSquareText}
                text="Ask questions using page context"
              />
            </div>

            <div className="mt-8">
              <Button href="/extension" className="gap-2">
                Explore Extension
                <Puzzle size={17} />
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-[#17181d] p-3 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="rounded-2xl bg-white text-gray-950 transition-colors dark:bg-gray-950 dark:text-white">
              <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
                <div>
                  <p className="font-semibold">EchoGPT</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Browser Assistant
                  </p>
                </div>

                <span className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                  EchoGPT
                </span>
              </div>

              <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Current page
                </p>

                <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
                  <p className="text-sm font-medium text-gray-950 dark:text-white">
                    React Documentation
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    react.dev
                  </p>
                </div>

                <p className="mb-3 mt-5 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Quick actions
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button className="rounded-xl border border-gray-200 p-3 text-left text-xs font-medium transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900">
                    Summarize Page
                  </button>

                  <button className="rounded-xl border border-gray-200 p-3 text-left text-xs font-medium transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900">
                    Explain Selection
                  </button>
                </div>

                <div className="mt-5 rounded-xl bg-violet-50 p-3 text-sm leading-6 text-gray-700 dark:bg-violet-500/10 dark:text-gray-300">
                  This page explains React components and how they are used to
                  build reusable user interfaces.
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-900">
                  <input
                    type="text"
                    placeholder="Ask about this page..."
                    className="min-w-0 flex-1 bg-transparent px-2 text-xs text-gray-950 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                  />

                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6857f5] text-white transition hover:bg-[#5746e5]"
                    aria-label="Send extension message"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ExtensionFeature({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
        <Icon size={17} />
      </div>

      <span className="text-sm text-gray-300">{text}</span>
    </div>
  );
}
