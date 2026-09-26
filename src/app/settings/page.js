import SettingsForm from "@/features/settings/SettingsForm";
import AppNavbar from "@/components/layout/AppNavbar";

export default function SettingsPage() {
  return (
    <>
      <AppNavbar />

      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-950">
              Settings
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your account and EchoGPT preferences.
            </p>
          </div>

          <SettingsForm />
        </div>
      </main>
    </>
  );
}
