"use client";

import { useEffect, useState } from "react";
import { Library } from "lucide-react";

import PromptLibrary from "@/features/prompts/PromptLibrary";

/**
 * PromptLibraryButton — sidebar entry that opens the PromptLibrary modal.
 *
 * Also listens for the `echogpt:open-prompt-library` window event so the
 * Command Palette can open the modal programmatically.
 */
export default function PromptLibraryButton({ onNavigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("echogpt:open-prompt-library", onOpen);
    return () => window.removeEventListener("echogpt:open-prompt-library", onOpen);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          setOpen(true);
        }}
        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs text-muted transition hover:bg-surface-hover hover:text-fg"
      >
        <Library size={13} className="text-muted-foreground" />
        Prompt Library
      </button>

      <PromptLibrary open={open} onClose={() => setOpen(false)} />
    </>
  );
}
