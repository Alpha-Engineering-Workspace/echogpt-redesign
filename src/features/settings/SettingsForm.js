"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

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

  useEffect(() => {
    if (session?.user?.name) {
      setDisplayName(session.user.name);
    }

    const savedSettings = localStorage.getItem(
      "echogpt-settings"
    );

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);

      setDefaultModel(
        settings.defaultModel || "EchoGPT"
      );

      setCompactMode(
        settings.compactMode || false
      );

      setSaveHistory(
        settings.saveHistory !== false
      );

      setExtensionContext(
        settings.extensionContext !== false
      );
    }
  }, [session]);

  async function handleSave(event) {
    event.preventDefault();

    if (!displayName.trim()) {
      setMessage("Display name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setMessage("");

      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Could not save settings."
        );
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

      await update({
        name: displayName.trim(),
      });

      setMessage("Settings saved successfully.");
    } catch (error) {
      console.error("Settings error:", error);

      setMessage("Could not save settings.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-6"
    >
      {/* Profile */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
          Profile
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Basic information for your EchoGPT account.
        </p>

        <div className="mt-5">
          <label
            htmlFor="displayName"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Display name
          </label>

          <input
            id="displayName"
            value={displayName}
            onChange={(event) =>
              setDisplayName(event.target.value)
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-gray-500"
          />

          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {session?.user?.email}
          </p>
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
          Appearance
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize how EchoGPT looks and feels.
        </p>

        <div className="mt-5">
          <label
            htmlFor="theme"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Theme preference
          </label>

          <select
            id="theme"
            value={theme || "system"}
            onChange={(event) =>
              setTheme(event.target.value)
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-gray-500"
          >
            <option value="system">
              System
            </option>

            <option value="light">
              Light
            </option>

            <option value="dark">
              Dark
            </option>
          </select>
        </div>

        <SettingToggle
          title="Compact mode"
          description="Use tighter spacing inside the EchoGPT interface."
          enabled={compactMode}
          onChange={() =>
            setCompactMode(!compactMode)
          }
        />
      </section>

      {/* AI Preferences */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
          AI Preferences
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Choose your preferred EchoGPT model.
        </p>

        <div className="mt-5">
          <label
            htmlFor="defaultModel"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Default AI model
          </label>

          <select
            id="defaultModel"
            value={defaultModel}
            onChange={(event) =>
              setDefaultModel(event.target.value)
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-gray-500"
          >
            <option>EchoGPT</option>
            <option>GPT</option>
            <option>Claude</option>
            <option>Gemini</option>
          </select>
        </div>
      </section>

      {/* Conversations */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
          Conversations
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Control conversation and extension preferences.
        </p>

        <SettingToggle
          title="Conversation history"
          description="Remember your conversation preference."
          enabled={saveHistory}
          onChange={() =>
            setSaveHistory(!saveHistory)
          }
        />

        <SettingToggle
          title="Extension page context"
          description="Allow the extension to use webpage context."
          enabled={extensionContext}
          onChange={() =>
            setExtensionContext(!extensionContext)
          }
        />
      </section>

      {message && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          {message}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-gray-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
        >
          {isSaving
            ? "Saving..."
            : "Save Settings"}
        </button>
      </div>
    </form>
  );
}

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="mt-5 flex items-center justify-between gap-5 border-t border-gray-100 pt-5 dark:border-gray-800">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-gray-950 dark:bg-white"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full transition ${
            enabled
              ? "left-6 bg-white dark:bg-gray-950"
              : "left-1 bg-white"
          }`}
        />
      </button>
    </div>
  );
}