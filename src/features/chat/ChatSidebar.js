"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MessageSquare,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
} from "lucide-react";

import Logo from "@/components/common/Logo";

export default function ChatSidebar({ onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();

  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function loadChats() {
      try {
        const response = await fetch("/api/chats");
        const data = await response.json();

        if (response.ok) {
          setChats(data.chats);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadChats();

    window.addEventListener("chatsUpdated", loadChats);

    return () => {
      window.removeEventListener(
        "chatsUpdated",
        loadChats
      );
    };
  }, [pathname]);

  async function handleNewChat() {
    try {
      setIsCreating(true);

      const response = await fetch("/api/chats", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setChats((currentChats) => [
        data.chat,
        ...currentChats,
      ]);

      onNavigate?.();

      router.push(`/chat/${data.chat.id}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    } finally {
      setIsCreating(false);
    }
  }

  async function handleRename(chat) {
    const newTitle = window.prompt(
      "Rename conversation",
      chat.title
    );

    if (!newTitle?.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `/api/chats/${chat.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setChats((currentChats) =>
        currentChats.map((item) =>
          item.id === chat.id ? data.chat : item
        )
      );

      router.refresh();
    } catch (error) {
      console.error("Failed to rename chat:", error);
    }
  }

  async function handleDelete(chat) {
    const confirmed = window.confirm(
      `Delete "${chat.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/chats/${chat.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        return;
      }

      setChats((currentChats) =>
        currentChats.filter(
          (item) => item.id !== chat.id
        )
      );

      if (pathname === `/chat/${chat.id}`) {
        router.push("/chat");
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  }

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <Logo />
      </div>

      <div className="p-3">
        <button
          type="button"
          onClick={handleNewChat}
          disabled={isCreating}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
        >
          <Plus size={18} />

          {isCreating ? "Creating..." : "New Chat"}
        </button>
      </div>

      <div className="px-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <Search size={17} />
          Search conversations
        </button>
      </div>

      <div className="mt-5 flex-1 overflow-y-auto px-3">
        <p className="mb-2 px-2 text-xs font-medium uppercase text-gray-400 dark:text-gray-500">
          Recent
        </p>

        {isLoading ? (
          <p className="px-2 text-sm text-gray-400 dark:text-gray-500">
            Loading...
          </p>
        ) : chats.length === 0 ? (
          <p className="px-2 text-sm text-gray-400 dark:text-gray-500">
            No conversations yet.
          </p>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => {
              const href = `/chat/${chat.id}`;
              const isActive = pathname === href;

              return (
                <div
                  key={chat.id}
                  className={`group flex items-center rounded-lg transition ${
                    isActive
                      ? "bg-gray-200 dark:bg-gray-800"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={`flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-sm ${
                      isActive
                        ? "font-medium text-gray-950 dark:text-white"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <MessageSquare
                      size={17}
                      className="shrink-0"
                    />

                    <span className="truncate">
                      {chat.title}
                    </span>
                  </Link>

                  <div className="flex shrink-0 pr-2">
                    <button
                      type="button"
                      onClick={() => handleRename(chat)}
                      aria-label="Rename conversation"
                      className="rounded p-1.5 text-gray-400 transition hover:bg-white hover:text-gray-700 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(chat)}
                      aria-label="Delete conversation"
                      className="rounded p-1.5 text-gray-400 transition hover:bg-white hover:text-red-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <Link
          href="/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <Settings size={18} />
          Settings
        </Link>

        <Link
          href="/profile"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <User size={18} />
          Profile
        </Link>
      </div>
    </aside>
  );
}