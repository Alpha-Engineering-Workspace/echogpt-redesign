import SettingsForm from "@/features/settings/SettingsForm";
import AppNavbar from "@/components/layout/AppNavbar";

export default function SettingsPage() {
  return (
    <>
      <AppNavbar />

      <main className="min-h-[calc(100vh-56px)] bg-surface px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Settings
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg">
              Preferences
            </h1>
            <p className="mt-2 text-sm text-muted">
              Manage your EchoGPT profile, appearance, and AI defaults.
            </p>
          </div>

          <SettingsForm />
        </div>
      </main>
    </>
  );
}
