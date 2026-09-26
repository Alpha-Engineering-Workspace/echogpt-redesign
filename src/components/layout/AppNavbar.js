"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";
import Logo from "@/components/common/Logo";

const links = [
  { label: "Chat", href: "/chat" },
  { label: "Extension", href: "/extension" },
  { label: "Settings", href: "/settings" },
];

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-4">
      <div
        className={`glass-panel mx-auto flex h-12 max-w-[1440px] items-center justify-between rounded-xl px-3 sm:px-4 ${
          scrolled ? "border-[var(--border-strong)]" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-muted transition hover:bg-surface-hover hover:text-fg"
          >
            <ArrowLeft size={15} />
          </button>

          <Logo size="sm" />
        </div>

        <nav className="flex items-center gap-0.5">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "bg-surface-hover text-fg"
                    : "text-muted hover:bg-surface-hover hover:text-fg"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
