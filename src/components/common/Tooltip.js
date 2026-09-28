"use client";

import { useState } from "react";

/**
 * Tooltip — lightweight hover/focus tooltip with 200ms delay.
 *
 * Renders an absolutely-positioned label below the trigger by default.
 *
 * Props:
 *  - label: string
 *  - side: "top" | "bottom" (default "top")
 *  - children: trigger element (must be a single focusable/hoverable node)
 *  - className: extra classes on the wrapper
 */
export default function Tooltip({ label, side = "top", children, className = "" }) {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  function show() {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => setOpen(true), 200));
  }
  function hide() {
    if (timer) clearTimeout(timer);
    setOpen(false);
  }

  const positionClass =
    side === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-1.5"
      : "top-full left-1/2 -translate-x-1/2 mt-1.5";

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && label && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-sm border border-border bg-surface-overlay px-1.5 py-0.5 text-[10px] font-medium text-fg shadow-pop ${positionClass}`}
        >
          {label}
        </span>
      )}
    </span>
  );
}
