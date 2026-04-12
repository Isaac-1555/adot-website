"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MapPin, Music, Calendar, Award } from "lucide-react";

export default function About() {
  useGSAP(() => {
    gsap.from(".about-img", { x: -50, opacity: 0, duration: 0.8 });
    gsap.from(".about-content", { x: 50, opacity: 0, duration: 0.8, delay: 0.2 });
    gsap.from(".about-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.4 });
  });

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 matrix-grid">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="about-img relative aspect-[3/4] rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 mb-4" />
                  <p className="text-[var(--text-muted)] text-sm font-[family-name:var(--font-label)]">DJ PHOTO PLACEHOLDER</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="about-content space-y-6">
              <span className="text-[var(--accent-primary)] text-xs font-[family-name:var(--font-label)] tracking-wider">
                ABOUT ME
              </span>
              
              <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold uppercase">
                THE STORY BEHIND THE DECKS
              </h1>
              
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Born and raised in New York, I discovered my passion for DJing at 16 when I first heard 
                house music in a downtown club. That night changed everything. I spent the next decade 
                honing my craft, playing small rooms, building my sound, and learning to read crowds.
              </p>
              
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Today, I bring that same hunger and dedication to every gig. Whether it&apos;s a packed 
                club, an intimate wedding, or a corporate gala, my mission is the same: create an 
                unforgettable experience through music.
              </p>

              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <MapPin className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>Based in NYC, serving the tri-state area</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[var(--bg-surface)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Calendar, value: "500+", label: "GIGS PLAYED" },
              { icon: Music, value: "12+", label: "YEARS EXPERIENCE" },
              { icon: Award, value: "50+", label: "VENUES" },
              { icon: Music, value: "∞", label: "PASSION" },
            ].map((stat, i) => (
              <div key={i} className="about-stat text-center">
                <stat.icon className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-3" />
                <div className="text-3xl font-[family-name:var(--font-heading)] font-bold text-[var(--accent-secondary)]">
                  {stat.value}
                </div>
                <div className="text-sm font-[family-name:var(--font-label)] text-[var(--text-muted)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-[family-name:var(--font-heading)] font-bold uppercase text-center mb-16">
            WHAT I BRING TO YOUR EVENT
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Clubs & Bars",
                desc: "Open-format DJ sets that blend house, hip-hop, R&B, and whatever else gets the crowd moving. I read the room and adapt in real-time.",
                bullets: ["Open-format flexibility", "High-energy progressions", "Crowd reading", "Seamless transitions"]
              },
              {
                title: "Weddings",
                desc: "Complete wedding day coordination from ceremony to last dance. MCing when needed, seamless transitions between all moments.",
                bullets: ["Full day packages", "MCing available", "All genres welcome", "First dance experts"]
              },
              {
                title: "Corporate & Private",
                desc: "Professional, polished performances for company events, product launches, galas, and private parties.",
                bullets: ["Dress to impress", "Reliable equipment", "Flexible formats", "Background to dance floor"]
              },
            ].map((offer, i) => (
              <div key={i} className="p-6 border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/50 transition-all">
                <h3 className="text-xl font-[family-name:var(--font-heading)] font-semibold mb-3">{offer.title}</h3>
                <p className="text-[var(--text-muted)] mb-4">{offer.desc}</p>
                <ul className="space-y-2">
                  {offer.bullets.map((bullet, j) => (
                    <li key={j} className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}