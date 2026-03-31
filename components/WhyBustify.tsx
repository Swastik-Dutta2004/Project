"use client"

import React from 'react'

const WhyBustify = () => {
    const features = [
        {
            title: "Easy & Fast Booking",
            desc: "Passengers can quickly search buses, compare options, and book tickets within seconds.",
            icon: "/images/tickets.svg",
        },
        {
            title: "Affordable Prices",
            desc: "BusTiFY offers competitive ticket prices and special discounts for the best deals.",
            icon: "/images/prices.svg",
        },
        {
            title: "Safe & Reliable Travel",
            desc: "All buses and operators are verified to ensure passenger safety and comfort.",
            icon: "/images/health.svg",
        },
        {
            title: "24/7 Customer Support",
            desc: "Our support team is always available to help with bookings and travel assistance.",
            icon: "/images/everyTime.svg",
        },
    ];

    return (
        <section className="py-6 bg-background">
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden"
                    >
                        {/* Decorative background element */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Icon Container */}
                            <div className="mb-6 p-4 rounded-2xl bg-secondary group-hover:bg-primary group-hover:rotate-6 transition-all duration-300">
                                <img 
                                    src={feature.icon} 
                                    alt={feature.title} 
                                    className="w-10 h-10 group-hover:brightness-0 group-hover:invert transition-all" 
                                />
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-3 leading-tight">
                                {feature.title}
                            </h3>
                            
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyBustify