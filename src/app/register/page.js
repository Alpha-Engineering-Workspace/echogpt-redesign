import Link from "next/link";

import RegisterForm from "@/components/forms/RegisterForm";
import Logo from "@/components/common/Logo";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex">
            <Logo />
          </Link>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Join EchoGPT and start your conversations.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}