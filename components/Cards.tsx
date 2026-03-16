"use client"

import React, { useState } from "react";

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
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < full ? "#F59E0B" : i === full && half ? "url(#half)" : "#D1D5DB"} xmlns="http://www.w3.org/2000/svg">
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
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{
      padding: "40px 48px",
      background: "#F8F9FA",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      minHeight: "100vh",
    }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>
          Find Popular Tours
        </h2>
        <span style={{ fontSize: "14px", color: "#3B82F6", cursor: "pointer", fontWeight: 500 }}>
          See all
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onMouseEnter={() => setHovered(card.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "#fff",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: hovered === card.id
                ? "0 8px 30px rgba(0,0,0,0.13)"
                : "0 2px 10px rgba(0,0,0,0.07)",
              transition: "box-shadow 0.25s ease, transform 0.25s ease",
              transform: hovered === card.id ? "translateY(-4px)" : "translateY(0)",
              cursor: "pointer",
            }}
          >
            {/* Image — full, no crop */}
            <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
              <img
                src={card.ima}
                alt={card.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  transition: "transform 0.4s ease",
                  transform: hovered === card.id ? "scale(1.05)" : "scale(1)",
                }}
              />
            </div>

            {/* Card Body */}
            <div style={{ padding: "14px 16px 16px" }}>

              {/* Location */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>{card.location}</span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                margin: "0 0 8px",
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {card.name}
              </h3>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                <StarRating rating={card.rating} />
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>{card.rating}</span>
                <span style={{ fontSize: "12px", color: "#9CA3AF" }}>({card.reviews})</span>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #F3F4F6", marginBottom: "12px" }} />

              {/* Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>
                    {card.days} {card.days === 1 ? "day" : "days"}
                  </span>
                </div> */}
                {/* <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                  ${card.price}
                </span> */}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;