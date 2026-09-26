"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Logo from "@/components/common/Logo";

const links = [
  { label: "Chat", href: "/chat" },
  { label: "Extension", href: "/extension" },
  { label: "Settings", href: "/settings" },
];

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
          </button>

          <Link href="/">
            <Logo />
          </Link>
        </div>

        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-100 text-gray-950"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}