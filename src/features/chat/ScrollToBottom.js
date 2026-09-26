"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ScrollToBottom({ visible, onClick }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={onClick}
          aria-label="Scroll to bottom"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-3 left-1/2 z-10 inline-flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-surface-elevated text-fg shadow-pop transition hover:bg-surface-hover"
        >
          <ArrowDown size={15} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
