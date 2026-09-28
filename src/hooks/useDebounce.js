"use client";

import { useEffect, useState } from "react";

/**
 * useDebounce — returns a value that only updates after `delay` ms of idle.
 * Cancels pending update on unmount or value change.
 */
export default function useDebounce(value, delay = 150) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handle);
  }, [value, delay]);

  return debounced;
}
