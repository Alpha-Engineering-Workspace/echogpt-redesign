"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";

const navLinks = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Models",
    href: "#models",
  },
  {
    label: "Extension",
    href: "#extension",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, status } = useSession();

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  async function handleLogout() {
    setIsMenuOpen(false);

    await signOut({
      callbackUrl: "/",
    });
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <Container>
        <div className="rounded-2xl border border-gray-200/80 bg-white/85 shadow-sm shadow-black/5 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/85 dark:shadow-black/20">
          <nav className="flex h-16 items-center justify-between px-4 sm:px-5">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0"
              aria-label="EchoGPT home"
            >
              <Logo />
            </Link>

            {/* Desktop center navigation */}
            <div className="hidden items-center rounded-full border border-gray-200 bg-gray-50/80 p-1 md:flex dark:border-gray-800 dark:bg-gray-900/80">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-gray-950 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />

              {status !== "loading" && (
                <>
                  {session ? (
                    <>
                      {/* User */}
                      <div className="ml-1 hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 lg:flex dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-950 text-xs font-semibold text-white dark:bg-white dark:text-gray-950">
                          {session.user?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <span className="max-w-24 truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                          {session.user?.name}
                        </span>
                      </div>

                      {/* Main CTA */}
                      <Link
                        href="/chat"
                        className="group inline-flex items-center gap-2 rounded-xl bg-[#6857f5] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5746e5] hover:shadow-md"
                      >
                        Open EchoGPT

                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>

                      {/* Logout */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        aria-label="Logout"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                      >
                        <LogOut size={17} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        Sign In
                      </Link>

                      <Link
                        href="/register"
                        className="group inline-flex items-center gap-2 rounded-xl bg-[#6857f5] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5746e5] hover:shadow-md"
                      >
                        Get Started

                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />

              <button
                type="button"
                onClick={() =>
                  setIsMenuOpen(!isMenuOpen)
                }
                aria-label={
                  isMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              >
                {isMenuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="border-t border-gray-200 px-4 pb-4 pt-3 dark:border-gray-800 md:hidden">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={handleCloseMenu}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 border-t border-gray-200 pt-4 dark:border-gray-800">
                {status !== "loading" && (
                  <>
                    {session ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white dark:bg-white dark:text-gray-950">
                            {session.user?.name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-950 dark:text-white">
                              {session.user?.name}
                            </p>

                            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/chat"
                          onClick={handleCloseMenu}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6857f5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5746e5]"
                        >
                          Open EchoGPT
                          <ArrowUpRight size={16} />
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/login"
                          onClick={handleCloseMenu}
                          className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200"
                        >
                          Sign In
                        </Link>

                        <Link
                          href="/register"
                          onClick={handleCloseMenu}
                          className="rounded-xl bg-[#6857f5] px-4 py-3 text-center text-sm font-semibold text-white"
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