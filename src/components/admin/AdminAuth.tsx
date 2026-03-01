"use client";

import { useState, ReactNode } from "react";

interface AdminAuthProps {
  children: ReactNode;
}

export function AdminAuth({ children }: AdminAuthProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/reservations?date=2000-01-01", {
        headers: { "x-admin-password": password },
      });

      if (res.ok) {
        sessionStorage.setItem("admin-password", password);
        setAuthenticated(true);
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  // Check sessionStorage on first render
  if (!authenticated) {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("admin-password") : null;
    if (stored) {
      setPassword(stored);
      setAuthenticated(true);
      return null;
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f0eb]">
        <form onSubmit={handleSubmit} className="w-full max-w-sm px-6">
          <h1 className="mb-8 text-center font-didot text-3xl text-[#2a3d3a]">
            Admin
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            placeholder="Password"
            className="w-full border-0 border-b border-neutral-300 bg-transparent py-3 text-center text-sm text-neutral-900 outline-none focus:border-neutral-900"
            autoFocus
          />
          {error && (
            <p className="mt-3 text-center text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-neutral-900 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-black disabled:opacity-50"
          >
            {loading ? "..." : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
