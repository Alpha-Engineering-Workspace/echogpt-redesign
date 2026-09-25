import { ArrowRight } from "lucide-react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";

export default function CtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-[#6857f5] px-6 py-14 text-center text-white sm:px-10 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to work smarter with AI?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-violet-100">
            Start using EchoGPT and bring your AI tools into
            one simple workspace.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              href="/register"
              variant="secondary"
              className="gap-2 border-white bg-white px-6 py-3"
            >
              Get Started
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}