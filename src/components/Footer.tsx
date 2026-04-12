"use client";

import Link from "next/link";
import { Music, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-[family-name:var(--font-heading)] font-bold uppercase mb-4 flex items-center gap-2">
              <Music className="w-6 h-6 text-[var(--accent-primary)]" />
              DJ ABU
            </h3>
            <p className="text-[var(--text-muted)] text-sm">
              Professional DJ for clubs, weddings, and private events in NYC and the tri-state area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-semibold mb-4">QUICK LINKS</h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/about", label: "About" },
                { href: "/gigs", label: "Gigs" },
                { href: "/music", label: "Music" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Book Me" },
              ].map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-[var(--text-muted)] text-sm hover:text-[var(--accent-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-semibold mb-4">LET&apos;S CONNECT</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-[var(--border-subtle)] rounded hover:border-[var(--accent-primary)] transition-colors">
                <span className="text-xs">IG</span>
              </a>
              <a href="#" className="p-2 border border-[var(--border-subtle)] rounded hover:border-[var(--accent-primary)] transition-colors">
                <span className="text-xs">X</span>
              </a>
              <a href="#" className="p-2 border border-[var(--border-subtle)] rounded hover:border-[var(--accent-primary)] transition-colors">
                <span className="text-xs">FB</span>
              </a>
              <a href="mailto:booking@dju.com" className="p-2 border border-[var(--border-subtle)] rounded hover:border-[var(--accent-primary)] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border-subtle)] text-center text-[var(--text-muted)] text-sm">
          © {new Date().getFullYear()} DJ Abu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}