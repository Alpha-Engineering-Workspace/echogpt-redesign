import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import AppNavbar from "@/components/layout/AppNavbar";
import ProfileContent from "@/features/profile/ProfileContent";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = {
    name: session.user?.name || "User",
    email: session.user?.email || "",
  };

  return (
    <>
      <AppNavbar />

      <main className="min-h-[calc(100vh-56px)] bg-surface px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Profile
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg">
              Your account
            </h1>
            <p className="mt-2 text-sm text-muted">
              View your EchoGPT account details and activity.
            </p>
          </div>

          <ProfileContent user={user} />
        </div>
      </main>
    </>
  );
}
