"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ChatHeader from "@/features/chat/ChatHeader";
import ChatInput from "@/features/chat/ChatInput";
import EmptyChat from "@/features/chat/EmptyChat";
import MessageList from "@/features/chat/MessageList";
import TypingIndicator from "@/features/chat/TypingIndicator";

const STORAGE_PREFIX = "echogpt";

function loadReactions(chatId) {
  if (typeof window === "undefined" || !chatId) return {};
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}:reactions:${chatId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveReactions(chatId, reactions) {
  if (typeof window === "undefined" || !chatId) return;
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}:reactions:${chatId}`,
      JSON.stringify(reactions)
    );
  } catch {}
}

function loadVariants(chatId, hash) {
  if (typeof window === "undefined" || !chatId || !hash) return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}:variants:${chatId}:${hash}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveVariants(chatId, hash, variants) {
  if (typeof window === "undefined" || !chatId || !hash) return;
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}:variants:${chatId}:${hash}`,
      JSON.stringify(variants.slice(-5))
    );
  } catch {}
}

function hashMessage(content) {
  // Simple deterministic hash
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = (hash << 5) - hash + content.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

const STREAM_TICK_MS = 14;
const WORDS_PER_TICK = 1;

export default function ChatWorkspace({
  chatId = null,
  title = "New conversation",
  model = "EchoGPT",
}) {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedModel, setSelectedModel] = useState(model);

  const [isLoading, setIsLoading] = useState(Boolean(chatId));
  const [isSending, setIsSending] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [error, setError] = useState("");

  const [reactions, setReactions] = useState({});

  const streamRef = useRef(null);

  // ─── Load messages + reactions when chatId changes ───────────────────────
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setReactions({});
      setIsLoading(false);
      return;
    }

    async function loadMessages() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chats/${chatId}/messages`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load messages");
        }

        setMessages(data.messages);
        setReactions(loadReactions(chatId));
      } catch (err) {
        console.error(err);
        setError("Could not load this conversation.");
      } finally {
        setIsLoading(false);
      }
    }

    loadMessages();
  }, [chatId]);

  // ─── Cleanup stream on unmount ──────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        clearInterval(streamRef.current);
        streamRef.current = null;
      }
    };
  }, []);

  // ─── Streaming engine ───────────────────────────────────────────────────
  const startStreaming = useCallback((messageId, fullText) => {
    if (streamRef.current) {
      clearInterval(streamRef.current);
    }
    setIsStreaming(true);
    setStreamingMessageId(messageId);

    const words = fullText.split(/(\s+)/);
    let index = 0;
    let current = "";

    streamRef.current = setInterval(() => {
      const slice = words
        .slice(0, index + WORDS_PER_TICK)
        .join("");
      index += WORDS_PER_TICK;
      current = slice;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, content: current } : m
        )
      );

      if (index >= words.length) {
        if (streamRef.current) {
          clearInterval(streamRef.current);
          streamRef.current = null;
        }
        setIsStreaming(false);
        setStreamingMessageId(null);
      }
    }, STREAM_TICK_MS);
  }, []);

  const stopStreaming = useCallback(() => {
    if (streamRef.current) {
      clearInterval(streamRef.current);
      streamRef.current = null;
    }
    if (streamingMessageId) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingMessageId
            ? { ...m, interrupted: true }
            : m
        )
      );
    }
    setIsStreaming(false);
    setStreamingMessageId(null);
  }, [streamingMessageId]);

  // ─── Model change (persists server-side) ────────────────────────────────
  async function handleModelChange(newModel) {
    setSelectedModel(newModel);
    if (!chatId) return;

    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: newModel }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update model");
      }
    } catch (err) {
      console.error("Model update error:", err);
      setSelectedModel(model);
    }
  }

  // ─── Reactions ──────────────────────────────────────────────────────────
  function handleReact(messageId, reaction) {
    if (!chatId) return;
    setReactions((prev) => {
      const next = { ...prev };
      // Toggle: clicking same reaction removes it
      if (next[messageId] === reaction) {
        delete next[messageId];
      } else {
        next[messageId] = reaction;
      }
      saveReactions(chatId, next);
      return next;
    });
  }

  // ─── Send ───────────────────────────────────────────────────────────────
  async function handleSend() {
    const cleanMessage = message.trim();
    if (!cleanMessage || isSending) return;

    setError("");
    setIsSending(true);
    setMessage("");

    const tempId = `temp-${Date.now()}`;
    const tempMessage = {
      id: tempId,
      role: "user",
      content: cleanMessage,
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      let activeChatId = chatId;

      // Auto-create chat if none
      if (!activeChatId) {
        const chatResponse = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: selectedModel }),
        });
        const chatData = await chatResponse.json();
        if (!chatResponse.ok) {
          throw new Error(chatData.message || "Could not create chat");
        }
        activeChatId = chatData.chat.id;
      }

      const response = await fetch(
        `/api/chats/${activeChatId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: cleanMessage }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      // Replace temp user msg + add assistant msg
      const userMsg = data.userMessage;
      const assistantMsg = {
        ...data.assistantMessage,
        model: selectedModel,
      };

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== tempId),
        userMsg,
        assistantMsg,
      ]);

      // Load existing reactions for this chat (in case it's a new chat)
      if (chatId !== activeChatId) {
        setReactions(loadReactions(activeChatId));
      }

      window.dispatchEvent(new Event("chatsUpdated"));

      // Begin streaming reveal of the assistant message
      startStreaming(assistantMsg.id, assistantMsg.content);

      // Navigate if new chat
      if (!chatId) {
        router.push(`/chat/${activeChatId}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Send message error:", err);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setMessage(cleanMessage);
      setError(err.message || "Could not send message.");
    } finally {
      setIsSending(false);
    }
  }

  // ─── Regenerate ─────────────────────────────────────────────────────────
  async function handleRegenerate(messageId) {
    if (!chatId) return;
    if (isStreaming) stopStreaming();

    // Find the user message just before this assistant message
    const idx = messages.findIndex((m) => m.id === messageId);
    if (idx < 1) return;
    const userMsg = messages[idx - 1];
    if (userMsg.role !== "user") return;

    try {
      const response = await fetch(
        `/api/chats/${chatId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: userMsg.content }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to regenerate");
      }

      const newAssistant = {
        ...data.assistantMessage,
        model: selectedModel,
      };

      // Replace the old assistant message with the new one
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? newAssistant : m))
      );

      startStreaming(newAssistant.id, newAssistant.content);
    } catch (err) {
      console.error("Regenerate error:", err);
      setError(err.message || "Could not regenerate.");
    }
  }

  // ─── Edit-and-rerun (user message) ──────────────────────────────────────
  function handleSaveEdit(messageId, newContent) {
    if (!chatId || !newContent.trim()) return;
    const idx = messages.findIndex((m) => m.id === messageId);
    if (idx < 0) return;

    // Optimistic update
    setMessages((prev) => [
      ...prev.slice(0, idx),
      { ...prev[idx], content: newContent },
    ]);

    // Truncate and resend
    const truncated = messages.slice(0, idx);
    setMessages(truncated);

    // Send the edited message
    setMessage(newContent);
    setTimeout(() => {
      handleSend();
    }, 0);
  }

  // ─── Export current chat as Markdown ─────────────────────────────────────
  function handleExportChat() {
    if (!messages.length) return;
    const lines = [
      `# ${title}`,
      "",
      `*Model: ${selectedModel} • Exported ${new Date().toLocaleString()}*`,
      "",
      "---",
      "",
    ];
    messages.forEach((m) => {
      const role = m.role === "user" ? "You" : "Assistant";
      lines.push(`## ${role}`, "", m.content || "", "");
    });
    const blob = new Blob([lines.join("\n")], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeTitle = title.replace(/[^a-z0-9-_]+/gi, "-").toLowerCase();
    a.download = `echogpt-${safeTitle}-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Listen for export events from ChatHeader
  useEffect(() => {
    function onExport() {
      handleExportChat();
    }
    window.addEventListener("echogpt:export-chat", onExport);
    return () => window.removeEventListener("echogpt:export-chat", onExport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, title]);

  // ─── Listen for prompt-library inserts ─────────────────────────────────
  useEffect(() => {
    function onInsertPrompt(event) {
      const text = event.detail;
      if (typeof text !== "string" || !text.trim()) return;
      setMessage(text);
    }
    window.addEventListener("echogpt:insert-prompt", onInsertPrompt);
    return () => window.removeEventListener("echogpt:insert-prompt", onInsertPrompt);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        title={title}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        chatId={chatId}
        onTitleChange={(t) => {
          // Used as a hook for sidebar refresh — already dispatched
        }}
      />

      {error && (
        <div className="border-b border-danger/30 bg-danger/10 px-4 py-2 text-center text-xs text-danger">
          {error}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-[pulse-dot_1.4s_ease-in-out_infinite]" />
              Loading conversation...
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex min-h-full items-center justify-center py-8">
            <EmptyChat onPromptSelect={(p) => setMessage(p)} />
          </div>
        ) : (
          <MessageList
            messages={messages}
            reactions={reactions}
            onReact={handleReact}
            onRegenerate={handleRegenerate}
            onSaveEdit={handleSaveEdit}
            streamingMessageId={streamingMessageId}
            isThinking={false}
          />
        )}
      </div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        isSending={isSending}
        onStop={stopStreaming}
        isStreaming={isStreaming}
      />
    </div>
  );
}
