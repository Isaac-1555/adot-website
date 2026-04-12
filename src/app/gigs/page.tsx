"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, MapPin, ExternalLink, Calendar as CalendarIcon } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Event = any;

export default function Gigs() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = useQuery(api.schema.getEvents);
  
  useGSAP(() => {
    gsap.from(".gigs-title", { y: 20, opacity: 0, duration: 0.6 });
    gsap.from(".calendar-grid", { y: 20, opacity: 0, duration: 0.6, delay: 0.2 });
    gsap.from(".gig-item", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.4 });
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const getEventForDay = (day: number) => {
    if (!events) return null;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return (events as Event[]).find((e: Event) => e.date === dateStr);
  };

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });
  const days = getDaysInMonth(currentDate);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const upcomingGigs = (events as Event[] | undefined)?.filter((e: Event) => new Date(e.date) >= new Date()) || [];

  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 matrix-grid">
        <div className="container mx-auto px-4">
          <h1 className="gigs-title text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold uppercase text-center mb-12">
            GIGS & AVAILABILITY
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calendar */}
            <div className="calendar-grid bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-2 hover:text-[var(--accent-primary)] transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-[family-name:var(--font-heading)] font-semibold">{monthName}</h2>
                <button onClick={nextMonth} className="p-2 hover:text-[var(--accent-primary)] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-xs font-[family-name:var(--font-label)] text-[var(--text-muted)] py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                  const event = day ? getEventForDay(day) : null;
                  const isToday = day === new Date().getDate() && 
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();
                  
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square flex items-center justify-center relative ${
                        day ? "cursor-pointer hover:bg-[var(--border-subtle)] rounded" : ""
                      }`}
                    >
                      {day && (
                        <>
                          <span className={`text-sm ${isToday ? "text-[var(--accent-primary)] font-bold" : ""}`}>
                            {day}
                          </span>
                          {event && (
                            <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                              event.status === "booked" ? "bg-[var(--accent-primary)]" : "bg-[var(--accent-secondary)]"
                            }`} />
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                  <span className="text-xs font-[family-name:var(--font-label)] text-[var(--text-muted)]">BOOKED</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]" />
                  <span className="text-xs font-[family-name:var(--font-label)] text-[var(--text-muted)]">TENTATIVE</span>
                </div>
              </div>
            </div>

            {/* Upcoming Gigs List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-[family-name:var(--font-heading)] font-bold uppercase">
                UPCOMING SHOWS
              </h2>
              
              {upcomingGigs.length === 0 ? (
                <p className="text-[var(--text-muted)]">No upcoming gigs scheduled.</p>
              ) : (
                <div className="space-y-4">
                  {upcomingGigs.slice(0, 5).map((gig: Event, i: number) => (
                    <div key={i} className="gig-item p-4 border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/50 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[var(--accent-primary)] text-xs font-[family-name:var(--font-label)]">
                          {new Date(gig.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          gig.status === "booked" ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]" : "bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)]"
                        }`}>
                          {gig.status.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg">{gig.title}</h3>
                      <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{gig.venue}, {gig.city}</span>
                      </div>
                      {gig.externalUrl && (
                        <a href={gig.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--accent-primary)] text-sm mt-2 hover:underline">
                          TICKETS <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="w-5 h-5 text-[var(--accent-primary)]" />
                  <span className="font-[family-name:var(--font-heading)] font-semibold">AVAILABILITY</span>
                </div>
                <p className="text-[var(--text-muted)] text-sm">
                  Currently booking dates from {new Date().toLocaleString("default", { month: "long", year: "numeric" })} onward.
                </p>
                <Link href="/contact" className="inline-block mt-4 text-[var(--accent-primary)] text-sm font-semibold hover:underline">
                  REQUEST A DATE →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}