import Link from "next/link";

import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";

const productLinks = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "AI Models",
    href: "#models",
  },
  {
    label: "Chrome Extension",
    href: "#extension",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
];

const companyLinks = [
  {
    label: "About",
    href: "#",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
  {
    label: "Contact",
    href: "#",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600">
              One intelligent workspace for chatting,
              researching, writing, and working with
              powerful AI models.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-950">
              Product
            </h3>

            <div className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-950">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} EchoGPT. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="#"
              className="hover:text-gray-900"
            >
              Privacy
            </Link>

            <Link
              href="#"
              className="hover:text-gray-900"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}