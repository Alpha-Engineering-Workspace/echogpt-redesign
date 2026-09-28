"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function isActiveLink(href) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-4">
      <div
        className={`glass-panel mx-auto flex h-12 max-w-[1440px] items-center justify-between rounded-xl px-3 sm:px-4 ${
          scrolled ? "border-[var(--border-strong)]" : ""
        }`}
      >
        {/* Left cluster — always visible: back + logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-muted transition hover:bg-surface-hover hover:text-fg"
          >
            <ArrowLeft size={15} />
          </button>

          <Logo href="/chat" size="sm" showText={false} />
        </div>

        {/* Right cluster — desktop nav + theme toggle + mobile menu button */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Desktop nav links (hidden on mobile) */}
          <nav className="hidden items-center sm:flex">
            {links.map((link) => {
              const isActive = isActiveLink(link.href);

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

          {/* Mobile hamburger — opens slide-down menu */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-fg transition hover:bg-surface-hover sm:hidden"
          >
            {isMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu panel */}
      <div
        className={`mx-auto mt-2 max-w-[1440px] overflow-hidden rounded-xl border border-border bg-surface-overlay shadow-pop transition-all duration-200 ease-out sm:hidden ${
          isMenuOpen
            ? "max-h-[400px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col p-2">
          {links.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleCloseMenu}
                className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-accent-soft-strong text-fg"
                    : "text-muted hover:bg-surface-hover hover:text-fg"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight
                  size={14}
                  className={`transition ${
                    isActive ? "text-accent" : "text-muted-foreground"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Footer status row inside the mobile menu */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            All systems normal
          </span>
          <span className="font-mono">⌘K</span>
        </div>
      </div>
    </header>
  );
}
