"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import ScrollToBottom from "./ScrollToBottom";

export default function MessageList({
  messages,
  reactions,
  onReact,
  onRegenerate,
  onSaveEdit,
  streamingMessageId,
  isThinking,
}) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const userScrolledRef = useRef(false);

  // Auto-scroll to bottom when messages change (unless user scrolled up)
  useEffect(() => {
    if (!userScrolledRef.current && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  // Detect scroll position
  function handleScroll(event) {
    const el = event.currentTarget;
    const distance =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = distance < 80;
    const farUp = distance > 200;

    setShowScrollButton(farUp);
    userScrolledRef.current = !nearBottom;
  }

  function scrollToBottom() {
    userScrolledRef.current = false;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  }

  const lastAssistantId = [...messages]
    .reverse()
    .find((m) => m.role === "assistant")?.id;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative mx-auto h-full w-full max-w-3xl overflow-y-auto px-4 py-6 sm:px-6"
    >
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-5"
          >
            <ChatMessage
              message={message}
              isLastAssistant={message.id === lastAssistantId}
              reaction={reactions?.[message.id]}
              onReact={(r) => onReact(message.id, r)}
              onRegenerate={() => onRegenerate(message.id)}
              onSaveEdit={onSaveEdit}
              isStreaming={message.id === streamingMessageId}
            />
          </motion.div>
        ))}

        {isThinking && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-5"
          >
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={bottomRef} />

      <ScrollToBottom visible={showScrollButton} onClick={scrollToBottom} />
    </div>
  );
}
