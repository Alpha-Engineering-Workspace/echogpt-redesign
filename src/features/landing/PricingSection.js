import { Check } from "lucide-react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-gray-50 py-20 transition-colors dark:bg-gray-900 sm:py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#6857f5] dark:text-violet-400">
            PRICING
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            Start simple. Upgrade when you need more.
          </h2>

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
            Explore EchoGPT and choose the experience that fits your workflow.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <PricingCard
            title="Free"
            price="$0"
            description="For exploring EchoGPT and everyday AI tasks."
            features={[
              "Access to basic AI chat",
              "Conversation history",
              "Basic browser features",
              "Responsive web application",
            ]}
            buttonText="Get Started"
            buttonHref="/register"
          />

          <PricingCard
            title="Pro"
            price="$12"
            description="For users who want more models and productivity tools."
            features={[
              "Everything in Free",
              "Access to premium models",
              "Advanced browser actions",
              "Higher usage limits",
            ]}
            buttonText="Explore Pro"
            buttonHref="/register"
            highlighted
          />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
          Pricing shown here is part of the redesign concept and can be updated
          to match the production product.
        </p>
      </Container>
    </section>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonHref,
  highlighted = false,
}) {
  return (
    <div
      className={`rounded-3xl border p-7 transition-colors ${
        highlighted
          ? "border-[#6857f5] bg-white shadow-xl shadow-violet-100/40 dark:bg-gray-950 dark:shadow-violet-950/10"
          : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
      }`}
    >
      {highlighted && (
        <span className="mb-5 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          Recommended
        </span>
      )}

      <h3 className="text-xl font-semibold text-gray-950 dark:text-white">
        {title}
      </h3>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-4xl font-bold text-gray-950 dark:text-white">
          {price}
        </span>

        <span className="pb-1 text-sm text-gray-500 dark:text-gray-400">
          / month
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
        {description}
      </p>

      <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

      <div className="space-y-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
          >
            <Check size={17} className="text-[#6857f5] dark:text-violet-400" />
            {feature}
          </div>
        ))}
      </div>

      <Button
        href={buttonHref}
        variant={highlighted ? "primary" : "secondary"}
        className="mt-7 w-full"
      >
        {buttonText}
      </Button>
    </div>
  );
}
