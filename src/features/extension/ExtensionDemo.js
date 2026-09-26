"use client";

import { useState } from "react";
import {
  Bot,
  History,
  MessageSquare,
  Send,
  Settings,
  Sparkles,
  FileText,
  WandSparkles,
  Highlighter,
  Globe,
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
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedModel, setSelectedModel] = useState("EchoGPT");
  const [message, setMessage] = useState("");
  const [usePageContext, setUsePageContext] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I can help you understand, summarize, or work with this page.",
    },
  ]);

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
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        {/* Browser top bar */}
        <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-gray-300" />
            <div className="h-3 w-3 rounded-full bg-gray-300" />
            <div className="h-3 w-3 rounded-full bg-gray-300" />
          </div>

          <div className="mx-auto max-w-xl flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-xs text-gray-500">
            example.com/article
          </div>
        </div>

        <div className="grid min-h-[650px] lg:grid-cols-[1fr_380px]">
          {/* Fake webpage */}
          <div className="hidden border-r border-gray-200 bg-white p-10 lg:block">
            <div className="mx-auto max-w-2xl">
              <div className="mb-5 h-4 w-24 rounded bg-gray-100" />

              <h2 className="text-4xl font-bold tracking-tight text-gray-950">
                The Future of Artificial Intelligence
              </h2>

              <p className="mt-4 text-gray-500">
                A sample webpage used to demonstrate how the EchoGPT extension
                can understand and work with page context.
              </p>

              <div className="mt-8 space-y-4">
                <div className="h-3 rounded bg-gray-100" />
                <div className="h-3 rounded bg-gray-100" />
                <div className="h-3 w-5/6 rounded bg-gray-100" />
                <div className="h-3 rounded bg-gray-100" />
                <div className="h-3 w-4/6 rounded bg-gray-100" />
              </div>

              <div className="mt-10 h-56 rounded-2xl bg-gray-100" />

              <div className="mt-8 space-y-4">
                <div className="h-3 rounded bg-gray-100" />
                <div className="h-3 rounded bg-gray-100" />
                <div className="h-3 w-3/4 rounded bg-gray-100" />
              </div>
            </div>
          </div>

          {/* Extension panel */}
          <div className="flex min-h-[650px] flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-white">
                  <Bot size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-950">EchoGPT</p>

                  <p className="text-xs text-gray-400">Browser Assistant</p>
                </div>
              </div>

              <select
                value={selectedModel}
                onChange={(event) => setSelectedModel(event.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-medium text-gray-700 outline-none"
              >
                <option>EchoGPT</option>
                <option>GPT</option>
                <option>Claude</option>
                <option>Gemini</option>
              </select>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-4 border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-1 px-2 py-3 text-[11px] font-medium transition ${
                      isActive
                        ? "border-b-2 border-gray-950 text-gray-950"
                        : "text-gray-400 hover:text-gray-700"
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
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                      Current Page
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-gray-700">
                      The Future of Artificial Intelligence
                    </p>

                    <p className="mt-1 text-xs text-gray-400">example.com</p>
                  </div>
                )}

                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.map((item) => {
                    const isUser = item.role === "user";

                    return (
                      <div
                        key={item.id}
                        className={`flex ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 py-2.5 text-sm leading-5 ${
                            isUser
                              ? "bg-gray-950 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.content}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 p-3">
                  <div className="flex items-end gap-2 rounded-xl border border-gray-200 p-2">
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={1}
                      placeholder="Ask about this page..."
                      className="min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={handleSend}
                      disabled={!message.trim()}
                      aria-label="Send message"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-950 text-white disabled:opacity-40"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick actions */}
            {activeTab === "actions" && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-950">Quick Actions</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Use EchoGPT with the current webpage.
                  </p>
                </div>

                <div className="space-y-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.title}
                        type="button"
                        onClick={() => handleQuickAction(action)}
                        className="flex w-full items-start gap-3 rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-300 hover:bg-gray-50"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                          <Icon size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {action.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            {action.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Temporary placeholders */}
            {activeTab === "history" && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-950">History</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your recent browser assistant sessions.
                  </p>
                </div>

                <div className="space-y-2">
                  {historyItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab("chat")}
                      className="w-full rounded-xl border border-gray-200 p-4 text-left transition hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">{item.time}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-950">Settings</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Configure your extension experience.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 p-4">
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Default Model
                    </label>

                    <select
                      value={selectedModel}
                      onChange={(event) => setSelectedModel(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                    >
                      <option>EchoGPT</option>
                      <option>GPT</option>
                      <option>Claude</option>
                      <option>Gemini</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Use Page Context
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Let EchoGPT understand the current webpage.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setUsePageContext(!usePageContext)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        usePageContext ? "bg-gray-950" : "bg-gray-300"
                      }`}
                      aria-label="Toggle page context"
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          usePageContext ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Dark Mode
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Use a darker extension appearance.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        darkMode ? "bg-gray-950" : "bg-gray-300"
                      }`}
                      aria-label="Toggle dark mode"
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          darkMode ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-medium text-gray-900">
                      Keyboard Shortcut
                    </p>

                    <div className="mt-2 inline-flex rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">
                      Ctrl + Shift + E
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-medium text-gray-900">Account</p>

                    <p className="mt-1 text-xs text-gray-500">
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
