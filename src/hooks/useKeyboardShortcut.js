"use client";

import { useEffect } from "react";

/**
 * useKeyboardShortcut — global keyboard listener.
 *
 * @param {string|null} mod - "mod" | "ctrl" | "shift" | "alt" | null. "mod" maps
 *   to Meta on Mac, Ctrl elsewhere.
 * @param {string} key - key to listen for (case-insensitive).
 * @param {() => void} handler - callback.
 * @param {object} opts
 * @param {boolean} [opts.shift=false] - require Shift to also be held.
 * @param {boolean} [opts.alt=false] - require Alt to also be held.
 * @param {boolean} [opts.preventDefault=true] - preventDefault on match.
 * @param {boolean} [opts.enabled=true] - toggle listening.
 * @param {(event: KeyboardEvent) => boolean} [opts.allow] - predicate; return
 *   false to skip this event (e.g. already focused in an input).
 */
export default function useKeyboardShortcut(mod, key, handler, opts = {}) {
  const {
    shift = false,
    alt = false,
    preventDefault = true,
    enabled = true,
    allow,
  } = opts;

  useEffect(() => {
    if (!enabled) return undefined;

    function onKeyDown(event) {
      const isMac =
        typeof navigator !== "undefined" &&
        /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || "");

      const wantsMod = mod !== null && mod !== undefined;
      let modOk = true;
      if (wantsMod) {
        if (mod === "mod") {
          modOk = isMac ? event.metaKey : event.ctrlKey;
        } else if (mod === "ctrl") {
          modOk = event.ctrlKey;
        } else if (mod === "meta") {
          modOk = event.metaKey;
        } else if (mod === "shift") {
          modOk = event.shiftKey;
        } else if (mod === "alt") {
          modOk = event.altKey;
        }
      } else {
        modOk = !event.metaKey && !event.ctrlKey && !event.altKey;
      }

      const shiftOk = shift ? event.shiftKey : !event.shiftKey;
      const altOk = alt ? event.altKey : true;
      const keyOk = event.key.toLowerCase() === key.toLowerCase();

      if (!(modOk && shiftOk && altOk && keyOk)) return;
      if (allow && !allow(event)) return;

      if (preventDefault) event.preventDefault();
      handler(event);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mod, key, shift, alt, preventDefault, enabled, allow, handler]);
}
