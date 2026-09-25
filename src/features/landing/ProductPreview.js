import {
  Bot,
  ChevronDown,
  Plus,
  Search,
  Send,
  Sparkles,
} from "lucide-react";

import Container from "@/components/common/Container";

export default function ProductPreview() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/70">
          {/* Window top */}
          <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />

            <div className="ml-4 rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs text-gray-500">
              echogpt.live/chat
            </div>
          </div>

          <div className="flex min-h-[580px]">
            {/* Sidebar */}
            <aside className="hidden w-64 border-r border-gray-200 bg-gray-50 p-4 md:block">
              <button className="flex w-full items-center gap-2 rounded-xl bg-[#6857f5] px-4 py-3 text-sm font-medium text-white">
                <Plus size={16} />
                New Chat
              </button>

              <div className="mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-500">
                <Search size={16} />
                Search chats
              </div>

              <p className="mb-2 mt-6 px-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Recent
              </p>

              <div className="space-y-1">
                <button className="w-full rounded-lg bg-white px-3 py-2 text-left text-sm text-gray-700">
                  React performance tips
                </button>

                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-white">
                  Portfolio ideas
                </button>

                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-white">
                  Explain REST APIs
                </button>
              </div>
            </aside>

            {/* Chat area */}
            <div className="flex flex-1 flex-col">
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 sm:px-7">
                <div>
                  <p className="text-sm font-semibold text-gray-950">
                    New Conversation
                  </p>

                  <p className="text-xs text-gray-500">
                    Start asking anything
                  </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium">
                  <Sparkles
                    size={15}
                    className="text-[#6857f5]"
                  />
                  EchoGPT
                  <ChevronDown size={14} />
                </button>
              </div>

              <div className="flex flex-1 items-center justify-center p-6">
                <div className="w-full max-w-xl text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-[#6857f5]">
                    <Bot size={27} />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-gray-950">
                    How can I help you today?
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Choose a suggestion or ask your own
                    question.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <button className="rounded-xl border border-gray-200 p-4 text-left text-sm hover:bg-gray-50">
                      <strong className="block text-gray-900">
                        Explain something
                      </strong>

                      <span className="mt-1 block text-gray-500">
                        Break down a difficult topic.
                      </span>
                    </button>

                    <button className="rounded-xl border border-gray-200 p-4 text-left text-sm hover:bg-gray-50">
                      <strong className="block text-gray-900">
                        Write better
                      </strong>

                      <span className="mt-1 block text-gray-500">
                        Improve or rewrite your content.
                      </span>
                    </button>

                    <button className="rounded-xl border border-gray-200 p-4 text-left text-sm hover:bg-gray-50">
                      <strong className="block text-gray-900">
                        Help me code
                      </strong>

                      <span className="mt-1 block text-gray-500">
                        Debug and understand code.
                      </span>
                    </button>

                    <button className="rounded-xl border border-gray-200 p-4 text-left text-sm hover:bg-gray-50">
                      <strong className="block text-gray-900">
                        Brainstorm ideas
                      </strong>

                      <span className="mt-1 block text-gray-500">
                        Explore ideas and possibilities.
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg shadow-gray-100">
                  <input
                    type="text"
                    placeholder="Ask EchoGPT anything..."
                    className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
                  />

                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6857f5] text-white"
                    aria-label="Send message"
                  >
                    <Send size={17} />
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