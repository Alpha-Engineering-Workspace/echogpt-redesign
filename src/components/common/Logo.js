import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Logo({ size = "md", showText = true, href = "/" }) {
  const dimensions = {
    sm: { wrapper: "h-7 w-7", icon: 14, text: "text-base" },
    md: { wrapper: "h-8 w-8", icon: 16, text: "text-base" },
    lg: { wrapper: "h-9 w-9", icon: 18, text: "text-lg" },
  };

  const d = dimensions[size];

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2"
      aria-label="EchoGPT home"
    >
      <span
        className={`flex ${d.wrapper} items-center justify-center rounded-md bg-[var(--primary)] text-white transition-transform group-hover:scale-105`}
      >
        <Sparkles size={d.icon} strokeWidth={2.25} />
      </span>

      {showText && (
        <span
          className={`${d.text} font-semibold tracking-tight text-fg`}
        >
          EchoGPT
        </span>
      )}
    </Link>
  );
}
