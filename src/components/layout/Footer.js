import Link from "next/link";

import Logo from "@/components/common/Logo";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

const companyLinks = [
  { label: "FAQ", href: "#faq" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <Logo size="sm" />
            <span className="hidden h-4 w-px bg-border md:inline-block" />
            <p className="hidden text-xs text-muted md:block">
              One workspace for everyday AI.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {productLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted transition hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
            <span className="hidden h-3 w-px bg-border md:inline-block" />
            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted transition hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} EchoGPT.</p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
