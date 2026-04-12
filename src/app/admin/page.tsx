"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Calendar, Music, MessageSquare } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Event = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Request = any;

export default function AdminDashboard() {
  const events = useQuery(api.api.getEvents);
  const media = useQuery(api.api.getMedia);
  const requests = useQuery(api.api.getBookingRequests);

  const upcomingGigs = (events as Event[] | undefined)?.filter((e: Event) => new Date(e.date) >= new Date()) || [];
  const pendingRequests = (requests as Request[] | undefined)?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-[family-name:var(--font-heading)] font-bold mb-2">Dashboard</h1>
        <p className="text-[var(--text-muted)]">Welcome back, DJ Abu. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Upcoming Gigs</p>
              <p className="text-3xl font-bold font-[family-name:var(--font-heading)]">{upcomingGigs.length}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] rounded">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Total Requests</p>
              <p className="text-3xl font-bold font-[family-name:var(--font-heading)]">{requests?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Media Items</p>
              <p className="text-3xl font-bold font-[family-name:var(--font-heading)]">{media?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-8">
        {/* Next Gigs */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-6">
          <h2 className="text-xl font-[family-name:var(--font-heading)] font-semibold mb-6 flex items-center justify-between">
            Next Gigs
            <a href="/admin/gigs" className="text-sm text-[var(--accent-primary)] font-sans font-normal hover:underline">View All</a>
          </h2>
          <div className="space-y-4">
            {upcomingGigs.slice(0, 5).map((gig: Event, i: number) => (
              <div key={i} className="flex justify-between items-center p-3 border border-[var(--border-subtle)] rounded">
                <div>
                  <p className="font-semibold">{gig.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{new Date(gig.date).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  gig.status === 'booked' ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' : 'bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)]'
                }`}>
                  {gig.status}
                </span>
              </div>
            ))}
            {upcomingGigs.length === 0 && <p className="text-[var(--text-muted)] text-sm">No upcoming gigs.</p>}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-6">
          <h2 className="text-xl font-[family-name:var(--font-heading)] font-semibold mb-6 flex items-center justify-between">
            Recent Requests
            <a href="/admin/requests" className="text-sm text-[var(--accent-primary)] font-sans font-normal hover:underline">View All</a>
          </h2>
          <div className="space-y-4">
            {pendingRequests.map((req: Request, i: number) => (
              <div key={i} className="flex justify-between items-center p-3 border border-[var(--border-subtle)] rounded">
                <div>
                  <p className="font-semibold">{req.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{req.eventType} • {req.eventDate}</p>
                </div>
                <button className="text-xs text-[var(--accent-primary)] hover:underline">View</button>
              </div>
            ))}
            {pendingRequests.length === 0 && <p className="text-[var(--text-muted)] text-sm">No recent requests.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}