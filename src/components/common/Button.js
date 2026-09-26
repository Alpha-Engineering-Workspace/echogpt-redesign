import Link from "next/link";

/**
 * Button — single source of truth for primary/secondary/etc styles.
 *
 * NOTE: Primary variant uses explicit `bg-[var(--primary)] text-white`
 * instead of `bg-accent text-accent-foreground`. The accent-foreground
 * token has been a source of contrast bugs in dark mode; primary
 * buttons are always white-on-violet, regardless of token value.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  pill = false,
  inverted = false,
  className = "",
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-60 select-none whitespace-nowrap";

  const radiusStyle = pill ? "rounded-full" : "rounded-md";

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-sm",
    icon: "h-10 w-10 px-0",
  };

  const variants = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(0,0,0,0.06)]",
    secondary:
      "bg-surface-elevated text-fg border border-border hover:bg-surface-hover hover:border-border-strong",
    ghost: "text-muted hover:bg-surface-hover hover:text-fg",
    outline:
      "border border-border bg-transparent text-fg hover:bg-surface-hover hover:border-border-strong",
    danger: "bg-danger text-white hover:opacity-90",
    // Used inside an inverted (violet) CTA panel — primary becomes a DEEPER solid violet
    // (#3b2db8) with white text, so it visibly differentiates from the lighter panel fill
    // (var(--primary)) while staying in the same hue family. Secondary is a white outline.
    "on-violet":
      "bg-[#3b2db8] text-white hover:bg-[#2c1f8c] shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_8px_24px_-8px_rgba(0,0,0,0.45),0_2px_6px_rgba(0,0,0,0.18)]",
    "on-violet-outline":
      "border border-white/40 bg-transparent text-white hover:bg-white/10 hover:border-white/60",
  };

  const classes = `${baseStyle} ${radiusStyle} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
