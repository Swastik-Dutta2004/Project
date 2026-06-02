"use client";

import React from "react";
import { MapPin, ArrowUpRight } from "lucide-react";

interface Card {
  id: number
  name: string
  subtitle: string
  location: string
  rating: number
  reviews: number
  price: number
  days: number
  ima: string
  stamp: string
}

const cards: Card[] = [
  { id: 1, name: "Belur Math", subtitle: "Sacred Temple & Museum", location: "Howrah", rating: 4.8, reviews: 243, price: 120, days: 3, ima: "/cards/BelurMoth.jpg", stamp: "Heritage" },
  { id: 2, name: "Dakshineswar", subtitle: "Kali Temple Guided Walk", location: "North 24 Pgs", rating: 4.8, reviews: 198, price: 140, days: 2, ima: "/cards/Dakshineswar.jpg", stamp: "Pilgrim" },
  { id: 3, name: "Eco Park", subtitle: "Nature Walk & Boating", location: "Salt Lake", rating: 4.6, reviews: 412, price: 90, days: 1, ima: "/cards/EcoPark.jpg", stamp: "Weekend" },
  { id: 4, name: "Esplanade", subtitle: "Heritage Walk & Street Food", location: "Central Kolkata", rating: 4.9, reviews: 587, price: 80, days: 1, ima: "/cards/esplanate.jpg", stamp: "Food" },
  { id: 5, name: "Nandan", subtitle: "Cultural & Cinema District", location: "Ballygunge", rating: 4.7, reviews: 156, price: 110, days: 2, ima: "/cards/Nandan.jpg", stamp: "Culture" },
  { id: 6, name: "Shyam Bazar", subtitle: "Local Life & Tram Ride", location: "North Kolkata", rating: 4.5, reviews: 92, price: 100, days: 2, ima: "/cards/ShyamBazar.jpg", stamp: "Local" },
  { id: 7, name: "Victoria Memorial", subtitle: "Grand History Walk", location: "Maidan", rating: 4.9, reviews: 312, price: 95, days: 1, ima: "/cards/BelurMoth.jpg", stamp: "Iconic" },
  { id: 8, name: "Howrah Bridge", subtitle: "Dawn Bridge & Flower Market", location: "Howrah", rating: 4.7, reviews: 198, price: 75, days: 1, ima: "/cards/Dakshineswar.jpg", stamp: "Sunrise" },
];

const Cards = () => {
  return (
    <section className="px-5 md:px-10 py-16 md:py-24 border-t border-ink/15">
      <div className="mx-auto max-w-[1400px]">
        {/* Section header — magazine layout */}
        <div className="grid grid-cols-12 gap-8 mb-12 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="route-num text-2xl text-tram">§ 03</span>
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Field Notes
              </span>
            </div>
            <h2 className="display text-5xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-tight text-ink">
              Eight places <br />
              <span className="italic font-light text-muted-foreground">worth a ticket.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 flex md:justify-end items-end">
            <a
              href="#"
              className="group inline-flex items-center gap-3 border-b-2 border-ink pb-1.5 hover:border-tram transition-colors"
            >
              <span className="font-medium tracking-tight text-ink group-hover:text-tram transition-colors">
                View all 64 destinations
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </div>

        {/* Cards grid — asymmetric postcard layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {cards.map((card, i) => (
            <article
              key={card.id}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden lift cursor-pointer"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[5/6] overflow-hidden">
                <img
                  src={card.ima}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Faux film grain */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
                <div className="absolute top-3 left-3 stamp text-paper bg-ink/40 backdrop-blur-sm">
                  {card.stamp}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-paper">
                  <div>
                    <div className="mono text-[10px] tracking-widest opacity-80">No.{String(card.id).padStart(3, "0")}</div>
                    <div className="display text-xl mt-0.5 leading-none">{card.name}</div>
                  </div>
                  <div className="route-num text-3xl text-tram">
                    {String(card.id).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 relative">
                <div className="absolute -top-px left-4 right-4 h-px bg-tram/40" />
                <div className="flex items-center gap-1.5 mb-2.5">
                  <MapPin size={11} className="text-tram" />
                  <span className="mono text-[10px] tracking-widest uppercase text-muted-foreground">
                    {card.location} · {card.days}D
                  </span>
                </div>
                <p className="text-sm text-ink/80 leading-snug mb-4 min-h-[40px]">
                  {card.subtitle}
                </p>
                <div className="ticket-stitch mb-4 -mx-1 h-px" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mono text-[9px] tracking-widest uppercase text-muted-foreground">Fare</div>
                    <div className="flex items-baseline gap-1">
                      <span className="display text-2xl text-ink">₹{card.price}</span>
                      <span className="mono text-[10px] text-muted-foreground">/ pax</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-ink">★ {card.rating}</span>
                    <span className="mono text-[10px] text-muted-foreground">({card.reviews})</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
