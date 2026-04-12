"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const createBooking = useMutation(api.schema.createBookingRequest);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    city: "",
    guestCount: "",
    budgetRange: "",
    musicStyle: "",
    mustPlay: "",
    doNotPlay: "",
    additionalDetails: ""
  });

  useGSAP(() => {
    gsap.from(".contact-title", { y: 20, opacity: 0, duration: 0.6 });
    gsap.from(".contact-form", { y: 30, opacity: 0, duration: 0.6, delay: 0.2 });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createBooking({
        ...form,
        guestCount: form.guestCount ? parseInt(form.guestCount) : undefined,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <CheckCircle className="w-16 h-16 text-[var(--accent-primary)] mx-auto mb-6" />
              <h1 className="text-3xl font-[family-name:var(--font-heading)] font-bold uppercase mb-4">
                REQUEST SENT!
              </h1>
              <p className="text-[var(--text-muted)] mb-8">
                Thanks for reaching out! I&apos;ll get back to you within 24 hours with availability and a quote.
              </p>
              <Link href="/" className="text-[var(--accent-primary)] hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 matrix-grid">
        <div className="container mx-auto px-4">
          <h1 className="contact-title text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold uppercase text-center mb-6">
            BOOK ME
          </h1>
          <p className="text-[var(--text-muted)] text-center max-w-xl mx-auto mb-12">
            Fill out this form and I&apos;ll get back to you within 24 hours with availability and a custom quote for your event.
          </p>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="contact-form space-y-6 p-8 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-[family-name:var(--font-heading)] font-semibold text-[var(--accent-primary)]">CONTACT INFO</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-[family-name:var(--font-heading)] font-semibold text-[var(--accent-primary)]">EVENT DETAILS</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Event Type *</label>
                    <select
                      name="eventType"
                      required
                      value={form.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    >
                      <option value="">Select type...</option>
                      <option value="club">Club / Bar</option>
                      <option value="wedding">Wedding</option>
                      <option value="private">Private Event</option>
                      <option value="corporate">Corporate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={form.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={form.startTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">End Time</label>
                    <input
                      type="time"
                      name="endTime"
                      value={form.endTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={form.venue}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Guest Count</label>
                    <input
                      type="number"
                      name="guestCount"
                      value={form.guestCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Budget Range</label>
                    <select
                      name="budgetRange"
                      value={form.budgetRange}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    >
                      <option value="">Select range...</option>
                      <option value="under500">Under $500</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2000">$1,000 - $2,000</option>
                      <option value="2000-5000">$2,000 - $5,000</option>
                      <option value="over5000">Over $5,000</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Music Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-[family-name:var(--font-heading)] font-semibold text-[var(--accent-primary)]">MUSIC PREFERENCES</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Music Style / Genres</label>
                    <input
                      type="text"
                      name="musicStyle"
                      value={form.musicStyle}
                      onChange={handleChange}
                      placeholder="e.g., house, 90s hip-hop, mixed"
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Must-Play Songs</label>
                    <textarea
                      name="mustPlay"
                      value={form.mustPlay}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Do Not Play</label>
                    <textarea
                      name="doNotPlay"
                      value={form.doNotPlay}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Additional */}
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">Additional Details</label>
                <textarea
                  name="additionalDetails"
                  value={form.additionalDetails}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any other details about your event..."
                  className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-all hover:shadow-[0_0_30px_rgba(255,122,26,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "SENDING..." : <>SEND REQUEST <Send className="w-5 h-5" /></>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}