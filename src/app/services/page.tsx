"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Music, Heart, Building2, ChevronDown } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Music,
    title: "Clubs & Bars",
    description: "High-energy open-format sets that read the room and keep the dancefloor packed from start to finish.",
    details: [
      "Open-format flexibility (house, hip-hop, R&B, techno)",
      "2-4 hour sets available",
      "Can work with club sound system or bring own controller",
      "Starting from $500"
    ]
  },
  {
    icon: Heart,
    title: "Weddings & Private Events",
    description: "Complete event coordination with seamless transitions and optional MCing for your special day.",
    details: [
      "Full day packages (ceremony, cocktail hour, reception)",
      "MCing available upon request",
      "All genres welcome - from old school to modern hits",
      "Starting from $1,500"
    ]
  },
  {
    icon: Building2,
    title: "Corporate & Other Events",
    description: "Professional, polished performances for company events, product launches, galas, and private parties.",
    details: [
      "Dress to impress - formal or casual depending on event",
      "Can provide sound and lighting equipment",
      "Flexible formats - background music to full dance floor",
      "Contact for custom quote"
    ]
  }
];

const faqs = [
  {
    q: "Do you take song requests?",
    a: "Absolutely! I love reading the room and taking requests. For weddings, I work with you beforehand to create a do-not-play list and gather must-play songs."
  },
  {
    q: "What are your technical requirements?",
    a: "For clubs and bars, I can work with your existing system. For private events, I provide professional sound equipment at no extra charge within NYC."
  },
  {
    q: "Do you travel outside the city?",
    a: "Yes! I serve the greater tri-state area (NY, NJ, CT). Travel fees may apply for events outside of NYC - just ask during booking."
  },
  {
    q: "How far in advance should I book?",
    a: "For weddings and large events, 2-3 months notice is ideal. For clubs and smaller events, 2-4 weeks is usually fine. I'll try to accommodate last-minute requests when possible."
  },
  {
    q: "What's your cancellation policy?",
    a: "A 50% deposit secures your date. Full refund if cancelled 30+ days before the event, 50% refund for 14-30 days, no refund within 14 days unless I can rebook the date."
  }
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  useGSAP(() => {
    gsap.from(".services-title", { y: 20, opacity: 0, duration: 0.6 });
    gsap.from(".service-card", { y: 30, opacity: 0, duration: 0.5, stagger: 0.15, delay: 0.2 });
    gsap.from(".faq-item", { y: 20, opacity: 0, duration: 0.4, stagger: 0.1, delay: 0.5 });
  });

  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 matrix-grid">
        <div className="container mx-auto px-4">
          <h1 className="services-title text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold uppercase text-center mb-6">
            SERVICES & RATES
          </h1>
          <p className="text-[var(--text-muted)] text-center max-w-2xl mx-auto mb-16">
            Versatile DJ for any occasion. Whether it&apos;s a packed club, an intimate wedding, or a corporate event - 
            I bring energy, professionalism, and a deep love for music to every gig.
          </p>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, i) => (
              <div key={i} className="service-card p-6 border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/50 transition-all hover:shadow-[0_0_20px_rgba(255,122,26,0.1)] group">
                <service.icon className="w-12 h-12 text-[var(--accent-primary)] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-[family-name:var(--font-heading)] font-semibold mb-3">{service.title}</h3>
                <p className="text-[var(--text-muted)] mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, j) => (
                    <li key={j} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-[family-name:var(--font-heading)] font-bold uppercase text-center mb-8">
              FREQUENTLY ASKED
            </h2>
            
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item border border-[var(--border-subtle)] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-[var(--bg-surface)] transition-colors"
                  >
                    <span className="font-[family-name:var(--font-heading)] font-semibold">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[var(--accent-primary)] transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-[var(--text-muted)]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-[var(--text-muted)] mb-4">Ready to book or have questions?</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-all hover:shadow-[0_0_30px_rgba(255,122,26,0.5)]">
              GET A CUSTOM QUOTE
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}