"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Calendar, Music, MessageSquare, LayoutDashboard, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded bg-[var(--accent-primary)] flex items-center justify-center font-bold text-[var(--bg)]">
            A
          </div>
          <span className="font-[family-name:var(--font-heading)] font-bold tracking-wider">ADMIN</span>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
            { icon: Calendar, label: "Gigs & Events", href: "/admin/gigs" },
            { icon: Music, label: "Media & Mixes", href: "/admin/media" },
            { icon: MessageSquare, label: "Requests", href: "/admin/requests" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                pathname === item.href 
                  ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]" 
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg)]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-muted)]">DJ ADOT</span>
          <button onClick={handleLogout} className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}