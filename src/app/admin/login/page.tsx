"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "adot" && password === "admin") {
      document.cookie = "admin_auth=true; path=/";
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center matrix-grid">
      <div className="w-full max-w-md p-8 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-xl">
        <h1 className="text-2xl font-[family-name:var(--font-heading)] font-bold text-center mb-8 uppercase">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-colors"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}