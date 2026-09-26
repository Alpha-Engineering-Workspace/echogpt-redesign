"use client";

import { useEffect, useRef } from "react";

import ChatMessage from "@/features/chat/ChatMessage";

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-6">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}