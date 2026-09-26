export default function TypingIndicator() {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-elevated px-3 py-2 shadow-1"
      aria-label="Assistant is typing"
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse-dot"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse-dot"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse-dot"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
}
