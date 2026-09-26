"use client";

import { motion } from "framer-motion";

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "fade-up": {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-down": {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-left": {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
  },
  "fade-right": {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
};

/**
 * Reveal — entrance animation for sections.
 * Pass `index` for auto-staggered children (no need to import motion).
 */
export default function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  index,
  duration = 0.55,
  className = "",
  once = true,
  amount = 0.2,
  as = "div",
}) {
  const selected = variants[variant] || variants["fade-up"];
  const MotionTag = motion[as] || motion.div;
  const computedDelay =
    typeof index === "number" ? delay + index * 0.06 : delay;

  return (
    <MotionTag
      initial={selected.initial}
      whileInView={selected.animate}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay: computedDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
