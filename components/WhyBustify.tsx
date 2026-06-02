"use client";

import React from "react";
import { Zap, Tag, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    no: "01",
    icon: <Zap className="w-5 h-5" />,
    title: "Book in 12 seconds",
    desc: "Search, pick a seat, pay. No paperwork, no queues, no 'system down' signs.",
    foot: "Avg. checkout time, Q1 2025",
  },
  {
    no: "02",
    icon: <Tag className="w-5 h-5" />,
    title: "Fares that make sense",
    desc: "Standardized pricing across operators, plus student and senior concessions built in.",
    foot: "From ₹8 · no surge pricing",
  },
  {
    no: "03",
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Verified operators",
    desc: "Every bus, every conductor, every route is KYC-verified. We know who's driving.",
    foot: "100% operator KYC, 2024–",
  },
  {
    no: "04",
    icon: <Headphones className="w-5 h-5" />,
    title: "A real human, 24/7",
    desc: "Missed your stop? Wrong charge? Talk to a person in under 90 seconds — not a bot.",
    foot: "Median pickup: 47 sec",
  },
];

const WhyBustify = () => {
  return (
    <section id="why" className="px-5 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Section header — editorial */}
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="route-num text-2xl text-tram">§ 02</span>
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                The Manifest
              </span>
            </div>
            <h2 className="display text-5xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-tight text-ink">
              Why <span className="italic font-light">Kolkata</span>{" "}
              <br className="hidden md:block" />
              rides with us.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-lg text-ink/80 leading-relaxed">
              BusTiFY is built for the city, by people who grew up arguing with conductors
              about change. Four promises we keep — every trip, every day.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f, i) => (
            <article
              key={i}
              className="group relative bg-paper p-7 md:p-8 hover:bg-ink hover:text-paper transition-colors duration-500 min-h-[300px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="route-num text-5xl text-tram group-hover:text-tram transition-colors">
                  {f.no}
                </span>
                <div className="w-10 h-10 grid place-items-center rounded-full border border-current/30 group-hover:border-paper/30 group-hover:bg-paper/10 transition-all">
                  {f.icon}
                </div>
              </div>

              <h3 className="display text-2xl md:text-[28px] leading-tight mb-3 tracking-tight">
                {f.title}
              </h3>
              <p className="text-sm md:text-[15px] leading-relaxed opacity-80 flex-1">
                {f.desc}
              </p>

              <div className="mt-6 pt-5 border-t border-current/15 flex items-center justify-between">
                <span className="mono text-[10px] tracking-[0.2em] uppercase opacity-60">
                  {f.foot}
                </span>
                <span className="mono text-xs opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBustify;
