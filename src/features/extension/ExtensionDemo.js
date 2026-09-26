"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
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
  { id: 1, title: "Summarized AI article", time: "2 minutes ago" },
  { id: 2, title: "Explained selected paragraph", time: "15 minutes ago" },
  { id: 3, title: "Rewrote product description", time: "Yesterday" },
];

const tabs = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "history", label: "History", icon: History },
  { id: "actions", label: "Actions", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
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
  const [selectedModel, setSelectedModel] = useState("EchoGPT");
  const [message, setMessage] = useState("");
  const [usePageContext, setUsePageContext] = useState(true);
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
    const clean = message.trim();
    if (!clean) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: clean },
      {
        id: Date.now() + 1,
        role: "assistant",
        content: `Here is a demo ${selectedModel} response about this page.`,
      },
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
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: action.title },
      {
        id: Date.now() + 1,
        role: "assistant",
        content: `${action.title} completed. This is a simulated extension response using the current page context.`,
      },
    ]);
    setActiveTab("chat");
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Browser frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-md border border-border bg-surface-elevated shadow-pop"
      >
        {/* Browser top bar */}
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-border" />
            <div className="h-2.5 w-2.5 rounded-full bg-border" />
            <div className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>

          <div className="mx-auto max-w-md flex-1 rounded-md border border-border bg-bg px-3 py-1.5 text-center text-[11px] text-muted">
            example.com/article
          </div>
        </div>

        <div className="grid min-h-[600px] lg:grid-cols-[1fr_360px]">
          {/* Fake webpage */}
          <div className="hidden border-r border-border bg-bg p-8 lg:block">
            <div className="mx-auto max-w-xl">
              <div className="mb-4 h-3 w-20 rounded bg-surface-hover" />

              <h2 className="text-3xl font-semibold tracking-tight text-fg">
                The Future of Artificial Intelligence
              </h2>

              <p className="mt-3 text-sm text-muted">
                A sample webpage used to demonstrate how the EchoGPT extension
                can understand and work with page context.
              </p>

              <div className="mt-6 space-y-3">
                <div className="h-2.5 rounded bg-surface-hover" />
                <div className="h-2.5 rounded bg-surface-hover" />
                <div className="h-2.5 w-5/6 rounded bg-surface-hover" />
                <div className="h-2.5 rounded bg-surface-hover" />
                <div className="h-2.5 w-4/6 rounded bg-surface-hover" />
              </div>

              <div className="mt-8 h-48 rounded-lg bg-surface-hover" />

              <div className="mt-6 space-y-3">
                <div className="h-2.5 rounded bg-surface-hover" />
                <div className="h-2.5 rounded bg-surface-hover" />
                <div className="h-2.5 w-3/4 rounded bg-surface-hover" />
              </div>
            </div>
          </div>

          {/* Extension panel */}
          <div className="flex min-h-[600px] flex-col bg-surface-elevated">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-3 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-soft-strong text-accent">
                  <Bot size={14} strokeWidth={2.25} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-fg">EchoGPT</p>
                  <p className="text-[10px] text-muted">Browser Assistant</p>
                </div>
              </div>

              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="rounded-md border border-border bg-bg px-2 py-1 text-[11px] font-medium text-fg outline-none transition focus:border-accent"
              >
                <option>EchoGPT</option>
                <option>GPT</option>
                <option>Claude</option>
                <option>Gemini</option>
              </select>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-4 border-b border-border">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex flex-col items-center gap-1 px-2 py-2.5 text-[10px] font-medium transition ${
                      isActive
                        ? "text-fg"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="extension-tab-indicator"
                        className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent"
                      />
                    )}
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="flex min-h-0 flex-1 flex-col">
              <AnimatePresence mode="wait">
                {activeTab === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    {usePageContext && (
                      <div className="border-b border-border bg-surface px-3 py-2.5">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Current Page
                        </p>
                        <p className="mt-0.5 truncate text-xs font-medium text-fg">
                          The Future of Artificial Intelligence
                        </p>
                        <p className="mt-px text-[10px] text-muted-foreground">
                          example.com
                        </p>
                      </div>
                    )}

                    <div className="flex-1 space-y-2 overflow-y-auto p-3">
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
                              className={`max-w-[85%] rounded-md px-2.5 py-2 text-xs leading-relaxed ${
                                isUser
                                  ? "bg-[var(--primary)] text-white"
                                  : "border border-border bg-bg text-fg"
                              }`}
                            >
                              {item.content}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-border bg-surface-elevated p-2">
                      <div className="flex items-end gap-1.5 rounded-md border border-border bg-bg p-1.5 transition focus-within:border-accent">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          rows={1}
                          placeholder="Ask about this page..."
                          className="min-h-7 flex-1 resize-none bg-transparent px-1.5 py-1 text-xs text-fg outline-none placeholder:text-muted-foreground"
                        />
                        <button
                          type="button"
                          onClick={handleSend}
                          disabled={!message.trim()}
                          aria-label="Send message"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--primary)] text-white transition hover:bg-[var(--primary-hover)] disabled:opacity-40"
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "actions" && (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 overflow-y-auto p-3"
                  >
                    <h3 className="text-xs font-semibold text-fg">
                      Quick Actions
                    </h3>
                    <p className="mt-1 text-[11px] text-muted">
                      Use EchoGPT with the current webpage.
                    </p>

                    <div className="mt-3 space-y-2">
                      {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.title}
                            type="button"
                            onClick={() => handleQuickAction(action)}
                            className="flex w-full items-start gap-2.5 rounded-md border border-border bg-bg p-3 text-left transition hover:border-accent hover:bg-surface"
                          >
                            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-accent-soft-strong text-accent">
                              <Icon size={13} />
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-fg">
                                {action.title}
                              </p>
                              <p className="mt-0.5 text-[10px] leading-4 text-muted">
                                {action.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === "history" && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 overflow-y-auto p-3"
                  >
                    <h3 className="text-xs font-semibold text-fg">History</h3>
                    <p className="mt-1 text-[11px] text-muted">
                      Your recent browser assistant sessions.
                    </p>

                    <div className="mt-3 space-y-1.5">
                      {historyItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTab("chat")}
                          className="w-full rounded-md border border-border bg-bg p-3 text-left transition hover:border-accent hover:bg-surface"
                        >
                          <p className="text-xs font-medium text-fg">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {item.time}
                          </p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 space-y-3 overflow-y-auto p-3"
                  >
                    <h3 className="text-xs font-semibold text-fg">Settings</h3>
                    <p className="text-[11px] text-muted">
                      Configure your extension experience.
                    </p>

                    <div className="rounded-md border border-border bg-bg p-3">
                      <label className="mb-1.5 block text-xs font-medium text-fg">
                        Default Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-fg outline-none focus:border-accent"
                      >
                        <option>EchoGPT</option>
                        <option>GPT</option>
                        <option>Claude</option>
                        <option>Gemini</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-bg p-3">
                      <div>
                        <p className="text-xs font-medium text-fg">
                          Use Page Context
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted">
                          EchoGPT understands the current page.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUsePageContext(!usePageContext)}
                        aria-pressed={usePageContext}
                        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                          usePageContext ? "bg-accent" : "bg-border"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-1 transition-all ${
                            usePageContext ? "left-4" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-bg p-3">
                      <div>
                        <p className="text-xs font-medium text-fg">Dark Mode</p>
                        <p className="mt-0.5 text-[10px] text-muted">
                          Use a darker appearance.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        aria-pressed={isDark}
                        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                          isDark ? "bg-accent" : "bg-border"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-1 transition-all ${
                            isDark ? "left-4" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="rounded-md border border-border bg-bg p-3">
                      <p className="text-xs font-medium text-fg">
                        Keyboard Shortcut
                      </p>
                      <div className="mt-1.5 inline-flex rounded-sm bg-surface px-2 py-1 text-[10px] font-medium text-muted">
                        Ctrl + Shift + E
                      </div>
                    </div>

                    <div className="rounded-md border border-border bg-bg p-3">
                      <p className="text-xs font-medium text-fg">Account</p>
                      <p className="mt-0.5 text-[10px] text-muted">
                        Signed in to EchoGPT
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
