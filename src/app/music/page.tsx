"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Play, Film, Cloud } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Media = any;

export default function Music() {
  const media = useQuery(api.api.getMedia);
  const [activeTab, setActiveTab] = useState<"audio" | "video">("audio");
  
  useGSAP(() => {
    gsap.from(".music-title", { y: 20, opacity: 0, duration: 0.6 });
    gsap.from(".media-item", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.2 });
  });

  const audioItems = (media as Media[] | undefined)?.filter((m: Media) => m.type === "audio") || [];
  const videoItems = (media as Media[] | undefined)?.filter((m: Media) => m.type === "video") || [];

  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 matrix-grid">
        <div className="container mx-auto px-4">
          <h1 className="music-title text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold uppercase text-center mb-12">
            MUSIC & MIXES
          </h1>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("audio")}
              className={`px-6 py-2 rounded font-[family-name:var(--font-label)] tracking-wider transition-all ${
                activeTab === "audio" 
                  ? "bg-[var(--accent-primary)] text-[var(--bg)]" 
                  : "border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-primary)]"
              }`}
            >
              AUDIO
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-6 py-2 rounded font-[family-name:var(--font-label)] tracking-wider transition-all ${
                activeTab === "video" 
                  ? "bg-[var(--accent-primary)] text-[var(--bg)]" 
                  : "border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-primary)]"
              }`}
            >
              VIDEO
            </button>
          </div>

          {/* Audio Section */}
          {activeTab === "audio" && (
            <div className="max-w-3xl mx-auto">
              {audioItems.length === 0 ? (
                <div className="space-y-6">
                  {["Club / Nightlife", "Weddings & Events"].map((category, i) => (
                    <div key={i} className="media-item">
                      <h2 className="text-xl font-[family-name:var(--font-heading)] font-semibold mb-4">{category}</h2>
                      {[1, 2].map((j) => (
                        <div key={j} className="p-4 border border-[var(--border-subtle)] rounded-lg mb-3 hover:border-[var(--accent-secondary)]/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded bg-[var(--bg-surface)] flex items-center justify-center">
                              <Play className="w-5 h-5 text-[var(--accent-secondary)]" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">MIX {j} - {category.split(" ")[0]} SET</h3>
                              <p className="text-sm text-[var(--text-muted)]">Recorded {new Date().toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-1 text-[var(--accent-secondary)]">
                              <Cloud className="w-4 h-4" />
                              <span className="text-xs">SOUNDCLOUD</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {audioItems.map((item: Media, i: number) => (
                    <div key={i} className="media-item p-4 border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-secondary)]/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-[var(--bg-surface)] flex items-center justify-center">
                          <Play className="w-5 h-5 text-[var(--accent-secondary)]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[var(--accent-secondary)]">
                          <Cloud className="w-4 h-4" />
                          <span className="text-xs">{item.platform.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Video Section */}
          {activeTab === "video" && (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {videoItems.length === 0 ? (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="media-item aspect-video bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Film className="w-12 h-12 text-[var(--accent-secondary)] mx-auto mb-2" />
                        <p className="text-[var(--text-muted)] text-sm font-[family-name:var(--font-label)]">VIDEO PLACEHOLDER {i}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                videoItems.map((item: Media, i: number) => (
                  <div key={i} className="media-item aspect-video bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Film className="w-12 h-12 text-[var(--accent-secondary)] mx-auto mb-2" />
                      <p className="text-[var(--text-muted)] text-sm">{item.title}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-[var(--text-muted)] mb-4">Like what you hear?</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-[var(--bg)] font-semibold rounded hover:bg-[var(--accent-primary-hover)] transition-all">
              BOOK ME
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}