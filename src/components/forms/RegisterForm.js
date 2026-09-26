"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Password strength — simple heuristic
  const passwordStrength = (() => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return Math.min(score, 4);
  })();

  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-border",
    "bg-danger",
    "bg-warning",
    "bg-accent",
    "bg-success",
  ];

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

      {/* Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="text-xs font-medium text-fg"
        >
          Name
        </label>
        <div className="group relative">
          <User
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent"
          />
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoComplete="name"
            required
            className="w-full rounded-md border border-border bg-bg py-2.5 pl-9 pr-3 text-sm text-fg outline-none transition placeholder:text-muted-foreground focus:border-accent focus:shadow-glow"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="flex items-center justify-between text-xs font-medium text-fg"
        >
          Email
          {formData.email && formData.email.includes("@") && (
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
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
          {formData.password && (
            <span
              className={`text-[10px] font-medium ${
                passwordStrength >= 3 ? "text-success" : "text-muted-foreground"
              }`}
            >
              {strengthLabels[passwordStrength]}
            </span>
          )}
        </label>
        <div className="group relative">
          <Lock
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent"
          />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            autoComplete="new-password"
            minLength={6}
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

        {/* Password strength meter */}
        {formData.password && (
          <div className="flex gap-1 pt-0.5">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition ${
                  i <= passwordStrength
                    ? strengthColors[passwordStrength]
                    : "bg-border"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirm password */}
      <div className="space-y-1.5">
        <label
          htmlFor="confirmPassword"
          className="flex items-center justify-between text-xs font-medium text-fg"
        >
          Confirm password
          {formData.confirmPassword &&
            formData.confirmPassword === formData.password &&
            formData.password.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-normal text-success">
                <span className="h-1 w-1 rounded-full bg-success" />
                Matches
              </span>
            )}
        </label>
        <div className="group relative">
          <Lock
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent"
          />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter password again"
            autoComplete="new-password"
            minLength={6}
            required
            className="w-full rounded-md border border-border bg-bg py-2.5 pl-9 pr-10 text-sm text-fg outline-none transition placeholder:text-muted-foreground focus:border-accent focus:shadow-glow"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition hover:bg-surface-hover hover:text-fg"
          >
            {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
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
            Creating account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </>
        )}
      </button>

      {/* Footer link */}
      <p className="pt-1 text-center text-xs text-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-accent transition hover:text-[var(--primary-hover)]"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
