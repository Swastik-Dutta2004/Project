"use client"

import Footer from "../components/Footer";
import Image from "next/image";
import React from "react";
import TrendingPlace from "../components/TrendingPlace";
import WhyBustify from "../components/WhyBustify";
import Cards from "@/components/Cards";

const Home = () => {
  return (
    <main className="flex flex-col items-center w-full bg-background font-sans pb-10">
      
      {/* --- HERO SECTION (Minimalist Version) --- */}
      <div className="relative w-[90%] h-[550px] rounded-3xl overflow-hidden mt-6 shadow-2xl">
        <Image
          src="/hero.jpg"
          alt="Hero image"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">
            Your world of <span className="text-primary">joy</span>
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90 max-w-xl">
            From local Kolkata escapes to far-flung adventures, BusTiFY gets you there.
          </p>
          
          {/* Optional: Subtle scroll indicator or call to action button if needed later */}
          <div className="mt-8 w-1 h-12 bg-gradient-to-b from-primary to-transparent rounded-full animate-bounce opacity-50" />
        </div>
      </div>

      {/* --- WHY CHOOSE BUSTIFY --- */}
      <div className="w-[90%] mt-24">
        <div className="text-center mb-12">
          <span className="text-primary font-black uppercase tracking-[0.2em] text-xs">The Best Choice</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mt-2 tracking-tighter uppercase">
            Why Choose Bustify
          </h2>
        </div>
        <WhyBustify /> 
      </div>

      {/* --- POPULAR PLACES (CARDS) --- */}
      <div className="w-[90%] mt-24 py-12 border-y border-border">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.2em] text-xs">Explore More</span>
            <h2 className="text-4xl font-black text-foreground mt-2 tracking-tighter uppercase">Find Popular places</h2>
          </div>
          <button className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors uppercase tracking-tight">
            View all destinations
          </button>
        </div>
        <Cards />
      </div>

      {/* --- TRENDING DESTINATIONS (AVATARS) --- */}
      <div className="w-[90%] mt-20 mb-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase">
            Trending destinations
          </h2>
        </div>
        <TrendingPlace />
      </div>

      {/* --- FOOTER --- */}
      <div className="w-full bg-secondary/30 mt-10">
        <div className="w-[90%] mx-auto py-10">
          <Footer />
        </div>
      </div>

    </main>
  );
};

export default Home;