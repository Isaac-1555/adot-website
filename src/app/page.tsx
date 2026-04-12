"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Calendar, Music, Mic, ArrowRight } from "lucide-react";
import Spline from "@splinetool/react-spline";

export default function Home() {
  useGSAP(() => {
    gsap.from(".hero-label", { y: 20, opacity: 0, duration: 0.6, delay: 0.2 });
    gsap.from(".hero-heading", { y: 30, opacity: 0, duration: 0.8, delay: 0.4 });
    gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.6, delay: 0.6 });
    gsap.from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, delay: 0.8 });
    gsap.to(".hero-overlay", { opacity: 0.6, duration: 2, ease: "power2.inOut" });
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Spline */}
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/lp8exkg6aD4A4O-v/scene.splinecode" />
          <div className="hero-overlay absolute inset-0 bg-[var(--bg)] opacity-80 z-10 pointer-events-none" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20 z-10 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(255,122,26,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,26,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="container relative z-20 mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6 flex flex-col items-center">
            <span className="hero-label inline-block px-6 py-2 bg-[var(--text-primary)]/10 text-[var(--text-primary)] text-sm font-[family-name:var(--font-label)] tracking-[0.3em] rounded-sm backdrop-blur-md border border-[var(--text-primary)]/20">
              NOW BOOKING 2026
            </span>
            
            <h1 className="hero-heading text-5xl md:text-6xl lg:text-8xl font-[family-name:var(--font-heading)] font-black tracking-tighter uppercase leading-none drop-shadow-2xl">
              DJ ADOT
            </h1>
            
            <p className="hero-sub text-xl md:text-2xl font-[family-name:var(--font-heading)] text-[var(--accent-primary)] font-bold tracking-widest uppercase drop-shadow-md">
              ENERGY · PRECISION · VIBE
            </p>
            
            <div className="hero-cta flex flex-wrap justify-center gap-6 pt-12">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 bg-[var(--accent-primary)] text-[var(--bg)] font-black tracking-widest text-lg rounded-sm hover:bg-[var(--accent-primary-hover)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,122,26,0.6)]"
              >
                BOOK NOW
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link 
                href="/music"
                className="inline-flex items-center gap-2 px-10 py-5 border-2 border-[var(--text-primary)] text-[var(--text-primary)] font-black tracking-widest text-lg rounded-sm hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all hover:scale-105 backdrop-blur-sm"
              >
                HEAR THE SOUND
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-[var(--bg-surface)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-[family-name:var(--font-heading)] font-bold uppercase mb-12 text-center">
            WHAT I DO
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Music, title: "Clubs & Bars", desc: "Open-format sets that read the room and keep the dancefloor moving." },
              { icon: Calendar, title: "Weddings", desc: "Full day coordination, MCing, and seamless transitions for your special day." },
              { icon: Mic, title: "Corporate & Events", desc: "Professional sound and music for company parties, galas, and private events." },
            ].map((service, i) => (
              <div key={i} className="p-6 border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-secondary)]/50 transition-colors group">
                <service.icon className="w-10 h-10 text-[var(--accent-primary)] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-[family-name:var(--font-heading)] font-semibold mb-2">{service.title}</h3>
                <p className="text-[var(--text-muted)]">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Gigs Teaser */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-[family-name:var(--font-heading)] font-bold uppercase">
              UPCOMING GIGS / 2026
            </h2>
            <Link href="/gigs" className="text-[var(--accent-primary)] hover:underline text-sm font-[family-name:var(--font-label)]">
              VIEW ALL →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/50 transition-all cursor-pointer group">
                <div className="text-[var(--accent-primary)] text-xs font-[family-name:var(--font-label)] mb-2">0{i} / MAY</div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold">TBA - NYC VENUE</h3>
                <p className="text-[var(--text-muted)] text-sm">New York, NY</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Teaser */}
      <section className="py-20 bg-[var(--bg-surface)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-[family-name:var(--font-heading)] font-bold uppercase mb-12 text-center">
            LATEST MIXES
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="aspect-video bg-[var(--bg)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Music className="w-12 h-12 text-[var(--accent-secondary)] mx-auto mb-2" />
                <p className="text-[var(--text-muted)] text-sm font-[family-name:var(--font-label)]">SOUNDCLOUD PLACEHOLDER</p>
              </div>
            </div>
            <div className="aspect-video bg-[var(--bg)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Music className="w-12 h-12 text-[var(--accent-secondary)] mx-auto mb-2" />
                <p className="text-[var(--text-muted)] text-sm font-[var(--font-label)]">YOUTUBE PLACEHOLDER</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/music" className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:underline">
              HEAR MORE <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-[family-name:var(--font-heading)] font-bold uppercase mb-6">
            READY TO BOOK?
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
            Fill out the booking form and I&apos;ll get back to you within 24 hours with availability and a quote.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-all hover:shadow-[0_0_30px_rgba(255,122,26,0.5)]"
          >
            BOOK ME
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}