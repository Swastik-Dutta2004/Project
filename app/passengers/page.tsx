"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { routeModule } from "next/dist/build/templates/pages";
import Link from "next/link";
import busData from "@/public/buses.json"

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Surat", "Nagpur", "Indore", "Bhopal", "Chandigarh",
];

type Bus = {
  id: number;
  name: string;
  type: string;
  departure: string;
  arrival: string;
  duration: string;
  seats: number;
  price: number;
  rating: number;
  amenities: string[];
};

// const busData: Bus[] = 

const busTypeStyles: Record<string, string> = {
  "AC Sleeper": "bg-blue-100 text-blue-700",
  "AC Seater": "bg-indigo-100 text-indigo-700",
  "Non-AC Sleeper": "bg-amber-100 text-amber-700",
  "Non-AC Seater": "bg-gray-100 text-gray-600",
};

type SortKey = "price" | "rating" | "departure" | "seats";

type SearchResult = {
  from: string;
  to: string;
  date: string;
  passengers: number;
};

export default function HeroSection() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [error, setError] = useState("");

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

const router = useRouter();

  const handleSearch = () => {
  if (!from || !to || !date) {
    setError("Please fill in From, To, and Travel Date.");
    return;
  }
  if (from === to) {
    setError("Origin and destination cannot be the same.");
    return;
  }
  setError("");
  router.push(`/buses?from=${from}&to=${to}&date=${date}&passengers=${passengers}`);
}

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const sortedBuses = [...busData].sort((a, b) => {
    let diff = 0;
    if (sortBy === "price") diff = a.price - b.price;
    if (sortBy === "rating") diff = a.rating - b.rating;
    if (sortBy === "seats") diff = a.seats - b.seats;
    if (sortBy === "departure") diff = a.departure.localeCompare(b.departure);
    return sortDir === "asc" ? diff : -diff;
  });

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col leading-[0] gap-[2px]">
      <span className={`text-[8px] ${sortBy === col && sortDir === "asc" ? "text-blue-600" : "text-gray-300"}`}>▲</span>
      <span className={`text-[8px] ${sortBy === col && sortDir === "desc" ? "text-blue-600" : "text-gray-300"}`}>▼</span>
    </span>
  );

  return (
    <section className="flex flex-col items-center w-full pb-12">

      {/* ── Hero Image + Search Bar ── */}
      <div className="relative w-[90%] h-[500px] rounded-xl overflow-hidden mt-6">
        <Image src="/Hero2.jpg" alt="Hero image" fill className="object-cover" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Headline */}
        <div className="absolute top-16 left-0 right-0 flex flex-col items-center z-10 px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-md">
            Book Your Bus, Hassle-Free
          </h1>
          <p className="text-white/80 text-sm mt-2 text-center">
            Thousands of routes. Safe, comfortable, on time.
          </p>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-6 left-0 right-0 z-10 px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-5">
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3">

              {/* From */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">From</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                    </svg>
                  </span>
                  <select
                    value={from}
                    onChange={(e) => { setFrom(e.target.value); setError(""); }}
                    className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors appearance-none"
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Swap */}
              <button
                onClick={handleSwap}
                className="self-end mb-0.5 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors flex-shrink-0"
                title="Swap cities"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>

              {/* To */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">To</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <select
                    value={to}
                    onChange={(e) => { setTo(e.target.value); setError(""); }}
                    className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors appearance-none"
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Travel Date</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => { setDate(e.target.value); setError(""); }}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="flex flex-col gap-1 w-full md:w-36 flex-shrink-0">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Passengers</label>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                  <button onClick={() => setPassengers((p) => Math.max(1, p - 1))} className="px-3 py-3 text-gray-500 hover:bg-gray-200 transition-colors text-lg leading-none">−</button>
                  <span className="flex-1 text-center text-sm font-semibold text-gray-700">{passengers}</span>
                  <button onClick={() => setPassengers((p) => Math.min(10, p + 1))} className="px-3 py-3 text-gray-500 hover:bg-gray-200 transition-colors text-lg leading-none">+</button>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="flex-shrink-0 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all self-end"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                Search Buses
              </button>
            </div>

            {/* Validation error */}
            {error && (
              <p className="mt-2 pl-1 text-xs text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Bus Results Table (only shown after search) ── */}
      
            
    </section>
  );
}