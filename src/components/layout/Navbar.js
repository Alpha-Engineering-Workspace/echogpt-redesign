"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

  function handleCloseMenu() {
    setIsMenuOpen(false);
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
            <Button href="/login" variant="ghost">
              Sign In
            </Button>

            <Button href="/chat">
              Open EchoGPT
            </Button>
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
            {isMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
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
                <Button
                  href="/login"
                  variant="secondary"
                  className="w-full"
                >
                  Sign In
                </Button>

                <Button
                  href="/chat"
                  className="w-full"
                >
                  Open EchoGPT
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}