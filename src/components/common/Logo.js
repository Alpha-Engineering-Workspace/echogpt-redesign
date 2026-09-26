import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="EchoGPT home"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6857f5] text-white">
        <Sparkles size={18} />
      </div>

      <span className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">
        EchoGPT
      </span>
    </Link>
  );
}