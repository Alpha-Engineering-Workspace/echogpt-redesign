"use client";

import { useEffect, useState } from "react";
import { Calendar, Mail, MessageSquare, Sparkles, User } from "lucide-react";

export default function ProfileContent({ user }) {
  const [stats, setStats] = useState({
    chatCount: 0,
    messageCount: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch("/api/chats");
        const data = await response.json();
        if (!response.ok) return;

        const chatCount = data.chats?.length || 0;

        let messageCount = 0;
        for (const chat of data.chats || []) {
          try {
            const r = await fetch(`/api/chats/${chat.id}/messages`);
            const d = await r.json();
            if (r.ok) {
              messageCount += d.messages?.length || 0;
            }
          } catch {}
        }

        setStats({ chatCount, messageCount });
      } catch {}
    }

    loadStats();
  }, []);

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";
  const joinedDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-4">
      {/* Profile card */}
      <section className="rounded-md border border-border bg-surface-elevated p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-border bg-accent-soft-strong text-2xl font-semibold text-accent">
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-fg">{user.name}</h2>
            <p className="mt-0.5 text-sm text-muted">{user.email}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Mail size={11} />
                Verified
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={11} />
                Joined {joinedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User size={11} />
                Free plan
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard
          icon={<MessageSquare size={16} />}
          label="Conversations"
          value={stats.chatCount}
          accent
        />
        <StatCard
          icon={<Sparkles size={16} />}
          label="Messages"
          value={stats.messageCount}
        />
      </div>

      {/* Preferences link */}
      <section className="rounded-md border border-border bg-surface-elevated p-5">
        <h3 className="text-sm font-semibold text-fg">
          Preferences & data
        </h3>
        <p className="mt-1 text-xs text-muted">
          Manage your theme, default AI model, and conversation settings.
        </p>
        <a
          href="/settings"
          className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium text-fg transition hover:bg-surface-hover"
        >
          Open settings
        </a>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, accent = false }) {
  return (
    <div className="rounded-md border border-border bg-surface-elevated p-4">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-sm ${
            accent
              ? "bg-accent-soft-strong text-accent"
              : "bg-surface-hover text-muted"
          }`}
        >
          {icon}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-fg">
        {value}
      </p>
    </div>
  );
}
