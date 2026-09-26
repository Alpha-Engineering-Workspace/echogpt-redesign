"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/chat");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error banner */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2.5 text-xs text-danger animate-fade-in"
        >
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-danger text-white">
            !
          </span>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="flex items-center justify-between text-xs font-medium text-fg"
        >
          Email
          {email && email.includes("@") && (
            <span className="inline-flex items-center gap-1 text-[10px] font-normal text-success">
              <span className="h-1 w-1 rounded-full bg-success" />
              Looks good
            </span>
          )}
        </label>
        <div className="group relative">
          <Mail
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent"
          />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full rounded-md border border-border bg-bg py-2.5 pl-9 pr-3 text-sm text-fg outline-none transition placeholder:text-muted-foreground focus:border-accent focus:shadow-glow"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="flex items-center justify-between text-xs font-medium text-fg"
        >
          Password
          <Link
            href="#"
            className="text-[10px] font-normal text-muted-foreground transition hover:text-accent"
            onClick={(e) => e.preventDefault()}
          >
            Forgot?
          </Link>
        </label>
        <div className="group relative">
          <Lock
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent"
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="w-full rounded-md border border-border bg-bg py-2.5 pl-9 pr-10 text-sm text-fg outline-none transition placeholder:text-muted-foreground focus:border-accent focus:shadow-glow"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition hover:bg-surface-hover hover:text-fg"
          >
            {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2 pt-0.5">
        <button
          type="button"
          role="switch"
          aria-checked={remember}
          onClick={() => setRemember(!remember)}
          className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition ${
            remember ? "bg-accent" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-1 transition-all ${
              remember ? "left-3" : "left-0.5"
            }`}
          />
        </button>
        <span className="text-xs text-muted">Keep me signed in</span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="group/btn relative inline-flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-md bg-[var(--primary)] py-2.5 text-sm font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_8px_24px_-8px_rgba(124,108,245,0.45)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="relative my-1 flex items-center">
        <span className="h-px flex-1 bg-border" />
        <span className="px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Social (placeholder UI — disabled) */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled
          title="Coming soon"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-border bg-bg text-xs font-medium text-muted-foreground opacity-70 transition hover:border-border-strong hover:text-fg disabled:cursor-not-allowed"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
          </svg>
          GitHub
        </button>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-border bg-bg text-xs font-medium text-muted-foreground opacity-70 transition hover:border-border-strong hover:text-fg disabled:cursor-not-allowed"
        >
          <svg width="13" height="13" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.8 14.2A6.6 6.6 0 0 1 5.5 12c0-.8.1-1.5.3-2.2V7H2.2A11 11 0 0 0 1 12c0 1.8.4 3.4 1.2 4.9l3.6-2.7z"
            />
            <path
              fill="#EA4335"
              d="M12 5.5c1.6 0 3 .6 4.2 1.6l3-3.1A11 11 0 0 0 12 1 11 11 0 0 0 2.2 7l3.6 2.8c.9-2.6 3.3-4.5 6.2-4.5z"
            />
          </svg>
          Google
        </button>
      </div>

      {/* Footer link */}
      <p className="pt-1 text-center text-xs text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-accent transition hover:text-[var(--primary-hover)]"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
