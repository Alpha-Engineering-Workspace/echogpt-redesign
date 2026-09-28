"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Modal — fixed-position overlay with backdrop click + Escape close and
 * framer-motion scale/fade animation.
 *
 * Notes:
 *  - Rendered as plain JSX (not native <dialog>) so it lives in the same
 *    stacking context as the rest of the app and AnimatePresence can mount
 *    / unmount it cleanly without trapping focus at the browser top layer.
 *  - Body scroll is locked while open.
 *  - Escape closes via a window keydown listener while open.
 *
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - title / description: strings (used for ARIA labels)
 *  - size: "sm" | "md" | "lg" | "xl"
 *  - closeOnBackdrop: bool (default true)
 *  - showCloseButton: bool (default true)
 *  - children: content
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  closeOnBackdrop = true,
  showCloseButton = true,
  children,
}) {
  // Lock body scroll while open
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose?.();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const widths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={closeOnBackdrop ? onClose : undefined}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${widths[size]} max-h-[calc(100vh-2rem)] overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-pop flex flex-col`}
          >
            {(title || showCloseButton) && (
              <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
                <div className="min-w-0">
                  {title && (
                    <h2 className="text-sm font-semibold tracking-tight text-fg">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="mt-1 text-xs text-muted"
                    >
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-surface-hover hover:text-fg"
                  >
                    <X size={14} />
                  </button>
                )}
              </header>
            )}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
