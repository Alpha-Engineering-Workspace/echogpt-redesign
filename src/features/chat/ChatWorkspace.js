"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ChatHeader from "@/features/chat/ChatHeader";
import ChatInput from "@/features/chat/ChatInput";
import EmptyChat from "@/features/chat/EmptyChat";
import MessageList from "@/features/chat/MessageList";

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
  const [error, setError] = useState("");

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
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
      } catch (error) {
        console.error(error);
        setError("Could not load this conversation.");
      } finally {
        setIsLoading(false);
      }
    }

    loadMessages();
  }, [chatId]);
  async function handleModelChange(newModel) {
    setSelectedModel(newModel);

    if (!chatId) {
      return;
    }

    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: newModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update model");
      }
    } catch (error) {
      console.error("Model update error:", error);

      setSelectedModel(model);
    }
  }

  function handlePromptSelect(prompt) {
    setMessage(prompt);
  }

  async function handleSend() {
    const cleanMessage = message.trim();

    if (!cleanMessage || isSending) {
      return;
    }

    setError("");
    setIsSending(true);
    setMessage("");

    const temporaryId = `temp-${Date.now()}`;

    const temporaryMessage = {
      id: temporaryId,
      role: "user",
      content: cleanMessage,
    };

    setMessages((currentMessages) => [...currentMessages, temporaryMessage]);

    try {
      let activeChatId = chatId;

      // /chat থেকে message পাঠালে automatically
      // নতুন chat তৈরি হবে.
      if (!activeChatId) {
        const chatResponse = await fetch("/api/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: selectedModel,
          }),
        });

        const chatData = await chatResponse.json();

        if (!chatResponse.ok) {
          throw new Error(chatData.message || "Could not create chat");
        }

        activeChatId = chatData.chat.id;
      }

      const response = await fetch(`/api/chats/${activeChatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: cleanMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setMessages((currentMessages) => [
        ...currentMessages.filter((item) => item.id !== temporaryId),
        data.userMessage,
        data.assistantMessage,
      ]);

      window.dispatchEvent(new Event("chatsUpdated"));

      if (!chatId) {
        router.push(`/chat/${activeChatId}`);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Send message error:", error);

      setMessages((currentMessages) =>
        currentMessages.filter((item) => item.id !== temporaryId),
      );

      setMessage(cleanMessage);

      setError(error.message || "Could not send message.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        title={title}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
      {error && (
        <div className="border-b border-red-100 bg-red-50 px-4 py-2 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex min-h-full items-center justify-center py-8">
            <EmptyChat onPromptSelect={handlePromptSelect} />
          </div>
        ) : (
          <>
            <MessageList messages={messages} />

            {isSending && (
              <div className="mx-auto w-full max-w-3xl px-4 pb-5">
                <div className="inline-block rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
                  EchoGPT is thinking...
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        isSending={isSending}
      />
    </div>
  );
}
