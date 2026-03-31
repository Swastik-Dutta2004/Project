"use client"

import React from 'react'

const Hero = () => {
  return (
    <div className="relative w-full bg-background overflow-hidden border-b border-border">
      {/* Background Decorative Element (Subtle Gradient using your Chart colors) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-chart-1 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-chart-2 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
        
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full bg-secondary border border-border">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-secondary-foreground uppercase">
            Real-Time Transit • Kolkata
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground mb-6 max-w-4xl">
          Navigate the City of Joy <br /> 
          <span className="text-muted-foreground italic font-serif">In Real-Time.</span>
        </h1>

        <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mb-12 font-medium">
          Track over 400+ local and AC bus routes across Kolkata. 
          From Howrah to Salt Lake, never miss your ride again.
        </p>

        {/* Floating Search Bar */}
        <div 
          className="w-full max-w-3xl bg-card border border-border shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2"
          style={{ borderRadius: "calc(var(--radius) * 1.5)" }}
        >
          <div className="flex-1 flex items-center px-4 w-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground mr-3">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input 
              type="text" 
              placeholder="Enter starting point (e.g. Gariahat)" 
              className="bg-transparent border-none outline-none w-full py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-border" />

          <div className="flex-1 flex items-center px-4 w-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground mr-3">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <input 
              type="text" 
              placeholder="Destination (e.g. Sector V)" 
              className="bg-transparent border-none outline-none w-full py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/50"
            />
          </div>

          <button 
            className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-bold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ borderRadius: "var(--radius)" }}
          >
            Find Buses
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 flex gap-8 md:gap-16">
            <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground">400+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Routes</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground">15k+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Daily Users</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground">98%</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Accuracy</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero