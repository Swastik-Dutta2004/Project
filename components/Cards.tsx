"use client"

import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

const cards = [
  { id: 1, name: "Belur Math - Sacred Temple & Museum Tour", location: "Kolkata, India", rating: 4.8, reviews: 243, price: 120, days: 3, ima: "/cards/BelurMoth.jpg" },
  { id: 2, name: "Dakshineswar Kali Temple Guided Experience", location: "Kolkata, India", rating: 4.8, reviews: 243, price: 140, days: 2, ima: "/cards/Dakshineswar.jpg" },
  { id: 3, name: "Eco Park Nature Walk & Boating Adventure", location: "Kolkata, India", rating: 4.8, reviews: 243, price: 90, days: 1, ima: "/cards/EcoPark.jpg" },
  { id: 4, name: "Esplanade Heritage Walk & Street Food Tour", location: "Kolkata, India", rating: 4.8, reviews: 243, price: 80, days: 1, ima: "/cards/esplanate.jpg" },
  { id: 5, name: "Nandan Cultural & Cinema District Tour", location: "Kolkata, India", rating: 4.8, reviews: 243, price: 110, days: 2, ima: "/cards/Nandan.jpg" },
  { id: 6, name: "Shyam Bazar Local Life & Tram Ride Tour", location: "Kolkata, India", rating: 4.8, reviews: 243, price: 100, days: 2, ima: "/cards/ShyamBazar.jpg" },
  { id: 7, name: "Victoria Memorial Grand History Walk", location: "Kolkata, India", rating: 4.9, reviews: 312, price: 95, days: 1, ima: "/cards/BelurMoth.jpg" },
  { id: 8, name: "Howrah Bridge & Flower Market Dawn Tour", location: "Kolkata, India", rating: 4.7, reviews: 198, price: 75, days: 1, ima: "/cards/Dakshineswar.jpg" },
];

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={i < full ? "#F59E0B" : i === full && half ? "url(#half)" : "#D1D5DB"} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

const Cards = () => {
  return (
    <div className="w-full py-4">
      {/* Grid Layout - Headings and Outer Padding Removed for Seamless Integration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={card.ima}
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-foreground shadow-sm">
                Live Tracking
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5">
              {/* Location Tag */}
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={12} className="text-primary" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {card.location}
                </span>
              </div>

              {/* Title - Set to font-black for BusTiFY branding */}
              <h3 className="text-sm font-black text-foreground leading-tight mb-2 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors uppercase tracking-tight">
                {card.name}
              </h3>

              {/* Rating Row */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={card.rating} />
                <span className="text-xs font-black text-foreground">{card.rating}</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">({card.reviews} reviews)</span>
              </div>

              <div className="h-[1px] w-full bg-border mb-4" />

              {/* Price & Action Button */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block leading-none mb-1">Fare From</span>
                  <span className="text-xl font-black text-foreground">₹{card.price}</span>
                </div>
                <div className="bg-secondary text-secondary-foreground p-2.5 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:rotate-6">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;