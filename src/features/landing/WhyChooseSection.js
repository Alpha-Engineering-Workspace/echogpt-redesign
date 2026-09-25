import {
  Clock3,
  LayoutDashboard,
  MousePointerClick,
  Workflow,
} from "lucide-react";

import Container from "@/components/common/Container";

const reasons = [
  {
    icon: LayoutDashboard,
    title: "Everything in one place",
    description:
      "Stop jumping between different AI websites and tools.",
  },
  {
    icon: Clock3,
    title: "Save more time",
    description:
      "Quick actions and browser tools help reduce repetitive work.",
  },
  {
    icon: MousePointerClick,
    title: "Simple to use",
    description:
      "A clean interface keeps powerful AI tools easy to access.",
  },
  {
    icon: Workflow,
    title: "Built for your workflow",
    description:
      "Use EchoGPT for research, writing, coding, and daily productivity.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#6857f5]">
            WHY ECHOGPT
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            AI should simplify your work
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            EchoGPT focuses on making everyday AI tools more
            accessible, organized, and productive.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-[#6857f5]">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 font-semibold text-gray-950">
                  {reason.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}