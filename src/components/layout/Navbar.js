"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LogOut, Menu, Puzzle, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#how" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  async function handleLogout() {
    setIsMenuOpen(false);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-4">
      <Container size="wide">
        <div
          className={`glass-panel rounded-xl px-3 transition-colors sm:px-4 ${
            scrolled ? "border-[var(--border-strong)]" : ""
          }`}
        >
          <nav className="flex h-12 items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <Logo size="sm" />
            </div>

            {/* Desktop center navigation */}
            <div className="hidden items-center md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-3 py-1.5 text-xs font-medium text-muted transition hover:text-fg"
                >
                  {link.label}
                </Link>
              ))}

              {/* Highlighted "Preview Extension" CTA — distinct from regular links */}
              <Link
                href="/extension"
                className="group/preview relative ml-2 inline-flex h-8 items-center gap-1.5 overflow-hidden rounded-md border border-accent/30 bg-accent-soft-strong pl-2.5 pr-2.5 text-[11px] font-semibold text-accent shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] transition hover:border-accent hover:bg-[var(--primary)] hover:text-white hover:shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_6px_18px_-6px_rgba(124,108,245,0.55)]"
              >
                {/* Tiny icon square */}
                <span className="flex h-4 w-4 items-center justify-center rounded-xs bg-[var(--primary)] text-white transition group-hover/preview:bg-white group-hover/preview:text-[var(--primary)]">
                  <Puzzle size={9} strokeWidth={2.75} />
                </span>
                <span className="relative">Preview Extension</span>
                <span className="ml-0.5 inline-flex items-center gap-0.5 text-[9px] font-medium uppercase tracking-wider opacity-90">
                  NEW
                </span>
                <ArrowUpRight
                  size={11}
                  className="ml-0.5 transition-transform group-hover/preview:-translate-y-0.5 group-hover/preview:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Desktop actions */}
            <div className="hidden items-center gap-1.5 md:flex">
              <ThemeToggle />

              {status !== "loading" && (
                <>
                  {session ? (
                    <>
                      <div className="ml-1 hidden items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1 lg:flex">
                        <div className="flex h-5 w-5 items-center justify-center rounded-xs bg-accent text-[10px] font-semibold text-white">
                          {session.user?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>
                        <span className="max-w-[7rem] truncate text-xs font-medium text-fg">
                          {session.user?.name}
                        </span>
                      </div>

                      <Link
                        href="/chat"
                        className="group inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--primary)] px-3 text-xs font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                      >
                        Open EchoGPT
                        <ArrowUpRight
                          size={13}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        aria-label="Logout"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition hover:bg-surface-hover hover:text-danger"
                      >
                        <LogOut size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="rounded-md px-3 py-2 text-xs font-medium text-muted transition hover:text-fg"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="group inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--primary)] px-3 text-xs font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                      >
                        Get Started
                        <ArrowUpRight
                          size={13}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-1.5 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-elevated text-fg transition hover:bg-surface-hover"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="border-t border-border px-1 pb-3 pt-2 md:hidden">
              <div className="flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={handleCloseMenu}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-hover hover:text-fg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 border-t border-border pt-3">
                {/* Highlighted Preview Extension CTA in mobile menu */}
                <Link
                  href="/extension"
                  onClick={handleCloseMenu}
                  className="group/preview mb-2 flex w-full items-center justify-between gap-2 overflow-hidden rounded-md border border-accent/30 bg-accent-soft-strong px-3 py-2.5 text-sm font-semibold text-accent transition hover:bg-[var(--primary)] hover:text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-xs bg-[var(--primary)] text-white transition group-hover/preview:bg-white group-hover/preview:text-[var(--primary)]">
                      <Puzzle size={12} strokeWidth={2.75} />
                    </span>
                    <span>Preview Extension</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="rounded-xs bg-[var(--primary)] px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-white transition group-hover/preview:bg-white group-hover/preview:text-[var(--primary)]">
                      New
                    </span>
                    <ArrowUpRight size={14} />
                  </span>
                </Link>

                {status !== "loading" && (
                  <>
                    {session ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 rounded-md bg-surface p-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-semibold text-white">
                            {session.user?.name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-fg">
                              {session.user?.name}
                            </p>
                            <p className="truncate text-xs text-muted">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>
                        <Link
                          href="/chat"
                          onClick={handleCloseMenu}
                          className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--primary)] px-3 py-2.5 text-sm font-semibold text-white"
                        >
                          Open EchoGPT
                          <ArrowUpRight size={14} />
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-hover hover:text-fg"
                        >
                          <LogOut size={14} />
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/login"
                          onClick={handleCloseMenu}
                          className="rounded-md border border-border px-3 py-2.5 text-center text-sm font-medium text-fg"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={handleCloseMenu}
                          className="rounded-md bg-[var(--primary)] px-3 py-2.5 text-center text-sm font-semibold text-white"
                        >
                          Get Started
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
