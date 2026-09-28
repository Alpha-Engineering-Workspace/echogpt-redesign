"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useLocalStorage — React state synced to localStorage with the `echogpt:` prefix.
 *
 * Cross-tab sync: if the same key is updated in another tab/window, this hook
 * will re-read it via the `storage` event and update state.
 *
 * SSR safe: returns the initial value during SSR, then hydrates from
 * localStorage on mount.
 */
export default function useLocalStorage(key, initialValue) {
  const prefixedKey = key.startsWith("echogpt:") ? key : `echogpt:${key}`;

  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(prefixedKey);
      if (raw !== null) {
        setValue(JSON.parse(raw));
      }
    } catch {
      // ignore parse errors; keep initial value
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefixedKey]);

  // Listen for cross-tab updates
  useEffect(() => {
    function onStorage(event) {
      if (event.key !== prefixedKey || event.newValue === null) return;
      try {
        setValue(JSON.parse(event.newValue));
      } catch {
        // ignore
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [prefixedKey]);

  const updateValue = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        try {
          window.localStorage.setItem(prefixedKey, JSON.stringify(resolved));
        } catch {
          // quota / private mode — keep state, drop persistence
        }
        return resolved;
      });
    },
    [prefixedKey]
  );

  return [value, updateValue, hydrated];
}
