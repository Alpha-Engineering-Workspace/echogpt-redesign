"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  LogOut,
  Menu,
  Puzzle,
  Settings,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click-outside to close the user dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userMenuOpen]);

  // Escape to close the user dropdown
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [userMenuOpen]);

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function closeUserMenu() {
    setUserMenuOpen(false);
  }

  async function handleLogout() {
    closeUserMenu();
    setIsMenuOpen(false);
    await signOut({ callbackUrl: "/" });
  }

  const userInitial = session?.user?.name?.charAt(0)?.toUpperCase() || "U";
  const userName = session?.user?.name || "Account";
  const userEmail = session?.user?.email || "";

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
                    <div ref={userMenuRef} className="relative">
                      {/* User trigger button — avatar circle + name + caret */}
                      <button
                        type="button"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        aria-label="Account menu"
                        aria-expanded={userMenuOpen}
                        aria-haspopup="menu"
                        className={`ml-1 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs transition ${
                          userMenuOpen
                            ? "border-accent bg-accent-soft-strong text-fg shadow-glow"
                            : "border-border bg-surface-elevated hover:bg-surface-hover"
                        }`}
                      >
                        {/* Avatar circle — first letter of name */}
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6cf5] via-[#8b5cf6] to-[#a78bfa] text-[11px] font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] ring-2 ring-bg">
                          {userInitial}
                        </span>
                        <span className="max-w-[8rem] truncate font-medium text-fg">
                          {userName}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`text-muted-foreground transition-transform ${
                            userMenuOpen ? "rotate-180 text-accent" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown panel */}
                      <AnimatePresence>
                        {userMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.96 }}
                            transition={{
                              duration: 0.14,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-surface-overlay shadow-pop"
                            role="menu"
                          >
                            {/* Header — avatar + name + email */}
                            <div className="flex items-center gap-3 border-b border-border bg-surface px-3.5 py-3">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6cf5] via-[#8b5cf6] to-[#a78bfa] text-sm font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]">
                                {userInitial}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-fg">
                                  {userName}
                                </p>
                                {userEmail && (
                                  <p className="truncate text-[11px] text-muted">
                                    {userEmail}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Menu items */}
                            <div className="p-1">
                              <UserMenuItem
                                href="/chat"
                                icon={<ArrowUpRight size={13} />}
                                label="Open EchoGPT"
                                subtitle="Go to your chat workspace"
                                onClick={closeUserMenu}
                              />
                              <UserMenuItem
                                href="/profile"
                                icon={<User size={13} />}
                                label="Profile"
                                subtitle="Manage your personal info"
                                onClick={closeUserMenu}
                              />
                              <UserMenuItem
                                href="/settings"
                                icon={<Settings size={13} />}
                                label="Settings"
                                subtitle="Preferences and account"
                                onClick={closeUserMenu}
                              />
                            </div>

                            {/* Footer — logout */}
                            <div className="border-t border-border p-1">
                              <button
                                type="button"
                                role="menuitem"
                                onClick={handleLogout}
                                className="group/logout flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs text-muted transition hover:bg-danger/10 hover:text-danger"
                              >
                                <span className="flex h-6 w-6 items-center justify-center rounded-xs bg-bg text-muted transition group-hover/logout:bg-danger/10 group-hover/logout:text-danger">
                                  <LogOut size={12} />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-medium">
                                    Sign out
                                  </p>
                                  <p className="mt-0.5 text-[10px] text-muted-foreground transition group-hover/logout:text-danger/70">
                                    End your session
                                  </p>
                                </div>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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

              {/* Mobile user avatar / sign-in shortcut */}
              {status !== "loading" &&
                (session ? (
                  <Link
                    href="/profile"
                    aria-label="Account"
                    className="inline-flex h-8 w-8 items-center justify-center"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6cf5] via-[#8b5cf6] to-[#a78bfa] text-[11px] font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]">
                      {userInitial}
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex h-8 items-center rounded-md border border-border bg-surface-elevated px-2.5 text-[11px] font-medium text-fg transition hover:bg-surface-hover"
                  >
                    Sign In
                  </Link>
                ))}

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-fg transition hover:bg-surface-hover"
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
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
                        {/* Avatar + name card */}
                        <div className="flex items-center gap-2.5 rounded-md border border-border bg-surface p-2.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6cf5] via-[#8b5cf6] to-[#a78bfa] text-xs font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]">
                            {userInitial}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-fg">
                              {userName}
                            </p>
                            {userEmail && (
                              <p className="truncate text-xs text-muted">
                                {userEmail}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Menu actions */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/profile"
                            onClick={handleCloseMenu}
                            className="flex items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-xs font-medium text-fg transition hover:bg-surface-hover"
                          >
                            <UserCircle size={13} />
                            Profile
                          </Link>
                          <Link
                            href="/settings"
                            onClick={handleCloseMenu}
                            className="flex items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-xs font-medium text-fg transition hover:bg-surface-hover"
                          >
                            <Settings size={13} />
                            Settings
                          </Link>
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
                          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-danger/10 hover:text-danger"
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

function UserMenuItem({ href, icon, label, subtitle, onClick }) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className="group/menu flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition hover:bg-surface-hover"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xs bg-bg text-muted transition group-hover/menu:bg-accent-soft-strong group-hover/menu:text-accent">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-fg">{label}</p>
        {subtitle && (
          <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
