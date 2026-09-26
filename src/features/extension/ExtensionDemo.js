"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Bot,
  FileText,
  Globe,
  Highlighter,
  History,
  MessageSquare,
  Send,
  Settings,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const historyItems = [
  {
    id: 1,
    title: "Summarized AI article",
    time: "2 minutes ago",
  },
  {
    id: 2,
    title: "Explained selected paragraph",
    time: "15 minutes ago",
  },
  {
    id: 3,
    title: "Rewrote product description",
    time: "Yesterday",
  },
];

const tabs = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
  },
  {
    id: "history",
    label: "History",
    icon: History,
  },
  {
    id: "actions",
    label: "Quick Actions",
    icon: Sparkles,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

const quickActions = [
  {
    title: "Summarize Page",
    description: "Get a short summary of the current page.",
    icon: FileText,
  },
  {
    title: "Explain Selection",
    description: "Explain selected text in simpler language.",
    icon: Highlighter,
  },
  {
    title: "Rewrite",
    description: "Rewrite selected content clearly.",
    icon: WandSparkles,
  },
  {
    title: "Ask About Page",
    description: "Ask EchoGPT about the current page.",
    icon: Globe,
  },
];

export default function ExtensionDemo() {
  const { resolvedTheme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState("chat");
  const [selectedModel, setSelectedModel] =
    useState("EchoGPT");
  const [message, setMessage] = useState("");
  const [usePageContext, setUsePageContext] =
    useState(true);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I can help you understand, summarize, or work with this page.",
    },
  ]);

  const isDark = resolvedTheme === "dark";

  function handleSend() {
    const cleanMessage = message.trim();

    if (!cleanMessage) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: cleanMessage,
    };

    const assistantMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: `Here is a demo ${selectedModel} response about this page.`,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);

    setMessage("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function handleQuickAction(action) {
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: action.title,
    };

    const assistantMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: `${action.title} completed. This is a simulated extension response using the current page context.`,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);

    setActiveTab("chat");
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Browser frame */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-colors dark:border-gray-800 dark:bg-gray-900">
        {/* Browser top bar */}
        <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700" />
          </div>

          <div className="mx-auto max-w-xl flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400">
            example.com/article
          </div>
        </div>

        <div className="grid min-h-[650px] lg:grid-cols-[1fr_380px]">
          {/* Fake webpage */}
          <div className="hidden border-r border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-950 lg:block">
            <div className="mx-auto max-w-2xl">
              <div className="mb-5 h-4 w-24 rounded bg-gray-100 dark:bg-gray-800" />

              <h2 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
                The Future of Artificial Intelligence
              </h2>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                A sample webpage used to demonstrate how the
                EchoGPT extension can understand and work with
                page context.
              </p>

              <div className="mt-8 space-y-4">
                <div className="h-3 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 w-5/6 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 w-4/6 rounded bg-gray-100 dark:bg-gray-800" />
              </div>

              <div className="mt-10 h-56 rounded-2xl bg-gray-100 dark:bg-gray-800" />

              <div className="mt-8 space-y-4">
                <div className="h-3 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Extension panel */}
          <div className="flex min-h-[650px] flex-col bg-white transition-colors dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-white dark:bg-white dark:text-gray-950">
                  <Bot size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-950 dark:text-white">
                    EchoGPT
                  </p>

                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Browser Assistant
                  </p>
                </div>
              </div>

              <select
                value={selectedModel}
                onChange={(event) =>
                  setSelectedModel(event.target.value)
                }
                className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-medium text-gray-700 outline-none transition dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
              >
                <option>EchoGPT</option>
                <option>GPT</option>
                <option>Claude</option>
                <option>Gemini</option>
              </select>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-800">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActiveTab =
                  activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActiveTab(tab.id)
                    }
                    className={`flex flex-col items-center gap-1 px-2 py-3 text-[11px] font-medium transition ${
                      isActiveTab
                        ? "border-b-2 border-gray-950 text-gray-950 dark:border-white dark:text-white"
                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    }`}
                  >
                    <Icon size={17} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Chat */}
            {activeTab === "chat" && (
              <div className="flex min-h-0 flex-1 flex-col">
                {usePageContext && (
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      Current Page
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                      The Future of Artificial
                      Intelligence
                    </p>

                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      example.com
                    </p>
                  </div>
                )}

                <div className="flex-1 space-y-3 overflow-y-auto bg-white p-4 dark:bg-gray-900">
                  {messages.map((item) => {
                    const isUser =
                      item.role === "user";

                    return (
                      <div
                        key={item.id}
                        className={`flex ${
                          isUser
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 py-2.5 text-sm leading-5 ${
                            isUser
                              ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {item.content}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-white p-2 transition focus-within:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:focus-within:border-gray-500">
                    <textarea
                      value={message}
                      onChange={(event) =>
                        setMessage(event.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      rows={1}
                      placeholder="Ask about this page..."
                      className="min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-gray-950 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                    />

                    <button
                      type="button"
                      onClick={handleSend}
                      disabled={!message.trim()}
                      aria-label="Send message"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-950 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {activeTab === "actions" && (
              <div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900">
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-950 dark:text-white">
                    Quick Actions
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Use EchoGPT with the current
                    webpage.
                  </p>
                </div>

                <div className="space-y-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.title}
                        type="button"
                        onClick={() =>
                          handleQuickAction(action)
                        }
                        className="flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:hover:border-gray-600 dark:hover:bg-gray-800"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          <Icon size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {action.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* History */}
            {activeTab === "history" && (
              <div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900">
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-950 dark:text-white">
                    History
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Your recent browser assistant
                    sessions.
                  </p>
                </div>

                <div className="space-y-2">
                  {historyItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setActiveTab("chat")
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        {item.time}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900">
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-950 dark:text-white">
                    Settings
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Configure your extension experience.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Default model */}
                  <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                      Default Model
                    </label>

                    <select
                      value={selectedModel}
                      onChange={(event) =>
                        setSelectedModel(
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    >
                      <option>EchoGPT</option>
                      <option>GPT</option>
                      <option>Claude</option>
                      <option>Gemini</option>
                    </select>
                  </div>

                  {/* Page context */}
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Use Page Context
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Let EchoGPT understand the
                        current webpage.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setUsePageContext(
                          !usePageContext
                        )
                      }
                      aria-label="Toggle page context"
                      aria-pressed={usePageContext}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        usePageContext
                          ? "bg-gray-950 dark:bg-white"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full transition ${
                          usePageContext
                            ? "left-6 bg-white dark:bg-gray-950"
                            : "left-1 bg-white"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Dark mode */}
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Dark Mode
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Use a darker EchoGPT appearance.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setTheme(
                          isDark
                            ? "light"
                            : "dark"
                        )
                      }
                      aria-label="Toggle dark mode"
                      aria-pressed={isDark}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        isDark
                          ? "bg-white"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full transition ${
                          isDark
                            ? "left-6 bg-gray-950"
                            : "left-1 bg-white"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Shortcut */}
                  <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Keyboard Shortcut
                    </p>

                    <div className="mt-2 inline-flex rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      Ctrl + Shift + E
                    </div>
                  </div>

                  {/* Account */}
                  <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Account
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Signed in to EchoGPT
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}