"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { Calendar, MapPin, Music, User, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Request = any;

export default function AdminRequests() {
  const requests = useQuery(api.api.getBookingRequests);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] font-bold">Booking Requests</h1>
        <p className="text-[var(--text-muted)]">Review and manage incoming inquiries.</p>
      </div>

      <div className="space-y-4">
        {requests?.map((req: Request) => (
          <div key={req._id} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
            {/* Header / Summary */}
            <div 
              className="p-6 flex items-center justify-between cursor-pointer hover:bg-[var(--bg)] transition-colors"
              onClick={() => toggleExpand(req._id)}
            >
              <div className="flex-1 grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="font-semibold text-lg">{req.name}</p>
                  <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                    <User className="w-3 h-3" /> {req.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">{new Date(req.eventDate).toLocaleDateString()}</p>
                  <p className="text-xs text-[var(--text-muted)] capitalize">{req.eventType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{req.city || "No city"}</p>
                  <p className="text-xs text-[var(--text-muted)]">{req.venue || "No venue"}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[var(--text-muted)]">
                    {new Date(req._creationTime).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="ml-4 text-[var(--text-muted)]">
                {expandedId === req._id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === req._id && (
              <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg)]/50">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact & Basics */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-[family-name:var(--font-label)] text-[var(--text-muted)] mb-3">CONTACT</h4>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-sm"><User className="w-4 h-4 text-[var(--accent-primary)]" /> {req.name}</p>
                        <p className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-[var(--accent-primary)]" /> <a href={`mailto:${req.email}`} className="hover:underline">{req.email}</a></p>
                        {req.phone && <p className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-[var(--accent-primary)]" /> {req.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-[family-name:var(--font-label)] text-[var(--text-muted)] mb-3">EVENT DETAILS</h4>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-[var(--accent-primary)]" /> {req.eventDate} {req.startTime && `- ${req.startTime}`} {req.endTime && `to ${req.endTime}`}</p>
                        <p className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-[var(--accent-primary)]" /> {req.venue}, {req.city}</p>
                        <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-[var(--bg-surface)] rounded border border-[var(--border-subtle)]">
                          <div>
                            <span className="text-xs text-[var(--text-muted)] block">Type</span>
                            <span className="text-sm font-medium capitalize">{req.eventType}</span>
                          </div>
                          <div>
                            <span className="text-xs text-[var(--text-muted)] block">Guests</span>
                            <span className="text-sm font-medium">{req.guestCount || "TBD"}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-xs text-[var(--text-muted)] block">Budget</span>
                            <span className="text-sm font-medium">{req.budgetRange || "Not specified"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Music & Details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-[family-name:var(--font-label)] text-[var(--text-muted)] mb-3 flex items-center gap-2"><Music className="w-4 h-4" /> MUSIC PREFERENCES</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs text-[var(--text-muted)] block">Style / Genres</span>
                          <p className="text-sm bg-[var(--bg-surface)] p-2 rounded border border-[var(--border-subtle)]">{req.musicStyle || "None provided"}</p>
                        </div>
                        {req.mustPlay && (
                          <div>
                            <span className="text-xs text-green-500 block">Must Play</span>
                            <p className="text-sm bg-[var(--bg-surface)] p-2 rounded border border-[var(--border-subtle)]">{req.mustPlay}</p>
                          </div>
                        )}
                        {req.doNotPlay && (
                          <div>
                            <span className="text-xs text-red-500 block">Do Not Play</span>
                            <p className="text-sm bg-[var(--bg-surface)] p-2 rounded border border-[var(--border-subtle)]">{req.doNotPlay}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {req.additionalDetails && (
                      <div>
                        <h4 className="text-xs font-[family-name:var(--font-label)] text-[var(--text-muted)] mb-3">ADDITIONAL DETAILS</h4>
                        <p className="text-sm bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-subtle)] whitespace-pre-wrap">
                          {req.additionalDetails}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 flex gap-3">
                      <a 
                        href={`mailto:${req.email}?subject=Booking Inquiry: ${req.eventType} on ${req.eventDate}`}
                        className="flex-1 text-center py-2 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-colors"
                      >
                        REPLY VIA EMAIL
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {requests?.length === 0 && (
          <div className="p-8 text-center text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-lg bg-[var(--bg-surface)]">
            No booking requests yet. They&apos;ll show up here when you get them!
          </div>
        )}
      </div>
    </div>
  );
}