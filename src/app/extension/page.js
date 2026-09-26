
import AppNavbar from "@/components/layout/AppNavbar";
import ExtensionDemo from "@/features/extension/ExtensionDemo";

export default function ExtensionPage() {
  return (
    <>
      <AppNavbar />

     <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-semibold text-gray-500">
          EchoGPT Chrome Extension
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          AI assistance without leaving your browser
        </h1>

        <p className="mt-4 text-gray-500">
          Explore the redesigned EchoGPT browser side-panel experience.
        </p>
      </div>

      <ExtensionDemo />
    </>
  );
}