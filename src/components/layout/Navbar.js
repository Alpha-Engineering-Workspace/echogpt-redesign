"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";

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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            {status !== "loading" && (
              <>
                {session ? (
                  <>
                    <span className="max-w-32 truncate text-sm font-medium text-gray-600">
                      {session.user?.name}
                    </span>

                    <Button href="/chat">
                      Open EchoGPT
                    </Button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-950"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Button href="/login" variant="ghost">
                      Sign In
                    </Button>

                    <Button href="/register">
                      Get Started
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleCloseMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-4">
                {status !== "loading" && (
                  <>
                    {session ? (
                      <>
                        <div className="px-3 py-2">
                          <p className="text-xs text-gray-500">
                            Signed in as
                          </p>

                          <p className="truncate text-sm font-medium text-gray-900">
                            {session.user?.name}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {session.user?.email}
                          </p>
                        </div>

                        <Button
                          href="/chat"
                          className="w-full"
                          onClick={handleCloseMenu}
                        >
                          Open EchoGPT
                        </Button>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Button
                          href="/login"
                          variant="secondary"
                          className="w-full"
                          onClick={handleCloseMenu}
                        >
                          Sign In
                        </Button>

                        <Button
                          href="/register"
                          className="w-full"
                          onClick={handleCloseMenu}
                        >
                          Get Started
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}