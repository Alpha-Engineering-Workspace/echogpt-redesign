"use client";

import {
  Command,
  Database,
  FileText,
  History,
  KeyRound,
  MessageSquare,
  Shield,
  Sparkles,
} from "lucide-react";

import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";

const tiles = [
  {
    Icon: Sparkles,
    title: "Persistent conversations",
    body: "Your chats are saved, searchable, and pick up where you left off.",
    span: "lg:col-span-7 lg:row-span-2",
    glass: true, // <-- the ONE glass surface on the landing page
  },
  {
    Icon: KeyRound,
    title: "Account & sessions",
    body: "JWT sessions, secure password hashing, role-aware routes.",
    span: "lg:col-span-5",
  },
  {
    Icon: Database,
    title: "PostgreSQL backed",
    body: "Persistent chats and messages on a real relational store.",
    span: "lg:col-span-5",
  },
  {
    Icon: Command,
    title: "⌘K palette",
    body: "Jump to a recent chat, switch theme, open settings in milliseconds.",
    span: "lg:col-span-4",
  },
  {
    Icon: MessageSquare,
    title: "Per-chat controls",
    body: "Rename, export, share, or delete from one menu.",
    span: "lg:col-span-4",
  },
  {
    Icon: Shield,
    title: "Auth & ownership",
    body: "Every request is scoped to the signed-in user.",
    span: "lg:col-span-4",
  },
];

export default function CapabilityBento() {
  return (
    <section id="capabilities" className="section-band section-y border-y border-border">
      <Container size="wide">
        <div className="mx-auto max-w-3xl">
          <Reveal variant="fade-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Capabilities
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Small surface, serious depth
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Everything you need to keep your AI work organized — nothing you
              don&apos;t.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(180px,auto)]">
          {tiles.map((tile, i) => {
            const Icon = tile.Icon;
            const surfaceClasses = tile.glass
              ? "glass-panel card-hover"
              : "card-hover rounded-lg border border-border bg-surface-elevated";

            return (
              <Reveal
                key={tile.title}
                variant="fade-up"
                index={i}
                delay={0.04}
                className={`${tile.span}`}
              >
                <div
                  className={`${surfaceClasses} flex h-full flex-col justify-between rounded-lg p-5`}
                >
                  <div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft-strong text-accent">
                      <Icon size={16} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-fg">
                      {tile.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">
                      {tile.body}
                    </p>
                  </div>

                  {tile.glass && (
                    <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted">
                      <FileText size={12} className="text-accent" />
                      12 conversations saved today
                      <span className="ml-auto inline-flex items-center gap-1 text-fg">
                        <History size={12} />
                        Recent
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
