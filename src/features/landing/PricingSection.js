import { Check } from "lucide-react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-gray-50 py-20 sm:py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#6857f5]">
            PRICING
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Start simple. Upgrade when you need more.
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Explore EchoGPT and choose the experience that
            fits your workflow.
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

        <p className="mt-6 text-center text-xs text-gray-500">
          Pricing shown here is part of the redesign concept
          and can be updated to match the production product.
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
      className={`rounded-3xl border p-7 ${
        highlighted
          ? "border-[#6857f5] bg-white shadow-xl"
          : "border-gray-200 bg-white"
      }`}
    >
      {highlighted && (
        <span className="mb-5 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          Recommended
        </span>
      )}

      <h3 className="text-xl font-semibold text-gray-950">
        {title}
      </h3>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-4xl font-bold">
          {price}
        </span>

        <span className="pb-1 text-sm text-gray-500">
          / month
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-600">
        {description}
      </p>

      <div className="my-6 border-t border-gray-200" />

      <div className="space-y-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3 text-sm text-gray-700"
          >
            <Check
              size={17}
              className="text-[#6857f5]"
            />

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