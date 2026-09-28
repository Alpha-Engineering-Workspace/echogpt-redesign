"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Loader2, Monitor, Moon, Sun } from "lucide-react";

export default function SettingsForm() {
  const { data: session, update } = useSession();
  const { theme, setTheme } = useTheme();

  const [displayName, setDisplayName] = useState("");
  const [defaultModel, setDefaultModel] = useState("EchoGPT");
  const [compactMode, setCompactMode] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [extensionContext, setExtensionContext] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setDisplayName(session.user.name);
    }

    try {
      const saved = localStorage.getItem("echogpt-settings");
      if (saved) {
        const settings = JSON.parse(saved);
        setDefaultModel(settings.defaultModel || "EchoGPT");
        setCompactMode(settings.compactMode || false);
        setSaveHistory(settings.saveHistory !== false);
        setExtensionContext(settings.extensionContext !== false);
      }
    } catch {}
  }, [session]);

  async function handleSave(event) {
    event.preventDefault();

    if (!displayName.trim()) {
      setIsError(true);
      setMessage("Display name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setMessage("");

      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.message || "Could not save settings.");
        return;
      }

      localStorage.setItem(
        "echogpt-settings",
        JSON.stringify({
          defaultModel,
          compactMode,
          saveHistory,
          extensionContext,
        })
      );

      await update({ name: displayName.trim() });

      setIsError(false);
      setMessage("Settings saved successfully.");
    } catch (err) {
      console.error("Settings error:", err);
      setIsError(true);
      setMessage("Could not save settings.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <Section
        title="Profile"
        description="Basic information for your EchoGPT account."
      >
        <div>
          <label
            htmlFor="displayName"
            className="mb-1.5 block text-xs font-medium text-fg"
          >
            Display name
          </label>
          <input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-fg outline-none transition placeholder:text-muted-foreground focus:border-accent focus:shadow-glow"
          />
          <p className="mt-1.5 text-[10px] text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>
      </Section>

      <Section
        title="Appearance"
        description="Customize how EchoGPT looks and feels."
      >
        <div>
          <span className="mb-1.5 block text-xs font-medium text-fg">
            Theme preference
          </span>
          <div
            role="radiogroup"
            aria-label="Theme preference"
            className="inline-flex w-full overflow-hidden rounded-md border border-border bg-bg p-0.5 sm:w-auto"
          >
            {[
              { value: "light", label: "Light", Icon: Sun },
              { value: "dark", label: "Dark", Icon: Moon },
              { value: "system", label: "System", Icon: Monitor },
            ].map(({ value, label, Icon }, i, arr) => {
              const isActive = (theme || "system") === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setTheme(value)}
                  className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xs px-3 py-1.5 text-xs font-medium transition sm:flex-initial ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_4px_14px_-4px_rgba(124,108,245,0.45)]"
                      : "text-muted hover:bg-surface-hover hover:text-fg"
                  } ${i > 0 ? "sm:ml-0.5" : ""}`}
                >
                  <Icon size={12} strokeWidth={2.25} />
                  {label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Cycles: Light → Dark → System. Persisted across sessions.
          </p>
        </div>

        <SettingToggle
          title="Compact mode"
          description="Use tighter spacing inside the EchoGPT interface."
          enabled={compactMode}
          onChange={() => setCompactMode(!compactMode)}
        />
      </Section>

      <Section
        title="AI preferences"
        description="Choose your preferred EchoGPT model."
      >
        <div>
          <label
            htmlFor="defaultModel"
            className="mb-1.5 block text-xs font-medium text-fg"
          >
            Default AI model
          </label>
          <select
            id="defaultModel"
            value={defaultModel}
            onChange={(e) => setDefaultModel(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-fg outline-none transition focus:border-accent"
          >
            <option>EchoGPT</option>
            <option>GPT</option>
            <option>Claude</option>
            <option>Gemini</option>
          </select>
        </div>
      </Section>

      <Section
        title="Conversations"
        description="Control conversation and extension preferences."
      >
        <SettingToggle
          title="Conversation history"
          description="Remember your conversation preference."
          enabled={saveHistory}
          onChange={() => setSaveHistory(!saveHistory)}
        />
        <SettingToggle
          title="Extension page context"
          description="Allow the extension to use webpage context."
          enabled={extensionContext}
          onChange={() => setExtensionContext(!extensionContext)}
        />
      </Section>

      {message && (
        <div
          className={`rounded-md border px-3 py-2 text-xs ${
            isError
              ? "border-danger/30 bg-danger/10 text-danger"
              : "border-success/30 bg-success/10 text-success"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--primary)] px-4 text-xs font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </button>
      </div>
    </form>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="rounded-md border border-border bg-surface-elevated p-5">
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
      <p className="mt-1 text-xs text-muted">{description}</p>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function SettingToggle({ title, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border pt-4 first:border-t-0 first:pt-0">
      <div>
        <p className="text-sm font-medium text-fg">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        aria-label={`Toggle ${title}`}
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          enabled ? "bg-accent" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-1 transition-all ${
            enabled ? "left-4" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
