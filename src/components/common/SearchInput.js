"use client";

import { Search, X } from "lucide-react";
import { forwardRef } from "react";

/**
 * SearchInput — controlled input with leading search icon, optional clear
 * button, optional kbd hint, and focus ring.
 *
 * Props:
 *  - value, onChange, placeholder
 *  - onClear: () => void — shown when value is non-empty
 *  - kbd: string — right-side keyboard hint (e.g. "⌘K")
 *  - className: extra classes on the outer wrapper
 *  - inputClassName: extra classes on the <input>
 *  - inputRef: forwarded to <input>
 */
const SearchInput = forwardRef(function SearchInput(
  {
    value,
    onChange,
    onClear,
    placeholder = "Search...",
    kbd,
    className = "",
    inputClassName = "",
    autoFocus = false,
  },
  ref
) {
  const hasValue = Boolean(value);
  return (
    <div className={`group relative ${className}`}>
      <Search
        size={12}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent"
      />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full rounded-md border border-border bg-bg py-1.5 pl-7 ${
          kbd ? "pr-14" : "pr-8"
        } text-xs text-fg outline-none transition placeholder:text-muted-foreground focus:border-accent ${inputClassName}`}
      />
      {hasValue && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition hover:bg-surface-hover hover:text-fg"
        >
          <X size={11} />
        </button>
      )}
      {!hasValue && kbd && (
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-xs border border-border bg-surface px-1 py-px font-mono text-[9.5px] text-muted-foreground sm:inline-block">
          {kbd}
        </kbd>
      )}
    </div>
  );
});

export default SearchInput;
