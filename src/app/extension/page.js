import AppNavbar from "@/components/layout/AppNavbar";
import ExtensionDemo from "@/features/extension/ExtensionDemo";

export default function ExtensionPage() {
  return (
    <>
      <AppNavbar />

      <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-12 transition-colors dark:bg-gray-950 sm:px-6 lg:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            EchoGPT Chrome Extension
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            AI assistance without leaving your browser
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Explore the redesigned EchoGPT browser side-panel experience.
          </p>
        </div>

        <ExtensionDemo />
      </main>
    </>
  );
}