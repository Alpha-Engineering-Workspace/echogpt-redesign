import Container from "@/components/common/Container";
import { features } from "@/data/features";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-gray-50 py-20 sm:py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#6857f5]">
            FEATURES
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Everything you need in one AI workspace
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            EchoGPT brings everyday AI tools together in one
            simple and productive experience.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-[#6857f5]">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-950">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}